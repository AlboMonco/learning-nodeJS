import path from 'path'
// import chalk from 'chalk'
import fs from 'fs'
import { __dirname } from './dirname.js'


function extraiLinks(texto) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const arrayResultados = [];
    let temporaria;

    while((temporaria = regex.exec(texto)) !== null) {
        arrayResultados.push({ [temporaria[1]]: temporaria[2] })
    }
    
    return arrayResultados.length === 0 ? 'não há links' : arrayResultados;
}

function trataErro(erro) {
    throw new Error(erro.code, 'Não há arquivo no caminho');
}

export async function pegaArquivo(caminho) {
    try {
        const caminhoAbsoluto = path.join(__dirname, '..', caminho);
        const encoding = 'utf-8';

        const arquivos = await fs.promises.readdir(caminhoAbsoluto, { encoding });
        const resultado = await Promise.all(arquivos.map(async (arquivo) => {
            const localArquivo = `${caminhoAbsoluto}/${arquivo}`;
            const texto = await fs.promises.readFile(localArquivo, encoding);
            return extraiLinks(texto);
        }));

        return resultado[0];

    } catch(erro) {
        return trataErro(erro);
    }
}