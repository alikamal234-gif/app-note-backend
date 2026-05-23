import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { name, password, ville } = req.body

        const is_exist_name = await User.findOne({ name })
        console.log(is_exist_name)
        if (is_exist_name) {
            return res
                .status(400)
                .json({
                    message:
                        "Ce nom existe déjà",
                });
        }
        
        const passwordhash = await bcrypt.hash(password, 10)
        const user = await User.create({
            name, passwordhash, ville
        })
        res.status(201).json(user)

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const login = async (req, res) => {
    try {
        const { name, password } = req.body
        const user = await User.findOne({ name })
        if (!user) {
            return res.status(400).json({
                message: "ce utilisateur ne exist pas"
            })
        }
        const isCorrectPassword = await bcrypt.compare(password, user?.passwordhash)
        if (
            !isCorrectPassword
        ) {
            return res
                .status(400)
                .json({
                    message:
                        "Mot de passe incorrect",
                });
        }

        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.cookie("token",token,
            {
              httpOnly: true,
              secure: false,
              sameSite: "lax",
              path: "/",
              maxAge:
                7 *
                24 *
                60 *
                60 *
                1000,
            }
        );

        res.json({
            success: true,
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json(users)
    } catch (err) {
        console.log(err)
    }
}   