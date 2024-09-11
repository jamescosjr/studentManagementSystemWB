import { createStudent, listStudents, findStudentByName, findStudentByInscription, findStudentByCourse, deleteStudentById } from '../../service/studentService.js';
import * as studentRepository from '../../repository/studentRepository.js';

jest.mock('../../repository/studentRepository.js');

describe('Student Service', () => {
    it('should create a student', () => {
        const createdStudent = { name: 'Test Name', course: 'Test Course', year: 2022, id: null };
        jest.spyOn(studentRepository, 'create').mockReturnValue(createdStudent);
    
        const result = createStudent({ name: 'Test Name', course: 'Test Course', year: 2022 });
    
        expect(result).toEqual(createdStudent);
        expect(studentRepository.create).toHaveBeenCalledWith({ name: 'Test Name', course: 'Test Course', year: 2022, id: null });
    });

    it('should list all students', () => {
        const mockStudents = [{ name: 'Test Name', course: 'Test Course', year: 2022 }];
        studentRepository.findAll.mockReturnValue(mockStudents);

        const result = listStudents();

        expect(result).toEqual(mockStudents);
        expect(studentRepository.findAll).toHaveBeenCalled();
    });

    it('should find a student by name', () => {
        const mockStudent = { name: 'Test Name', course: 'Test Course', year: 2022 };
        studentRepository.findByName.mockReturnValue(mockStudent);

        const result = findStudentByName('Test Name');

        expect(result).toEqual(mockStudent);
        expect(studentRepository.findByName).toHaveBeenCalledWith('Test Name');
    });

    it('should find a student by inscription', () => {
        const mockStudent = { name: 'Test Name', course: 'Test Course', year: 2022 };
        studentRepository.findByInscription.mockReturnValue(mockStudent);

        const result = findStudentByInscription('Test Course');

        expect(result).toEqual(mockStudent);
        expect(studentRepository.findByInscription).toHaveBeenCalledWith('Test Course');
    });

    it('should find students by course', () => {
        const mockStudents = [{ name: 'Test Name', course: 'Test Course', year: 2022 }];
        studentRepository.findByCourse.mockReturnValue(mockStudents);

        const result = findStudentByCourse('Test Course');

        expect(result).toEqual(mockStudents);
        expect(studentRepository.findByCourse).toHaveBeenCalledWith('Test Course');
    });

    it('should return null if student to delete is not found', () => {
        studentRepository.deleteById.mockReturnValue(null);

        const result = deleteStudentById('999');

        expect(result).toBeNull();
        expect(studentRepository.deleteById).toHaveBeenCalledWith('999');
    });

    it('should delete a student by id', () => {
        const mockStudent = { name: 'Test Name', course: 'Test Course', year: 2022, id: '123' };
        studentRepository.deleteById.mockReturnValue(mockStudent);

        const result = deleteStudentById('123');

        expect(result).toEqual(mockStudent);
        expect(studentRepository.deleteById).toHaveBeenCalledWith('123');
    });
});