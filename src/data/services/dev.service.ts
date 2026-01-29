import { Injectable} from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Menu } from '../../menu/entities/menu.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Categoria } from '../../categorias/entities/categoria.entity';


@Injectable()
export class DevService implements TypeOrmOptionsFactory {
    
    createTypeOrmOptions(): TypeOrmModuleOptions{
        return{
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'db_alibabah',
            entities: [Menu, Usuario, Categoria],
            synchronize: true,
        }
    }
}