import React, { useEffect, useState } from "react";
import Chessboard from "./Chessboard";
import solveNQueens from "../algorithms/nQueensAlgorithm";
import { Button, Typography, Row, Col, Input, Spin, Alert, Card } from "antd";

function NQueensSolver() {
  const [n, setN] = useState(4);
  const [solutions, setSolutions] = useState([]);
  const [currentSolution, setCurrentSolution] = useState(0);
  const queensPositions = solutions[currentSolution];

  const [isLoading, setIsLoading] = useState(false);
  const [isWarning, setIsWarning] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const { Title } = Typography;
  const [clickedPositions, setClickedPositions] = useState([]);

  const handleSolve = (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("test", n);

    if (n >= 1 && n <= 12) {
      const response = solveNQueens(n, clickedPositions);

      if (response.length > 0) {
        setSolutions(response);
        setCurrentSolution(0);
        setClickedPositions([]);
      } else {
        setIsWarning(true);
        setClickedPositions([]);

        setErrorMessage("No solutions found.");

        setTimeout(() => {
          setIsWarning(false);
        }, 2000);
      }

      setIsLoading(false);
    } else {
      setIsWarning(true);
      setErrorMessage(
        "Exceeding the value of 12 can take very long to compute."
      );
      setTimeout(() => {
        setIsWarning(false);
      }, 3000);

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

    if (numberOfQueensEntered >= 1) {
      setN(parseInt(numberOfQueensEntered));
      setSolutions([]);
      setCurrentSolution(0);
      setIsWarning(false);
    }
  };

  const handleSquareClick = (row, col) => {
    if (solutions.length > 0) return;

    const isClicked = clickedPositions.some(
      (position) => position.row === row && position.col === col
    );

    if (isClicked) {
      const updatedClickedPositions = clickedPositions.filter(
        (position) => position.row !== row || position.col !== col
      );
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

      {/* Chessboard */}
      {/* Display the chessboard here */}
      <Row>
        <Col>
          <Chessboard
            n={n}
            queensPositions={queensPositions}
            handleSquareClick={handleSquareClick}
            clickedPositions={clickedPositions}
          />
        </Col>

        {/* Solutions */}
        {/* Display number of solutions and buttons to switch between them */}

        <Col style={{ paddingLeft: "20px" }}>
          <Row style={{ paddingBottom: "10px" }}>
            {" "}
            {/* Display Alert prompting the user that exceeding 12 can be expensive to computer} */}
            {isWarning ? <Alert message={errorMessage} type="error" /> : ""}
          </Row>

          <Card style={{ backgroundColor: "" }}>
            <Row>
              <form>
                <Title level={2}>Enter the number of queens (n):</Title>
                <Row style={{ paddingBottom: "10px" }}>
                  <Col md={4}>
                    <Input
                      type="number"
                      min={1}
                      value={n}
                      onChange={handleInputChange}
                    />
                  </Col>

                  <Col md={4} style={{ paddingLeft: "5px" }}>
                    <Button type="primary" shape="round" onClick={handleSolve}>
                      Solve
                    </Button>
                  </Col>

                  <Col md={4} style={{ paddingLeft: "5px" }}>
                    <Button
                      type="primary"
                      danger
                      shape="round"
                      onClick={handleResetBoard}
                    >
                      Reset
                    </Button>
                  </Col>
                </Row>
              </form>
            </Row>

            <Row></Row>
            <Col md={12}>{isLoading ? <Spin message="loading queens..." /> : ""}</Col>

            <Row>
              <div style={{ paddingLeft: "20px" }}>
                <Title level={5}>Number of solutions: {solutions.length}</Title>
                {solutions.length ? (
                  <div>
                    <Title level={5}>
                      Current solution: {currentSolution + 1}
                    </Title>
                    <Button
                      type="primary"
                      onClick={handleSwitchSolution("prev")}
                    >
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
                ) : (
                  ""
                )}
              </div>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default NQueensSolver;
