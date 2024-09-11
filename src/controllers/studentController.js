import { createStudent, listStudents, findStudentByName, findStudentByInscription, findStudentByCourse, deleteStudentById } from '../service/studentService.js';

export function createStudentHandler(data) {
    try {
        const student = createStudent(data);
        console.log('Student registered successfully:', student);
    } catch (error) {
        console.error('Error registering student:', error.message);
    }
};

export function listStudentsHandler() {
    const students = listStudents();
    console.log('Students:', students);
};

export function findStudentByNameHandler(name) {
    const student = findStudentByName(name);
    if (!student) {
        console.log('Student not found');
        return;
    }
    console.log('Student found:', student);
};

export function findStudentByInscriptionHandler(inscription) {
    const student = findStudentByInscription(inscription);
    if (!student) {
        console.log('Student not found');
        return;
    }
    console.log('Student found:', student);
}

export function listStudentsByCourseHandler(course) {
    const students = findStudentByCourse(course);
    if (!students.length) {
        console.log('No students found');
        return;
    }
    console.log('Students found:', students);
}

export function deleteStudentHandler(id) {
    try {
        const deletedStudent = deleteStudentById(id);
        if (!deletedStudent) {
            console.log('Student not found, nothing to delete.');
            return;
        }
        console.log('Student deleted successfully:', deletedStudent);
    } catch (error) {
        console.error('Error deleting student:', error.message);
    }
};