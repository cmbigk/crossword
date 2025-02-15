function parsePuzzle(puzzleStr) {
    const rows = puzzleStr.split("\n"); // Split by newlines to get rows
    const grid = rows.map(row => row.split("")); // Convert to a 2D array

    let startPositions = []; // Stores { row, col, count } for numbers

    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (!isNaN(grid[r][c]) && grid[r][c] !== "." && grid[r][c] !== "0") {
                startPositions.push({
                    row: r,
                    col: c,
                    count: parseInt(grid[r][c])
                });
            }
        }
    }
    
    return { grid, startPositions };
}
/*

// Example usage:
const emptyPuzzle = `2001
0..0
1000
0..0`;

console.log(parsePuzzle(emptyPuzzle));

*/

//this is still not right.
function findValidDirections(grid, row, col) {
    const height = grid.length;
    const width = grid[0].length;
    let validDirections = [];
    
    // First check if the current position is a valid start position
    // It should be a number greater than 0
    if (isNaN(grid[row][col]) || grid[row][col] === "." || grid[row][col] === "0") {
        return []; // Not a valid start position
    }
    
    // Check horizontally (right)
    if (col + 1 < width) {
        // Next cell should be "0" (valid for word placement but not a start position)
        if (grid[row][col + 1] === "0") {
            validDirections.push("horizontal");
        }
    }
    
    // Check vertically (down)
    if (row + 1 < height) {
        // Next cell should be "0" (valid for word placement but not a start position)
        if (grid[row + 1][col] === "0") {
            validDirections.push("vertical");
        }
    }
    
    return validDirections;
}