export default class UserReqDTO {
    constructor(user) {
      this.first_name = user.first_name;
      this.last_name = user.last_name;
      this.email = user.email;
      this.age = user.age;
      this.password = user.password; // El hash se hará en el servicio o antes del create
      this.cart = user.cart || null;
      this.role = user.role || 'user';
    }
  }
  