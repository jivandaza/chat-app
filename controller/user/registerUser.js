import UserModel from '../../models/userModel.js';
import bcryptjs from 'bcryptjs';
import mongoose from "mongoose";

async function registerUser (req, res){
    try {
        const { name, email , password, profile_pic } = req.body;

        const checkEmail = await UserModel.findOne({ email });

        if ( checkEmail ) {
            return res.status(400).json({
                message : "El correo electrónico ya esta registrado",
                error : true,
            });
        }

        if ( !password ) {
            return res.status(400).json({
                message: "Proporcionar contraseña",
                error: true
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const payload = {
            name,
            email,
            profile_pic,
            password : hashPassword
        };

        const user = new UserModel(payload);
        await user.save();

        return res.status(201).json({
            message : "Registrado exitosamente",
            success : true
        });

    } catch (error) {
        if ( error instanceof mongoose.Error.ValidationError ) {
            const dataError = error.errors.email ? error.errors.email :
                error.errors.name ? error.errors.name : null;
            if ( dataError ) {
                return res.status(400).json({
                    message: dataError.message,
                    error: true
                });
            }
        }

        return res.status(500).json({
            message : error.message || error,
            error : true
        });
    }
}

export default registerUser;