const express = require('express');
const router = express.Router();
const settings = require('././models/')



router.put('/updateSettings/:isRight' ,(req,res)=>{
    const settings = req.body;
    const lensSide = req.params.isRigth;

    Glasses.
    order.update(data, orderId).then(data => {
        console.log("good api")
       res.send(JSON.stringify(data));
       }).catch((error) => {
        res.send("error:" + error)
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


});