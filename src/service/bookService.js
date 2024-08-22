import { Book } from '../models/book.js';
import { generateId } from '../utils/generateId.js';


export let books = [];

export const createBook = (title, author, year, gender) => {
    const id = generateId();
    const newBook = new Book(id, title, author, year, gender);
    books.push(newBook);
    return newBook;
};

export const listBooks = () => books;

export const getBookById = (id) => {
    return books.find(book => book.id === id);
};

export const updateBook = (id, title, author, year, gender) => {
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
        books[bookIndex] = new Book(id, title, author, year, gender);
        return books[bookIndex];
    }
    return null;
};

export const deleteBook = (id) => {
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
        const deletedBook = books.splice(bookIndex, 1);
        return deletedBook[0];
    }
    return null;
};
