import mongoose from 'mongoose';

// User role is one of: admin, user, guest
const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 20
        },
        password: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 100
        },
        role: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 20
        },
        image: {
            type: String,
            required: false,
            minlength: 3,
            maxlength: 50
        },
        approvedByAdmin: {
            type: Boolean,
            required: false
        }

    }    
)

var UserModel = mongoose.model("user", userSchema);



export default UserModel;


