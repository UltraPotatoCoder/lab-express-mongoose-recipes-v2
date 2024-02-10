const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');

const app = express();

// MIDDLEWARE
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = 'mongodb://127.0.0.1:27017/express-mongoose-recipes-dev';

mongoose
  .connect(MONGODB_URI)
  .then(x =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch(err => console.error('Error connecting to mongo', err));

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
  res.send('<h1>LAB | Express Mongoose Recipes</h1>');
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', async (req, res) => {
  const {
    title,
    instructons,
    level,
    ingredients,
    image,
    duration,
    isArchived,
    created,
  } = req.body;

  try {
    const createdRecipe = await Recipe.create({
      title,
      instructons,
      level,
      ingredients,
      image,
      duration,
      duration,
      isArchived,
      created,
    });

    console.log('Recipe created:', createdRecipe);
    res.status(201).send(createdRecipe);
  } catch (error) {
    console.log('Error creating the recipe', error);
    res.status(500).send({ Error: 'Failed to create the recipe' });
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find({});

    console.log('All recipes:', recipes);
    res.status(200).json(recipes);
  } catch (error) {
    console.log('Error retrieving all recipes', error);
    res.status(500).json({ Error: 'Failed to retrieve all recipes' });
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', async (req, res) => {
  const recipeId = req.params.id;

  try {
    const recipes = await Recipe.findById(recipeId);

    console.log('Recipe', recipes);

    res.status(200).json(recipes);
  } catch (error) {
    console.log('Error while getting the recipe', error);

    res.status(500).json({ error: 'Failed to get recipe' });
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', async (req, res) => {
  const recipeId = req.params.id;
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, req.body, {
      new: true,
    });
    console.log('Updated recipe', updatedRecipe);
    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.log('Error while updating the recipe', error);
    res.status(500).json({ Error: 'Failed to update the recipe' });
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', async (req, res) => {
  const recipeId = req.params.id;
  try {
    await Book.findByIdAndDelete(recipeId);
    console.log('Recipe deleted!');
    res.status(204).send();
  } catch (error) {
    console.log('Error while deleting the recipe', error);
    res.status(500).json({ Error: 'Failed to delete the recipe' });
  }
});

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
