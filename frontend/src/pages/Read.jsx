import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import "../style/read.css"

function Read() {
    const { id } = useParams()

    const [news, setNews] = useState({})

    useEffect(() => {
        try {
            axios
                .get(`http://localhost:5000/news/${id}`)
                .then((response) => {
                    setNews(response.data);
                    console.log(news.author);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    }, [id])  // Ensure useEffect runs when `id` changes

    return (
        <div className="read-container">
            <h1>{news.title}</h1>
            <h3>{news.content}</h3>
            {news.image && (
                <img src={`http://localhost:5000/uploads/${news.image}`} alt={news.title} />
            )}
        </div>
    )
}

export default Read
