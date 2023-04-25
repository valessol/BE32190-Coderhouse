const fs = require("fs");
const crypto = require("crypto");
const convertToDTO = require("../DTOs/DTO.js");

class DAOFile {
  constructor(collection, _schema) {
    this.collection = collection;
    this.path = `./src/data/${collection}.json`;
  }

  async generateId() {
    try {
      const id = crypto.randomUUID();
      return id;
    } catch (err) {
      throw new Error(err);
    }
  }

  async existItem(data) {
    const items = await this.getItems();

    if (items && items.length) {
      return items.some((i) =>
        Object.entries(data).find(([key, value]) => i[key] === value)
      );
    }
    return false;
  }

  async getItems() {
    const data = await fs.promises.readFile(this.path, "utf-8");
    const parsedData = JSON.parse(data);
    return convertToDTO(parsedData, this.collection);
  }

  async getById(id) {
    const allItems = await this.getItems();
    const item = allItems.find((item) => item._id === id);

    if (!item) return {};

    return convertToDTO(item, this.collection);
  }

  async saveItem(item, _options) {
    if (item) {
      const _id = await this.generateId();
      const itemToUpload = {
        ...item,
        _id: item._id || _id,
        timestamp: Date.now(),
      };

      const allItems = await this.getItems();
      let allUpdatedItems;

      if (this.collection === "carts") {
        allUpdatedItems = [
          ...allItems.filter((item) => item._id !== itemToUpload._id),
          itemToUpload,
        ];
      } else {
        allUpdatedItems = [...allItems, itemToUpload];
      }
      await fs.promises
        .writeFile(this.path, JSON.stringify(allUpdatedItems))
        .then(() => {
          return convertToDTO(itemToUpload, this.collection);
        })
        .catch((err) => {
          return new Error(`no se ha podido guardar, ${err.message}`);
        });
    }
  }

  async updateItem(id, item) {
    const allItems = await this.getItems();
    const itemToUpdate = allItems.find((item) => item._id === id);

    if (itemToUpdate) {
      const filteredItems = allItems.filter((item) => item._id !== id);
      const newItems = [...filteredItems, { ...itemToUpdate, ...item }];
      await fs.promises
        .writeFile(this.path, JSON.stringify(newItems))
        .then((res) => {
          return convertToDTO({ ...itemToUpdate, ...item }, this.collection);
        })
        .catch((error) => console.log("no se ha podido actualizar", error));
    }
  }

  async deleteItem(id) {
    const allItems = await this.getItems();
    const itemToDelete = allItems.find((item) => item._id === id);

    if (itemToDelete) {
      const updatedItems = allItems.filter((item) => item._id !== id);
      await fs.promises
        .writeFile(this.path, JSON.stringify(updatedItems))
        .then((res) => {
          return convertToDTO(itemToDelete, this.collection);
        })
        .catch((error) => {
          console.log(`no se ha podido eliminar, ${error}`);
        });
    }
  }
}

module.exports = DAOFile;
