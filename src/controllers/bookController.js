import { createBook, listBooks, findBookByTitle, deleteBookById } from '../service/bookService.js';

export const createBookHandler = (data) => {
    try {
        const book = createBook(data);
        console.log('Book created successfully:', book);
    } catch (error) {
        console.error('Error creating book:', error.message);
    }
};

export const listBooksHandler = () => {
    const books = listBooks();
    console.log('Books:', books);
};

export const findBookByTitleHandler = (title) => {
    const book = findBookByTitle(title);
    if (!book) {
        console.log('Book not found');
        return;
    }
    console.log('Book found:', book);
};

export const deleteBookHandler = (id) => {
    try {
        const deletedBook = deleteBookById(id);
        if (!deletedBook) {
            console.log('Book not found, nothing to delete.');
            return;
        }
        console.log('Book deleted successfully:', deletedBook);
    } catch (error) {
        console.error('Error deleting book:', error.message);
    }
};