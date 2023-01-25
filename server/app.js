const express = require("express");
const app = express();
const authRouter = require('./routers/authRouter');
const todoRouter = require('./routers/todoRouter');
const corsMiddleware = require('./middleware/cors.middleware');
const authMiddleware = require('./middleware/auth.middleware');
const PORT = 5000;

app.use(express.json());
app.use(corsMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use('/auth', authRouter);
app.use('/todo', authMiddleware, todoRouter);

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Server is running on Port ${PORT}`);
})
