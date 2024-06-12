import getUserDetailsFromToken from '../../helpers/getUserDetailsFromToken.js';
import UserModel from '../../models/userModel.js';

async function updateUserDetails(req, res){
    try {
        const token = req.cookies.token || '';

        const user = await getUserDetailsFromToken(token);

        const { name, profile_pic } = req.body;

        await UserModel.updateOne({ _id : user._id }, {
            name,
            profile_pic
        });

        const userInformation = await UserModel.findById(user._id);

        return res.json({
            message : "Usuario actúalizado con éxito",
            data : userInformation,
            success : true
        });

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        });
    }
}

export default updateUserDetails;