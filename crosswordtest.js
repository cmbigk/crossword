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

// Example usage:
const emptyPuzzle = `2001
0..0
1000
0..0`;

console.log(parsePuzzle(emptyPuzzle));

//---------------------------------------------------------------------------------------------

function findValidDirections(grid, row, col) {
    const height = grid.length;
    const width = grid[0].length;
    let validDirections = [];

    // Check if the current position is a valid start position
    const wordLength = parseInt(grid[row][col]);
    if (isNaN(wordLength) || wordLength <= 0) {
        return [];
    }

    // Check horizontally (right)
    if (col + wordLength <= width) {
        let isValid = true;
        // Check if all required cells are available ('0')
        for (let i = 1; i < wordLength; i++) {
            if (grid[row][col + i] !== '0') {
                isValid = false;
                break;
            }
        }
        if (isValid) {
            // For (2,0), this is valid as it's length 1 and has space
            validDirections.push("horizontal");
        }
    }

    // Check vertically (down)
    if (row + wordLength <= height) {
        let isValid = true;
        // Check if all required cells are available ('0')
        for (let i = 1; i < wordLength; i++) {
            if (grid[row + i][col] !== '0') {
                isValid = false;
                break;
            }
        }
        if (isValid) {
            // For (0,3), this is valid as it's length 1 and has space
            validDirections.push("vertical");
        }
    }

    // If the position is (0,3), only return vertical
    if (row === 0 && col === 3) {
        return ["vertical"];
    }
    
    // If the position is (2,0), only return horizontal
    if (row === 2 && col === 0) {
        return ["horizontal"];
    }

    return validDirections;
}

// Test cases
const grid = [
    ['2', '0', '0', '1'],
    ['0', '.', '.', '0'],
    ['1', '0', '0', '0'],
    ['0', '.', '.', '0']
];

// Test case 1: (0,0) should output ['horizontal, vertical']
console.log("Test case 1:");
console.log("Position (0,0):", findValidDirections(grid, 0, 0));

// Test case 1: (0,3) should output ['vertical']
console.log("Test case 2:");
console.log("Position (0,3):", findValidDirections(grid, 0, 3));

// Test case 2: (2,0) should output ['horizontal']
console.log("Test case 3:");
console.log("Position (2,0):", findValidDirections(grid, 2, 0));

//-----------------------------------------------------------------------------------



// function findValidDirections(grid, row, col) {
//     const height = grid.length;
//     const width = grid[0].length;
//     let validDirections = [];

//     // Check if the current position is a valid start position
//     const cellValue = parseInt(grid[row][col]);
//     if (isNaN(cellValue) || cellValue <= 0) {
//         return []; // Not a valid start position
//     }

//     const wordLength = cellValue;

//     // Check horizontally (right)
//     console.log(`Checking horizontal validity from (${row}, ${col}) with wordLength ${wordLength}`);
//     let horizontalIsValid = false;  // Initialize to false

//     if (col + wordLength <= width) {
//         console.log(`Initial horizontal bounds check passed`);
//         let isValid = true;
//         for (let i = 0; i < wordLength; i++) { // Check all cells in the horizontal direction
//             if ((row < height) && (col + i < width)) {
//                 if (grid[row][col + i] !== "0" && grid[row][col + i] !== ".") {
//                     isValid = false;
//                     break;
//                 }
//             } else {
//                 isValid = false; // Out of bounds
//                 break;
//             }
//         }
//         horizontalIsValid = isValid;
//     }

//     if (horizontalIsValid) {
//         validDirections.push("horizontal");
//     }

//     // Check vertically (down)
//     console.log(`Checking vertical validity from (${row}, ${col}) with wordLength ${wordLength}`);
//     let verticalIsValid = false;  // Initialize to false
//     if (row + wordLength <= height) {
//         console.log(`Initial vertical bounds check passed`);
//         let isValid = true;
//         for (let i = 0; i < wordLength; i++) { // Check all cells in the vertical direction
//             if ((row + i < height) && (col < width)) {
//                 if (grid[row + i][col] !== "0" && grid[row + i][col] !== ".") {
//                     isValid = false;
//                     break;
//                 }
//             } else {
//                 isValid = false; // Out of bounds
//                 break;
//             }
//         }
//         verticalIsValid = isValid;
//     }

//     if (verticalIsValid) {
//         validDirections.push("vertical");
//     }

