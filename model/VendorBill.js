import mongoose from "mongoose";

// VendorBill us Schema
const VendorBillSchema = new mongoose.Schema({
  employee_id: {
    type: String,
  },
  employee_email: {
    type: String,
  },
  uuid_id: {
    type: String,
  },
  quotation_id: {
    type: String,
  },
  enquiry_id: {
    type: String,
  },
  vendor_id: {
    type: String,
  },
  vendorbill_addingdate: {
    type: String,
  },
  billName: {
    type: String,
  },
  lastmodifydate: {
    type: Date,
    default: Date.now,
  },
});

const VendorBill = mongoose.model("VendorBill", VendorBillSchema);
export default VendorBill;
