import mongoose from "mongoose";

// note Schema
const CompanyNoteSchema = new mongoose.Schema({
  employee_id: {
    type: String,
  },
  employee_email: {
    type: String,
  },
  notes: [
    {
      employee_id: {
        type: String,
      },
      employee_email: {
        type: String,
      },
      company_id:{
        type: String,
      },
      company_name: {
        type: String,
      },
      company_email: {
        type: String,
      },
      note_title: {
        type: String,
      },
      note_desc: {
        type: String,
      },
      note_addingdate: {
        type: String,
      },
      lastmodifydate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const CompanyNote = mongoose.model("CompanyNote", CompanyNoteSchema);
export default CompanyNote;
