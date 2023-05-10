import yargs from 'yargs/yargs';
import insereUnicaNulos from './service/unica_nulos.js';
 
let argv = yargs(process.argv.slice(2)).argv;

function validaEntrada(quantidade){
    if (isNaN(quantidade)){
        console.log("Quantidade deve ser um número");
        return;
    }
}

async function insereDados(quantidade){
    insereUnicaNulos(quantidade);
}

const qtd = argv.qtd;

validaEntrada(qtd);
await insereDados(qtd);