import mongoose from 'mongoose';

const InstitutionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },

});

export default mongoose.model('Institution', InstitutionSchema);