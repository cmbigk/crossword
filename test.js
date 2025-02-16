 const crosswordSolver = require('./crosswordsolver.js');

// const puzzle = `2001
// 0..0
// 1000
// 0..0`;

// const words = ['casa', 'alan', 'ciao', 'anta'];

// const puzzle = `...1...........
// ..1000001000...
// ...0....0......
// .1......0...1..
// .0....100000000
// 100000..0...0..
// .0.....1001000.
// .0.1....0.0....
// .10000000.0....
// .0.0......0....
// .0.0.....100...
// ...0......0....
// ..........0....`
// const words = [
//   'sun',
//   'sunglasses',
//   'suncream',
//   'swimming',
//   'bikini',
//   'beach',
//   'icecream',
//   'tan',
//   'deckchair',
//   'sand',
//   'seaside',
//   'sandals',
// ]

const puzzle = `..1.1..1...
10000..1000
..0.0..0...
..1000000..
..0.0..0...
1000..10000
..0.1..0...
....0..0...
..100000...
....0..0...
....0......`
const words = [
  'popcorn',
  'fruit',
  'flour',
  'chicken',
  'eggs',
  'vegetables',
  'pasta',
  'pork',
  'steak',
  'cheese',
]

crosswordSolver(puzzle, words);

//-------------------------------------------

// const crosswordSolver = require('./crosswordsolving.js');

// console.log('Importing module');
// const grid = `2001
// 0..0
// 1000
// 0..0`;

// const words = ['casa', 'alan', 'ciao', 'anta'];

// console.log('Before calling solver');
// crosswordSolver(grid, words);
// console.log('After calling solver');