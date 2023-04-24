import mongoose from "mongoose";

// note Schema
const QuotationSchema = new mongoose.Schema({
  employee_id: {
    type: String,
  },
  employee_email: {
    type: String,
  },
  quotation_contact_id: {
    type: String,
  },
  enquiry_id: {
    type: String,
  },
  quotation_addingdate: {
    type: String,
  },
  itemList: {
    type: Array,
  },
  lastmodifydate: {
    type: Date,
    default: Date.now,
  },
});

const Quotation = mongoose.model("Quotation", QuotationSchema);
export default Quotation;
