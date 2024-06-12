import UserModel from '../../models/userModel.js';
import bcryptjs from 'bcryptjs';

async function registerUser (req, res){
    try {
        const { name, username , password, profile_pic } = req.body;

        const checkUsername = await UserModel.findOne({ username });

        if (checkUsername) {
            return res.status(400).json({
                message : "El usuario ya existe",
                error : true,
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const payload = {
            name,
            username,
            profile_pic,
            password : hashPassword
        };

        const user = new UserModel(payload);
        await user.save();

        return res.status(201).json({
            message : "Usuario creada con éxito",
            success : true
        });

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        });
    }
}

export default registerUser;