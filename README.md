# crossword

# Crossword Solver

A JavaScript function that solves empty crossword puzzles.

## Created by
Mayuree and Chan

## Description

The `crosswordSolver` function takes an empty puzzle and a list of words as input, and fills the puzzle with the given words according to specific rules.

## Function Signature


## Input Rules

## Input Rules

1. The empty puzzle is a string where:
   - Each character is either a number, a `.`, or a `\n`
   - Numbers represent the number of words starting from that position:
     - Numbers greater than 0 indicate the start of word(s)
     - '0' represents a letter position that isn't the start of a word
   - `.` represents a space that doesn't need to be filled

2. The word list is an array of strings with no duplicate words allowed


## Output

The function prints the solved puzzle to the console as a string. If a unique solution cannot be guaranteed or if any input conditions are not met, it prints 'Error'.

## Example1

```
const emptyPuzzle = `2001 0..0 1000 0..0`
const words = ['casa', 'alan', 'ciao', 'anta']

crosswordSolver(emptyPuzzle, words)

/* Output:
casa
i..l
anta
o..n
*/
```
## Example2

```
const puzzle = 
`...1...........
..1000001000...
...0....0......
.1......0...1..
.0....100000000
100000..0...0..
.0.....1001000.
.0.1....0.0....
.10000000.0....
.0.0......0....
.0.0.....100...
...0......0....
..........0....`

const words = [
  'sun',
  'sunglasses',
  'suncream',
  'swimming',
  'bikini',
  'beach',
  'icecream',
  'tan',
  'deckchair',
  'sand',
  'seaside',
  'sandals',
]

crosswordSolver(emptyPuzzle, words)

/* Output:
...s...........
..sunglasses...
...n....u......
.s......n...s..
.w....deckchair
bikini..r...n..
.m.....seaside.
.m.b....a.a....
.icecream.n....
.n.a......d....
.g.c.....tan...
...h......l....
..........s....
*/
```

## Running Tests

To run the test suite for this project:

1. Ensure you have Node.js and npm installed on your system.
2. Navigate to the project directory in your terminal.
3. Install Jest (if not already installed) by running:
4. Run the tests using the command:
```
npm test
```
This will execute all test cases defined in the test files and display the results in your terminal.

## Error Handling

The function will print 'Error' if any of the following conditions are met:

1. Multiple solutions exist: The puzzle does not have a unique solution.
2. Empty puzzle: The input puzzle string is empty.
3. Word repetition: The list of words contains duplicates.
4. Invalid puzzle format: The puzzle input is not a string.
5. Invalid words format: The words input is not an array of strings.
6. Mismatch between words and slots: The number of words provided doesn't match the number of word slots in the puzzle.
7. Invalid slots: The puzzle contains slots requiring more than two words.
8. No solution found: The provided words cannot fit into the puzzle according to the given constraints.
9. Puzzle format error: The puzzle contains characters other than numbers, dots, or newlines.
10. Word length mismatch: Any word in the list is too long or too short for the available slots in the puzzle.

In any of these cases, the function will output 'Error' instead of attempting to solve the puzzle.

