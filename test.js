function crosswordSolver(emptyPuzzle, words) {
    console.log('Input Puzzle:', emptyPuzzle);
    console.log('Input Words:', words);

    // Validate inputs
    if (!emptyPuzzle || !words || words.length === 0) {
        console.log('Invalid input - empty puzzle or words');
        return 'Error';
    }

    // Parse the grid
    const grid = emptyPuzzle.split('\n').map(row => row.split(''));
    console.log('Parsed Grid:', grid);

    // Find all possible spaces
    function findSpaces(grid) {
        const spaces = [];
        
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                // Look for numbered cells
                if (!isNaN(parseInt(grid[row][col]))) {
                    console.log(`Checking numbered cell at [${row},${col}]: ${grid[row][col]}`);
                    
                    // Check horizontal spaces
                    if (col + 4 <= grid[row].length) {
                        let isValidHorizontal = true;
                        let zeroCount = 0;
                        let zeroPositions = [];
                        
                        for (let i = 1; i < 4; i++) {
                            if (grid[row][col + i] === '0') {
                                zeroCount++;
                                zeroPositions.push(col + i);
                            } else if (grid[row][col + i] !== '.') {
                                isValidHorizontal = false;
                                console.log(`Invalid horizontal space at [${row},${col}] due to cell [${row},${col+i}]: ${grid[row][col+i]}`);
                                break;
                            }
                        }
                        
                        if (isValidHorizontal && zeroCount === 3) {
                            spaces.push({
                                row,
                                col,
                                length: 4,
                                direction: 'horizontal',
                                zeroPositions
                            });
                        }
                    }

                    // Check vertical spaces
                    if (row + 4 <= grid.length) {
                        let isValidVertical = true;
                        let zeroCount = 0;
                        let zeroPositions = [];
                        
                        for (let i = 1; i < 4; i++) {
                            if (grid[row + i][col] === '0') {
                                zeroCount++;
                                zeroPositions.push(row + i);
                            } else if (grid[row + i][col] !== '.') {
                                isValidVertical = false;
                                console.log(`Invalid vertical space at [${row},${col}] due to cell [${row+i},${col}]: ${grid[row+i][col]}`);
                                break;
                            }
                        }
                        
                        if (isValidVertical && zeroCount === 3) {
                            spaces.push({
                                row,
                                col,
                                length: 4,
                                direction: 'vertical',
                                zeroPositions
                            });
                        }
                    }
                }
            }
        }
        
        console.log('Found Spaces:', spaces);
        return spaces;
    }

    // Generate word permutations
    function generatePermutations(arr) {
        if (arr.length <= 1) return [arr];
        const result = [];
        
        for (let i = 0; i < arr.length; i++) {
            const current = arr[i];
            const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
            const perms = generatePermutations(remaining);
            
            for (const perm of perms) {
                result.push([current, ...perm]);
            }
        }
        
        return result;
    }

    // Place word in grid
    function placeWord(grid, word, space) {
        const newGrid = grid.map(row => [...row]);
        
        if (space.direction === 'horizontal') {
            newGrid[space.row][space.col] = space.col;  // Keep original number
            for (let i = 1; i < word.length; i++) {
                newGrid[space.row][space.col + i] = word[i];
            }
        } else { // vertical
            newGrid[space.row][space.col] = space.col;  // Keep original number
            for (let i = 1; i < word.length; i++) {
                newGrid[space.row + i][space.col] = word[i];
            }
        }
        
        return newGrid;
    }

    // Find spaces
    const spaces = findSpaces(grid);

    // If not enough spaces for words, return error
    if (spaces.length < words.length) {
        console.log('Not enough spaces for words');
        return 'Error';
    }

    // Try all word permutations
    const wordPermutations = generatePermutations(words);
    console.log('Total word permutations:', wordPermutations.length);

    for (const wordArrangement of wordPermutations) {
        // Ensure all words are 4 letters
        if (wordArrangement.some(word => word.length !== 4)) {
            console.log('Skipping arrangement - not all words are 4 letters');
            continue;
        }

        // Try all space permutations
        const spacePermutations = generatePermutations(spaces).slice(0, 1000);
        
        for (const spaceArrangement of spacePermutations) {
            // Ensure we have matching number of words and spaces
            if (wordArrangement.length !== spaceArrangement.length) continue;

            let currentGrid = grid.map(row => [...row]);
            let success = true;

            // Track used spaces to prevent reuse
            const usedSpaces = new Set();

            // Try to place each word
            for (let i = 0; i < wordArrangement.length; i++) {
                const word = wordArrangement[i];
                const space = spaceArrangement[i];

                // Check if space is already used
                const spaceKey = `${space.row},${space.col},${space.direction}`;
                if (usedSpaces.has(spaceKey)) {
                    success = false;
                    break;
                }

                // Place the word
                currentGrid = placeWord(currentGrid, word, space);
                usedSpaces.add(spaceKey);
            }

            // Verify solution
            if (success) {
                const solution = currentGrid.map(row => row.join('')).join('\n');
                console.log('Potential Solution:', solution);
                return solution;
            }
        }
    }

    // No solution found
    console.log('No solution found');
    return 'Error';
}

// Test
const puzzle1 = '2001\n0..0\n1000\n0..0';
const words1 = ['casa', 'alan', 'ciao', 'anta'];

console.log(crosswordSolver(puzzle1, words1));
