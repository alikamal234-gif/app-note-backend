import mongoose from "mongoose";

const userShema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        passwordhash : {
            type : String,
            required : true
        },
        ville : {
            type : String ,
            required : true
        }
    },
    {
        timestamps
    }
)

const User = mongoose.model("User" , userShema);

export default User;
