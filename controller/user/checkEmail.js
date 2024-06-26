import UserModel from '../../models/userModel.js';

async function checkEmail(req, res){
    try {
        const { email } = req.body;

        if ( !email ) {
            return res.status(400).json({
                message : "Proporcionar correo electrónico",
                error : true
            });
        }

        const checkEmail = await UserModel.findOne({email}).select("-password");

        if ( !checkEmail ) {
            return res.status(400).json({
                message : "El correo electrónico no esta registrado",
                error : true
            });
        }

        return res.status(200).json({
            message : "Ingresar su contraseña",
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

export default checkEmail;