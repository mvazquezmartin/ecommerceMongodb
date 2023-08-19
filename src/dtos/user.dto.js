class UserDTO {
  constructor(info) {
    this.id = info.id;
    this.first_name = info.first_name;
    this.last_name = info.last_name;
    this.email = info.email;
    this.age = info.age;
    this.profile_img = info.profile_img;
    this.password = info.password;
    this.id_cart = info.id_cart;
    this.last_connection = info.last_connection;
  }

  static create(info) {
    const dto = new UserDTO(info);
    delete dto.id;
    delete dto.id_cart;
    delete dto.last_connection;
    return dto;
  }

  static getData(info) {
    const dto = new UserDTO(info);
    dto.role = info.role
    delete dto.age;
    delete dto.password;    
    delete dto.last_connection;
    return dto;
  }
}

module.exports = UserDTO;