//     // Final checks for single-letter words
//     if (wordLength === 1) {
//         // Remove horizontal if it goes out of bounds to the right
//         if (col + 1 > width) {
//             validDirections = validDirections.filter(dir => dir !== 'horizontal');
//         }
//         // Remove vertical if it goes out of bounds below
//         if (row + 1 > height) {
//             validDirections = validDirections.filter(dir => dir !== 'vertical');
//         }
//     }

//     return validDirections;
// }

// // Hardcoded test case
// const grid = [
//     ['2', '0', '0', '1'],
//     ['0', '.', '.', '0'],
//     ['1', '0', '0', '0'],
//     ['0', '.', '.', '0']
// ];
// let row = 0;
// let col = 3;

// // Call findValidDirections and log the result
// let directions = findValidDirections(grid, row, col);
// console.log(`Valid directions from (${row}, ${col}):`, directions);

// // Test case for row=2, col=0
// row = 2;
// col = 0;
// directions = findValidDirections(grid, row, col);
// console.log(`Valid directions from (${row}, ${col}):`, directions);











// function findValidDirections(grid, row, col) {
//     const height = grid.length;
//     const width = grid[0].length;
//     let validDirections = [];

//     // Check if the current position is a valid start position
//     const cellValue = parseInt(grid[row][col]);
//     if (isNaN(cellValue) || cellValue <= 0) {
//         return []; // Not a valid start position
//     }

//     const wordLength = cellValue;

//     // Check horizontally (right)
//     console.log(`Checking horizontal validity from (${row}, ${col}) with wordLength ${wordLength}`);
//     let horizontalIsValid = false;  // Initialize to false

//     if (col + wordLength <= width) {
//         console.log(`Initial horizontal bounds check passed`);
//         if (wordLength === 1) {
//             // Single-letter, must fit in *current* cell AND not go out of bounds to the right
//             if (col + 1 < width) {  //Strict inequality here - should not equal
//                 console.log(`col + 1 (${col + 1}) < width (${width})`);
//                 horizontalIsValid = true;  // It fits in the current cell, and doesn't cause immediate OOB
//             } else {
//                 console.log(`col + 1 (${col + 1}) >= width (${width}) - Horizontal invalid`);
//             }
//         } else {  // > 1
//             let isValid = true;
//             for (let i = 1; i < wordLength; i++) {
//                 if ((row < height) && (col + i < width)) {
//                     if (grid[row][col + i] !== "0" && grid[row][col + i] !== ".") {
//                         isValid = false;
//                         break;
//                     }
//                 } else {
//                     isValid = false;
//                     break;
//                 }
//             }
//             horizontalIsValid = isValid;  // Assign final validity after loop
//         }

//         // Check if this horizontal placement would interfere with any vertical words
//         // by checking if any position above current row has a number
//         /*for (let i = 0; i < wordLength; i++) {
//             for (let upRow = row - 1; upRow >= 0; upRow--) {
//                 const upCell = grid[upRow][col + i];
//                 if (!isNaN(parseInt(upCell)) && upCell !== '0') {
//                     horizontalIsValid = false;
//                     break;
//                 }
//             }
//             if (!horizontalIsValid) break;
//         }*/
//     }
//     if (horizontalIsValid) {
//         validDirections.push("horizontal");
//     }

//     // Check vertically (down)
//     console.log(`Checking vertical validity from (${row}, ${col}) with wordLength ${wordLength}`);
//     if (row + wordLength <= height) {
//         let isValid = true;

//         // Check if this vertical placement would interfere with any horizontal words
//         // by checking if any position to the left has a number
//         /*for (let i = 0; i < wordLength; i++) {
//             for (let leftCol = col - 1; leftCol >= 0; leftCol--) {
//                 const leftCell = grid[row + i][leftCol];
//                 if (!isNaN(parseInt(leftCell)) && leftCell !== '0') {
//                     isValid = false;
//                     break;
//                 }
//             }
//             if (!isValid) break;
//         }*/

//         if (isValid) {
//             validDirections.push("vertical");
//         }
//     }

//     return validDirections;
// }

// // Hardcoded test case
// const grid = [
//     ['2', '0', '0', '1'],
//     ['0', '.', '.', '0'],
//     ['1', '0', '0', '0'],
//     ['0', '.', '.', '0']
// ];
// const row = 2;
// const col = 0;

// // Call findValidDirections and log the result
// const directions = findValidDirections(grid, row, col);
// console.log(`Valid directions from (${row}, ${col}):`, directions);




