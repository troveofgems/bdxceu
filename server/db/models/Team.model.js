import mongoose from "mongoose";
/*import fs from "fs";
import TeamData from "../data/samples/team.members.data.json" assert { type: "json" };*/

const timestamps = {
  timestamps: true,
};

const TeamModel = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleInitial: {
      type: String,
      maxLength: 1,
      required: false,
      default: "",
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      default: "",
    },
    headshot: {
      type: String,
      required: false,
      default: "",
    },
    certificationList: {
      type: [String],
      default: [],
      required: true,
    },
    socials: {
      type: [{ socialName: String, socialLink: String }],
      required: false,
    },
    description: {
      type: String,
      maxLength: 500,
    },
    showOnHomepage: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  timestamps,
);

export default mongoose.model("Team", TeamModel);

/*const seedData = async () => {
  console.log("Seed Team Table With Data: ", TeamData);
  const TeamModelForSeed = mongoose.model("Team", TeamModel);
  try {
    // Create an array of model instances
    const models = TeamData.map((item) => new TeamModelForSeed(item));

    // Bulk insert the models
    const result = await TeamModelForSeed.insertMany(models);

    console.log(`Inserted ${result.length} documents`);
    console.log(result);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

seedData().then(() => console.log("Seed Complete"));*/
