import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
//Routes import
import userRouter from './routes/user.routes.js';
import booksRouter from './routes/book.routes.js';
import booksTransaction from './routes/bookTransaction.routes.js';




const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());



//Routes decelration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", booksRouter);
app.use("/api/v1/book-tranasction", booksTransaction);
export { app };