'use strict';

const questions = [
  {
    questionText: 'Question 1: Given a table ("classic_cars") filled with classic cars, find the "make", "model", and "year" of all of the cars where their "color" is red.',
    questionAnswer: 'SELECT make, model, year FROM classic_cars WHERE color = "red"',
    category: 'Basics'
  },
  {
    questionText: 'Question 2: You have a table of "sales" with columns "sale_id" (PK), "total", and "currency" as the three-letter currency code. Order the sale_id(s) and totals from most expensive to least expensive where currency code is "USD".',
    questionAnswer: 'SELECT sale_id, total FROM sales WHERE currency = "USD" ORDER BY total DESC',
    category: 'Basics'
  },
  {
    questionText: 'Question 3: You have a table of "fruits" with columns "name", "color", and "region_of_origin". Find all fruit names with the "color" of either "yellow" or "green".',
    questionAnswer: 'SELECT name FROM fruits WHERE color = "yellow" OR color = "green"',
    category: 'Basics'
  },
  {
    questionText: 'Question 4: You have a table of "blankets" with columns "name" and "softness" where softness is on a scale from 0-10 with 0 being the least soft and 10 being the most soft. Order the blanket names by how soft they are starting with the softest.',
    questionAnswer: 'SELECT name FROM blankets ORDER BY softness DESC',
    category: 'Basics'
  },
  {
    questionText: 'Question 5: You have a sneaker collection, represented by a table "sneakers" with columns "id", "name", and "value". Find the total value of your sneaker collection.',
    questionAnswer: 'SELECT SUM(value) FROM sneakers',
    category: 'Basics'
  },
  {
    questionText: 'Question 6: Update all records in the "cities" table with columns "name", "country", and "state" where "state" = "CA" by setting "country" to "US"',
    questionAnswer: 'UPDATE cities SET country = "US" WHERE state = "CA"',
    category: 'Basics'
  },
  {
    questionText: 'Question 7: Delete the column "is_hard" from the "exams" table',
    questionAnswer: 'ALTER TABLE exams DROP is_hard',
    category: 'Basics'
  },
  {
    questionText: 'Question 8: Insert a new record into the "games" table with columns "name", "difficulty", and "is_steam_game" with corresponding values "Dota 2", 10, and True',
    questionAnswer: 'INSERT INTO games (name, difficulty, is_steam_game) VALUES ("Dota 2", 10, True)',
    category: 'Basics'
  },
  {
    questionText: 'Question 9: Find the number of unique steam game names in the "games" table with columns "name" (String), "difficulty" (Int), and "is_steam_game" (Boolean).',
    questionAnswer: 'Select COUNT(DISTINCT name) FROM games WHERE is_steam_game = True',
    category: 'Basics'
  },
  {
    questionText: 'Question 10: Find ALL Thinkful Students whose last names begin with "S" in the table "school_directory" in the column "student_lastname". Hint: This is a wildcard special operator exercise',
    questionAnswer: 'SELECT * FROM school_directory WHERE student_lastname LIKE "S%";',
    category: 'Basics'
  },
];

module.exports = questions;
