const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true, useCreateIndex: true})
.catch((err) =>{
    console.log("Error al conectar a la mongoose: " + err);
});

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB is fully connected and operational");
});

const userRouter = require('./routes/users');
const eventsRouter = require('./routes/events');
const commentsRouter = require('./routes/comments');

app.use('/events',eventsRouter);
app.use('/users',userRouter);
app.use('/comments',commentsRouter);

require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log('addr: ' + add);
  })

app.listen(port, () => {
    console.log(`Server running in port: ${port}`);
});



