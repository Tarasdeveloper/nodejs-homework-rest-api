import mongoose from 'mongoose';

import app from './app.js';

// console.log(process.env);

const DB_HOST =
  'mongodb+srv://Taras:gHd87goCBDZVwG5H@cluster0.td0ighl.mongodb.net/my-contacts?retryWrites=true&w=majority';

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running. Use our API on port: 3000');
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
