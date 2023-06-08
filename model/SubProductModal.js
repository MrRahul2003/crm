import mongoose from "mongoose";

// note Schema
const SubProductSchema = new mongoose.Schema({
  employee_id: {
    type: String,
  },
  employee_email: {
    type: String,
  },
  product_id: {
    type: String,
  },
  subproduct: [
    {
      employee_id: {
        type: String,
      },
      employee_email: {
        type: String,
      },
      product_id: {
        type: String,
      },

      subproduct_name: {
        type: String,
      },
      subproduct_make: {
        type: String,
      },
      subproduct_modalNo: {
        type: String,
      },
      subproduct_partNo: {
        type: String,
      },
      subproduct_category: {
        type: String,
      },
      subproduct_price: {
        type: Number,
      },
      subproduct_desc: {
        type: String,
      },

      subproduct_addingdate: {
        type: String,
      },
      lastmodifydate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const SubProduct = mongoose.model("SubProduct", SubProductSchema);
export default SubProduct;
