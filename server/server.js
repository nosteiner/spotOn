const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()


const app = express();

let Glasses = require('./api/models/Glasses');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../dist/spoton')));

app.post('/newGlasses',
    (req, res, next) => {
        var glasses = new Glasses(req.body);
        glasses.save(function (err, doc) {
            if (err) {
                return next(err);
            } else {
                res.json(doc);
            }
        })
    })

app.get('/glasses/:id', (req, res, next) => {

    Glasses.findById(req.params.id, function (err, doc) {
        if (err) {
            return next(err);
        } else {
            res.json(doc);
        }
    })
});

app.put(`/updateGlasses/:id`, (req, res, next) => {

    let query = { '_id': req.params.id };
    Glasses.findOneAndUpdate(query, req.body, function (err, doc) {
        if (err) { return res.send({ error: err }); 
     } else {
         console.log("saved")
            return res.send("succesfully saved");
        }
    });
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/spoton/index.html'));
});

const port = process.env.PORT || '8080';
app.set('port', port);

mongoose.connect('mongodb://noam:' + process.env.MONGO_ATLAS_PW + '@spoton-shard-00-00-i3jdr.mongodb.net:27017,spoton-shard-00-01-i3jdr.mongodb.net:27017,spoton-shard-00-02-i3jdr.mongodb.net:27017/spoton?ssl=true&replicaSet=SpotOn-shard-0&authSource=admin&retryWrites=true');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("DB connected");
});

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));



