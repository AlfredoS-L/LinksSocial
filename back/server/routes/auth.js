import express from "express";
import { login } from "../controllers/auth.js";

// new router object 
const router = express.Router();

// post route for login
router.post("/login", login);

export default router;