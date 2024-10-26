import { Router } from "express";
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
    res.send({ result: Success });
  } catch (err) {
    console.log(err);
    res.send({ result: Failed });
  }
});

router.post("/deletearticle", async (req, res) => {
  try {
    const { _id } = req.body;
    const result = await DeleteArticle(_id);
    res.send({ result: Success });
  } catch (err) {
    console.log(err);
    res.send({ result: Failed });
  }
});

router.post("/getallarticles", async (req, res) => {
  try {
    const result = await GetAllArticles();
    res.send({ result: Success, data: result });
  } catch (err) {
    console.log(err);
    res.send({ result: Failed });
  }
});

router.post("/updatearticle", async (req, res) => {
  try {
    const { _id, article } = req.body;
    await UpdateArticle(_id, article);
    res.send({ result: Success });
  } catch (err) {
    console.log(err);
    res.send({ result: Failed });
  }
});

export const ArticleRouter = router;
