import {db} from '../db'

export class Habito {
    private id: number
    private nome_habito: string
    private descricao_do_habito: string
    private identidade_habito

    constructor(id: number, nome_habito: string, descricao_do_habito: string, identidade_habito: string) {
        this.id = id
        this.nome_habito = nome_habito
        this.descricao_do_habito = descricao_do_habito
        this.identidade_habito = identidade_habito
    }
    

    static async getAll() {
        const [rows] = await db.query("SELECT * FROM habitos")
        return rows
    }

    static async getById(id: number) {
        const [rows] = await db.query("SELECT * FROM habitos WHERE ID = ?", [id])
        return rows
    }

    static async create(nome: string, descricacao: string, identidade: string) {
        const [result] = await db.query("insert into habitos (Nome_Habito, Descricao_Do_Habito, Identidade_Habito) value(?, ?, ?)", [nome, descricacao, identidade])
        return result
    }

    static  async  update(id: number, nome: string, descricacao: string, identidade: string) {
        const [result] = await db.query("UPDATE habitos SET Nome_Habito = ?,  Descricao_Do_Habito = ?,  Identidade_Habito = ? WHERE ID = ?", [nome, descricacao, identidade, id])
        return result
    }

    static async delete(id: number) {
        const [result] = await db.query("DELETE FROM habitos WHERE ID = ?", [id])
        return result
    }
}