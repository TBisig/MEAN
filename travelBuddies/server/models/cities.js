var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CitySchema = new Schema({
    name: {type:String, required:true, default: ""},
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    _joiners: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true});

mongoose.model("City", CitySchema)