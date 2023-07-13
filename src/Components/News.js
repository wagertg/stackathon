import React, { useState, useEffect } from "react";
import axios from "axios";

// The News functional component fetches and displays news articles.

const News = () => {
  // The useState hook initializes articles state variable to an empty array.

  const [articles, setArticles] = useState([]);

  // The useEffect hook fetches news articles once the component mounts.

  useEffect(() => {
    const fetchNews = async () => {
      // Sends a GET request to an external API to fetch news articles.
      const response = await axios.request(
        "https://spaceflight-news2.p.rapidapi.com/v3/articles",
        {
          params: {
            _limit: "10",
          },

          headers: {
            accept: "application/json",
            "X-RapidAPI-Key":
              "f283d05d2emsheb129680ec7d5a1p100439jsnf75147ab6b19",
            "X-RapidAPI-Host": "spaceflight-news2.p.rapidapi.com",
          },
        }
      );
      // Updates the state variable 'articles' with the fetched news articles.
      setArticles(response.data);
    };
    fetchNews();
  }, []);

  return (
    <div>
      <h2 className="heading">STAY UP TO DATE</h2>

      {articles.map((article, index) => (
        // The 'map' function renders a div for each article with its details.
        <div key={article.id} className="home-text">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <span id="heading">{Date(article.publishedAt)}</span>
              <h1 className="newshead">{article.title}</h1>
              <img
                src={article.imageUrl}
                alt={article.title}
                style={{
                  marginTop: "2%",
                  borderRadius: "10px",
                  opacity: "1.7",
                  borderRadius: "10px",
                  boxShadow: "0 0px 15px #d0d6f9",
                }}
                height={400}
                width={350}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "2%",
              }}
            >
              <p>{article.summary}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;
