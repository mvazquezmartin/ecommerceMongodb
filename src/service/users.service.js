const fs = require("fs");
const { createHash, passwordValidate } = require("../utils/cryptPassword.util");
const { generateToken } = require("../utils/jwt.util");
const usersStore = require("../store/user.store");
const MailAdapter = require("../adapters/mail.adapter");
const UsersDao = require("../dao/mongoDb/manager/users.manager.mongo");
const UserDTO = require("../dtos/user.dto");
const cartService = require("./cart.service");
const transport = require("../utils/mail.util");

const msg = new MailAdapter();
const userDao = new UsersDao();

const create = async (userInfo) => {
  const user = await usersStore.getOne(userInfo.email);

  if (user)
    return { status: "error", message: "That email is already registered" };

  const pwHashed = createHash(userInfo.password);

  const newUserInfo = new UserDTO(userInfo);
  newUserInfo.password = pwHashed;

  const cart = await cartService.create();
  newUserInfo.id_cart = cart._id;

  await usersStore.create(newUserInfo);
  const access_token = generateToken({ email: newUserInfo.email }, "1d");

  await msg.send(newUserInfo);

  return {
    status: "success",
    message: "Successfully registered user",
    data: access_token,
  };
};

const changeRole = async (userInfo) => {
  try {
    const userData = await usersStore.getOne(userInfo);

    switch (userData.role) {
      case "user":
        const docs = [];
        userData.documents.forEach((doc) => {
          docs.push(doc.name);
        });
        if (
          docs.includes("identification" && "proofAddress" && "bankStatement")
        ) {
          userData.role = "premium";
        } else {
          return {
            status: "error",
            message: "You have not finished processing your documentation",
          };
        }
        break;
      case "premium":
        userData.role = "user";
    }

    await userDao.update(userData._id, { role: userData.role });

    return {
      status: "success",
      message: `Successful role change to ${userData.role}`,
      data: userData.role,
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
    await userDao.update(uid, userData);
    return {
      status: "success",
      message: "Documentation uploaded successfully",
      data: docToUpload,
    };
  } catch (error) {
    throw error;
  }
};

const authenticate = async (userInfo) => {
  try {
    const userData = await usersStore.getOne(userInfo.email);

    if (!userData)
      return { status: "error", message: "Username and Password don't match" };

    if (!passwordValidate(userInfo.password, userData))
      return { status: "error", message: "Username and Password don't match" };

    userData.last_connection = new Date();
    const userId = userData._id;
    await userDao.update(userId, userData);

    const access_token = generateToken(
      {
        email: userData.email,
        role: userData.role,
      },
      "1d"
    );

    return {
      status: "success",
      message: "authenticated user",
      data: access_token,
    };
  } catch (error) {
    throw error;
  }
};

const forgotPw = async (email) => {
  try {
    const userData = await usersStore.getOne(email);
    const user = userData;

    const recoveyToken = generateToken(user, "1h");
    user.recoveyToken = recoveyToken;
    user.recoveyTokenExpires = Date.now() + 3600000;

    await updateUser(user._id, user);

    const recoveryUrl = `localhost:8080/viewpararecuperarlapw?token=${recoveyToken}`;
    const mailRecovery = {
      //crear util para enviar correo: from, to, subject, html: recoveryUrl,
    };
    await transport.sendMail(mailRecovery);
    return {
      status: "succes",
      message: "The email to change the password was sent",
      data: "",
    };
  } catch (error) {
    throw error;
  }
};

const resetPw = async (token, pw) => {
  try {
    // get user data by recoveryToken: token, recoveryTokenExpires: {$gt: Date.now()}
    // que no pueda usar el mismo password
    // user.password createHash(pw)
    // eliminar recoveryToken y recoveryTokenExpiration de user
    // update User
    // return status, meessage, data?
  } catch (error) {
    throw error;
  }
};

const logout = async (email) => {
  try {
    const userData = await usersStore.getOne(email);
    userData.last_connection = new Date();
    await userDao.update(userData._id, userData);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  changeRole,
  authenticate,
  forgotPw,
  resetPw,
  uploadDoc,
  logout,
};
