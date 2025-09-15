// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

const userRoutes = require('./routes/users.js');

app.use(cors());
app.use(express.json());

// All API routes will be prefixed with /api/users
app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
