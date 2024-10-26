//external imports
import { Router } from "express";

//internal imports
import {
  AddArticle,
  DeleteArticle,
  GetAllArticles,
  UpdateArticle,
} from "../actions/ArticleAction";
import { Failed, Success } from "../costants/constant";

const router = Router();

router.post("/addarticle", async (req, res) => {
  try {
    const { article } = req.body;
    const result = await AddArticle(article);
    res.status(200).send({ isSuccess: true });
  } catch (err) {
    console.error(err);
    res.status(400).send({ isSuccess: false });
  }
});

router.post("/deletearticle", async (req, res) => {
  try {
    const { _id } = req.body;
    const result = await DeleteArticle(_id);
    res.status(200).send({ isSuccess: true });
  } catch (err) {
    console.error(err);
    res.status(400).send({ isSuccess: false });
  }
});

router.post("/getallarticles", async (req, res) => {
  try {
    const result = await GetAllArticles();
    res.status(200).send({ isSuccess: true, data: result });
  } catch (err) {
    console.error(err);
    res.status(400).send({ isSuccess: false });
  }
});

router.post("/updatearticle", async (req, res) => {
  try {
    const { _id, article } = req.body;
    await UpdateArticle(_id, article);
    res.status(200).send({ isSuccess: true });
  } catch (err) {
    console.error(err);
    res.status(400).send({ isSuccess: false });
  }
});

export const ArticleRouter = router;
