//external imports
import { ObjectId } from "mongoose";

//internal imports
import { Article } from "../models/Article";

export const AddArticle = async (article: string) => {
  try {
    const newArticle = new Article({ article });
    await newArticle.save();
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
};

export const DeleteArticle = async (_id: ObjectId) => {
  try {
    await Article.deleteOne({ _id });
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
};

export const GetAllArticles = async () => {
  try {
    const results = await Article.find({});
    return Promise.resolve(results);
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
};

export const UpdateArticle = async (_id: ObjectId, article: string) => {
  try {
    const existArticle = await Article.find({ _id });
    if (existArticle) {
      await Article.updateOne({ _id }, { article });
    }
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
};
