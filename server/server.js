const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();

const Glasses = require('./api/models/Glasses');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../dist/spoton')));

app.post('/glasses',
    (req, res, next) => {
        const glasses = new Glasses({
            _id: new mongoose.Types.ObjectId(),
            lenses: req.body.lenses
        });
        glasses.save().then(resulte => {
            res.status(201).json({
                createdGlasses: resulte
            });
        })
            .catch(err => {
                console.log(err)
                res.status(500).json({ error: err })
            })
    });

app.get('/:glassesId',
    (req, res, next) => {
        const id = req.params.glassesId;
        Glasses.findById(id).exec().then(doc => {
            if(doc){
                res.status(200).json(doc)
            }
        }).catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
    });


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/spoton/index.html'));
});

const port = process.env.PORT || '8080';
app.set('port', port);

mongoose.connect('mongodb://noam:' + process.env.MONGO_ATLAS_PW + '@spoton-shard-00-00-i3jdr.mongodb.net:27017,spoton-shard-00-01-i3jdr.mongodb.net:27017,spoton-shard-00-02-i3jdr.mongodb.net:27017/test?ssl=true&replicaSet=SpotOn-shard-0&authSource=admin&retryWrites=true',
    function () {
        console.log("DB connected");
    });

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));

