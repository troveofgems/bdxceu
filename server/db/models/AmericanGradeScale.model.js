import mongoose from "mongoose";
//import GradeScale from "../data/samples/american.grade.scale.data.json" assert { type: "json" };

const timestamps = {
  timestamps: true,
};

const AmericanGradeScaleModel = new mongoose.Schema(
  {
    letterGrade: {
      type: String,
      required: true,
    },
    gradeRange: {
      min: { type: Number, min: 0, max: 100 },
      max: { type: Number, min: 0, max: 100 },
    },
    description: {
      type: String,
      maxLength: 500,
    },
    order: {
      type: Number,
    },
  },
  timestamps,
);

export default mongoose.model("AmericanGradeScale", AmericanGradeScaleModel);

/*const seedData = async () => {
  console.log("Seed American Grade Scale Table With Data: ", GradeScale);
  const ModelForSeed = mongoose.model(
    "AmericanGradeScale",
    AmericanGradeScaleModel,
  );
  try {
    // Create an array of model instances
    const models = GradeScale.map((item) => new ModelForSeed(item));

    // Bulk insert the models
    const result = await ModelForSeed.insertMany(models);

    console.log(`Inserted ${result.length} documents`);
    console.log(result);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

seedData().then(() => console.log("Seed Complete"));*/

/*async function findGradeScale(number) {
    const query = {
        $exists: ['gradeRange'],
        'gradeRange.min': { $lte: number },
        'gradeRange.max': { $gte: number }
    };

    try {
        const result = await AmericanGradeScaleModel.findOne(query);
        return result;
    } catch (error) {
        console.error('Error finding grade scale:', error);
        throw error;
    }
}*/
