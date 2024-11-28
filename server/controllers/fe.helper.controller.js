// User Controller Actions
import { buildAPIBodyResponse } from "../libs/dev/controller.utils.js";
import AmericanGradeScale from "../db/models/AmericanGradeScale.model.js";

export const handleFetchAmericanGradeScale = async (req, res, next) => {
  let apiResponse = buildAPIBodyResponse("/team"),
    usgs = await AmericanGradeScale.find({}, null, { sort: "order" });

  apiResponse.success = true;
  apiResponse.data = usgs;

  return res.status(200).json(apiResponse);
};
