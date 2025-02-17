function crosswordSolver(puzzle, words) {

    // Check for correct argument types
    if (typeof puzzle !== 'string') {
        return "Error: Puzzle must be a string";
    }

    if (!Array.isArray(words) || !words.every(word => typeof word === 'string')) {
        return "Error: Words must be an array of strings";
    }

    // Check for empty puzzle
    if (!puzzle || puzzle.trim() === '') {
        return "Error: Empty puzzle provided";
    }

    // Check for word repetitions
    const uniqueWords = new Set(words);
    if (uniqueWords.size !== words.length) {
        return "Error: Word repetition detected in the input";
    }

    const { totalWords, invalidSlots } = countWords(puzzle);
    if (invalidSlots > 0) {
        return "Error: More than two starting words detected in the puzzle";
    }

    if (words.length !== totalWords) {
        return "Mismatch between number of words and number of starting cells";
    }
    
    const grid = puzzle.split('\n').map(row => row.split(''));
    const slots = identifyWordSlots(puzzle);
    const wordsByLength = {};
    words.forEach(word => {
        if (!wordsByLength[word.length]) wordsByLength[word.length] = [];
        wordsByLength[word.length].push(word);
    });

    
    const usedWords = new Set();
    const filledSlots = new Array(slots.length).fill(false);
    function canPlaceWord(word, slot, slotIndex) {
        if (filledSlots[slotIndex] || usedWords.has(word)) return false;
        for (let i = 0; i < word.length; i++) {
            const row = slot.direction === 'horizontal' ? slot.row : slot.row + i;
            const col = slot.direction === 'horizontal' ? slot.col + i : slot.col;
            if (grid[row][col] !== '0' && grid[row][col] !== word[i] && isNaN(grid[row][col])) return false;
        }
        return true;
    }

    function placeWord(word, slot, slotIndex) {
        for (let i = 0; i < word.length; i++) {
            const row = slot.direction === 'horizontal' ? slot.row : slot.row + i;
            const col = slot.direction === 'horizontal' ? slot.col + i : slot.col;
            grid[row][col] = word[i];
        }
        filledSlots[slotIndex] = true;
        usedWords.add(word);
    }

    function removeWord(word, slot, slotIndex) {
        if (!filledSlots[slotIndex]) return;
        for (let i = 0; i < slot.length; i++) {
            const row = slot.direction === 'horizontal' ? slot.row : slot.row + i;
            const col = slot.direction === 'horizontal' ? slot.col + i : slot.col;
            grid[row][col] = puzzle.split('\n')[row][col];
        }
        filledSlots[slotIndex] = false;
        usedWords.delete(word);
    }

    function printGrid() {
        console.log(grid.map(row => row.join('')).join('\n'));
        console.log('-------------------');
    }

    let solutionCount = 0;
    let firstSolution = null;

    function solve(index = 0) {
        if (index >= slots.length) {
            solutionCount++;
            if (solutionCount === 1) {
                firstSolution = grid.map(row => row.join('')).join('\n');
            }
            return solutionCount > 1;
        }

        if (filledSlots[index]) return solve(index + 1);

        const slot = slots[index];
        const possibleWords = wordsByLength[slot.length] || [];

        // console.log(`\nTrying to fill slot: ${slot.direction} at (${slot.row}, ${slot.col}), length: ${slot.length}`);
        // console.log(`Possible words: ${possibleWords.join(', ')}`);

        for (const word of possibleWords) {
            if (canPlaceWord(word, slot, index)) {
                // console.log(`Placing ${word}`);
                placeWord(word, slot, index);
                // printGrid();
                if (solve(index + 1)) return true;
                removeWord(word, slot, index);
                // console.log(`Removing ${word}`);
                // printGrid();
            } else {
                // console.log(`Cannot place ${word}`);
            }
        }

        return false;
    }

    // console.log("\nInitial grid:");
    // printGrid();

    solve();
    if (solutionCount === 0) {
        return "Error: No solution found";
    } else if (solutionCount > 1) {
        return "Error: Multiple solutions exist, puzzle does not have a unique solution";
    }

    return firstSolution;
}

function countWords(puzzle) {
    const grid = puzzle.split('\n').map(row => row.split(''));
    let totalWords = 0;
    let invalidSlots = 0;

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (!isNaN(grid[row][col]) && grid[row][col] !== '0') {
                const count = parseInt(grid[row][col]);
                totalWords += count;
                if (count > 2) {
                    invalidSlots++;
                }
            }
        }
    }

    return { totalWords, invalidSlots };
}

function identifyWordSlots(puzzle) {
    const grid = puzzle.split('\n').map(row => row.split(''));
    const slots = [];

    // Identify horizontal slots
    for (let row = 0; row < grid.length; row++) {
        let start = -1;
        for (let col = 0; col <= grid[row].length; col++) {
            if (col < grid[row].length && (grid[row][col] === '0' || !isNaN(grid[row][col]))) {
                if (start === -1) start = col;
            } else if (start !== -1) {
                const length = col - start;
                if (length >= 3) {
                    slots.push({direction: 'horizontal', row, col: start, length});
                }
                start = -1;
            }
        }
    }

    // Identify vertical slots
    for (let col = 0; col < grid[0].length; col++) {
        let start = -1;
        for (let row = 0; row <= grid.length; row++) {
            if (row < grid.length && (grid[row][col] === '0' || !isNaN(grid[row][col]))) {
                if (start === -1) start = row;
            } else if (start !== -1) {
                const length = row - start;
                if (length >= 3) {
                    slots.push({direction: 'vertical', row: start, col, length});
                }
                start = -1;
            }
        }
    }

    return slots;
}

// module.exports = crosswordSolver;


// Test the solver
const puzzle = '2001\n0..0\n1000\n0..0';
    const words = ['casa', 'alan', 'ciao', 'anta'];


console.log(crosswordSolver(puzzle, words));