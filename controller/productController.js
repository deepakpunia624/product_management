const productSchema = require("../models/productSchema");
const seedData = require("../seed");
const json2csv = require("json2csv").parse;

module.exports = {
  seedDataBase: async (req, res) => {
    try {
      const data = await productSchema.insertMany(seedData);
      res.status(201).json({
        success: true,
        message: "Seed data inserted successfully",
        data: data,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  downloadProductsCSV: async (req, res) => {
    try {
      const products = await productSchema.find();
      const sortData = products.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));
      const csvData = json2csv(sortData, { header: true });
      res.status(200).send(csvData);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  downloadProductsJSON: async (req, res) => {
    try {
      const productData = await productSchema.find();
      res.status(200).json({
        success: true,
        message: "Product lists",
        productData: productData,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  },

  updatePrices: async (req, res) => {
    try {
      const updates = req.body;
      const updatedProducts = [];

      for (const update of updates) {
        const { id, newPrice } = update;

        const product = await productSchema.findByIdAndUpdate(
          id,
          { price: newPrice },
          { new: true, select: "-createdAt -updatedAt -__v -quantity" }
        );

        if (product) {
          updatedProducts.push(product);
        }
      }
      const numUpdated = updatedProducts.length;
      res.status(200).json({
        success: true,
        message: `${numUpdated} products updated successfully.`,
        updatedProducts,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  getPaginatedProducts: async (req, res) => {
    try {
      const { page, pageSize } = req.query;

      if (isNaN(page) || isNaN(pageSize) || page < 1 || pageSize < 1) {
        return res.status(400).json({
          success: false,
          message: "Invalid pagination parameters",
        });
      }
      const skip = (page - 1) * pageSize;
      const products = await productSchema.find().skip(skip).limit(pageSize);
      res.json(products);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },
};
