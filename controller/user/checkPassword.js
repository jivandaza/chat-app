import UserModel from '../../models/userModel.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

async function checkPassword(req, res){
    try {
        const { password, userId } = req.body;

        if ( !password ) {
            return res.status(400).json({
                message : "Proporcionar contraseña",
                error : true
            });
        }

        const user = await UserModel.findById(userId);

        const verifyPassword = await bcryptjs.compare(password, user.password);

        if ( !verifyPassword ) {
            return res.status(400).json({
                message : "La contraseña no coincide",
                error : true
            });
        }

        const tokenData = {
            id : user._id,
            username : user.username
        };

        const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{ expiresIn : '1d'});

        const cookieOptions = {
            http : true,
            secure : true
        };

        return res.cookie('token', token, cookieOptions).status(200).json({
            message : "Sesión iniciada",
            token : token,
            success : true
        });

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        });
    }
}

export default checkPassword;