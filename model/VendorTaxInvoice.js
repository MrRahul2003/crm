import mongoose from "mongoose";

// note Schema
const VendorTaxInvoiceSchema = new mongoose.Schema({
  employee_id: {
    type: String,
  },
  employee_email: {
    type: String,
  },
  InvoiceNo: {
    type: String,
  },
  enquiry_contact_id: {
    type: String,
  },
  enquiry_id: {
    type: String,
  },
  vendor_id: {
    type: String,
  },
  quotation_id: {
    type: String,
  },
  Freight: {
    type: String,
  },
  packaging: {
    type: String,
  },
  taxinvoice_addingdate: {
    type: String,
  },
  GstTypeInfo: {
    type: String,
  },
  GstValue: {
    type: String,
  },
  Value: {
    type: String,
  },
  CalcTotal: {
    type: String,
  },
  lastmodifydate: {
    type: Date,
    default: Date.now,
  },
});

const VendorTaxInvoice = mongoose.model(
  "VendorTaxInvoice",
  VendorTaxInvoiceSchema
);
export default VendorTaxInvoice;
