import { createStudentHandler, listStudentsHandler, findStudentByNameHandler, findStudentByInscriptionHandler, listStudentsByCourseHandler, deleteStudentHandler, updateStudentHandler } from '../../controllers/studentController.js';
import * as studentService from '../../service/studentService.js';

const logSpy = jest.spyOn(console, 'log').mockImplementation();
const errorSpy = jest.spyOn(console, 'error').mockImplementation();

afterEach(() => {
    jest.clearAllMocks();
});

describe('Student Handlers', () => {
    it('should log success message when register a student', () => {
        const mockStudent = { name: 'Test Name', course: 'Test Course', year: 2022 };
        jest.spyOn(studentService, 'createStudent').mockReturnValue(mockStudent);

        createStudentHandler(mockStudent);

        expect(logSpy).toHaveBeenCalledWith('Student registered successfully:', mockStudent);
    });   

    it('should log error message when registering a student fails', () => {
        jest.spyOn(studentService, 'createStudent').mockImplementation(() => {
            throw new Error('Creation Error');
        });

        createStudentHandler({ name: 'Test Name', course: 'Test Course', year: 2022 });

        expect(errorSpy).toHaveBeenCalledWith('Error registering student:', 'Creation Error');
    });

    it('should list all students', () => {
        const mockStudents = [{ name: 'Test Name', course: 'Test Course', year: 2022 }];
        jest.spyOn(studentService, 'listStudents').mockReturnValue(mockStudents);
    
        listStudentsHandler();
    
        expect(logSpy).toHaveBeenCalledWith('Students:', mockStudents);
    });

    it('should find a student by name', () => {
        const mockStudent = { name: 'Test Name', course: 'Test Course', year: 2022 };
        jest.spyOn(studentService, 'findStudentByName').mockReturnValue(mockStudent);
    
        findStudentByNameHandler('Test Name');
    
        expect(logSpy).toHaveBeenCalledWith('Student found:', mockStudent);
    });
    
    it('should log not found message if student is not found', () => {
        jest.spyOn(studentService, 'findStudentByName').mockReturnValue(null);
    
        findStudentByNameHandler('Nonexistent Name');
    
        expect(logSpy).toHaveBeenCalledWith('Student not found');
    });

    it('should find a student by inscription', () => {
        const mockStudent = { name: 'Test Name', course: 'Test Course', year: 2022 };
        jest.spyOn(studentService, 'findStudentByInscription').mockReturnValue(mockStudent);
    
        findStudentByInscriptionHandler('Test Name');
    
        expect(logSpy).toHaveBeenCalledWith('Student found:', mockStudent);
    });

    it('should log not found message if student is not found by inscription', () => {
        jest.spyOn(studentService, 'findStudentByInscription').mockReturnValue(null);

        findStudentByInscriptionHandler('Nonexistent Name');

        expect(logSpy).toHaveBeenCalledWith('Student not found');
    });

    it('should list students by course', () => {
        const mockStudents = [{ name: 'Test Name', course: 'Test Course', year: 2022 }];
        jest.spyOn(studentService, 'findStudentByCourse').mockReturnValue(mockStudents);

        listStudentsByCourseHandler('Test Course');

        expect(logSpy).toHaveBeenCalledWith('Students found:', mockStudents);
    });
    
    it('should delete a student by id', () => {
        const mockStudent = { name: 'Test Name', course: 'Test Course', year: 2022, id: 1 };
        jest.spyOn(studentService, 'deleteStudentById').mockReturnValue(mockStudent);

        deleteStudentHandler(1);

        expect(logSpy).toHaveBeenCalledWith('Student deleted successfully:', mockStudent);
    });

    it('should log not found message if student to delete is not found', () => {
        jest.spyOn(studentService, 'deleteStudentById').mockReturnValue(null);
    
        deleteStudentHandler(999);
    
        expect(logSpy).toHaveBeenCalledWith('Student not found, nothing to delete.');
    });
    
    it('should log error message when deleting a student fails', () => {
        jest.spyOn(studentService, 'deleteStudentById').mockImplementation(() => {
            throw new Error('Deletion Error');
        });
    
        deleteStudentHandler(1);
    
        expect(errorSpy).toHaveBeenCalledWith('Error deleting student:', 'Deletion Error');
    });

    it('should update a student by id', () => {
        const mockStudent = { name: 'Test Name', course: 'Test Course', year: 2022, id: 1 };
        jest.spyOn(studentService, 'updateStudentById').mockReturnValue(mockStudent);

        updateStudentHandler(1, mockStudent);

        expect(logSpy).toHaveBeenCalledWith('Student updated successfully:', mockStudent);
    });

    it('should log not found message if student to update is not found', () => {
        jest.spyOn(studentService, 'updateStudentById').mockReturnValue(null);

        updateStudentHandler(999, { name: 'Test Name', course: 'Test Course', year: 2022 });

        expect(logSpy).toHaveBeenCalledWith('Student not found, nothing to update.');
    });
});
