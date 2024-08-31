import promptSync from 'prompt-sync';
import { createBookHandler, listBooksHandler, findBookByTitleHandler, deleteBookHandler } from '../controllers/bookController.js';


const prompt = promptSync({ sigint: true });

export const createBook = () => {
    const title = prompt('Enter the book title: ');
    const author = prompt('Enter the book author: ');
    const year = parseInt(prompt('Enter the book year: '), 10);

    createBookHandler({ title, author, year });
};

export const listBooks = () => {
    listBooksHandler();
};

export const findBookByTitle = () => {
    const title = prompt('Enter the book title to search: ');
    findBookByTitleHandler(title);
};

export const deleteBook = () => {
    const id = prompt('Enter the book ID to delete: ');
    deleteBookHandler(id);
};