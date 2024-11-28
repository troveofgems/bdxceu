// User Controller Actions
import { buildAPIBodyResponse } from "../libs/dev/controller.utils.js";
import { matchedData } from "express-validator";
/*import User from "../db/models/User.model.js";
import Team from "../db/models/Team.model.js";*/
import Product from "../db/models/Product.model.js";
import Order from "../db/models/Order.model.js";
import User from "../db/models/User.model.js";
import { sendEmail } from "../libs/thirdParty/email-mailtrap/send.email.routine.js";
import { formatDate, formatToUsd } from "../libs/dev/printing.utils.js";

export const handleFetchAllOrders = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/orders"),
    orderItems = await Order.find({}, {}, null).populate(
      "user",
      "firstName lastName",
    );

  apiResponse.success = true;

  // Return Data
  apiResponse.data = orderItems;

  return res.status(200).json(apiResponse);
};

export const handleFetchUsersOrders = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/orders"),
    orderItems = await Order.find({ user: req.user.id });

  console.log("User? ", req.user.id);
  console.log("OrderItems: ", orderItems);

  apiResponse.success = true;

  // Return Data
  apiResponse.data = orderItems;

  return res.status(200).json(apiResponse);
};

export const handleCreateOrder = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/orders"),
    orderData = req.body, //matchedData(req),
    user = req.user;

  let productToPurchase = await Product.findById(
    orderData.productId,
    null,
    null,
  );

  let newOrder = {
    user: user.id,
    paymentMethod: orderData.paymentMethod,
    paymentResult: {
      payerId: orderData.orderId.payer.payer_id,
      orderId: orderData.orderId.id,
      status: orderData.orderId.status,
      updateTime: orderData.orderId.update_time,
    },
    orderItem: {
      product: productToPurchase._id,
    },
    productName: productToPurchase.courseTitle,
    itemPrice: productToPurchase.courseCost,
    totalPrice: productToPurchase.courseCost,
    isPaid: orderData.orderId.status === "COMPLETED",
    paidAt: new Date(),
  };

  let setOrder = await Order.create(newOrder);

  // Send Order Placed Email
  let emailData = {
    email: req.user.email,
    firstName: req.user.fullName,
    courseTitle: productToPurchase.courseTitle,
    courseInstructor: productToPurchase.courseInstructor,
    paymentMethod: orderData.paymentMethod,
    totalPaid: formatToUsd(productToPurchase.courseCost),
    year: new Date().getFullYear(),
    today: formatDate(),
  };
  await sendEmail("orderPlaced", emailData);

  // Update Product
  let product = await Product.findById(orderData.productId, null, null);
  let productToUpdate = await Product.findByIdAndUpdate(
    orderData.productId,
    {
      courseEnrollments: product._doc.courseEnrollments + 1,
    },
    null,
  );

  // Now Update User's SubscribedModules
  let userToUpdate = await User.findById(req.user.id);
  userToUpdate.subscribedModules = [
    ...userToUpdate.subscribedModules,
    {
      product: productToPurchase._id,
    },
  ];
  await userToUpdate.save();

  apiResponse.success = true;

  // Return Data
  apiResponse.data = setOrder;

  return res.status(200).json(apiResponse);
};

export const handleRefundUserOrder = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/orders");

  apiResponse.success = true;

  return res.status(200).json(apiResponse);
};

export const handleFetchOrderById = async (req, res, next) => {
  console.log("Fetch Order ", req.params);
  let apiResponse = buildAPIBodyResponse("/admin/orders/:orderId"),
    order = await Order.findById(req.params.orderId, null, null).populate(
      "user",
      "firstName lastName",
    );

  apiResponse.success = true;

  // Return Data
  apiResponse.data = order;

  console.log("Backend Sending: ", apiResponse);

  return res.status(200).json(apiResponse);
};

export const handleUpdateOrderToPaid = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/orders/updateToPaid");

  // Update Order
  let orderToUpdate = await Order.findById(req.params.orderId);

  apiResponse.success = true;

  // Return Data
  apiResponse.data = {
    orderUpdated: req.params.orderId,
    completed: true,
  };

  return res.status(200).json(apiResponse);
};
