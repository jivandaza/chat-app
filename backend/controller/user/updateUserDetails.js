import getUserDetailsFromToken from '../../helpers/getUserDetailsFromToken.js';
import UserModel from '../../models/userModel.js';
import mongoose from "mongoose";

async function updateUserDetails(req, res){
    try {
        const token = req.cookies.token || null;

        const user = await getUserDetailsFromToken(token);

        const { name, profile_pic } = req.body;

        if ( !name ) {
            return res.status(400).json({
                message : "Proporcionar nombre",
                error : true,
            });
        }

        await UserModel.updateOne({ _id : user._id }, {
            name,
            profile_pic
        });

        const userInformation = await UserModel.findById(user._id);

        return res.json({
            message : "Datos actualizados",
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