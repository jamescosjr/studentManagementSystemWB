import { generateId } from '../utils/generateId.js';
import { inscriptionGenerator } from '../utils/generateInscription.js';


export let students = [];

export function create(student) {
    const id = generateId();
    const inscription = inscriptionGenerator(student.course);
    const newStudent = { ...student, inscription, id };
    students.push(newStudent);
    return newStudent;
};

export function findAll() { return students };

export function findByName(name){ return students.find(student => student.name === name) };

export function findByInscription(inscription) { return students.find(student => student.inscription === inscription) };

export function findByCourse(course) { return students.filter(student => student.course === course) };

export function deleteById(id) {
    const index = students.findIndex(student => student.id === id);
    if (index !== -1) {
        return students.splice(index, 1)[0];
    }
    return null;
};

export function updateById(id, updatedStudent) {
    const index = students.findIndex(student => student.id === id);
    if (index === -1) {
        return null;
    }

    if (updatedStudent.course && updatedStudent.course !== students[index].course) {
        updatedStudent.inscription = inscriptionGenerator(updatedStudent.course);
    }

    students[index] = { ...students[index], ...updatedStudent };

    return students[index];
}