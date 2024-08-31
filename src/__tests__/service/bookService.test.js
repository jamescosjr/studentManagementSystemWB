import { createBook, listBooks, findBookByTitle, deleteBookById } from '../../service/bookService.js';
import * as bookRepository from '../../repository/bookRepository.js';

jest.mock('../../repository/bookRepository.js');

describe('Book Service', () => {
    it('should create a book', () => {
        const createdBook = { title: 'Test Title', author: 'Test Author', year: 2022, id: null };
        jest.spyOn(bookRepository, 'create').mockReturnValue(createdBook);
    
        const result = createBook({ title: 'Test Title', author: 'Test Author', year: 2022 });
    
        expect(result).toEqual(createdBook);
        expect(bookRepository.create).toHaveBeenCalledWith({ title: 'Test Title', author: 'Test Author', year: 2022, id: null });
    });

    it('should list all books', () => {
        const mockBooks = [{ title: 'Test Title', author: 'Test Author', year: 2022 }];
        bookRepository.findAll.mockReturnValue(mockBooks);

        const result = listBooks();

        expect(result).toEqual(mockBooks);
        expect(bookRepository.findAll).toHaveBeenCalled();
    });

    it('should find a book by title', () => {
        const mockBook = { title: 'Test Title', author: 'Test Author', year: 2022 };
        bookRepository.findByTitle.mockReturnValue(mockBook);

        const result = findBookByTitle('Test Title');

        expect(result).toEqual(mockBook);
        expect(bookRepository.findByTitle).toHaveBeenCalledWith('Test Title');
    });

    it('should return null if book to delete is not found', () => {
        bookRepository.deleteById.mockReturnValue(null);

        const result = deleteBookById('999');

        expect(result).toBeNull();
        expect(bookRepository.deleteById).toHaveBeenCalledWith('999');
    });

    it('should delete a book by id', () => {
        const mockBook = { title: 'Test Title', author: 'Test Author', year: 2022, id: '123' };
        bookRepository.deleteById.mockReturnValue(mockBook);

        const result = deleteBookById('123');

        expect(result).toEqual(mockBook);
        expect(bookRepository.deleteById).toHaveBeenCalledWith('123');
    });
});