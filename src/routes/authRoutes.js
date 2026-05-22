import express from "express";
import { login, register,getUsers } from "../controllers/authentification.js";

const router = express.Router();


router.post('/register' , register);
router.post('/login' , login);
router.get('/users' , getUsers);
router.get(
  "/me",
  authMiddleware,
  (req, res) => {
    res.status(200).json({
      ok: true,
      user: req.user,
    });
  }
);
export default router