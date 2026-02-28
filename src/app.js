const express = require('express');

const authRoutes = require('./routes/auth.routes');
const teamsRoutes = require('./routes/teams.routes');

const app = express();

app.use(express.json());

app.use(authRoutes);
app.use(teamsRoutes);


app.get('/', (req, res) => res.status(200).json({ message: 'FutScript API ON' }));

module.exports = { app };
