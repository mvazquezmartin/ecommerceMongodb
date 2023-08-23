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
    this.role = info.role;
    this.recoveryToken = info.recoveryToken;
    this.recoveryTokenExpires = info.recoveryTokenExpires;
  }

  static create(info) {
    const dto = new UserDTO(info);
    delete dto.id;
    delete dto.id_cart;
    delete dto.last_connection;
    return dto;
  }

  //cuando tenia que generar el jwt, necesita recivir un objeto plano
  //por eso no lo hice como el create.
  static getData(info) {
    return {
      id: info.id,
      first_name: info.first_name,
      last_name: info.last_name,
      email: info.email,
      profile_img: info.profile_img,
      id_cart: info.id_cart,
      role: info.role,
    };
  }
}

module.exports = UserDTO;
