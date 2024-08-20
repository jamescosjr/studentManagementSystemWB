import * as bookController from '../controllers/bookController.js';
import promptSync from 'prompt-sync';

const prompt = promptSync();

export function addBook() {
    const title = prompt('Digite o título do livro: ');
    const author = prompt('Digite o autor do livro: ');
    const year = prompt('Digite o ano de publicação: ');
    const gender = prompt('Digite o gênero do livro: ');

    const newBook = bookController.createBook(title, author, parseInt(year), gender);
    console.log('Livro adicionado com sucesso:', newBook);
}

export function listBooks() {
    const books = bookController.listBooks();
    console.log('Lista de livros:', books);
}

export function getBookById() {
    const id = prompt('Digite o ID do livro: ');
    const book = bookController.getBookById(id);
    console.log(book ? book : 'Livro não encontrado');
}

export function updateBook() {
    const id = prompt('Digite o ID do livro que deseja atualizar: ');
    const title = prompt('Digite o novo título do livro: ');
    const author = prompt('Digite o novo autor do livro: ');
    const year = prompt('Digite o novo ano de publicação: ');
    const gender = prompt('Digite o novo gênero do livro: ');

    const updatedBook = bookController.updateBook(id, title, author, parseInt(year), gender);
    console.log(updatedBook ? 'Livro atualizado com sucesso!' : 'Livro não encontrado');
}

export function deleteBook() {
    const id = prompt('Digite o ID do livro que deseja deletar: ');
    const deletedBook = bookController.deleteBook(id);
    console.log(deletedBook ? 'Livro deletado com sucesso!' : 'Livro não encontrado');
}
