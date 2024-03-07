// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb+srv://adityap4til:uZiM2J9TSD9iBLOo@cluster0.rfohtoo.mongodb.net/', {  })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Define a schema for users
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Route for handling login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    
    // Find the user in the database by email
    User.findOne({ email: email })
        .then(user => {
            // Check if user exists
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if the password is correct
            if (password !== user.password) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // If user exists and password is correct, return success message
            res.status(200).json({ message: 'Login successful' });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/signup', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Create a new user object
    const newUser = new User({
        firstName,
        lastName,
        email,
        password
    });

    // Save the user to the database
    newUser.save()
        .then(() => res.status(201).json({ message: 'User created successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

