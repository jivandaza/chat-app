import UserModel from '../../models/userModel.js';

async function searchUser(req, res){
    try {
        const { search } = req.body;

        const query = new RegExp(search, "i", "g");

        const user = await UserModel.find({
            "$or" : [
                { name : query },
                { username : query }
            ]
        }).select("-password");

        return res.json({
            data : user,
            success : true
        });

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        });
    }
}

export default searchUser;