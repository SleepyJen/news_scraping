const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        default: 'Anonymous'
    },
    Date: {
        type: Date,
        default: Date.now()
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'News'
    }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;