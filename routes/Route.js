import express from "express";
const router = express.Router();

// adding cookieparser for fetching token
import cookieParser from "cookie-parser";
router.use(cookieParser());

// middleware
import { storage, upload } from "../middleware/BillMiddleware.js";

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
  editProduct,
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
  getVendorName,
} from "../controller/VendorController.js";
import { addLogin, addSignin } from "../controller/LoginController.js";
import {
  getAllQuotation,
  getQuotation,
  addQuotation,
  deleteQuotation,
  editQuotation,
} from "../controller/QuotationController.js";

import {
  addPurchaseOrder,
  addVendorBill,
  downloadVendorBill,
  getAllPurchaseOrder,
  getVendorBill,
  purchaseordergen,
  sendPurchaseorderMail,
} from "../controller/PurchaseOrderController.js";
import {
  addProductOrder,
  addTaxInvoice,
  deleteTaxInvoice,
  downloadChallan,
  downloadTaxInvoice,
  getAllProductOrder,
  getEnquiryProductOrder,
  getTaxInvoice,
  pdfgenChallan,
  pdfgenProduct,
  pdfgenTaxInvoice,
  sendMailChallan,
  sendMailProduct,
  sendMailTaxInvoice,
} from "../controller/ProductOrderController.js";
import {
  addPaymentPurchaseOrder,
  getPaymentPurchaseOrder,
} from "../controller/PurchaseOrderpayment.js";
import { addPaymentProductOrder, getPaymentProductOrder } from "../controller/ProductOrderPayment.js";
import { addVendorPaymentData, addVendorTaxInvoice, deleteVendorPayments, deleteVendorTaxInvoice, getVendorPaymentData, getVendorTaxInvoice, getallVendorPaymentData, getallVendorTaxInvoice } from "../controller/VendorTaxInvoice.js";
import { addCustomerPaymentData, addCustomerTaxInvoice, deleteCustomerPayments, deleteCustomerTaxInvoice, getCustomerPaymentData, getCustomerTaxInvoice, getallCustomerPaymentData, getallCustomerTaxInvoice } from "../controller/CustomerTaxInvoice.js";

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
route.post("/vendor/getvendorname", getVendorName);
route.post("/vendor/editvendor", editVendor);
route.post("/vendor/deletevendor", deleteVendor);

// authentication
route.post("/authentication/login", addLogin);
route.post("/authentication/signin", addSignin);

// quotation
route.post("/quotation/addquotation", addQuotation);
route.post("/quotation/getallquotation", getAllQuotation);
route.post("/quotation/getquotation", getQuotation);
route.post("/quotation/editquotation", editQuotation);
route.post("/quotation/deletequotation", deleteQuotation);

// purchase order
route.post("/purchaseorder/addpurchaseorder", addPurchaseOrder);
route.post("/purchaseorder/getallpurchaseorder", getAllPurchaseOrder);

// purchase order payment
route.post("/purchaseorder/addpayment", addPaymentPurchaseOrder);
route.post("/purchaseorder/getpayment", getPaymentPurchaseOrder);

// taxinvoice payment
route.post("/purchaseorder/vendorpayment/addtaxinvoicepayment", addVendorPaymentData);
route.post("/purchaseorder/vendorpayment/getalltaxinvoicepayment", getallVendorPaymentData);
route.post("/purchaseorder/vendorpayment/gettaxinvoicepayment", getVendorPaymentData);
route.post("/purchaseorder/vendorpayment/deletetaxinvoicepayment", deleteVendorPayments);

// product order
route.post("/productorder/addproductorder", addProductOrder);
route.post("/productorder/getallproductorder", getAllProductOrder);
route.post("/productorder/getproductorder", getEnquiryProductOrder);
route.post("/productorder/addtaxinvoice", addTaxInvoice);
route.post("/productorder/gettaxinvoice", getTaxInvoice);
route.post("/productorder/deletetaxinvoice", deleteTaxInvoice);

// product order payment
route.post("/productorder/addpayment", addPaymentProductOrder);
route.post("/productorder/getpayment", getPaymentProductOrder);

//pdf generator -- enquiry
route.post("/enquiry/genenquiry", pdfgen);
route.post("/enquiry/sendenquiry", sendMail);

//pdf generator -- purchaseorder
route.post("/purchaseorder/genpurchaseorder", purchaseordergen);
route.post("/purchaseorder/sendpurchaseorder", sendPurchaseorderMail);
route.post(
  "/purchaseorder/addvendorbill",
  upload.single(["Bill"]),
  addVendorBill
);
route.post("/purchaseorder/getvendorbill", getVendorBill);
route.post("/purchaseorder/downloadvendorbill", downloadVendorBill);

// taxinvoice vendor
route.post("/purchaseorder/addvendortaxinvoice", addVendorTaxInvoice);
route.post("/purchaseorder/getvendortaxinvoice", getVendorTaxInvoice);
route.post("/purchaseorder/getallvendortaxinvoice", getallVendorTaxInvoice);
route.post("/purchaseorder/deletevendortaxinvoice", deleteVendorTaxInvoice);

//pdf generator -- productorder
route.post("/productorder/genproductorder", pdfgenProduct);
route.post("/productorder/sendproductorder", sendMailProduct);

//pdf generator -- Tax invoice -- Challan
route.post("/productorder/genpdftaxinvoice", pdfgenTaxInvoice);
route.post("/productorder/sendmailtaxinvoice", sendMailTaxInvoice);
route.post("/productorder/downloadtaxinvoice", downloadTaxInvoice);

route.post("/productorder/genpdfchallan", pdfgenChallan);
route.post("/productorder/sendmailchallan", sendMailChallan);
route.post("/productorder/downloadchallan", downloadChallan);

// taxinvoice customer
route.post("/productorder/addcustomertaxinvoice", addCustomerTaxInvoice);
route.post("/productorder/getcustomertaxinvoice", getCustomerTaxInvoice);
route.post("/productorder/getallcustomertaxinvoice", getallCustomerTaxInvoice);
route.post("/productorder/deletecustomertaxinvoice", deleteCustomerTaxInvoice);

// taxinvoice payment
route.post("/productorder/customerpayment/addtaxinvoicepayment", addCustomerPaymentData);
route.post("/productorder/customerpayment/getalltaxinvoicepayment", getallCustomerPaymentData);
route.post("/productorder/customerpayment/gettaxinvoicepayment", getCustomerPaymentData);
route.post("/productorder/customerpayment/deletetaxinvoicepayment", deleteCustomerPayments);

export default route;
