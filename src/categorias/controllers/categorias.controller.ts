import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { CategoriasService } from '../services/categorias.service';
import { CreateCategoriaDto } from '../dto/create-categoria.dto';
import { UpdateCategoriaDto } from '../dto/update-categoria.dto';
import { Categoria } from '../entities/categoria.entity';
import { ApiTags } from '@nestjs/swagger';

ApiTags('Categorias')
@Controller('/categorias')
export class CategoriasController {
    constructor(private readonly categoriasService: CategoriasService) { }

    // POST /categorias -> cria uma nova categoria
    @Post()
    @HttpCode(HttpStatus.CREATED)   // define o status de resposta como 201 (CREATED)
    create(@Body() categoria: Categoria): Promise<Categoria> {  
        return this.categoriasService.create(categoria);
    }

    // GET /categorias -> retorna todas as categorias
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]> {
        return this.categoriasService.findAll();
    }

    // GET /categorias/:id -> retorna uma categoria pelo ID
    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
        return this.categoriasService.findOne(id);
    }

    // GET /categorias/nome/:nome  -> busca categorias pelo nome (contém)
    @Get('nome/:nome')
    @HttpCode(HttpStatus.OK)
    findAllByName(@Param('nome') nome: string): Promise<Categoria[]> {
        return this.categoriasService.findAllByName(nome);
    }

    // PUT /categorias/:id -> atualiza uma categoria existente
    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateCategoriaDto): Promise<Categoria> {
        return this.categoriasService.update(id, dto);
    }

    // DELETE /categorias/:id -> deleta uma categoria pelo ID
    @Delete(':id')
    @HttpCode(HttpStatus.OK)                       
    delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {        
        return this.categoriasService.delete(id);
    }

}