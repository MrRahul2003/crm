import mongoose from "mongoose";

// contact Schema
const ContactSchema = new mongoose.Schema({
  employee_id: {
    type: String,
  },
  employee_email: {
    type: String,
  },

  contacts: [
    {
      employee_id: {
        type: String,
      },
      employee_email: {
        type: String,
      },
      contact_name: {
        type: String,
      },
      contact_email: {
        type: String,
      },
      contact_phone1: {
        type: Number,
      },
      contact_phone2: {
        type: Number,
      },
      contact_title: {
        type: String,
      },
      contact_company_id: {
        type: String,
      },
      contact_description: {
        type: String,
      },
      contact_street: {
        type: String,
      },
      contact_city: {
        type: String,
      },
      contact_state: {
        type: String,
      },
      contact_country: {
        type: String,
      },
      contact_code: {
        type: String,
      },
      contact_addingdate: {
        type: String,
      },
      contact_status: {
        type: String,
      },
      lastmodifydate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Contact = mongoose.model("Contact", ContactSchema);
export default Contact;
