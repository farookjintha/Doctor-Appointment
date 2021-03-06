const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cors = require('cors');

require('dotenv').config();
const app = express();

//Routes
const dashboardRoutes = require('./routes/dashboard');
const slotRoutes = require('./routes/slots');
const appointmentRoutes = require('./routes/appointment');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('Database Connected...'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });




app.use(bodyParser.json());
app.use(cors());

//routes middleware
app.use('/api', dashboardRoutes);
app.use('/api', slotRoutes);
app.use('/api', appointmentRoutes);

const port = process.env.PORT || 8009;

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});