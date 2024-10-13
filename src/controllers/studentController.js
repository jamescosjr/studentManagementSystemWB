import {
  create,
  findAll,
  findByName,
  findByInscription,
  findByCourse,
  deleteById,
  updateById,
} from "../repository/studentRepository.js";
import { validStudentData } from "../utils/validation.js";

export async function createStudentHandler(req, res) {
    const student = req.body;
    const validStudant = validStudentData(student);
      
    if (!validStudant) {
      return res.status(400).json("Invalid student data");
    }
  
    try {
      const newStudent = await create(student);
      res.status(201).json(newStudent);
    } catch (error) {
      res.status(500).json(`Error creating student: ${error.message}`);
    }
  }

export async function listStudentsHandler(req, res) {
  try {
    const students = await findAll();
    res.status(200).send(students);
  } catch (error) {
    res.status(500).send("Error listing students:", error.message);
  }
}

export async function findStudentByNameHandler(req, res) {
  try {
    const name = req.params.name;
    const student = await findByName(name);

    if (!student) {
      return res.status(404).send("Student not found");
    }

    res.status(200).send(student);
  } catch (error) {
    res.status(500).send("Error finding student:", error.message);
  }
}

export async function findStudentByInscriptionHandler(req, res) {
  try {
    const inscription = req.params.inscription;
    const student = await findByInscription(inscription);

    if (!student) {
      return res.status(404).send("Student not found");
    }

    res.status(200).send(student);
  } catch (error) {
    res.status(500).send("Error finding student:", error.message);
  }
}

export async function listStudentsByCourseHandler(req, res) {
  try {
    const course = req.params.course;
    const students = await findByCourse(course);

    if (!students || students.length === 0) {
      return res.status(404).send("Students not found");
    }

    res.status(200).send(students);
  } catch (error) {
    res.status(500).send("Error finding students:", error.message);
  }
}

export async function deleteStudentHandler(req, res) {
  try {
    const id = req.params.id;
    const student = await deleteById(id);

    if (!student) {
      return res.status(404).send("Student not found");
    }

    res.status(200).send("Student deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting student:", error.message);
  }
}

export async function updateStudentHandler(req, res) {
  try {
    const id = req.params.id;
    const student = req.body;
    const updatedStudent = await updateById(id, student);

    if (!updatedStudent) {
      return res.status(404).send("Student not found");
    }

    res.status(200).send(updatedStudent);
  } catch (error) {
    res.status(500).send("Error updating student:", error.message);
  }
}
