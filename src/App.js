import "./App.css";
import { useEffect, useState } from "react";
const axios = require("axios");

function App() {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000")
      .then(function (response) {
        setResults(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:3000/images", {
        imageUrl: input,
      })
      .then(function (response) {
        console.log(results, response.data);
        setResults([...results, response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={input} onChange={handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <ul>
          {results?.map((result, index) => {
            return (
              <div key={index}>
                <div>{index + 1}</div>
                {result?.map((description) => {
                  return <li key={description}>{description}</li>;
                })}
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
