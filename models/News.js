const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-url');

const NewsSchema = new Schema({
    headline: {
        type: String
    },
    summary: {
        type: String
    },
    url: {
        type: mongoose.SchemaTypes.Url
    },
    comments:
        [{
            firstName: String,
            lastName: String,
            comment: String,
            default: []
        }
        ],

});

const News = mongoose.model("News", NewsSchema);

module.exports = News;