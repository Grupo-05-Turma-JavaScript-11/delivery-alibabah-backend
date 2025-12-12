import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './menu/entities/menu.entity';
import { MenuModule } from './menu/menu.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_alibabah',
      entities: [Menu],
      synchronize: true,
    }), 
    MenuModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
