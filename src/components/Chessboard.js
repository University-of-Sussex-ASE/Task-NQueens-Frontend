import React from "react";
import "./Chessboard.css";
import queenImage from "../images/queen.png";

function Chessboard({ n, queensPositions = [] }) {
  const boardStyle = {
    gridTemplateColumns: `repeat(${n}, 1fr)`,
    gridTemplateRows: `repeat(${n}, 1fr)`,
    width: `800px`,
    height: `800px`,
  };

  const tileStyle = {
    width: `100%`,
    height: `100%`,
  };

  let board = [];

  for (let i = 0; i < n*n; i++) {
    for (let j = 0; j < n; j++) {
      const number = j + i;

      number % 2 === 0
        ? board.push(<div className="tile black-tile" style={tileStyle}></div>)
        : board.push(<div className="tile white-tile" style={tileStyle}></div>);
    }
  }

  for (let i = 0; i < queensPositions.length; i++) {
      const row = i;
      const col = queensPositions[i];
      const queenPosition = row * n + col;

      board[queenPosition] = (
        <div
          className="tile"
          style={{
            ...tileStyle,
            backgroundImage: `url(${queenImage})`,
            backgroundSize: "cover",
          }}
        ></div>
      );
  }

  return n ? (
    <div id="chessboard" style={boardStyle}>
      {board}
    </div>
  ) : null;
}

export default Chessboard;
