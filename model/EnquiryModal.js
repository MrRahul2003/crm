import mongoose from "mongoose";

// note Schema
const EnquirySchema = new mongoose.Schema({
  employee_id: {
    type: String,
  },
  employee_email: {
    type: String,
  },
  enquiry_contact_id: {
    type: String,
  },
  enquiry: [
    {
      employee_id: {
        type: String,
      },
      employee_email: {
        type: String,
      },
      enquiry_contact_id: {
        type: String,
      },
      enquiry_contact_name: {
        type: String,
      },
      
      enquiry_name: {
        type: String,
      },
      enquiry_stage: {
        type: String,
      },
      enquiry_closingDate: {
        type: String,
      },
      enquiry_description: {
        type: String,
      },
      enquiry_addingdate: {
        type: String,
      },
      itemList: {
        type: Array,
      },
      lastmodifydate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Enquiry = mongoose.model("Enquiry", EnquirySchema);
export default Enquiry;
