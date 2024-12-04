const{Schema,model}=require('mongoose');
const programSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
  });

const ProgramModel=model('program',ProgramSchema);
module.exports=ProgramModel;
