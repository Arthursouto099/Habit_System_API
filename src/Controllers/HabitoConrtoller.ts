import { Habito } from "../Models/Habito";
import {Request, Response} from "express"

export class HabitoController {


    static async getAll(req: Request, res: Response) {
        const habitos = await Habito.getAll()
        res.json(habitos)
    }

    static async getById(req: Request, res: Response) {
        const {id} = req.params
        const habito = await Habito.getById(parseInt(id))
        res.json(habito)
    }

    static async create(req: Request, res: Response) {
        const {Nome_Habito} = req.body
        const {Descricao_Do_Habito} = req.body
        const {Identidade_Habito} = req.body
        const newHabito = await Habito.create(Nome_Habito, Descricao_Do_Habito, Identidade_Habito)
        res.json(newHabito)
    }

    static async update(req: Request, res: Response) {
        const {id} = req.params
        const {Nome_Habito} = req.body
        const {Descricao_Do_Habito} = req.body
        const {Identidade_Habito} = req.body
        const upHabito = Habito.update(parseInt(id), Nome_Habito, Descricao_Do_Habito, Identidade_Habito)
        res.json(upHabito)
    }

    static async delete(req: Request, res: Response) {
        const {id} = req.params
        const deleteHabito = Habito.delete(parseInt(id))
        res.json(deleteHabito)
    }
}