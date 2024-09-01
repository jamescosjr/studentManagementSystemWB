import { createBookModel } from '../models/book.js';
import { create, findAll, findByTitle, deleteById } from '../repository/bookRepository.js';

export function createBook(data) {
    const book = createBookModel(data);
    return create(book);
};

export function listBooks() { return findAll() };

export function findBookByTitle(title) { return findByTitle(title) };

export function deleteBookById(id) { return deleteById(id) };