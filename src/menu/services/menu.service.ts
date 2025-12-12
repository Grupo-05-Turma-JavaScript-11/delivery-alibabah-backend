import { ILike, Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Menu } from "../entities/menu.entity";
import { DeleteResult } from "typeorm/browser";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class MenuService{
    constructor(
        @InjectRepository(Menu)
        private menuRepository: Repository<Menu>
    ){ }

    async findAll(): Promise<Menu[]> {
        return await this.menuRepository.find({ relations: { usuario: true } });
    }

    async findById(id: number): Promise<Menu> {
        let prato = await this.menuRepository.findOne({
            where: { id }, 
            relations: {usuario: true} 
        });

        if(!prato){
            throw new HttpException("Prato não encontrado!", HttpStatus.NOT_FOUND);
        }

        return prato;
    }

    async findByName(nome: string): Promise<Menu[]> {
        return await this.menuRepository.find({ 
            where: { nome: ILike(`%${nome}%`) },
            relations: { usuario: true } 
        });
    }

    async create(prato: Menu): Promise<Menu> {
        return await this.menuRepository.save(prato);
    }

    async update(prato: Menu): Promise<Menu> {
        let garcom = await this.findById(prato.id);
        
        if(!garcom || !prato.id){
            throw new HttpException("Prato não encontrado!", HttpStatus.NOT_FOUND);
        }

        return await this.menuRepository.save(prato);
    }

    async delete(id: number): Promise<DeleteResult> {
        let garcom = await this.findById(id);
        
        if(!garcom){
            throw new HttpException("Prato não encontrado!", HttpStatus.NOT_FOUND);
        }
        
        return await this.menuRepository.delete(id);
    }
}