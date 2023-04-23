const DAOFile = require("./DAOFile.js");
const DAOMongo = require("./DAOMongo.js");
const config = require("../../../config.js");

class DAOFactory {
  static get(collection, schema) {
    const DAOpersistence = {
      mongodb: DAOMongo,
      file: DAOFile,
    };
    return new DAOpersistence[config.PERSISTENCE](collection, schema);
  }
}

module.exports = DAOFactory;
