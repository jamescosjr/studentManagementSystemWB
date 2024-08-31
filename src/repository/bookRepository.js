import { generateId } from '../utils/generateId.js';


export let books = [];

export const create = (book) => {
    const id = generateId();
    const newBook = { ...book, id };
    books.push(newBook);
    return newBook;
};

export const findAll = () => books;

export const findByTitle = (title) => books.find(book => book.title === title);

export const deleteById = (id) => {
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
        return books.splice(index, 1)[0];
    }
    return null;
};