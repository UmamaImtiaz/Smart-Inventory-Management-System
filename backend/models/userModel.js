const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add a name"]
     },

    email : {
        type: String,
        required:[true, "please add a email"],
        unique: true,
        trim: true,
        match: [
        /^(?!.*\.{2})[a-zA-Z0-9][a-zA-Z0-9#$%&\*\+-/=\?\_`|~]*@[a-zA-Z0-9][a-zA-Z0-9-_.]*\.[a-zA-Z]{2,4}$/,

        "please add a valid email"
        ] 
    },

    password : {
        type: String,
        required: [true, "please add a pasword"],
        minlength: [6, "password must be up to 6 characters"],
      //  maxlengh: [23, "password must not be more than 23 characters"],

    },

    photo: {
        type: String,
        required: [true, "please add a photo"],
        default: "https://i.ibb.co/4pDNDk1/avator.png" 
    },

    phone: {
        type: String,
        default: "+234"
    },

    bio: {
        type: String,
        maxlengh: [250 , "bio must be more than 250 characters"],
        default: "bio"
    },
},
{
    timestamps: true,
}
);


const User = mongoose.model("User",userSchema)
module.exports = User