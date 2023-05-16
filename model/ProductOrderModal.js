import mongoose from "mongoose";

// note Schema
const ProductOrderSchema = new mongoose.Schema({
  employee_id: {
    type: String,
  },
  employee_email: {
    type: String,
  },
  uuid_id: {
    type: String,
  },
  productorder_contact_id: {
    type: String,
  },
  enquiry_id: {
    type: String,
  },  
  productorder_addingdate: {
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

const ProductOrder = mongoose.model("ProductOrder", ProductOrderSchema);
export default ProductOrder;
