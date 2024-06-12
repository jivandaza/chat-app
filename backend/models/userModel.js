import mongoose from 'mongoose';

const userSchema =  new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Proporcionar nombre"]
    },
    username : {
        type : String,
        required : [true, "Proporcionar usuario"],
        unique : true
    },
    password : {
        type : String,
        required : [true, "Proporcionar contraseña"]
    },
    profile_pic : {
        type : String,
        default : ""
    }
},{
    timestamps : true
});

const UserModel = mongoose.model('User',userSchema);

export default UserModel;