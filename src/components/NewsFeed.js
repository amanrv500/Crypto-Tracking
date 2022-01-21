import { useState } from "react";
import { useEffect } from "react";

import axios from "axios";

const NewsFeed = () => {
    const [article, setArticle] = useState(null)
    useEffect(() => {

      const options = {
        method: 'GET',
        url: 'https://crytocurrency-live.p.rapidapi.com/news',
        headers: {
          'x-rapidapi-host': 'crytocurrency-live.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
      }
      
      axios.request(options).then((response) => {
        console.log(response.data)
        setArticle(response.data)

      }).catch((error) => {
        console.error(error)
      })

    },[])

    console.log(article)

    const first7 = article?.slice(0,9)

    return (
      <div className="news-feed">
          <h2>News Feed </h2>
          {first7?.map( (article, _index) => (<div key={_index}>
            <a href={article.url}><p>{article.title}</p></a>
            </div>))}
      </div>
    );
  }
  
  export default NewsFeed;
  