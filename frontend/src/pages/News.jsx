import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

function News() {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/news")
        .then((response) => {
          setNews(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", description);
    formData.append("image", image);
    formData.append("author", user.user._id);

    try {
      await axios.post("http://localhost:5000/news", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error creating news:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/news/${id}`);
      setNews(news.filter((news) => news._id !== id));
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            console.log(user.user._id);
          }}
          placeholder="Title"
        />
        <textarea
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            console.log(user.user._id);
          }}
          placeholder="Description"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Create News</button>
      </form>

      <div className="news">
        {news.map((news) => (
          <div key={news._id} className="news-item">
            <h2>{news.title}</h2>
            <p>{news.description}</p>
            {news.image && (
              <img src={`http://localhost:5000/uploads/${news.image}`} alt="News" />
            )}
            <button onClick={() => handleDelete(news._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
