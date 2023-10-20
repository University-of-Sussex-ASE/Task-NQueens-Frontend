import React, { useState } from "react";
import Chessboard from "./Chessboard";
import solveNQueens from "../algorithms/nQueensAlgorithm";
import { Button, Typography, Row, Col, Input } from "antd";

function NQueensSolver() {
  const [n, setN] = useState(4);
  const [solutions, setSolutions] = useState([]);
  const [currentSolution, setCurrentSolution] = useState(0);
  const queensPositions = solutions[currentSolution];

  const { Title } = Typography;

  const handleInputChange = (e) => {
    setN(parseInt(e.target.value));
    setSolutions([]);
    setCurrentSolution(0);
  };

  const handleSolve = (e) => {
    e.preventDefault();
    setSolutions(solveNQueens(n));
    setCurrentSolution(0);
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
        <Row style={{paddingBottom:"10px"}}>
          <Col md={2}>
            <Input type="number" value={n} onChange={handleInputChange} />
          </Col>
          <Col md={4} style={{paddingLeft:"5px"}}>
            <Button type="primary" shape="round" onClick={handleSolve}>
              Solve
            </Button>
          </Col>
        </Row>
      </form>

      {/* Chessboard */}
      {/* Display the chessboard here */}
      <Row>
        <Col>
          <Chessboard n={n} queensPositions={queensPositions} />
        </Col>

        {/* Solutions */}
        {/* Display number of solutions and buttons to switch between them */}
        <Col>
          <div style={{ paddingLeft: "20px" }}>
            <Title level={5}>Number of solutions: {solutions.length}</Title>
            <Title level={5}>Current solution: {currentSolution + 1}</Title>
            <Title level={5}>
              Current solution in text: {solutions[currentSolution]}
            </Title>
            <Button type="primary" onClick={handleSwitchSolution("prev")}>Previous</Button>
            <Button type="primary" danger style={{marginLeft:"4px"}} onClick={handleSwitchSolution("next")}>Next</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default NQueensSolver;
