import { useState, useEffect } from 'react';
import './App.css';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "50%",
    bottom: "50%",
    background: "transparent",
  },
};


const App = () => {
  const [filmData, setFilmData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  let subtitle;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

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
      <div className="header">
        <img 
          src="https://i.imgur.com/tpDykBH.png"
          alt="Studio Ghibli Logo"
          className="ghibliHeader"
        />
      </div>
      <h2>Studio Ghibli Database</h2>
      {errorMsg !== "" ? (
        <p>{errorMsg}</p>
      ) : (
        <div className="movieContainer">
          {filmData.map((film, index) => {
            return (
              <div key={index} className="movieWrapper">
                <div className="movie">
                  <h2>{film.title}</h2>
                  <img src={film.image} alt={film.title} onClick={openModal} />
                  <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Film Information Modal"
                  ></Modal>
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
