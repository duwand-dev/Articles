import mongoose, { Schema } from "mongoose";

const ArticleSchema = new Schema({
  article: {
    type: String,
  },
});

export const Article = mongoose.model("Article", ArticleSchema);
