import mongoose from "mongoose";

// note Schema
const ProductSchema = new mongoose.Schema({
  employee_id: {
    type: String,
  },
  employee_email: {
    type: String,
  },
  product_name: {
    type: String,
  },
  product_category: {
    type: String,
  },
  product_desc: {
    type: String,
  },
  product_addingdate: {
    type: String,
  },
  lastmodifydate: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
