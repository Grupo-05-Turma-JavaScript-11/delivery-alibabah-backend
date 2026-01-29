import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Categoria } from './entities/categoria.entity';
import { CategoriasService } from './services/categorias.service';
import { CategoriasController } from './controllers/categorias.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Categoria])],
    controllers: [CategoriasController],
    providers: [CategoriasService],
    exports: [CategoriasService],
})
export class CategoriasModule { }
