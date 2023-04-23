const crypto = require("crypto");
const mongoose = require("mongoose");
const config = require("../../../config.js");
const { ObjectId } = require("mongodb");
const { convertToDTO } = require("../DTOs/DTO.js");

class DAOMongo {
  constructor(collection, schema) {
    this.collection = collection;

    (async () => {
      console.log("Conectando a la base de datos de Mongo DB...");

      mongoose.connect(config.MONGO_DATA_BASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      this.model = mongoose.model(collection, schema);

      console.log("Base de datos conectada");
    })();
  }

  generateId = () => {
    try {
      const id = crypto.randomUUID();
      return id;
    } catch (err) {
      throw new Error(err);
    }
  };

  existItem = async (data) => {
    const item = await this.model.findOne({ ...data });
    if (!item) return false;
    else return true;
  };

  getItems = async () => {
    try {
      const items = await this.model.find({});
      return convertToDTO(items, this.collection);
    } catch (err) {
      console.log(err);
    }
  };

  getById = async (_id) => {
    try {
      const item = await this.model.findById(_id);
      return convertToDTO(item, this.collection);
    } catch (err) {
      console.log(err);
    }
  };

  saveItem = async (item, options) => {
    try {
      await this.model.create({ ...item });
      const savedItem = await this.model.findOne({
        ...options,
      });
      return convertToDTO(savedItem, this.collection);
    } catch (err) {
      console.log(err);
    }
  };

  updateItem = async (id, data) => {
    try {
      const _id = new ObjectId(id);
      await this.model.updateOne({ _id }, { ...data });
      const item = await this.getById(id);
      return convertToDTO(item, this.collection);
    } catch (err) {
      console.log(err);
    }
  };

  deleteItem = async (id) => {
    try {
      const item = await this.getById(id);
      if (item) {
        const _id = new ObjectId(id);
        await this.model.findOneAndDelete({ _id });
        return convertToDTO(item, this.collection);
      }
      return undefined;
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = DAOMongo;
