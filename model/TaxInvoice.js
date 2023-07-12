import mongoose from "mongoose";

// note Schema
const TaxInvoiceSchema = new mongoose.Schema({
  employee_id: {
    type: String,
  },
  employee_email: {
    type: String,
  },
  enquiry_contact_id: {
    type: String,
  },
  uuid_id: {
    type: String,
  },
  enquiry_id: {
    type: String,
  },  
  quotation_id: {
    type: String,
  },  
  quotation_uuid: {
    type: String,
  },  
  productorder_addingdate: {
    type: String,
  },
  purchaseordertaxinvoice_addingdate: {
    type: String,
  },
  itemList: {
    type: Array,
  },
  lastmodifydate: {
    type: Date,
    default: Date.now,
  },

  packing_charge: {
    type: String,
  },
  transport_charge: {
    type: String,
  },
  payment_terms: {
    type: String,
  },
  delivery: {
    type: String,
  },
  offer_validity: {
    type: String,
  },
  GstTypeInfo: {
    type: String,
  },
  gst_value: {
    type: String,
  },
  placeofsupply: {
    type: String,
  },
  po_no: {
    type: String,
  },
  po_date: {
    type: String,
  },
  invoice_no: {
    type: String,
  },
  invoice_date: {
    type: String,
  },
  challan_no: {
    type: String,
  },
  challan_date: {
    type: String,
  },
  vendor_no: {
    type: String,
  },

  customer_name: {
    type: String,
  },
  customer_phone: {
    type: String,
  },
  gst_no: {
    type: String,
  },

});

const TaxInvoice = mongoose.model("TaxInvoice", TaxInvoiceSchema);
export default TaxInvoice;
