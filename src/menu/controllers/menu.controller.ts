import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { MenuService } from "../services/menu.service";
import { Menu } from "../entities/menu.entity";
import { DeleteResult } from "typeorm";


@Controller("/menu")
export class MenuController{ 
    constructor(private readonly menuService: MenuService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Menu[]>{
        return this.menuService.findAll()
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param("id", ParseIntPipe) id:number): Promise<Menu>{
       return this.menuService.findById(id)
    }
    
    
    @Get("/nome/:nome")
    @HttpCode(HttpStatus.OK)
    findByName(@Param("nome") nome:string): Promise<Menu[]>{
       return this.menuService.findByName(nome)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() prato: Menu): Promise<Menu>{
        return this.menuService.create(prato)
    }


    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() prato: Menu): Promise<Menu>{
        return this.menuService.update(prato)
    }


    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe) id:number): Promise<DeleteResult>{
        return this.menuService.delete(id)
    }

    @Get("/recomendacoes") // menu/recomendacoes
    @HttpCode(HttpStatus.OK)
    recomendarSaudaveis() {
    return this.menuService.recomendarSaudaveis()
    }
}