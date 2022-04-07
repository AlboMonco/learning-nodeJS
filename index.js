import chalk from 'chalk'
import fs from 'fs'

function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'Não há arquivo no caminho'));
}

async function pegaArquivo(caminhoDoArquivo) {
    const encoding = 'utf-8';
    try {
        const texto = await fs.promises.readFile(caminhoDoArquivo, 'utf-8');
        console.log(texto);
    } catch (erro) {
        trataErro(erro);
    }
}

pegaArquivo('./arquivos/texto1.md');