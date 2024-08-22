import { createBook, listBooks, getBookById, updateBook, deleteBook, books } from '../../service/bookService.js';
import { generateMockBook } from '../../utils/mockBooks.js';

describe('Book Service', () => {
    beforeEach(() => {
        books.length = 0;
    });

    it('should create a valid book', () => {
        const mockBook = generateMockBook();
        const createdBook = createBook(mockBook.title, mockBook.author, mockBook.year, mockBook.gender);

        expect(createdBook).toEqual(expect.objectContaining({
            id: expect.any(String),
            title: mockBook.title,
            author: mockBook.author,
            year: mockBook.year,
            gender: mockBook.gender,
        }));
    });

    it('should list all books', () => {
        const mockBook1 = generateMockBook();
        const mockBook2 = generateMockBook();
        createBook(mockBook1.title, mockBook1.author, mockBook1.year, mockBook1.gender);
        createBook(mockBook2.title, mockBook2.author, mockBook2.year, mockBook2.gender);

        const allBooks = listBooks();
        expect(allBooks).toHaveLength(2);
        expect(allBooks).toEqual(expect.arrayContaining([
            expect.objectContaining({ title: mockBook1.title }),
            expect.objectContaining({ title: mockBook2.title })
        ]));
    });

    it('should get a book by ID', () => {
        const mockBook = generateMockBook();
        const createdBook = createBook(mockBook.title, mockBook.author, mockBook.year, mockBook.gender);

        const foundBook = getBookById(createdBook.id);
        expect(foundBook).toEqual(createdBook);
    });

    it('should update a book', () => {
        const mockBook = generateMockBook();
        const createdBook = createBook(mockBook.title, mockBook.author, mockBook.year, mockBook.gender);

        const updatedBook = updateBook(createdBook.id, 'New Title', 'New Author', 2022, 'New Gender');
        expect(updatedBook).toEqual(expect.objectContaining({
            id: createdBook.id,
            title: 'New Title',
            author: 'New Author',
            year: 2022,
            gender: 'New Gender',
        }));
    });

    it('should delete a book', () => {
        const mockBook = generateMockBook();
        const createdBook = createBook(mockBook.title, mockBook.author, mockBook.year, mockBook.gender);

        const deletedBook = deleteBook(createdBook.id);
        expect(deletedBook).toEqual(createdBook);
        expect(listBooks()).toHaveLength(0);
    });
});