import promptSync from 'prompt-sync';
import * as menuActions from './menu/menuActions.js';

const prompt = promptSync();

function mainMenu() {
    console.log("----- Sistema de Gerenciamento de Livros -----");
    console.log("1. Adicionar livro");
    console.log("2. Listar todos os livros");
    console.log("3. Buscar livro por ID");
    console.log("4. Atualizar livro");
    console.log("5. Deletar livro");
    console.log("6. Sair");
    console.log("---------------------------------------------");
}

function run() {
    let running = true;

    while (running) {
        mainMenu();
        const choice = prompt('Escolha uma opção: ');

        switch (choice) {
            case '1':
                menuActions.addBook();
                break;
            case '2':
                menuActions.listBooks();
                break;
            case '3':
                menuActions.getBookById();
                break;
            case '4':
                menuActions.updateBook();
                break;
            case '5':
                menuActions.deleteBook();
                break;
            case '6':
                console.log('Saindo...');
                running = false;
                break;
            default:
                console.log('Opção inválida. Tente novamente.');
        }
    }
}

run();
