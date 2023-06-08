import mongoose from "mongoose";

// note Schema
const VendorSchema = new mongoose.Schema({
  employee_id: {
    type: String,
  },
  employee_email: {
    type: String,
  },
  vendor_name: {
    type: String,
  },
  vendor_email: {
    type: String,
  },
  vendor_phone1: {
    type: Number,
  },
  vendor_phone2: {
    type: Number,
  },
  vendor_title: {
    type: String,
  },
  vendor_company_name: {
    type: String,
  },
  vendor_description: {
    type: String,
  },
  vendor_street: {
    type: String,
  },
  vendor_city: {
    type: String,
  },
  vendor_state: {
    type: String,
  },
  vendor_country: {
    type: String,
  },
  vendor_code: {
    type: String,
  },
  vendor_addingdate: {
    type: String,
  },
  lastmodifydate: {
    type: Date,
    default: Date.now,
  },
});

const Vendor = mongoose.model("Vendor", VendorSchema);
export default Vendor;
