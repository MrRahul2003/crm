import PaymentPurchase from "../model/PurchaseOrderPayment.js";

const addPaymentPurchaseOrder = async (req, res) => {
    try {
      console.log("addPaymentPurchaseOrder", req.body);
  
      const newPaymentPurchaseOrder = new PaymentPurchase(req.body);
      await newPaymentPurchaseOrder.save();
  
      return res.status(200).json(newPaymentPurchaseOrder);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json(error.message);
    }
  };
  
  const getPaymentPurchaseOrder = async (req, res) => {
    try {
      console.log(req.body);
      const employee_id = req.body.employee_id;
      const employee_email = req.body.employee_email;
      const quotation_id = req.body.quotation_id;
  
      const bill = await PaymentPurchase.find({
        employee_id: employee_id,
        employee_email: employee_email,
        quotation_id: quotation_id,
      });
      return res.status(200).json(bill);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

export {addPaymentPurchaseOrder, getPaymentPurchaseOrder}