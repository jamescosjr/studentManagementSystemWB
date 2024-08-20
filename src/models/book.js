export class Book {
    constructor(id, title, author, year, gender) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.gender = gender;

        if (!id || typeof id !== 'string') {
            throw new Error('ID deve ser uma string não vazia.');
        }

        this.year = this.validateYear(year);
    }

    isValidYear(year) {
        const currentYear = new Date().getFullYear();
        const parsedYear = Number(year);
        return !isNaN(parsedYear) && Number.isInteger(parsedYear) && parsedYear > 0 && parsedYear <= currentYear;
    }

    validateYear(year) {
        if (year === '') {
            return 'Ano não fornecido.';
        }
        if (year === 0 || !this.isValidYear(year)) {
            return 'Ano inválido. Não foi cadastrado.';
        }
        return Number(year);
    }
}
