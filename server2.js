// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const path = require('path');

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

// mongoose.connect("mongodb+srv://ritulkulkarni:riyul6789@cluster0.i1bfetf.mongodb.net/website_form",{useNewUrlParser:true},{useUnifiedTopology:true}).then(()=>{
//     console.log('mongo is connected');
// })


// const notesSchema = {
//     username: String,
//     email: String,
//     message: String,
//     }
    
// const Note = mongoose.model("Note", notesSchema);

// app.use(express.static(path.join(__dirname, 'public')));

// app.get("/", function(req, res){
//     res.sendFile(path.join(__dirname , 'public','index.html'));
// });


// app.post("/", function(req,res){
//     let newNote = new Note({
//         username: req.body.username,
//         email: req.body.email,
//         message: req.body.message,
//     });
//     newNote.save().then(() => {
//         res.redirect('/');
//     }).catch(err => {
//         console.error('Error saving data:', err);
//         res.status(500).send('Internal Server Error');
//     });
// });

// app.listen(3000, function() {
//     console. log("server is running on 3000");
// });



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://ritulkulkarni:riyul6789@cluster0.i1bfetf.mongodb.net/website_form", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB is connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Define data schema
const notesSchema = {
    username: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
    },
    message: {
        type: String,
        required: [true, "Please leave a message"],
    }
};

const Note = mongoose.model("Note", notesSchema);

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file at the root URL
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submissions
app.post("/", function(req, res) {
    console.log('Received form data:', req.body); // Log received data

    let newNote = new Note({
        username: req.body.username,
        email: req.body.email,
        message: req.body.message,
    });

    newNote.save().then(() => {
        console.log('Data saved successfully'); // Log successful save
        res.redirect('/');
    }).catch(err => {
        console.error('Error saving data:', err); // Log any errors
        res.status(500).send('Internal Server Error,  Please enter the data correctly');
    });
});

// Start the server
app.listen(3000, function() {
    console.log("Server is running on port 3000");
});

