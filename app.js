const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

const dashboardRoutes = require('./routes/dashboard')

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('Database Connected...'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });

//routes middleware
app.use(dashboardRoutes);

const port = process.env.PORT || 8009;

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});