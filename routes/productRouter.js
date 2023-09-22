const express = require("express");
const product = require("../controller/productController");

const router = express.Router();

router.post("/seed", product.seedDataBase);
router.get("/csv", product.downloadProductsCSV);
router.get("/json", product.downloadProductsJSON);
router.post("/update", product.updatePrices);
router.get("/pagination", product.getPaginatedProducts);

module.exports = router;
