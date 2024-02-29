const express = require('express'),
app = express(),
mongoose = require('mongoose');

mongoose.set('debug', true);
app.use(express.urlencoded({extended:true}))

app.use(express.json())

const cors = require('cors');
app.use(cors())

require('dotenv').config({path : './.env'});
const PORT = process.env.PORT;

async function connecting(){
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('Connected to the DB')
    } catch (error) {
        console.log("DB is not running!!!")
    }
}

connecting();

const path = require('path');

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.use('/admin', require('./routes/admin-routes.js'))
app.use('/user', require('./routes/user-routes.js'))
app.use('/feed', require('./routes/feed-routes.js'))
app.listen(PORT, () => console.log(`listening on port ${PORT}`));