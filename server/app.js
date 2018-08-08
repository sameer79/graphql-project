const express = require('express');
const graphQlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross origin request
app.use(cors());


// connect the mlab database 
mongoose.connect('mongodb://sam:sam123@ds115592.mlab.com:15592/gqldb');
mongoose.connection.once('open', () => {
    console.log('connected to mongooes database..');
})

app.use('/graphql', graphQlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("Listening to the port 4000 ");
});