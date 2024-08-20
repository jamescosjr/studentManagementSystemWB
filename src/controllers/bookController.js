import * as bookService from '../service/bookService.js';

export const createBook = (title, author, year, gender) => {
    return bookService.createBook(title, author, year, gender);
};

export const listBooks = () => {
    return bookService.listBooks();
};

export const getBookById = (id) => {
    return bookService.getBookById(id);
};

export const updateBook = (id, title, author, year, gender) => {
    return bookService.updateBook(id, title, author, year, gender);
};

export const deleteBook = (id) => {
    return bookService.deleteBook(id);
};
