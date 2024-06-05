
import express from "express";
import { errormidleware } from "./middleware/error.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import dotenv from 'dotenv';
 
import cors from "cors";
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';

 
// Redis client setup
const redisClient = createClient({
  url: process.env.REDIS_URL,
});
redisClient.connect().catch(console.error);

//  Config ==>
if (process.env.NODE_ENV !== 'PRODUCTION') {
    dotenv.config({ path: 'backend/config/.env' });
}

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors({
    origin: 'https://mern-stack-eccomerce-suresh.netlify.app', // Your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// Session setup
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // प्रोडक्शन में true
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 दिन के लिए सत्र कुकी सेट करें
    }
}));

// Route Import 
import product from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import order from "./routes/orderRoute.js";
import payment from "./routes/paymentRoute.js";

app.use("/api/v1", product);
app.use("/api/v1", userRoute);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use(errormidleware);

export default app;


















// import express from "express"
// import {errormidleware} from "./middleware/error.js"
// import cookieParser from "cookie-parser"
// import bodyParser from "body-parser";
// import fileUpload from "express-fileupload"
// import dotenv from 'dotenv';
// import { fileURLToPath } from "url";
// import path from "path"
// import cors from "cors"
 
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
 
// //  Config ==>
//     if (process.env.NODE_ENV !== 'PRODUCTION') {
//         dotenv.config({ path: 'backed/config/.env' });
//     }
    


// const app = express()
// app.use(express.json())
// app.use(cookieParser())
// app.use(bodyParser.urlencoded({extended:true}))
// app.use(fileUpload())
// app.use(cors({
//     origin: 'https://mern-stack-eccomerce-suresh.netlify.app', // Your frontend URL
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
// }));
  
// // Route Import 
// import product from "./routes/productRoute.js";
// import userRoute from "./routes/userRoute.js"
// import order from "./routes/orderRoute.js"
// import payment from "./routes/paymentRoute.js"
 



// app.use("/api/v1",product)
// app.use("/api/v1",userRoute)
// app.use("/api/v1",order)
// app.use("/api/v1",payment) 
// app.use(errormidleware)

// export default app; 