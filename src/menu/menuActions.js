import promptSync from 'prompt-sync';
import { createStudentHandler, listStudentsHandler, findStudentByNameHandler, findStudentByInscriptionHandler, listStudentsByCourseHandler, deleteStudentHandler, updateStudentHandler } from '../controllers/studentController.js';


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

export function updateStudent() {
    const id = prompt('Enter the student ID to update: ');

    const name = prompt('Enter the new student name (leave blank to keep current): ');
    const course = prompt('Enter the new student course (leave blank to keep current): ');
    const year = prompt('Enter the new student year (leave blank to keep current): ');

    const updatedStudent = {};
    if (name) updatedStudent.name = name;
    if (course) updatedStudent.course = course;
    if (year) updatedStudent.year = parseInt(year, 10);

    updateStudentHandler(id, updatedStudent);
}