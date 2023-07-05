const CrudRepository = require("./crudRepository");
const { Login } = require("../models");

class UserRepository extends CrudRepository {
  constructor() {
    super(Login);
  }

  async getUserByEmail(email) {
    const user = await Login.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }
}

module.exports = UserRepository;
