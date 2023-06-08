import Product from "../model/ProductModal.js";

const getAllProduct = async (req, res) => {
  try {
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    const allProduct = await Product.find({
      employee_id: employee_id,
      employee_email: employee_email,
    });
    return res.status(200).json(allProduct);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getProduct = async (req, res) => {
  try {
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const product_id = req.body.product_id;

    const allProduct = await Product.find({
      employee_id: employee_id,
      employee_email: employee_email,
      _id: product_id,
    });
    return res.status(200).json(allProduct);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const addProduct = async (req, res) => {
  try {
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    console.log("addproduct", req.body);

    const newProduct = new Product(req.body);
    await newProduct.save();

    return res.status(200).json(newProduct);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const editProduct = async (req, res) => {
  try {
    console.log("editProduct", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const product_id = req.body.product_id;

    const updatedProduct = await Product.updateOne({
      employee_id: employee_id,
      employee_email: employee_email,
      _id: product_id,
    }, req.body);

    console.log("Product updated", updatedProduct);
    return res.status(200).json({ message: "product updated successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    console.log("deleteProduct", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const product_id = req.body.product_id;

    const deletedProduct = await Product.deleteOne({
      employee_id: employee_id,
      employee_email: employee_email,
      _id: product_id,
    });
    console.log("product deleted", deletedProduct);
    return res.status(200).json({ message: "product deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export { getAllProduct, getProduct, addProduct, deleteProduct, editProduct };
