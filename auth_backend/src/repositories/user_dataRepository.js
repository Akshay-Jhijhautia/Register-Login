const CrudRepository = require("./crudRepository");
const { User_Data } = require("../models");

class UserDataRepository extends CrudRepository {
  constructor() {
    super(User_Data);
  }
}

module.exports = UserDataRepository;
