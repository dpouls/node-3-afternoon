require("dotenv").config();
const express = require('express');
const massive = require('massive');
const gradient = require('gradient-string')
const app = express();
const pc = require('./products_controller')
const {SERVER_PORT, CONNECTION_STRING} = process.env;

massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db',dbInstance)
})
.catch(err => console.log(err));

app.use(express.json());

//ENDPOINTS

app.post('/api/products',pc.create)
app.get('/api/products', pc.getAll)
app.get('/api/products/:id',pc.getOne)
app.put('/api/products/:id', pc.update)
app.delete('/api/products/:id',pc.delete)


app.listen(SERVER_PORT, () => {
    console.log(gradient.atlas(`Server gettin jiggy with it on port ${SERVER_PORT}. ya dig?`))
});


