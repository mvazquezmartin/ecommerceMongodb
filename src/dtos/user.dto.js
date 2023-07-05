class UserDTO {
  constructor(info) {
    this.first_name = info.first_name;
    this.last_name = info.last_name;
    this.fullname = info.first_name + " " + info.last_name;
    this.email = info.email;
    this.age = info.age;
    this.phone = info.phone;
    this.password = info.password;
    this.role = "user";
  }
}

module.exports = UserDTO;
