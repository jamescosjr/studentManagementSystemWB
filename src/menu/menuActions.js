import promptSync from 'prompt-sync';
import { createStudentHandler, listStudentsHandler, findStudentByNameHandler, findStudentByInscriptionHandler, listStudentsByCourseHandler, deleteStudentHandler } from '../controllers/studentController.js';


const prompt = promptSync({ sigint: true });

export function createStudent() {
    const name = prompt('Enter the student name: ');
    const course = prompt('Enter the student course: ');
    const year = parseInt(prompt('Enter the Student birth year: '), 10);

    createStudentHandler({ name, course, year });
};

export function listStudents() {
    listStudentsHandler();
};

export function findStudentByName() {
    const name = prompt('Enter the student name to search: ');
    findStudentByNameHandler(name);
};

export function findStudentByInscription() {
    const inscription = prompt('Enter the student inscription to search: ');
    findStudentByInscriptionHandler(inscription);
};

export function listStudentsByCourse() {
    const course = prompt('Enter the student course to search: ');
    listStudentsByCourseHandler(course);
};

export function deleteStudent() {
    const id = prompt('Enter the student ID to delete: ');
    deleteStudentHandler(id);
};