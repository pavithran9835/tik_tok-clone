const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Data = require('./data');
const port = process.env.PORT || 4000; 
const Videos = require('./dbModel.js');

//Midlewares
app.use(express.json());

app.use((req , res , next) => {
    res.setHeaders('Access-Control-Allow-Origin' , '*'),
    res.setHeaders('Access-Control-Allow-Headers' , '*'),
    next();
});

//DB Config
const connection_url = 'mongodb+srv://pavithran:Pradeep7$@cluster0.ioifn.mongodb.net/tiktok?retryWrites=true&w=majority'

mongoose.connect(connection_url , {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(res => {
    console.log('Database Connected')
} , err => {
    console.log(err);
})

app.get('/' , (req ,res) => {
    res.status(200).send('Hello World');
});

app.get('/v1/posts' , (req , res) => {
    res.status(200).send(Data);
})

app.get('/v2/posts' , (req, res) => {
    Videos.find((err , data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/v2/posts' , (req , res) => {
    const dbVideos = req.body;
 
    Videos.create(dbVideos , (err , data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.listen(port , () => {
    console.log(`Server running on port ${port}`)
})