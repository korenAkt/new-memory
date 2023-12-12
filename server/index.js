import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import logger from 'morgan';
import usersRoute from './routes/userRoute.js';
import adminRoute from './routes/adminRoute.js';
import memoriesRoute from './routes/memoriesRoute.js';

const app = express();
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit:'30mb', extended: true}))
app.use(cors())

// app.get('/', (req, res) => {res.send('Hi There!')}); 

app.use(logger('dev'));

app.use('/memories', memoriesRoute);
app.use('/users', usersRoute);
app.use('/admin', adminRoute);



const CONNECTION_URL = 'mongodb+srv://koren102:koren102@memories.cozy5mi.mongodb.net/?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5100;

// app.listen(5100, ()=>{console.log('Server started on port 5100')} );
await mongoose.connect(CONNECTION_URL);
app.listen(PORT, ()=>{console.log(`Server started on port ${PORT}`)} ); 
//mongoose.set('useFindAndModify', false);

