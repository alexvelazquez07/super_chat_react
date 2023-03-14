import mongoose from "mongoose";
var Schema = mongoose.Schema

var MessageScheme = new Schema( {

    message : String,
    from : String
})

export default mongoose.model('Message', MessageScheme)