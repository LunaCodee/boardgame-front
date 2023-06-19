import React, { useState } from "react";
import axios from "axios";
import EventCard from "../components/eventCard/EventCard";
import styles from "./styles.module.css";
import Navbar from "../components/Navbar/Navbar";
import Spinner from "../components/Spinner/Spinner";

const MainPage = ({events}) => {
  const [boardgames, setBoardgames] = useState(events);


  return (
    <>
    <Navbar />
    <div>
      <div className={styles.cardsWrapper}>
        {boardgames.map((boardgame) => (
          <div key={boardgame._id}>
          <EventCard
            id={boardgame._id}
            title={boardgame.title}
            imageUrl={boardgame.boardgameImage}
            date={boardgame.date}
          />
          </div>
        ))}

{!boardgames.length && <Spinner />}
      </div>
    </div>
    </>
  );
};

export default MainPage;

export async function getServerSideProps() {

  try{
    const response = await axios.get("http://localhost:8081/events");
    const { data } = response;

  return {props: {events: data.event}}
   } catch(err){
    console.log("err", err)
  };
}

