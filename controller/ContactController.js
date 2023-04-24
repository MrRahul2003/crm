import Contact from "../model/ContactModal.js";

// adding a single contact in database
const addContact = async (req, res) => {
  try {
    console.log("add contact", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    // const userExistStudent = await Student.findOne({ _id: student_id });
    const employeeExist = await Contact.findOne({
      employee_id: employee_id,
      employee_email: employee_email,
    });

    if (employeeExist) {
      console.log("employee exists");

      // if contact exists then we will add the contacts data inside the array of it
      const updateContacts = await Contact.updateOne(
        { employee_id: employee_id, employee_email: employee_email },
        {
          $push: {
            contacts: req.body,
          },
        }
      );
      console.log("contacts updated successfully", updateContacts);

      return res
        .status(200)
        .json({ message: "contacts updated successfully" });
    } else {
      console.log("employee dont exists");
      // if contact field document is not found then create one and then later update it later
      const newContact = new Contact({
        employee_id: employee_id,
        employee_email: employee_email,
      });
      await newContact.save();
      console.log("new contact added successfully", newContact);

      // if contact not exists then after creating it we will add the contacts inside the array of it
      const updateContacts = await Contact.updateOne(
        { employee_id: employee_id, employee_email: employee_email },
        {
          $push: {
            contacts: req.body,
          },
        }
      );
      console.log("contact added & updated successfully", updateContacts);

      return res
        .status(200)
        .json({ message: "contact added & updated successfully" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// getting all contacts data from database
const getAllContacts = async (req, res) => {
  try {
    console.log("getting all contacts data", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    const allContacts = await Contact.findOne({
      employee_id: employee_id,
      employee_email: employee_email,
    });
    return res.status(200).json(allContacts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// getting a single contact data from database
const getContact = async (req, res) => {
  try {
    console.log("getting a single contact data", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const contact_id = req.body.contact_id;

    const allContacts = await Contact.findOne(
      { employee_id: employee_id, employee_email: employee_email },
      {
        contacts: { $elemMatch: { _id: contact_id } },
      }
    );
    console.log(allContacts);
    return res.status(200).json(allContacts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }

};

// editting a single contact data from database
const editcontact = async (req, res) => {
  try {
    console.log("edit contact", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const contact_id = req.body._id;

    const updateContact = await Contact.updateOne(
      { employee_id: employee_id, employee_email: employee_email, "contacts._id": contact_id },
      {
        $set: {
          "contacts.$": req.body,
        },
      }
    );

    console.log("updateContact", updateContact);

    return res.status(200).json({ message: "contact updated successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// deleting a single contact data from database
const deleteContact = async (req, res) => {
  try {
    console.log("delete Contact", req.body);
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const contact_id = req.body.contact_id;

    const deleteContact = await Contact.updateOne(
      { employee_id: employee_id, employee_email: employee_email },
      {
        $pull: { contacts: { _id: contact_id } }
      }
    );

    console.log("deleteContact", deleteContact);

    return res.status(200).json({ message: "contact deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export { addContact, getAllContacts, getContact, editcontact, deleteContact };
