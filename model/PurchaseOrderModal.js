import mongoose from "mongoose";

// note Schema
const PurchaseorderSchema = new mongoose.Schema({
  employee_id: {
    type: String,
  },
  employee_email: {
    type: String,
  },
  purchaseorder_contact_id: {
    type: String,
  },
  enquiry_id: {
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

const Purchaseorder = mongoose.model("Purchaseorder", PurchaseorderSchema);
export default Purchaseorder;
