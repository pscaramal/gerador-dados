import yargs from 'yargs/yargs';
import insereUnicaNulos from './service/unica_nulos.js';
import insereUnicaNulosIndex from './service/unica_nulos_index.js';
 
let argv = yargs(process.argv.slice(2)).argv;

function validaEntrada(quantidade){
    if (isNaN(quantidade)){
        console.log("Quantidade deve ser um valor numérico");
        process.exit(1);
    }
}

async function insereDados(quantidade, cenario){
    switch (cenario) {
        case 'unica_nulos':
            await insereUnicaNulos(quantidade);
            break;
        case 'unica_nulos_index':
            await insereUnicaNulosIndex(quantidade);
            break;
        default:
            console.log('cenario inválido: ' + cenario);
            process.exit(1);
    }
}

const qtd = argv.qtd;
const cen = argv.cenario;

validaEntrada(qtd);
await insereDados(qtd, cen);