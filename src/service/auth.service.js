const fs = require("fs");
const { createHash, passwordValidate } = require("../utils/cryptPassword.util");
const { generateToken } = require("../utils/jwt.util");
const usersStore = require("../store/user.store");
const { userManager } = require("../repositories/index");
const UserDTO = require("../dtos/user.dto");
const { message } = require("../repositories/index");

const authenticate = async (userInfo) => {
  try {
    const userData = await usersStore.getOne(userInfo.email);

    if (!userData || !passwordValidate(userInfo.password, userData))
      return {
        status: "error",
        message: "Username and Password don't match",
        data: [],
      };

    userData.last_connection = new Date();

    const userId = userData._id;

    await userManager.update(userId, userData);

    const dataToken = UserDTO.getData(userData);
    const access_token = generateToken(dataToken, "1d");

    return {
      status: "success",
      message: "Authenticated user",
      data: access_token,
    };
  } catch (error) {
    throw error;
  }
};

const uploadDoc = async (uid, files) => {
  try {
    const userData = await usersStore.getOne(uid);
    const { idFile, addressFile, accountFile } = files;
    const docToUpload = [];

    const fileTypes = [
      { name: "identification", file: idFile },
      { name: "proofAddress", file: addressFile },
      { name: "bankStatement", file: accountFile },
    ];

    for (const fileType of fileTypes) {
      const { name, file } = fileType;
      if (file) {
        const docs = userData.documents;
        const existingDocIndex = docs.findIndex((doc) => doc.name === name);

        if (existingDocIndex !== -1) {
          const existingDoc = docs[existingDocIndex];
          fs.unlink(__dirname + existingDoc.reference);
          docs.splice(existingDocIndex, 1);
        }

        const path = `/documents/${file.filename}`;
        const document = {
          name,
          reference: path,
        };

        userData.documents.push(document);
        docToUpload.push(document.name);
      }
    }
    await userManager.update(uid, userData);
    return {
      status: "success",
      message: "Documentation uploaded successfully",
      data: docToUpload,
    };
  } catch (error) {
    throw error;
  }
};

const forgotPw = async (email) => {
  try {
    const userData = await usersStore.getOne(email);
    const user = UserDTO.getData(userData);

    const recoveyToken = generateToken(user, "1h");
    user.recoveryToken = recoveyToken;
    user.recoveryTokenExpires = Date.now() + 3600000;

    await userManager.update(userData._id, user);

    const recoveryUrl = `localhost:8080/recoverypw?token=${recoveyToken}`;

    await message.changePassword(user, recoveryUrl);

    return {
      status: "succes",
      message: "The mail was sent to the specified address successfully",
      data: recoveryUrl,
    };
  } catch (error) {
    throw error;
  }
};

const resetPw = async (token, pw) => {
  try {
    const userData = await usersStore.getOneByToken(token);
    const userChange = {};

    userChange.password = createHash(pw);
    userChange.recoveryToken = "";
    userChange.recoveryTokenExpires = "";

    await userManager.update(userData._id, userChange);

    return {
      status: "succes",
      message: "The password has been changed successfully.",
      data: [],
    };
  } catch (error) {
    throw error;
  }
};

const logout = async (email) => {
  try {
    const userData = await usersStore.getOne(email);
    userData.last_connection = new Date();
    await userManager.update(userData._id, userData);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  authenticate,
  forgotPw,
  resetPw,
  uploadDoc,
  logout,
};
