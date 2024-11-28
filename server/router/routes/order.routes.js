import express from "express";
import {
  handleCreateOrder,
  handleFetchUsersOrders,
  handleRefundUserOrder,
  handleFetchOrderById,
} from "../../controllers/order.controller.js";

import {
  level1Protection,
  level2Protection,
} from "../../middleware/jwt.route.auth.middleware.js";

const orderRouter = express.Router();

orderRouter.use(level1Protection).route("/").get(handleFetchUsersOrders);

orderRouter.use(level1Protection).route("/").post(handleCreateOrder);

orderRouter.use(level1Protection).route("/:orderId").get(handleFetchOrderById);

orderRouter
  .use(level2Protection)
  .route("/refund/:orderId")
  .post(handleRefundUserOrder);

export default orderRouter;
