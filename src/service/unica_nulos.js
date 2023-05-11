import {pool} from '../config/db.js';
import faker from 'faker-br';

export default async function insereUnicaNulos(quantidade){
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
    const sql = "insert into risk_blacklist_unica_nulos (cpf) values ($1)";
    const cpf = [faker.br.cpf()];
    return await insereNaBase(client, sql, cpf);
}

async function insereEmail(client){
    console.log("inserindo email");
    const sql = "insert into risk_blacklist_unica_nulos (email) values ($1)";
    const email = [faker.internet.email()];
    return await insereNaBase(client, sql, email);
}

async function insereTelefone(client){
    console.log("inserindo telefone");
    const sql = "insert into risk_blacklist_unica_nulos (telefone) values ($1)";
    const telefone = [faker.phone.phoneNumber().replace(/[^0-9]/g, "")];
    return await insereNaBase(client, sql, telefone);
}

async function insereMobileId(client){
    console.log("inserindo mobile id");
    const sql = "insert into risk_blacklist_unica_nulos (mobile_id) values ($1)";
    const mobileId = [faker.random.uuid()];
    return await insereNaBase(client, sql, mobileId);
}

async function insereNaBase(client, sql, values) {
    console.log("sql = " + sql);
    return await client.query(sql, values);
}