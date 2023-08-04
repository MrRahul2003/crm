import mongoose from "mongoose";

// note Schema
const CustomerPaymentSchema = new mongoose.Schema({
  employee_id: {
    type: String,
  },
  employee_email: {
    type: String,
  },
  InvoiceInfo_id: {
    type: String,
  },
  quotation_id: {
    type: String,
  },
  purchaseorder_id: {
    type: String,
  },

  customerpayments: [
    {
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
      quotation_id: {
        type: String,
      },
      purchaseorder_id: {
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
      },
    },
  ],
});

const CustomerPayment = mongoose.model("CustomerPayment", CustomerPaymentSchema);
export default CustomerPayment;
