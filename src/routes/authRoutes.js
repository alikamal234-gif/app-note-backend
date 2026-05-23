import express from "express";
import { login, register,getUsers } from "../controllers/authentification.js";
const router = express.Router();


router.post('/register' , (req,res) => {
  console.log("khdam")
});
router.post('/login' , login);
router.get('/users' , getUsers);

export default router