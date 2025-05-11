import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import "../style/command.css";

function Commands() {
  const { user } = useAuthContext();

  const [commands, setCommands] = useState([]);
    const [from, setFrom] = useState(user.user.username);
    const [to, setTo] = useState("developper1@gmail.com");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [database, setDatabase] = useState("mysql");

  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/command")
        .then((response) => {
          setCommands(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (error) {
      console.error("Error fetching commands:", error);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/command", 
        {
            from: from,
            to: to,
            title: title,
            description: description,
            language: language,
            database: database
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error creating commands:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/command/${id}`);
      setCommands(commands.filter((commands) => commands._id !== id));
    } catch (error) {
      console.error("Error deleting commands:", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select onChange={(e) => {
            setTo(e.target.value);
        }} name="developpers" id="">
            <option value="developper1@gmail.com">Developper 1</option>
            <option value="developper2@gmail.com">Developper 2</option>
            <option value="developper3@gmail.com">Developper 3</option>
            <option value="developper4@gmail.com">Developper 4</option>
            <option value="developper5@gmail.com">Developper 5</option>
        </select>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Title"
        />
        <textarea
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Description"
        />
        <select onChange={(e) => {setLanguage(e.target.value)}} name="language" id="">
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="csharp">C#</option>
            <option value="php">PHP</option>
        </select>
        <select 
          onChange={(e) => {
            setDatabase(e.target.value);
          }}
        name="" id="">
            <option value="mysql">MySQL</option>
            <option value="mongodb">MongoDB</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="sqlite">SQLite</option>
            <option value="oracle">Oracle</option>
        </select>

        

        <button type="submit">Create Command</button>
      </form>

      <div className="commands">
        {commands.map((command) => (
          user && user.user.username === command.from && (
            <div key={command._id} className="commands-item">
              <h3>{command.from}</h3>
              <h3>{command.to}</h3>
              <h2>{command.title}</h2>
              <p>{command.language}</p>
              <p>{command.database}</p>
              <p>{command.description}</p>
              <button onClick={() => handleDelete(command._id)}>Delete</button>
            </div>
          )
        ))}
        {commands.map((command) => (
          user && user.user.username === command.to && (
            <div key={command._id} className="commands-item">
              <h3>{command.from}</h3>
              <h3>{command.to}</h3>
              <h2>{command.title}</h2>
              <p>{command.language}</p>
              <p>{command.database}</p>
              <p>{command.description}</p>
              <button onClick={() => handleDelete(command._id)}>Delete</button>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default Commands;
