const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Call the function to ensure database connection is established
connectDB().then(() => {
  // Start the server inside the then() to ensure it starts after the database connection is established
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

  
const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Ensure email is unique
  phone: { type: String, required: true, unique: true }, // Ensure phone is unique
  babyStage: { type: String, required: true },
});

// Apply the unique validator plugin to formSchema
formSchema.plugin(require('mongoose-unique-validator'));

const Form = mongoose.model('Form', formSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint to handle form submission
app.post('/book-demo', async (req, res) => {
  const { name, email, countryCode, phone, babyStage } = req.body;
  // Concatenate countryCode and phone
  const fullPhone = `${countryCode}' '${phone}`;
  const formData = new Form({
    name,
    email,
    phone: fullPhone, // Used the concatenated phone number here
    babyStage,
  });

  try {
    await formData.save();
    res.status(201).send({ message: 'Form data saved successfully' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).send({ message: 'Error saving form data' });
  }
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/demo-form.html');
});

// Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
