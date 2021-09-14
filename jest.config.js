/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: "coverage",
  transform: {
    "^.+\\.[tj]s?$": "babel-jest", // Adding this line solved the issue
    "^.+\\.[tj]s?$": "ts-jest"
  },
};
