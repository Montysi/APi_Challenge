import { useState, useEffect } from 'react'
import './App.css'

const App = () => {
  const [filmData, setFilmData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("https://ghibliapi.vercel.app/films"); 

      if (!response.ok) {

        throw new Error(" Oops! Something Went Wrong...");
      }

      const data = await response.json();

      console.log(response);
      setFilmData(data);
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1> Ghibli Film Database</h1>

      {errorMsg !== "" ? (
        <p>{errorMsg}</p>
      ) : (
        <div className="movieContainer">
          {filmData.map((film, index) => {
            return (
              <div key={index} className="movieWrapper">
                <div className="movie">
                  <h2>{film.title}</h2>
                  <img src={film.image} alt={film.title} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default App;
