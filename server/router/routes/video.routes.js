import express from "express";

const videoRouter = express.Router();

videoRouter.route("/").get(() => {});
/*

router
    .route('/')
    .get(serveSanityCheck);

// ORDERS
router
    .route('/orders')
    .get(protect, getAllOrders);

router
    .route('/orders/cancel/:id')
    .put(protect, cancelOrder);

router
    .route('/orders/invoice/:id')
    .get(protect, reviewInvoice);

router
    .route('/orders/markDelivered/:id')
    .put(protect, markOrderDelivered);

router
    .route('/orders/markRefunded/:id')
    .put(protect, markOrderRefunded);

router
    .route('/orders/markShipped/:id')
    .put(protect, markOrderShipped);

router
    .route('/orders/user/:uid')
    .get(protect, getAllOrdersForUserById);

// PRODUCTS
router
    .route('/products')
    .get(protect, getAllProducts)
    .post(protect, createProduct);

router
    .route('/products/:id')
    .get(getProductById)
    .put(updateProductById)
    .delete(deleteProductById);

// USERS
router
    .route('/users')
    .get(getAllUsers);

router
    .route('/users/:id')
    .get(getUserById)
    .put(protect, updateUserById)
    .delete(deleteUserById);
*/

export default videoRouter;
