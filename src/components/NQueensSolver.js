import React, { useState } from 'react';
import Chessboard from './Chessboard';
import solveNQueens from '../algorithms/nQueensAlgorithm';

function NQueensSolver() {
    const [n, setN] = useState(4);
    const [solutions, setSolutions] = useState([]);
    const [currentSolution, setCurrentSolution] = useState(0);
    const queensPositions = solutions[currentSolution];

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
        if (direction === 'prev') {
            setCurrentSolution((currentSolution - 1 + solutions.length) % solutions.length);
        } else {
            setCurrentSolution((currentSolution + 1) % solutions.length);
        }
    }

    return (
        <div>
            {/* Input Form */}
            <form>
                <label>Enter the number of queens (n):</label>
                <input type="number" value={n} onChange={handleInputChange} />
                <button type="submit" onClick={handleSolve} >Solve</button>
            </form>

            {/* Chessboard */}
            {/* Display the chessboard here */}
            <Chessboard n={n} queensPositions={queensPositions} />

            {/* Solutions */}
            {/* Display number of solutions and buttons to switch between them */}
            <p>Number of solutions: { solutions.length }</p>
            <p>Current solution: { currentSolution + 1 }</p>
            <p>Current solution in text: { solutions[currentSolution]}</p>
            <button onClick={handleSwitchSolution('prev')}>Previous</button>
            <button onClick={handleSwitchSolution('next')}>Next</button>
        </div>
    );
}

export default NQueensSolver;