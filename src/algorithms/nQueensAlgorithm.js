const solveNQueens = (n) => {
    let solutions = [];

    if (n === 1) {
        return [0];
    }

    if (n === 2 || n === 3) {
        return solutions;
    }

    const queensPositions = Array(n).fill(-1); // Initialize with -1 for empty rows

    const occupiedColumns = new Set();
    const occupiedPositiveDiagonals = new Set();
    const occupiedNegativeDiagonals = new Set();

    function placeQueen(row) {
        if (row === n) {
            solutions.push([...queensPositions]);
            return;
        }

        for (let col = 0; col < n; col++) {
            if (
                !occupiedColumns.has(col) &&
                !occupiedPositiveDiagonals.has(row + col) &&
                !occupiedNegativeDiagonals.has(row - col)
            ) {
                queensPositions[row] = col;
                occupiedColumns.add(col);
                occupiedPositiveDiagonals.add(row + col);
                occupiedNegativeDiagonals.add(row - col);

                placeQueen(row + 1);

                queensPositions[row] = -1; // Reset for backtracking
                occupiedColumns.delete(col);
                occupiedPositiveDiagonals.delete(row + col);
                occupiedNegativeDiagonals.delete(row - col);
            }
        }
    }

    placeQueen(0);

    return solutions;
};

export default solveNQueens;