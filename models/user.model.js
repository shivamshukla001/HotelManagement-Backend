import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    check_in_date: {
        type: Date,
        required: true
    },
    check_out_date: {
        type: Date,
        required: true
    },
    number_of_guest: {
        type: Number,
        required: true
    },
    adults: {
        type: Number,
        required: true
    },
    children: {
        type: Number,
        default: 0
    },
    room_type: {
        type: String,
        required: true
    },
    number_of_rooms: {
        type: Number,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    message: {
        type: String,
       default: ""
    },
    id_proof_path: {
    type: String,
    default: ""
}
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User
