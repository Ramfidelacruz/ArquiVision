const express = require('express');
const dotenv = require('dotenv');
const projectRoutes = require('./routes/projects.js');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('uploads'));


app.use('/projects', projectRoutes);

app.post('/vivo', (req, res) => {
    console.log("Recibido en /vivo");
    console.log("req.body:", req.body);
    res.send('Hello from vivo');
});



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


