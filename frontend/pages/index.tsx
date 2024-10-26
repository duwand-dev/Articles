import React, { useEffect, useState } from "react";
import axios from 'axios';
import { serverURL } from "../constants/constant";
import { Article } from "../types/types";

export default () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.post(`${serverURL}/getallarticles`).then((res) => {
      const articles = res.data.data;
      setArticles(articles)
      console.log(articles);
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const handleClickArticle = (_id: string) => {
    console.log(_id)
  }

  return (
    <div className="flex justify-center items-center w-full h-[100vh]">
      <table className="border-collapse border border-slate-400 w-full">
        <thead>
          <tr>
            <th className="border border-slate-300 w-4/12">No</th>
            <th className="border border-slate-300 w-8/12">Article</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article: Article, index: number) => {
            return (
              <tr key={article._id} onClick={() => handleClickArticle(article._id)} className="select-none cursor-pointer hover:bg-slate-200">
                <th className="border border-slate-300 w-4/12">{index + 1}</th>
                <th className="border border-slate-300 w-8/12">{article.article}</th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}