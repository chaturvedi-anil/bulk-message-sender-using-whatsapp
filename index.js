// app.mjs
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static('./assets'));
// Set the view engine to EJS and specify the views folder
app.set('view engine', 'ejs');
app.set('views', './views'); // Assuming your EJS templates are in the './views' folder

// Define a simple route
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
