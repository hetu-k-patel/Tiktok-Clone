import express from 'express';
import mongoose from 'mongoose';
import data from './data.js';
import Videos from './dbModel.js'; 

// AppConfig
const app = express();
const port = process.env.PORT || 9000;

// Middlewares
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'),
    res.setHeader('Access-Control-Allow-Headers', '*'),
    next()
})

// DBConfig
const connection_url = 'mongodb+srv://admin:admin@123@cluster0.iwmii.mongodb.net/TIKTOK-CLONE?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


// API Endpoints
app.get('/', (req, res) => {
    res.status(200).send('hello world');
});

app.get('/v1/posts', (req, res) => {
    res.status(200).send(data);
});

app.post('/v2/posts', (req, res) => {
    const dbVideos = req.body;

    Videos.create(dbVideos, (err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
});

app.get('/v2/posts', (req, res) => {
    Videos.find((err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

// Listen
app.listen(port, () => console.log(`listening on localhost: ${port}`));