import {pool} from '../config/db.js';
import faker from 'faker-br';

export default async function insereMultiTabela(quantidade){
    const client = await pool.connect();

    for (let i = 0; i < quantidade; i++) {
        await insereCpf(client);
        await insereEmail(client);
        await insereTelefone(client);
        await insereMobileId(client);
    }

    client.release(true);
}

async function insereCpf(client){
    console.log("inserindo cpf");
    const sql = "insert into blacklist_cpf (cpf) values ($1)";
    const cpf = [faker.br.cpf()];
    try {
        return await insereNaBase(client, sql, cpf);
    } catch(error) {
        console.log(error.code);
        if (error.code === '23505'){
            console.log('duplicou cpf');
            return await insereCpf(client);
        } else {
            process.exit(1);
        }
    }   
}

async function insereEmail(client){
    console.log("inserindo email");
    const sql = "insert into blacklist_email (email) values ($1)";
    const email = [faker.internet.email()];
    try {
        return await insereNaBase(client, sql, email);
    } catch (error) {
        console.log('erro email ' + error.code);
        if (error.code === '23505'){
            return await insereEmail(client);
        } else {
            process.exit(1);
        }
    }
}

async function insereTelefone(client){
    console.log("inserindo telefone");
    const sql = "insert into blacklist_telefone (telefone) values ($1)";
    const telefone = [faker.phone.phoneNumber().replace(/[^0-9]/g, "")];

    try {
        return await insereNaBase(client, sql, telefone);
    } catch(error) {
        console.log('erro telefone ' + error.code);
        if (error.code === '23505'){
            return await insereTelefone(client);
        } else {
            process.exit(1);
        }
    }
    
}

async function insereMobileId(client){
    console.log("inserindo mobile id");
    const sql = "insert into blacklist_mobile_id (mobile_id) values ($1)";
    const mobileId = [faker.random.uuid()];

    try {
        return await insereNaBase(client, sql, mobileId);
    } catch (error) {
        console.log('erro mobile id ' + error.code);
        if (error.code === '23505'){
            return await insereMobileId(client);
        } else {
            process.exit(1);
        }
    }
}

async function insereNaBase(client, sql, values) {
    console.log("sql = " + sql);
    return await client.query(sql, values);
}