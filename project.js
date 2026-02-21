const mongoose = require("mongoose");

const FeatureSchema = new mongoose.Schema({
  key: String,
  label: String,
  complexity: String, // 'low' | 'medium' | 'high'
});

const NodeSchema = new mongoose.Schema({
  id: String,
  label: String,
  type: String,        // 'page' | 'feature'
});

const EdgeSchema = new mongoose.Schema({
  from: String,
  to: String,
  label: String,
});

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    projectType: {
      type: String,
      enum: ["simple_site", "ecommerce", "enterprise"],
      required: true,
    },
    numPages: { type: Number, required: true },
    features: [FeatureSchema],
    estimatedCost: { type: Number, required: true },
    currency: { type: String, default: "GBP" },
    diagram: {
      nodes: [NodeSchema],
      edges: [EdgeSchema],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
