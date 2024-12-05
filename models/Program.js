const{Schema,model}=require('mongoose');
const programSchema = new mongoose.Schema({
    name: { type: String, required: true , unique: true},
    description: { type: String, required: false },
    activites: { type: String, required: true },
    location: { type: String, required: true },
  });

const ProgramModel=model('program',ProgramSchema);
module.exports=ProgramModel;
