import express from "express";
const router = express.Router();

// adding cookieparser for fetching token
import cookieParser from "cookie-parser";
router.use(cookieParser());

// controllers
import {
  addCompany,
  getAllCompanys,
  getCompany,
  editcompany,
  deleteCompany,
} from "../controller/CompanyController.js";
import {
  addContact,
  getAllContacts,
  getContact,
  editcontact,
  deleteContact,
} from "../controller/ContactController.js";
import {
  addCompanyNote,
  getAllCompanyNotes,
  getCompanyNote,
  deleteCompanyNote,
} from "../controller/CompanyNotesController.js";
import {
  addContactNote,
  getAllContactNotes,
  getContactNote,
  deleteContactNote,
} from "../controller/ContactNotesController.js";
import {
  addProduct,
  getProduct,
  getAllProduct,
  deleteProduct,
  editProduct
} from "../controller/ProductController.js";
import {
  addSubProduct,
  getAllSubProducts,
  getSubProduct,
  getSomeSubProduct,
  deleteSubProduct,
  deleteEntireSubProduct,
  editSubProduct,
} from "../controller/SubProductController.js";
import {
  pdfgen,
  addEnquiry,
  deleteEnquiry,
  getAllEnquiry,
  getPipelineEnquiry,
  editenquiry,
  sendMail,
} from "../controller/EnquiryController.js";
import {
  getAllVendor,
  getVendor,
  addVendor,
  deleteVendor,
  editVendor,
} from "../controller/VendorController.js";
import { addLogin, addSignin } from "../controller/LoginController.js";
import {
  getAllQuotation,
  getQuotation,
  addQuotation,
  deleteQuotation,
  editQuotation,
} from "../controller/QuotationController.js";
import { purchaseordergen, sendPurchaseorderMail } from "../controller/PurchaseOrderController.js";
import { pdfgenProduct, sendMailProduct } from "../controller/ProductOrderController.js";

const route = express.Router();

// company
route.post("/company/addcompany", addCompany);
route.post("/company/getallcompanies", getAllCompanys);
route.post("/company/getcompany", getCompany);
route.post("/company/editcompany", editcompany);
route.post("/company/deletecompany", deleteCompany);

// contact
route.post("/contact/addcontact", addContact);
route.post("/contact/getallcontacts", getAllContacts);
route.post("/contact/getcontact", getContact);
route.post("/contact/editcontact", editcontact);
route.post("/contact/deletecontact", deleteContact);

// company notes
route.post("/companynotes/addcompanynotes", addCompanyNote);
route.post("/companynotes/getallcompaniesnotes", getAllCompanyNotes);
route.post("/companynotes/getcompanynotes", getCompanyNote);
route.post("/companynotes/deletecompanynotes", deleteCompanyNote);

// contact notes
route.post("/contactnotes/addcontactnotes", addContactNote);
route.post("/contactnotes/getallcontactnotes", getAllContactNotes);
route.post("/contactnotes/getcontactnotes", getContactNote);
route.post("/contactnotes/deletecontactnotes", deleteContactNote);

// product
route.post("/product/addproduct", addProduct);
route.post("/product/getallproduct", getAllProduct);
route.post("/product/getproduct", getProduct);
route.post("/product/addproduct", addProduct);
route.post("/product/deleteproduct", deleteProduct);
route.post("/product/editproduct", editProduct);

// sub product
route.post("/subproduct/addsubproduct", addSubProduct);
route.post("/subproduct/getallsubproduct", getAllSubProducts);
route.post("/subproduct/getsubproduct", getSubProduct);
route.post("/subproduct/getsomesubproduct", getSomeSubProduct);
route.post("/subproduct/deletesubproduct", deleteSubProduct);
route.post("/subproduct/deleteentiresubproduct", deleteEntireSubProduct);
route.post("/subproduct/editsubproduct", editSubProduct);

// enquiry
route.post("/enquiry/addenquiry", addEnquiry);
route.post("/enquiry/getallenquiry", getAllEnquiry);
route.post("/enquiry/deleteenquiry", deleteEnquiry);
route.post("/enquiry/getpipelineenquiry", getPipelineEnquiry);
route.post("/enquiry/editenquiry", editenquiry);
// route.post("/enquiry/sendenquiry", sendMail);

// vendor
route.post("/vendor/addvendor", addVendor);
route.post("/vendor/getallvendors", getAllVendor);
route.post("/vendor/getvendor", getVendor);
route.post("/vendor/editvendor", editVendor);
route.post("/vendor/deletevendor", deleteVendor);

// authentication
route.post("/authentication/login", addLogin);
route.post("/authentication/signin", addSignin);

// quotation
route.post("/quotation/addquotation", addQuotation);
route.post("/quotation/getquotation", getQuotation);
route.post("/quotation/editquotation", editQuotation);
route.post("/quotation/deletequotation", deleteQuotation);

//pdf generator -- enquiry
route.post("/enquiry/genenquiry", pdfgen);
route.post("/enquiry/sendenquiry", sendMail);

//pdf generator -- purchaseorder
route.post("/purchaseorder/genpurchaseorder", purchaseordergen);
route.post("/purchaseorder/sendpurchaseorder", sendPurchaseorderMail);

//pdf generator -- productorder
route.post("/productorder/genproductorder", pdfgenProduct);
route.post("/productorder/sendproductorder", sendMailProduct);

export default route;
