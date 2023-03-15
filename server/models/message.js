import {mongoose} from 'mongoose';

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
 
      message: { 
        type: String 
      },
      from: { 
        type: String 
      },
    },{ timestamps: true }
)

export default mongoose.model('Message', MessageSchema)