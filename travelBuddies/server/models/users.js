var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: {type:String, required:true, default: ""},
    cities_added: [{type: Schema.Types.ObjectId, ref: 'City'}],
    cities_joined: [{type: Schema.Types.ObjectId, ref: 'City'}]
}, {timestamps: true});

mongoose.model("User", UserSchema)