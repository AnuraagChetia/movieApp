import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  const deleteHandler = async () => {
    await fetch(
      `https://movieapp-d6140-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${props.id}.json`,
      {
        method: "DELETE",
      }
    );
    props.fetch();
  };
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={deleteHandler} style={{ color: "red" }}>
        Delete
      </button>
    </li>
  );
};

export default Movie;
