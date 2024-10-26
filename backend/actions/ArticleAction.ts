import { Failed, Success } from "../costants/constant";
import { Article } from "../models/Article";

export const AddArticle = async (article: string) => {
  try {
    const newArticle = new Article({ article: article });
    await newArticle.save();
    Promise.resolve();
  } catch (err) {
    console.log(err);
    Promise.reject();
  }
};

export const DeleteArticle = async (_id: string) => {
  try {
    await Article.deleteOne({ _id: _id });
    Promise.resolve();
  } catch (err) {
    console.log(err);
    Promise.reject();
  }
};
