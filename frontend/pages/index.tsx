// external imports
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router'
import Link from 'next/link'

// internal imports
import { serverURL } from "../constants/constant";
import { Article } from "../types/types";

export default () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.post(`${serverURL}/getallarticles`).then((res) => {
      const articles = res.data.data;
      setArticles(articles)
    }).catch((err) => {
      console.error(err)
    })
  }, [])

  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh]">
      <Link className="w-11/12" href={{
        pathname: '/Editor',
        query: { mode: 0 } // the data
      }}><button className='w-11/12 m-3 bg-slate-200 rounded-full hover:bg-slate-400'>New Article</button></Link>
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
              <tr key={article._id} className="select-none cursor-pointer hover:bg-slate-200">
                <th className="border border-slate-300 w-4/12">{index + 1}</th>
                <th className="border border-slate-300 w-8/12">
                  <Link href={{
                    pathname: '/Editor',
                    query: { mode: 1, _id: article._id, article: article.article } // the data
                  }}>{article.article.slice(article.article.indexOf("text") + 7,
                    article.article.slice(article.article.indexOf("text") + 8, article.article.length).indexOf('"') + article.article.indexOf("text") + 7)} ...</Link></th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}