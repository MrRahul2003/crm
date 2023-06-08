import mongoose from "mongoose";

// note Schema
const PurchaseOrderSchema = new mongoose.Schema({
  employee_id: {
    type: String,
  },
  employee_email: {
    type: String,
  },
  uuid_id: {
    type: String,
  },
  purchaseorder_contact_id: {
    type: String,
  },
  enquiry_id: {
    type: String,
  },
  quotation_id: {
    type: String,
  },
  vendor_id: {
    type: String,
  },
  vendor_email: {
    type: String,
  },
  purchaseorder_addingdate: {
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

const PurchaseOrder = mongoose.model("PurchaseOrder", PurchaseOrderSchema);
export default PurchaseOrder;
