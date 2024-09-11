import { createStudentModel } from '../models/student.js';
import { create, findAll, findByName, findByInscription, findByCourse, deleteById } from '../repository/studentRepository.js';

export function createStudent(data) {
    const student = createStudentModel(data);
    return create(student);
};

export function listStudents() { return findAll() };

export function findStudentByName(name) { return findByName(name) };

export function findStudentByInscription(inscription) { return findByInscription(inscription) };

export function findStudentByCourse(course) { return findByCourse(course) };

export function deleteStudentById(id) { return deleteById(id) };