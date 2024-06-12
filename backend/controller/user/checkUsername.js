import UserModel from '../../models/userModel.js';

async function checkUsername(req, res){
    try {
        const { username } = req.body;

        const checkEmail = await UserModel.findOne({username}).select("-password");

        if (!checkEmail) {
            return res.status(400).json({
                message : "Usuario no existe",
                error : true
            });
        }

        return res.status(200).json({
            message : "Usuario verificado",
            success : true,
            data : checkEmail
        });

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        });
    }
}

export default checkUsername;