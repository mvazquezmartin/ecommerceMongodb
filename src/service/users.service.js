const { userManager } = require("../repositories/index");
const { message } = require("../repositories/index");
const { createHash } = require("../utils/cryptPassword.util");
const { generateToken } = require("../utils/jwt.util");
const usersStore = require("../store/user.store");
const cartService = require("./cart.service");
const UserDTO = require("../dtos/user.dto");

const getAll = async () => {
  try {
    const data = await userManager.getAll();

    if (data.length === 0)
      return {
        status: "error",
        message: "There are no registered users",
        data: [],
      };

    const dataDTO = data.map((info) => UserDTO.getData(info));

    return { status: "success", message: "Users find", data: dataDTO };
  } catch (error) {
    throw error;
  }
};

const create = async (userInfo) => {
  try {
    const user = await usersStore.getOne(userInfo.email);

    if (user)
      return {
        status: "error",
        message: "That email is already registered",
        data: [],
      };

    const pwHashed = createHash(userInfo.password);

    const newUserInfo = new UserDTO(userInfo);
    newUserInfo.password = pwHashed;

    const cart = await cartService.create();
    console.log(cart)
    newUserInfo.id_cart = cart.data._id;
    newUserInfo.last_connection = new Date();

    const newUser = await usersStore.create(newUserInfo);
    const access_token = generateToken({ email: newUser.email }, "1d");

    const data = UserDTO.getData(newUser);
    data.access_token = access_token;

    //await message.send(newUser);

    return {
      status: "success",
      message: "Successfully registered user",
      data: data,
    };
  } catch (error) {
    throw error;
  }
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
            data: [],
          };
        }
        break;
      case "premium":
        userData.role = "user";
    }

    await userManager.update(userData._id, { role: userData.role });

    return {
      status: "success",
      message: `Successful role change to ${userData.role}`,
      data: userData.role,
    };
  } catch (error) {
    throw error;
  }
};

const deleteOne = async (id) => {
  try {
    const data = await userManager.delete(id);

    return {
      status: "success",
      message: "user deleted successfully",
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

const deleteInactivity = async () => {
  try {
    const users = await userManager.getAll();

    if (users.length === 0) {
      return {
        status: "error",
        message: "There are no registered users",
        data: [],
      };
    }

    const timeFrame = 172800;
    const currentTime = new Date();

    const outdatedUsers = users.filter((user) => {
      const userConnection = new Date(user.last_connection);
      const timeLimit = new Date(userConnection.getTime() + timeFrame * 1000);
      return currentTime > timeLimit;
    });

    if (outdatedUsers.length === 0) {
      return {
        status: "success",
        message: "No recent offline users found",
        data: [],
      };
    }

    for (const user of outdatedUsers) {
      await userManager.delete(user.id);
    }

    const data = users
      .filter((user) => outdatedUsers.includes(user))
      .map((doc) => UserDTO.getData(doc));

    return {
      status: "success",
      message: "Recent offline users removed",
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
  create,
  deleteOne,
  deleteInactivity,
  changeRole,
};
