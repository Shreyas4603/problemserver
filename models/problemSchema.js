import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ProblemSchema = new mongoose.Schema(
  {
    problemId: { type: String, default: uuidv4, unique: true, required: true },
    problemStatement: { type: String, required: true,unique:true },
    toughnessLevel: {
      type: String,
      enum: ["novice", "coder", "hacker", "guru"],
      required: true,
    },

    // Solution template fields

    templateCodePy: { type: String, default: "" },
    templateCodeJava: { type: String, default: "" },
    templateCodeCpp: { type: String, default: "" },

    // Driver fields

    driverCodePy: { type: String, default: "" },
    driverCodeJava: { type: String, default: "" },
    driverCodeCpp: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Problem = mongoose.model("Problem", ProblemSchema);

export default Problem;
