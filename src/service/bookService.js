import { createBookModel } from '../models/book.js';
import { create, findAll, findByTitle, deleteById } from '../repository/bookRepository.js';

export const createBook = (data) => {
    const book = createBookModel(data);
    return create(book);
};

export const listBooks = () => findAll();

export const findBookByTitle = (title) => findByTitle(title);

export const deleteBookById = (id) => deleteById(id);