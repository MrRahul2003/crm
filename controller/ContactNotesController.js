// Modal
import ContactNote from "../model/ContactNotesModal.js";

// adding a single contactNote in database
const addContactNote = async (req, res) => {
  try {
    console.log("add contactNote", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    // const userExistStudent = await Student.findOne({ _id: student_id });
    const employeeExist = await ContactNote.findOne({
      employee_id: employee_id,
      employee_email: employee_email,
    });

    if (employeeExist) {
      console.log("employee exists");

      // if contactNote exists then we will add the notes data inside the array of it
      const updateCompanies = await ContactNote.updateOne(
        { employee_id: employee_id, employee_email: employee_email },
        {
          $push: {
            notes: req.body,
          },
        }
      );
      console.log("notes updated successfully", updateCompanies);

      return res
        .status(200)
        .json({ message: "notes updated successfully" });
    } else {
      console.log("employee dont exists");
      // if contactNote field document is not found then create one and then later update it later
      const newContactNote = new ContactNote({
        employee_id: employee_id,
        employee_email: employee_email,
      });
      await newContactNote.save();
      console.log("new contactNote added successfully", newContactNote);

      // if contactNote not exists then after creating it we will add the notes inside the array of it
      const updateCompanies = await ContactNote.updateOne(
        { employee_id: employee_id, employee_email: employee_email },
        {
          $push: {
            notes: req.body,
          },
        }
      );
      console.log("contactNote added & updated successfully", updateCompanies);

      return res
        .status(200)
        .json({ message: "contactNote added & updated successfully" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// getting all notes data from database
const getAllContactNotes = async (req, res) => {
  try {
    console.log("getting all contactNotes data", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;

    const allCompanies = await ContactNote.findOne({
      employee_id: employee_id,
      employee_email: employee_email,
    });
    return res.status(200).json(allCompanies);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// getting a single contactNote data from database
const getContactNote = async (req, res) => {
  try {
    console.log("getting a single contactNote data", req.body);

    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const contactNote_id = req.body.contactNote_id;

    const allCompanies = await ContactNote.findOne(
      { employee_id: employee_id, employee_email: employee_email },
      {
        notes: { $elemMatch: { _id: contactNote_id } },
      }
    );
    console.log(allCompanies);
    return res.status(200).json(allCompanies);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// deleting a single contactNote data from database
const deleteContactNote = async (req, res) => {
  try {
    console.log("delete ContactNote", req.body);
    const employee_id = req.body.employee_id;
    const employee_email = req.body.employee_email;
    const contactNote_id = req.body.note_id;

    const deleteContactNote = await ContactNote.updateOne(
      { employee_id: employee_id, employee_email: employee_email },
      {
        $pull: { notes: { _id: contactNote_id } }
      }
    );

    console.log("deleteContactNote", deleteContactNote);

    return res.status(200).json({ message: "contactNote deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export { addContactNote, getAllContactNotes, getContactNote, deleteContactNote };
