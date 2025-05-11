import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import "../style/home.css";

function Home() {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [news, setNews] = useState([]);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/comment")
        .then((response) => {
          setComments(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
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
    }
    catch (error) {
      console.error("Error fetching news:", error);
    }
  }, []);

  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    try {
        e.preventDefault();
        axios.post("http://localhost:5000/comment", {
        content: content,
        author: user.user._id,
        });
        window.location.reload();
    } catch (error) {
        console.error("Error creating comment:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/comment/${id}`);
        setComments(comments.filter((comment) => comment._id !== id));
    } catch (error) {
        console.error("Error deleting comment:", error);
    }
  }

  return (
    <div>
      {user && <h1 className="welcome">Welcome {user.user.username}</h1>}

      <form onSubmit={handleSubmit} className="comments">
        <input
          type="text"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            console.log(user.user._id);
          }}
        />
        <button type="submit">Submit</button>
      </form>

      <div className="comments">
        {[...comments].reverse().map((comment) => (
          <div key={comment._id} className="comment">
            <h2>{comment.author.username}</h2>
            <p>{comment.content}</p>
            {user && user.user.username === "admin" && (
              <button onClick={() => handleDelete(comment._id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
      <div className="news">
        {[...news].reverse().map((news) => (
          <div key={news._id} className="news-item" onClick={() => window.location.href = `/news/${news._id}`}>
            <h2>{news.title}</h2>
            <p>{news.content.split(" ").slice(0, 30).join(" ")}{news.content.split(" ").length > 30 ? "..." : ""}</p>
            {news.image && <img src={`http://localhost:5000/uploads/${news.image}`} alt={news.title} />}
            {user && user.user.username === "admin" && (
              <button onClick={() => handleDelete(news._id)}>Delete</button>
            )}
          </div>
        ))}
    </div>
    </div>
  );
}

export default Home;
