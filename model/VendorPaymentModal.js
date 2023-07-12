import mongoose from "mongoose";

// note Schema
const VendorPaymentSchema = new mongoose.Schema({
  employee_id: {
    type: String,
  },
  employee_email: {
    type: String,
  },
  enquiry_contact_id: {
    type: String,
  },
  enquiry_id: {
    type: String,
  },
  InvoiceInfo_id: {
    type: String,
  },  
  vendor_id: {
    type: String,
  },  
  quotation_id: {
    type: String,
  },  

  mode: {
    type: String,
  },  
  bankName: {
    type: String,
  },  
  cashAmount: {
    type: String,
  },  
  chequeNo: {
    type: String,
  },  
  chequeAmount: {
    type: String,
  }, 
  neftAmount: {
    type: String,
  }, 

  GstTypeInfo: {
    type: String,
  },  
  GstValue: {
    type: String,
  },  
  Freight: {
    type: String,
  },  
  packaging: {
    type: String,
  },  
  InvoiceNo: {
    type: String,
  },  

  Value: {
    type: String,
  },  
  CalcTotal: {
    type: String,
  },  

  purchaseordertaxinvoice_addingdate: {
    type: String,
  },
  lastmodifydate: {
    type: Date,
    default: Date.now,
  }
});

const VendorPayment = mongoose.model("VendorPayment", VendorPaymentSchema);
export default VendorPayment;
