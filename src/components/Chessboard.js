import React, { useEffect } from "react";
import "./Chessboard.scss";

function Chessboard({ n, queensPositions = [],  handleSquareClick, clickedPositions = [] }) {
  const boardStyle = {
    gridTemplateColumns: `repeat(${n}, 1fr)`,
    gridTemplateRows: `repeat(${n}, 1fr)`,
  };

  useEffect(() => {
    const tiles = document.querySelectorAll(".tile");

    tiles.forEach((tile) => {
      tile.classList.remove("clicked-tile");
    });

    clickedPositions.forEach(({ row, col }) => {
      const index = row * n + col;
      tiles[index].classList.add("clicked-tile");
    });
  }, [clickedPositions, n]);

  let board = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const number = j + i;

      const isQueen = queensPositions.includes(j) && i === queensPositions.indexOf(j);

      board.push(
        <div
          key={`${i}-${j}`}
          className={`tile ${number % 2 === 0 ? "black-tile" : "white-tile"} ${isQueen ? "queen-tile" : ""}`}
          onClick={() => handleSquareClick(i, j)}
        ></div>
      );
    }
  }

  return n ? (
    <div id="chessboard" style={boardStyle}>
      {board}
    </div>
  ) : null;
}

export default Chessboard;
