import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { Categoria } from '../entities/categoria.entity';
import { CreateCategoriaDto } from '../dto/create-categoria.dto';
import { UpdateCategoriaDto } from '../dto/update-categoria.dto';



@Injectable()   // marca a classe como injetável para o NestJS
export class CategoriasService {    // declara a classe de serviço responsável pela lógica de negócio relacionada ao usuário (criar, atualizar, buscar, deletar etc.)

    constructor(    // é usado pelo NestJS para injeção de dependências
        @InjectRepository(Categoria)    // injeta automaticamente o repositório da entidade 'Categoria'
        private readonly categoriaRepository: Repository<Categoria>,    // cria a variável 'categoriaRepository' dentro da classe, que é privada (usada apenas no service) e não pode ser alterada
    ) { }

    // CREATE
    async create(dto: CreateCategoriaDto): Promise<Categoria> {

        const categoriaExistente = await this.categoriaRepository.findOne({
            where: { nome: dto.nome },
        });

        if (categoriaExistente) {
            
            throw new HttpException('Já existe uma categoria com esse nome!', HttpStatus.BAD_REQUEST);
        }
        const categoria = this.categoriaRepository.create(dto);
        return this.categoriaRepository.save(categoria);
    }

    // FIND ALL
    async findAll(): Promise<Categoria[]> {     // retorna uma Promise contendo um array de categorias 
        return await this.categoriaRepository.find({    // busca todos os registros da tabela 'Categoria' 
            relations: ['produtos'],    // carrega, também, os produtos relacionados à categoria
        });
    }

    // FIND ONE (/:id)
    async findOne(id: number): Promise<Categoria> {     // busca uma categoria por um ID único e retorna uma Promise 
        const categoria = await this.categoriaRepository.findOne({    // busca no banco a categoria com o ID informado
            where: { id },
            relations: ['produtos'],    // retorna, também, a lista de produtos relacionados à categoria
        });

        if (!categoria) {   // verifica se existe a categoria
            throw new NotFoundException(`Categoria ${id} não encontrada`);    // retorna erro 404 se a categoria não for encontrada
        }

        return categoria;   // retorna a categoria encontrada
    }

    // FIND ALL BY NAME
    async findAllByName(nome: string): Promise<Categoria[]> {   // busca todas as categorias cujo nome contenha o texto informado na condição 'where'
        return await this.categoriaRepository.find({    // antes de retornar, aguarda a verificação em 'where'
            where: {
                nome: ILike(`%${nome}%`)
            }
        })
    }

    //  UPDATE
    async update(id: number, dto: UpdateCategoriaDto): Promise<Categoria> {
        const categoria = await this.findOne(id);

        Object.assign(categoria, dto);

        return await this.categoriaRepository.save(categoria);
    }

    // DELETE
    async delete(id: number): Promise<{ message: string }> {
        await this.findOne(id);

        await this.categoriaRepository.delete({id});

        return { message: `Categoria ${id} removida com sucesso.` };
    }
}