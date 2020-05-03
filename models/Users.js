const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendSchema = new Schema({
    friendName: {
        type: String,
        default: null
    },
    friendAva: {
        type: String,
        default: null
    },
    friendEmail: {
        type: String,
        default: null
    }
});

const driftBottleSchema = new Schema({
    senderId: {
        type: String
    },
    context: {
        type: String
    },
    receiverId: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const favoCharaSchema = new Schema({
    charaName: {
        type: String
    }
});

const UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    favoChara: [favoCharaSchema],
    friends: [friendSchema],
    driftBottle: [driftBottleSchema]
},
    { strict: false }
);

module.exports = User = mongoose.model("user", UserSchema);