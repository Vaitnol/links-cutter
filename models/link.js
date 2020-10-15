const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    from: {type: String, required: true},
    to: {type: String, required: true, unique: true},
    code: {type: String, required: true, unique: true},
    data: {type: Data, default: Data.now},
    clicks: {type: String, default: 0},
    owner: {type: Types.ObjectId, ref: 'User'}
});

module.exports = model('Link', schema)