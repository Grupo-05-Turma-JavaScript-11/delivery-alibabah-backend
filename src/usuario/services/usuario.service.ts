import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Usuario } from "../entities/usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";


@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        
    ) { }
//procurar todos os usuarios
    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            relations: {
                menu: true
            }
        });
    }
//procurar usuario por id
    async findById(id: number): Promise<Usuario> {
        let usuario = await this.usuarioRepository.findOne({where: {id}}),
        relations: {
            menu: true
        };

        if (!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;
    }
//procurar usuario por nome
    async findAllByName(nome: string): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            where:{
                nome: ILike(`%${nome}%`)
            },
            relations: {
                menu: true
            }
        })
    }
//criar usuario
    async create(usuario: Usuario): Promise<Usuario> {

        return await this.usuarioRepository.save(usuario);
    }
//atualizar usuario
    async update(usuario: Usuario): Promise<Usuario> {
        
        let buscaUsuario = await this.findById(usuario.id);

        if (!buscaUsuario || !usuario.id) {
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);
        }
        return await this.usuarioRepository.save(usuario);
    }
//deletar usuario
    async delete(id: number): Promise<DeleteResult> {
        
        let buscaUsuario = await this.findById(id);
        
        if(!buscaUsuario){
            throw new HttpException("Usuario não encontrado!", HttpStatus.NOT_FOUND);
        }   

        return await this.usuarioRepository.delete(id);
    }
}