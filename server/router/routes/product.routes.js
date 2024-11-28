import express from "express";
import {
  handleFetchProduct,
  handleFetchAllProducts,
} from "../../controllers/product.controller.js";
import { passThroughToken } from "../../middleware/jwt.route.auth.middleware.js";

const productRouter = express.Router();

// Fetch All Products
productRouter.use(passThroughToken).route("/").get(handleFetchAllProducts);

// Read Product By Product ID
productRouter.route("/:pid").get(handleFetchProduct);

export default productRouter;
