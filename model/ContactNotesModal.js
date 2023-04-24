import mongoose from "mongoose";

// note Schema
const ContactNoteSchema = new mongoose.Schema({
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
      contact_id:{
        type: String,
      },
      contact_name: {
        type: String,
      },
      contact_email: {
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

const ContactNote = mongoose.model("ContactNote", ContactNoteSchema);
export default ContactNote;
