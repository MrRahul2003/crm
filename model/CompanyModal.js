import mongoose from "mongoose";

// Company Schema
const CompanySchema = new mongoose.Schema({
  employee_id: {
    type: String,
  },
  employee_email: {
    type: String,
  },

  companies: [
    {
      employee_id: {
        type: String,
      },
      employee_email: {
        type: String,
      },
      company_name: {
        type: String,
      },
      company_email: {
        type: String,
      },
      company_phone: {
        type: Number,
      },
      company_website: {
        type: String,
      },
      company_description: {
        type: String,
      },
      company_street: {
        type: String,
      },
      company_city: {
        type: String,
      },
      company_state: {
        type: String,
      },
      company_country: {
        type: String,
      },
      company_code: {
        type: String,
      },
      company_addingdate: {
        type: String,
      },
      lastmodifydate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Company = mongoose.model("Company", CompanySchema);
export default Company;
