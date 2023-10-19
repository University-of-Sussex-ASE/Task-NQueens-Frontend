import React, { useState } from "react";
import Chessboard from "./Chessboard";
import solveNQueens from "../algorithms/nQueensAlgorithm";
import { Button, Typography, Row, Col, Input, Spin, Alert } from "antd";

function NQueensSolver() {
  const [n, setN] = useState(4);
  const [solutions, setSolutions] = useState([]);
  const [currentSolution, setCurrentSolution] = useState(0);
  const queensPositions = solutions[currentSolution];

  const [isLoading, setIsLoading] = useState(false);
  const [isWarning, setIsWarning] = useState(false);

  const { Title } = Typography;
  const [clickedPositions, setClickedPositions] = useState([]);

  const handleSolve = (e) => {
    e.preventDefault();
    if (n <= 12) {
      setSolutions(solveNQueens(n, clickedPositions));
      setCurrentSolution(0);
      setClickedPositions([]);
    }
  };

  const handleResetBoard = (e) => {
    e.preventDefault();
    setClickedPositions([]);
    setSolutions([]);
    setCurrentSolution(0);
    setIsWarning(false);
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    let numberOfQueensEntered = e.target.value;

    if (numberOfQueensEntered <= 12) {
      setN(parseInt(numberOfQueensEntered));
      setSolutions([]);
      setCurrentSolution(0);
    } else {
      setTimeout(() => {
        setIsWarning(true);
      }, 1000);
    }
  };

  const handleSquareClick = (row, col) => {
    if (solutions.length > 0) return;

    const isClicked = clickedPositions.some((position) => position.row === row && position.col === col);

    if (isClicked) {
      const updatedClickedPositions = clickedPositions.filter((position) => position.row !== row || position.col !== col);
      setClickedPositions(updatedClickedPositions);
    } else if (clickedPositions.length < n) {
      const newClickedPosition = { row, col };
      setClickedPositions([...clickedPositions, newClickedPosition]);
    }
  };

  const handleSwitchSolution = (direction) => (e) => {
    e.preventDefault();
    if (direction === "prev") {
      setCurrentSolution(
        (currentSolution - 1 + solutions.length) % solutions.length
      );
    } else {
      setCurrentSolution((currentSolution + 1) % solutions.length);
    }
  };


  return (
    <div>
      {/* Input Form */}
      <form>
        <Title level={2}>Enter the number of queens (n):</Title>
        <Row style={{ paddingBottom: "10px" }}>
          <Col md={2}>
            <Input type="number" value={n} onChange={handleInputChange} />
          </Col>
          <Col md={2} style={{ paddingLeft: "5px" }}>
            <Button type="primary" shape="round" onClick={handleSolve}>
              Solve
            </Button>
          </Col>
          <Col >
            <Button type="primary" danger shape="round" onClick={handleResetBoard}>
              Reset board
            </Button>
          </Col>
          <Col>{isLoading ? <Spin /> : ""}</Col>
        </Row>
      </form>

      <Row style={{ paddingBottom: "10px" }}>
        {" "}
        {/* Display Alert prompting the user that exceeding 12 can be expensive to computer} */}
        {isWarning ? (
          <Alert
            message="Exceeding the value of 12 can take very long to compute. Please grab a cup of tea as we work."
            type="error"
          />
        ) : (
          ""
        )}
      </Row>

      {/* Chessboard */}
      {/* Display the chessboard here */}
      <Row>
        <Col>
          <Chessboard n={n} queensPositions={queensPositions} handleSquareClick={handleSquareClick} clickedPositions={clickedPositions} />
        </Col>

        {/* Solutions */}
        {/* Display number of solutions and buttons to switch between them */}
        <Col>
          <div style={{ paddingLeft: "20px" }}>
            <Title level={5}>Number of solutions: {solutions.length}</Title>
            {solutions.length ?
              <div>
                <Title level={5}>Current solution: {currentSolution + 1}</Title>
                <Button type="primary" onClick={handleSwitchSolution("prev")}>
                  Previous
                </Button>
                <Button
                  type="primary"
                  danger
                  style={{ marginLeft: "4px" }}
                  onClick={handleSwitchSolution("next")}
                >
                  Next
                </Button>
              </div>
              : ""}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default NQueensSolver;
