const bodyParser = require('body-parser'),
      dotenv = require('dotenv').config(),
      cors = require('cors'),
      express = require('express'),
      mongoose = require('mongoose'),
      path = require('path');

const app = express();



// Connect to Database
mongoose.connect('mongodb://localhost:27017');

// Set server host and port
const host = '0.0.0.0';
const port = process.env.PORT || 8080;

const productRoutes = require('./routes/products');

// Body Parser Middleware
app.use(bodyParser.json());

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'dist')));

// API Routes
app.use('/products', productRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start Server
app.listen(port, host, () => {
  console.log('Server listening on port ' + port + '...');
});