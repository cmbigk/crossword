const crosswordSolver = require('./crosswordsolver.js'); // Adjust the path as needed

describe('crossword Solver', () => {
  test('Solves a simple puzzle correctly', () => {
    const puzzle = '2001\n0..0\n1000\n0..0';
    const words = ['casa', 'alan', 'ciao', 'anta'];
    expect(crosswordSolver(puzzle, words)).toBe(
      'casa\ni..l\nanta\no..n'
    );
  });

  test('Detects multiple solutions', () => {
    const puzzle = '2000\n0...\n0...\n0...';
    const words = ['abba', 'assa'];
    expect(crosswordSolver(puzzle, words)).toBe(
      'Error: Multiple solutions exist, puzzle does not have a unique solution'
    );
  });

  test('Handles empty puzzle', () => {
    const puzzle = '';
    const words = ['casa', 'alan', 'ciao', 'anta'];
    expect(crosswordSolver(puzzle, words)).toBe('Error: Empty puzzle provided');
  });

  test('Detects word repetition', () => {
    const puzzle = '2001\n0..0\n1000\n0..0';
    const words = ['casa', 'casa', 'ciao', 'anta'];
    expect(crosswordSolver(puzzle, words)).toBe('Error: Word repetition detected in the input');
  });

  test('Handles invalid puzzle format', () => {
    const puzzle = 123;
    const words = ['casa', 'alan', 'ciao', 'anta'];
    expect(crosswordSolver(puzzle, words)).toBe('Error: Puzzle must be a string');
  });

  test('Handles invalid words format', () => {
    const puzzle = '2001\n0..0\n1000\n0..0';
    const words = ['casa', 'alan', 123, 'anta'];
    expect(crosswordSolver(puzzle, words)).toBe('Error: Words must be an array of strings');
  });

  test('Detects mismatch between words and slots', () => {
    const puzzle = '2001\n0..0\n1000\n0..0';
    const words = ['casa', 'alan', 'ciao', 'anta', 'extra'];
    expect(crosswordSolver(puzzle, words)).toBe(
      'Error: Mismatch between number of words provided (5) and number of word slots in the puzzle (4)'
    );
  });

  test('Detects invalid slots (more than two words)', () => {
    const puzzle = '3001\n0..0\n1000\n0..0';
    const words = ['casa', 'alan', 'ciao', 'anta', 'extra'];
    expect(crosswordSolver(puzzle, words)).toBe(
      'Error: More than two starting words detected in the puzzle'
    );
  });

  test('Handles no solution scenario', () => {
    const puzzle = '2001\n0..0\n1000\n0..0'
    const words = ['aaab', 'aaac', 'aaad', 'aaae']
    expect(crosswordSolver(puzzle, words)).toBe('Error: No solution found');
    });
});
