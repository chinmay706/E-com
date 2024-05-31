import app from "./app.js";
import dotenv from 'dotenv';
 import cors from "cors"
import connectMongo from "./config/database.js";
import cloudinary from "cloudinary";

// Handling Uncaugth Expetion ==>
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(err.stack)
    console.log("Shutting down the Server due to Unhandled Promise Rejection ")
    process.exit(1)
})



//  Config ==>
    if (process.env.NODE_ENV !== 'PRODUCTION') {
        dotenv.config({ path: 'backed/config/.env' });
    }
    

connectMongo()

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET

})
app.use(cors({
    origin: 'http://localhost:3000', // Update with the frontend's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));


app.options('*', cors());




const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})



// UNHANDLED PROMISE REJECTION 

process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(err.stack)
    console.log("Shuting down the server due to Unhandled Promise Rejection")

    server.close(()=>{
        process.exit(1)
    })
})