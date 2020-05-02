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
    context: {
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
    favoChara: [],
    friends: [friendSchema],
    driftBottle: [driftBottleSchema]
},
    { strict: false }
);

module.exports = User = mongoose.model("user", UserSchema);