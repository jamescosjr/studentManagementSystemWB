import { generateMockBook } from '../../utils/mockBooks.js';

describe('Book Model', () => {
    test('should create a valid book', () => {
        const book = generateMockBook();
        expect(book.id).toBeDefined();
        expect(book.title).toBeDefined();
        expect(book.author).toBeDefined();
        expect(book.year).toBeLessThanOrEqual(new Date().getFullYear());
    });

    test('should handle invalid year', () => {
        const book = generateMockBook({ year: new Date().getFullYear() + 5 });
        expect(book.year).toBe('Ano inválido. Não foi cadastrado.');
    });

    test('should handle missing year', () => {
        const book = generateMockBook({ year: '' });
        expect(book.year).toBe('Ano não fornecido.');
    });

    test('should handle zero as year', () => {
        const book = generateMockBook({ year: 0 });
        expect(book.year).toBe('Ano inválido. Não foi cadastrado.');
    });

    test('should handle false as year', () => {
        const book = generateMockBook({ year: false });
        expect(book.year).toBe('Ano inválido. Não foi cadastrado.');
    });
});
