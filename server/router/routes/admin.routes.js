import express from "express";
import { level2Protection } from "../../middleware/jwt.route.auth.middleware.js";
import {
  handleDeleteUser,
  handleFetchAllUsers,
  handleFetchUserById,
  handleUpdateAccountLockStatus,
  handleUpdateUserById,
} from "../../controllers/user.controller.js";
import {
  handleCreateTeamMember,
  handleDeleteTeamMember,
  handleFetchTeamForAdmin,
  handleFetchTeamMemberById,
  handleUpdateTeamMember,
} from "../../controllers/team.controller.js";
import {
  handleCreateProduct,
  handleDeleteProduct,
  handleFetchAllProducts,
  handleUpdateProduct,
} from "../../controllers/product.controller.js";
import { validateProductData } from "../../validators/product/product.validators.js";
import {
  handleFetchAllOrders,
  handleFetchOrderById,
} from "../../controllers/order.controller.js";
import {
  handleCreateExam,
  handleUpdateExam,
  handleDeleteExam,
  handleFetchExamById,
  handleFetchExamList,
} from "../../controllers/exam.controller.js";
import { handleSiteSettingsChanges } from "../../controllers/site-settings.controller.js";

const adminRouter = express.Router();

/** Force Level 2 Auth On All Admin Routes*/
adminRouter.use(level2Protection);

/** USER ROUTES */
adminRouter.route("/users").get(handleFetchAllUsers);

adminRouter
  .route("/users/:userId")
  .get(handleFetchUserById)
  .put(handleUpdateUserById)
  .delete(handleDeleteUser);

adminRouter
  .route("/users/:userId/updateLockStatus")
  .put(handleUpdateAccountLockStatus);

/** TEAM ROUTES */
adminRouter
  .route("/team")
  .get(handleFetchTeamForAdmin)
  .post(handleCreateTeamMember);

adminRouter
  .route("/team/:teamMemberId")
  .get(handleFetchTeamMemberById)
  .put(handleUpdateTeamMember)
  .delete(handleDeleteTeamMember);

/** ADMIN PRODUCT ROUTES */
adminRouter
  .route("/products")
  .get(handleFetchAllProducts)
  .post(validateProductData, handleCreateProduct);

adminRouter
  .route("/products/:productId")
  .put(validateProductData, handleUpdateProduct)
  .delete(handleDeleteProduct);

/** ADMIN ORDER ROUTES */
adminRouter.route("/orders").get(handleFetchAllOrders);
adminRouter.route("/orders/:orderId").get(handleFetchOrderById);

/** EXAM ROUTES */
adminRouter.route("/exams").get(handleFetchExamList).post(handleCreateExam);

adminRouter
  .route("/exam/:examId")
  .get(handleFetchExamById)
  .put(handleUpdateExam)
  .delete(handleDeleteExam);

/** SITE SETTINGS ROUTE */
adminRouter.route("/site-settings").put(handleSiteSettingsChanges);

export default adminRouter;
