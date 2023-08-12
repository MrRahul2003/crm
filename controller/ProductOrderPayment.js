import PaymentProduct from "../model/ProductOrderPayment.js";

const addPaymentProductOrder = async (req, res) => {
    try {
      console.log("addPaymentProductOrder", req.body);
  
      const newPaymentProductOrder = new PaymentProduct(req.body);
      await newPaymentProductOrder.save();
  
      return res.status(200).json(newPaymentProductOrder);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json(error.message);
    }
  };
  
  const getPaymentProductOrder = async (req, res) => {
    try {
      console.log(req.body);
      const employee_id = req.body.employee_id;
      const employee_email = req.body.employee_email;
      const quotation_id = req.body.quotation_id;
  
      const bill = await PaymentProduct.find({
        employee_id: employee_id,
        employee_email: employee_email,
        quotation_id: quotation_id,
      });
      return res.status(200).json(bill);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

export {addPaymentProductOrder, getPaymentProductOrder}