import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";


// CONFIGURATIONS of environment variables and server
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // get current directory name
dotenv.config(); // inti dotenv to read .env file
const app = express(); // create express app

// middleware for security and loggin
app.use(express.json()); // parse JSON bodies
app.use(helmet()); // apply helmet default security headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // configure policy for loading cross-origin resources
app.use(morgan("common")); // log HTTP requests with morgan
app.use(bodyParser.json({ limit: "30mb", extended: true })); // set the body size limit for JSON payloads
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // set the body size limit for URL-encoded payloads
app.use(cors()); // enable cors for all routes

// serve static files from the public/assets directory
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE configuration with multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets"); // upload destination
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // use the original file name as the upload file name
  },
});
const upload = multer({ storage }); // init multer with storage config

// ROUTES with file uploads
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// ROUTES for app
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// MONGOOSE set up and connection to MONGODB
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

  })
  .catch((error) => console.log(`${error} did not connect`));