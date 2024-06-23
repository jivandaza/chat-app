import getUserDetailsFromToken from '../../helpers/getUserDetailsFromToken.js';

async function userDetails(req, res){
    try {
        const token = req.cookies.token || null;

        const user = await getUserDetailsFromToken(token);

        return res.status(200).json({
            data : user
        });

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        });
    }
}

export default userDetails;