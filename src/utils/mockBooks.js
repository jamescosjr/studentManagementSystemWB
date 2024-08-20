import { faker } from '@faker-js/faker';
import { Book } from '../models/book.js';
import { generateId } from './generateId.js';

export const generateMockBook = (options = {}) => {
    return new Book(
        options.id || generateId(),
        options.title || faker.lorem.sentence(),
        options.author || faker.person.fullName(),
        options.year !== undefined ? options.year : new Date().getFullYear(),
        options.gender || faker.helpers.arrayElement(['Ficção', 'Não-ficção', 'Biografia', 'Fantasia', 'História'])
    );
};

export const generateInvalidMockBook = () => {
    return new Book(
        '',
        faker.lorem.sentence(), 
        faker.person.fullName(), 
        new Date().getFullYear() + 1,
        faker.helpers.arrayElement(['Ficção', 'Não-ficção', 'Biografia', 'Fantasia', 'História']) 
    );
};

export const generateMockBooks = (count, options = {}) => {
    return Array.from({ length: count }, () => generateMockBook(options));
};
