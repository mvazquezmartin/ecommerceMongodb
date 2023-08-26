const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

class UsersManager {
  constructor(path) {
    this.users = [];
    this.path = path;
  }

  async getAll() {
    try {
      await this.readFile();
      return this.users;
    } catch (error) {
      throw error;
    }
  }

  async getOne(userInfo) {
    try {
      await this.readFile();

      const keyObj = Object.keys(userInfo)[0];
      const value = userInfo[keyObj];

      const userToFind = this.users.find((user) => user[keyObj] === value);

      return userToFind;
    } catch (error) {
      throw error;
    }
  }

  async getOneById(id) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async create(userInfo) {
    try {
      const _id = uuidv4();

      const newUser = {
        _id,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        email: userInfo.email,
        age: userInfo.age,
        password: userInfo.password,
        profile_img: userInfo.profile_img,
        role: "user",
        id_cart: userInfo.id_cart,
        documents: [],
        recoveryToken: "",
        recoveryTokenExpires: "",
        last_connection: userInfo.last_connection,
      };

      await this.readFile();
      this.users.push(newUser);
      await this.saveFile();

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async update(id, update) {
    try {
      await this.readFile();

      const userIndex = this.users.findIndex((user) => user._id === id);

      this.users[userIndex] = { ...this.users[userIndex], ...update };

      await this.saveFile();

      const user = this.users[userIndex];
      return user;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async saveFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.users));
    } catch (error) {
      console.log(error);
    }
  }

  async readFile() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      if (data) this.users = JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UsersManager;
