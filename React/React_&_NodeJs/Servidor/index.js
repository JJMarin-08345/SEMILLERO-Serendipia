
const express = require('express');
const cors = require('cors');
const RGet = require('./Routes_CRUD/RGet');
const RPost = require('./Routes_CRUD/RPost');
const RPut = require('./Routes_CRUD/RPut');
const RDelete = require('./Routes_CRUD/RDelete');

const port = 3001;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/GET',RGet);
app.use('/POST',RPost);
// app.use('/PUT',RPut);
// app.use('/DEL',RDelete);

app.listen(port);