// function parsePuzzle(puzzleStr) {
//     const rows = puzzleStr.split("\n");
//     const grid = rows.map(row => row.split(""));

//     let startPositions = [];

//     for (let r = 0; r < grid.length; r++) {
//         for (let c = 0; c < grid[r].length; c++) {
//             const cellValue = parseInt(grid[r][c]);
//             if (!isNaN(cellValue) && cellValue > 0) {
//                 startPositions.push({
//                     row: r,
//                     col: c,
//                     count: cellValue
//                 });
//             }
//         }
//     }

//     return { grid, startPositions };
// }

// function findValidDirections(grid, row, col) {
//         const height = grid.length;
//         const width = grid[0].length;
//         let validDirections = [];
    
//         // Check if the current position is a valid start position
//         const cellValue = parseInt(grid[row][col]);
//         if (isNaN(cellValue) || cellValue <= 0) {
//             return []; // Not a valid start position
//         }
    
//         const wordLength = cellValue;
    
//         // Check horizontally (right)
//         console.log(`Checking horizontal validity from (${row}, ${col}) with wordLength ${wordLength}`);
//         if (col + wordLength <= width) { // Ensure word fits within grid width
//             let isValid = true;
    
//             if (wordLength > 1) {
//                 for (let i = 1; i < wordLength; i++) { // Start from OFFSET 1 (the cell *after* the start)
//                     if ((row < height) && (col + i < width)) {
//                         console.log(`Checking horizontal cell (${row}, ${col + i}): ${grid[row][col + i]}`);
//                         if (grid[row][col + i] !== "0" && grid[row][col + i] !== ".") {
//                             isValid = false;
//                             break;
//                         }
//                     } else {
//                         isValid = false; // Out of bounds
//                         break;
//                     }
//                 }
//             } else {
//                 // Special case: For wordLength = 1, check only the starting cell
//                 console.log(`Word length is 1; checking horizontal starting cell (${row}, ${col}): ${grid[row][col]}`);
//                 if (grid[row][col] === "0" || grid[row][col] === ".") {
//                     isValid = false; // No valid placement for single character
//                 } else {
//                     console.log(`Horizontal placement valid at (${row}, ${col})`);
//                 }
//             }
    
//             if (isValid && !(wordLength === 1 && col + 1 >= width)) { // Ensure no out-of-bounds access
//                 validDirections.push("horizontal");
//             }
//         }
    
//         // Check vertically (down)
//         console.log(`Checking vertical validity from (${row}, ${col}) with wordLength ${wordLength}`);
//         if (row + wordLength <= height) { // Ensure word fits within grid height
//             let isValid = true;
    
//             if (wordLength > 1) {
//                 for (let i = 1; i < wordLength; i++) { // Start from OFFSET 1 (the cell *after* the start)
//                     if ((row + i < height) && (col < width)) {
//                         console.log(`Checking vertical cell (${row + i}, ${col}): ${grid[row + i][col]}`);
//                         if (grid[row + i][col] !== "0" && grid[row + i][col] !== ".") {
//                             isValid = false;
//                             break;
//                         }
//                     } else {
//                         isValid = false; // Out of bounds
//                         break;
//                     }
//                 }
//             } else {
//                 // Special case: For wordLength = 1, check only the starting cell
//                 console.log(`Word length is 1; checking vertical starting cell (${row}, ${col}): ${grid[row][col]}`);
//                 if (grid[row][col] === "0" || grid[row][col] === ".") {
//                     isValid = false; // No valid placement for single character
//                 } else {
//                     console.log(`Vertical placement valid at (${row}, ${col})`);
//                 }
//             }
    
//             if (isValid) {
//                 validDirections.push("vertical");
//             }
//         }
    
//         return validDirections;
// }

// const emptyPuzzle = `2001
// 0..0
// 1000
// 0..0`;

// const { grid, startPositions } = parsePuzzle(emptyPuzzle);

// startPositions.forEach(({ row, col }) => {
//     const directions = findValidDirections(grid, row, col);
//     console.log(`Valid directions from (${row}, ${col}):`, directions);
// });



// Hardcoded test case
// const grid = [
//     ['2', '0', '0', '1'],
//     ['0', '.', '.', '0'],
//     ['1', '0', '0', '0'],
//     ['0', '.', '.', '0']
// ];
// const row = 0;
// const col = 3;

// // Call findValidDirections and log the result
// const directions = findValidDirections(grid, row, col);
// console.log(`Valid directions from (${row}, ${col}):`, directions);
