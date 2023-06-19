import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import Navbar from "../../components/Navbar/Navbar";

const Event = ({ boardgame }) => {
  const router = useRouter();
  return (
    <>
    <Navbar />
    <div className={styles.pageWrapper}>
      {boardgame && (
        <div className={styles.wrapper}>
          <h1>{boardgame.title}</h1>
          <img className={styles.image} src={boardgame.boardgameImage} />

          <div className={styles.contentWrapper}>
            <div className={styles.eventInfo}>
              <h3>{boardgame.date}</h3>
              <h3>{boardgame.time}</h3>
              <h3>{boardgame.address}</h3>
              <h3>{boardgame.boardgameName}</h3>
            </div>
            <div className={styles.playersInfo}>
              <h3>
                <>
                  required players {boardgame.requiredPlayers} /{" "}
                  {boardgame.joinedPlayers.length}{" "}
                </>
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const eventId = context.query.id;
  const response = await axios.post(
    `http://localhost:8081/event/${eventId}`,
    { userId: "1234567" }
  );
  const { data } = response;
  const boardgame = data.event;

  return {
    props: {boardgame},
  };
}

export default Event;