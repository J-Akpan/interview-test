import express from 'express';
import dotenv from 'dotenv';
import db_connect from './config/db_config';
dotenv.config();
import userRoutes from './routes/usersRoute';
import tutorRoutes from './routes/tutorRoute';


//create instace of express app
const app: express.Application = express();
const port: number = Number(process.env.PORT) || 3000;

//middleware to parse json request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use routes
app.use('/user', userRoutes)
app.use('/tutor', tutorRoutes)


//start the server
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);

    await db_connect.sync({
        force: false,
        alter: true,
        logging: false
    })
})
