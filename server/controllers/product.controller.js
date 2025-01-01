// Product Controller Actions
import { buildAPIBodyResponse } from "../libs/dev/controller.utils.js";
import { matchedData } from "express-validator";
import Product from "../db/models/Product.model.js";
import Team from "../db/models/Team.model.js";
import { formatDate, formatToUsd } from "../libs/dev/printing.utils.js";
import { sendEmail } from "../libs/thirdParty/email-mailtrap/send.email.routine.js";
import AmericanGradeScale from "../db/models/AmericanGradeScale.model.js";

export const handleCreateProduct = async (req, res, next) => {
  let product = null,
    apiResponse = buildAPIBodyResponse("/admin/products"),
    validatedData = matchedData(req);

  let courseShouldBePublished = req.body.courseStatus === "true",
    productData = {
      courseTitle: validatedData.courseTitle,
      courseDescription: validatedData.courseDescription,
      courseCost: parseFloat(validatedData.courseCost),
      courseIsPublished: courseShouldBePublished,
      courseInstructor: req.body.courseInstructor,
      coursePassingGrade: req.body.coursePassingGrade,
      courseCreatedBy: req.user.id,
      coursePublishedBy: courseShouldBePublished ? req.user.id : null,
      courseVideoList: req.body.courseVideoList,
      courseOfferingsList: req.body.courseOfferingsList,
    };

  // Create Product
  await Product.create(productData, null);

  // Fetch Newly Created Product
  product = await Product.where(
    "courseTitle",
    productData.courseTitle,
  ).findOne();

  if (courseShouldBePublished) {
    let team = await Team.find({}, null, null);
    let emailList = [];
    team.forEach((member) => emailList.push(member.email));

    // Assign All Team Members to New Offering

    // Send Email To Team About New Course
    let emailData = {
      email: emailList.join(", "),
      courseTitle: product.courseTitle,
      courseInstructor: product.courseInstructor,
      courseCost: formatToUsd(product.courseCost),
      year: new Date().getFullYear(),
      today: formatDate(),
    };
    await sendEmail("productPublished", emailData);
  }

  apiResponse.success = true;
  apiResponse.data = product;

  return res.status(201).json(apiResponse);
};

export const handleFetchProduct = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/products/:pid"),
    product = await Product.findById(
      req.params.pid,
      {
        courseTitle: 1,
        courseDescription: 1,
        courseCost: 1,
        courseOfferingsList: 1,
        courseInstructor: 1,
        courseIsPublished: 1,
        coursePassingGrade: 1,
        courseVideoList: 1,
        courseExamList: 1,
      },
      null,
    ).populate(
      "courseInstructor",
      "firstName lastName certificationList description",
    );

  product.coursePassingGrade = await AmericanGradeScale.findById(
    product.coursePassingGrade,
    "letterGrade gradeRange description _id",
  );

  apiResponse.success = true;
  apiResponse.data = product;

  return res.status(200).json(apiResponse);
};

export const handleFetchAllProducts = async (req, res, next) => {
  let isAdmin = (!!req.user && req.user.authType === "admin") || false,
    filter = null,
    projection = null,
    options = null,
    populateObjectDataFor = null,
    populateSelectors = null;

  if (isAdmin) {
    filter = {};
    projection = {
      courseTitle: 1,
      courseDescription: 1,
      courseCost: 1,
      courseOfferingsList: 1,
      courseIsPublished: 1,
      coursePublishedBy: 1,
    };
    populateObjectDataFor = "coursePublishedBy";
    populateSelectors = "firstName lastName";
  } else {
    // Query For User
    filter = { courseIsPublished: true };
    projection = {
      courseTitle: 1,
      courseDescription: 1,
      courseCost: 1,
      courseOfferingsList: 1,
    };
  }

  const apiResponse = buildAPIBodyResponse(req.originalUrl),
    products = isAdmin
      ? await Product.find(filter, projection, options).populate(
          populateObjectDataFor,
          populateSelectors,
        )
      : await Product.find(filter, projection, options);

  apiResponse.success = true;
  apiResponse.data = products;

  return res.status(200).json(apiResponse);
};

export const handleUpdateProduct = async (req, res, next) => {
  let product = null,
    apiResponse = buildAPIBodyResponse(req.originalUrl),
    validatedData = matchedData(req);

  let courseShouldBePublished = req.body.courseStatus === "true",
    updates = {
      courseTitle: validatedData.courseTitle,
      courseDescription: validatedData.courseDescription,
      courseCost: parseFloat(validatedData.courseCost),
      courseIsPublished: courseShouldBePublished,
      courseInstructor: req.body.courseInstructor,
      coursePassingGrade: req.body.coursePassingGrade,
      courseCreatedBy: req.user.id,
      coursePublishedBy: courseShouldBePublished ? req.user.id : null,
      courseVideoList: req.body.courseVideoList,
      courseOfferingsList: req.body.courseOfferingsList,
    };

  product = await Product.findOneAndUpdate(
    { _id: req.params.productId },
    updates,
    null,
  );

  apiResponse.success = true;
  apiResponse.data = product;

  return res.status(200).json(apiResponse);
};

export const handleDeleteProduct = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/admin/product");

  console.log("Deleting?", req.params);

  await Product.findByIdAndDelete(req.params.productId);

  apiResponse.success = true;
  apiResponse.data = {};

  return res.status(200).json(apiResponse);
};
