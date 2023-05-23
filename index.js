const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors({
    origin: 'http://localhost:3000'
}))

this.Schema = mongoose.Schema;

this.entrySchema = new this.Schema({
    selected: { type: Number, required: true },
    input: { type: String, required: true }
});

this.entry = mongoose.model("entry", this.entrySchema);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to database");

    app.get('/load', (req, res) => {
        this.entry.find().then(entries => {
            res.send({ saved: entries });
        });
    });

    app.post("/save", (req, res) => {
        new this.entry({ selected: req.body.selected, input: req.body.input }).save().then(() => {
            res.send({status: "succes"});
        }).catch(err => {
            res.send({status: "error"});
        });
    });

    app.delete("/delete/:entry", (req, res) => {
        this.entry.findOneAndRemove(req.entry).then(() => {
            res.send({status: "succes"});
        }).catch(err => {
            res.send({status: "error"});
        });;
    });
})

app.listen(4000, function () {
    console.log('Listening on port 4000');
});