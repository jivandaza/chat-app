import mongoose from 'mongoose';

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const connection = mongoose.connection;

        connection.on('connected',()=> {
            console.log("Conectado a la DB");
        });

        connection.on('error',(error)=> {
            console.log("Algo anda mal en mongodb: ", error);
        });
    } catch (error) {
        console.log("Algo salio mal: ", error);
    }
}

export default connectDB;