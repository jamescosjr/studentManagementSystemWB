import { create, findAll, findByName, findByInscription, findByCourse, deleteById, students } from '../../repository/studentRepository.js';
import { generateId } from '../../utils/generateId.js';
import { inscriptionGenerator } from '../../utils/generateInscription.js';

jest.mock('../../utils/generateInscription.js');
const mockInscriptionGenerator = inscriptionGenerator;

jest.mock('../../utils/generateId.js');
const mockGenerateId = generateId;

describe('Student Repository', () => {
    beforeEach(() => {
        students.length = 0; 
        mockGenerateId.mockClear(); 
        mockInscriptionGenerator.mockClear();
    });

    it('should create a new student with a unique id and inscription', () => {
        const id = generateId();
        const inscription = inscriptionGenerator();
        const studentData = { name: 'Test Name', course: 'Test Course', year: 2022 };
        const createdStudent = create(studentData);

        expect(createdStudent).toMatchObject(studentData);
        expect(typeof createdStudent.id).toEqual(expect.any(String));
        expect(typeof createdStudent.inscription).toEqual(expect.any(String));
        expect(findAll()).toContainEqual(createdStudent);
    });

    it('should find all students', () => {
        mockGenerateId.mockReturnValueOnce('id1').mockReturnValueOnce('id2');
        const student1 = create({ name: 'Name 1', course: 'Course 1', year: 2021 });
        const student2 = create({ name: 'Name 2', course: 'Course 2', year: 2022 });

        const allStudents = findAll();
        expect(allStudents).toEqual([student1, student2]);
    });

    it('should find a student by name', () => {
        mockGenerateId.mockReturnValue('unique-id');
        mockInscriptionGenerator.mockReturnValue('unique-inscription');
        const student = create({ name: 'Unique Name', course: 'Unique Course', year: 2022 });
        const foundStudent = findByName('Unique Name');

        expect(foundStudent).toEqual(student);
    });

    it('should return undefined when finding a student by a non-existing name', () => {
        const foundStudent = findByName('Non-existing Name');

        expect(foundStudent).toBeUndefined();
    });

    it('should find a student by inscription', () => {
        mockGenerateId.mockReturnValue('unique-id');
        mockInscriptionGenerator.mockReturnValue('unique-inscription');
        const student = create({ name: 'Unique Name', course: 'Unique Course', year: 2022 });
        const foundStudent = findByInscription('unique-inscription');

        expect(foundStudent).toEqual(student);
    });

    it('should return undefined when finding a student by a non-existing inscription', () => {
        const foundStudent = findByInscription('non-existing-inscription');

        expect(foundStudent).toBeUndefined();
    });

    it('should find students by course', () => {
        mockGenerateId.mockReturnValueOnce('id1').mockReturnValueOnce('id2');
        const student1 = create({ name: 'Name 1', course: 'Course', year: 2021 });
        const student2 = create({ name: 'Name 2', course: 'Course', year: 2022 });

        const foundStudents = findByCourse('Course');
        expect(foundStudents).toEqual([student1, student2]);
    });

    it('should delete a student by id', () => {
        mockGenerateId.mockReturnValue('unique-id');
        mockInscriptionGenerator.mockReturnValue('unique-inscription');
        const student = create({ name: 'Name to Delete', course: 'Course', year: 2022 });
        const deletedStudent = deleteById(student.id);

        expect(deletedStudent).toEqual(student);
        expect(findAll()).not.toContainEqual(student);
    });

    it('should return null when deleting a student by a non-existing id', () => {
        const deletedStudent = deleteById('non-existing-id');

        expect(deletedStudent).toBeNull();
    });
});
