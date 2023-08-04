import CustomerPayment from "../model/CustomerPaymentModal.js";
import CustomerTaxInvoice from "../model/CustomerTaxInvoice.js";

const addCustomerTaxInvoice = async (req, res) => {
  try {
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    console.log("addCustomerTaxInvoice", req.body);

    const newCustomerTaxInvoice = new CustomerTaxInvoice(req.body);
    await newCustomerTaxInvoice.save();

    return res.status(200).json(newCustomerTaxInvoice);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const getCustomerTaxInvoice = async (req, res) => {
  console.log(req.body);
  try {
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const customer_id = req.body.customer_id;
    const enquiry_id = req.body.enquiry_id;
    const quotation_id = req.body.quotation_id;

    const Invoice = await CustomerTaxInvoice.find({
      employee_id: employee_id,
      employee_email: employee_email,
      customer_id: customer_id,
      enquiry_id: enquiry_id,
      quotation_id: quotation_id,
    });
    return res.status(200).json(Invoice);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getallCustomerTaxInvoice = async (req, res) => {
  console.log(req.body);
  try {
    const Invoice = await CustomerTaxInvoice.find();
    return res.status(200).json(Invoice);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteCustomerTaxInvoice = async (req, res) => {
  try {
    console.log("deleteCustomerTaxInvoice", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    const customer_id = req.body.customer_id;
    const quotation_id = req.body.quotation_id;
    const invoice_id = req.body.invoice_id;

    const deletedInvoice = await CustomerTaxInvoice.deleteOne({
      employee_id: employee_id,
      employee_email: employee_email,

      customer_id: customer_id,
      quotation_id: quotation_id,
      _id: invoice_id,
    });
    console.log("deleteCustomerTaxInvoice deleted", deletedInvoice);
    return res
      .status(200)
      .json({ message: "deleteCustomerTaxInvoice deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const addCustomerPaymentData = async (req, res) => {
  try {
    console.log("addCustomerPaymentData", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const InvoiceInfo_id = req.body.InvoiceInfo_id;
    const quotation_id = req.body.quotation_id;
    const purchaseorder_id = req.body.purchaseorder_id;

    // const userExistStudent = await Student.findOne({ _id: student_id });
    const TaxInvoiceExist = await CustomerPayment.findOne({
      employee_id: employee_id,
      employee_email: employee_email,
      InvoiceInfo_id: InvoiceInfo_id,
      quotation_id: quotation_id,
      purchaseorder_id: purchaseorder_id,
    });

    if (TaxInvoiceExist) {
      console.log("TaxInvoice Exists");

      // if TaxInvoice exists then we will add the payment data inside the array of it
      const updatePayment = await CustomerPayment.updateOne(
        {
          employee_id: employee_id,
          employee_email: employee_email,
          InvoiceInfo_id: InvoiceInfo_id,
          quotation_id: quotation_id,
          purchaseorder_id: purchaseorder_id,
        },
        {
          $push: {
            customerpayments: req.body,
          },
        }
      );
      console.log("customerpayments updated successfully", updatePayment);

      return res
        .status(200)
        .json({ message: "customerpayments updated successfully" });
    } else {
      console.log("TaxInvoice dont exists");
      // if taxinvoice field document is not found then create one and then later update it later
      const newTaxInvoicePayment = new CustomerPayment({
        employee_id: employee_id,
        employee_email: employee_email,
        InvoiceInfo_id: InvoiceInfo_id,
        quotation_id: quotation_id,
        purchaseorder_id: purchaseorder_id,
      });
      await newTaxInvoicePayment.save();
      console.log(
        "new newTaxInvoicePayment added successfully",
        newTaxInvoicePayment
      );

      // if taxinvoce not exists then after creating it we will add the payments inside the array of it
      const updatePayment = await CustomerPayment.updateOne(
        {
          employee_id: employee_id,
          employee_email: employee_email,
          InvoiceInfo_id: InvoiceInfo_id,
          quotation_id: quotation_id,
          purchaseorder_id: purchaseorder_id,
        },
        {
          $push: {
            customerpayments: req.body,
          },
        }
      );
      console.log("customerpayments updated successfully", updatePayment);

      return res
        .status(200)
        .json({ message: "customerpayments added & updated successfully" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const getallCustomerPaymentData = async (req, res) => {
  console.log(req.body);
  try {
    const Payments = await CustomerPayment.find();
    return res.status(200).json(Payments);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getCustomerPaymentData = async (req, res) => {
  console.log(req.body);
  try {
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const InvoiceInfo_id = req.body.InvoiceInfo_id;
    const quotation_id = req.body.quotation_id;
    const purchaseorder_id = req.body.purchaseorder_id;

    const Invoice = await CustomerPayment.findOne({
      employee_id: employee_id,
      employee_email: employee_email,
      InvoiceInfo_id: InvoiceInfo_id,
      quotation_id: quotation_id,
      purchaseorder_id: purchaseorder_id,
    });
    return res.status(200).json(Invoice);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteCustomerPayments = async (req, res) => {
  try {
    console.log("deleteCustomerPayment", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const InvoiceInfo_id = req.body.InvoiceInfo_id;
    const quotation_id = req.body.quotation_id;
    const payment_id = req.body.payment_id;
    const purchaseorder_id = req.body.purchaseorder_id;

    const deletedInvoice = await CustomerPayment.updateOne(
      {
        employee_id: employee_id,
        employee_email: employee_email,
        InvoiceInfo_id: InvoiceInfo_id,
        quotation_id: quotation_id,
        purchaseorder_id: purchaseorder_id,
      },
      {
        $pull: { customerpayments: { _id: payment_id } },
      }
    );
    console.log("deleteCustomerPayment deleted", deletedInvoice);
    return res
      .status(200)
      .json({ message: "deleteCustomerPayment deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export {
  addCustomerTaxInvoice,
  getCustomerTaxInvoice,
  deleteCustomerTaxInvoice,
  getallCustomerTaxInvoice,
  getallCustomerPaymentData,
  addCustomerPaymentData,
  getCustomerPaymentData,
  deleteCustomerPayments,
};
