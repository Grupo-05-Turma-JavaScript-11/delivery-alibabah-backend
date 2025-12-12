import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './menu/entities/menu.entity';
import { MenuModule } from './menu/menu.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { Categoria } from './categorias/entities/categoria.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { CategoriasModule } from './categorias/categorias.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_alibabah',
      entities: [Menu, Usuario, Categoria],
      synchronize: true,
    }), 
    MenuModule,
    UsuarioModule,
    CategoriasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
