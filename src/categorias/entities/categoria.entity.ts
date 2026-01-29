import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Menu } from '../../menu/entities/menu.entity';
import { ApiProperty } from '@nestjs/swagger';

// cria uma tabela 'tb_categorias' e mapeia cada instância da classe 'Categoria' para um registro dessa tabela
@Entity('tb_categorias')
export class Categoria {

    // atributos da classe (id, nome, descricao), que se tornam colunas da tabela 'tb_categorias'

    @PrimaryGeneratedColumn()   // coluna 'id', do tipo number e único, gerado automaticamente
    @ApiProperty()
    id: number;

    @IsNotEmpty()
    @IsString()
    @Column({ type: 'varchar', length: 100, nullable: false })
    @ApiProperty()
    nome: string;

    @IsNotEmpty()
    @IsString()
    @Column({ type: 'varchar', length: 255, nullable: false })
    @ApiProperty()
    descricao: string;

    @OneToMany(() => Menu, (prato) => prato.categoria)
    @ApiProperty({ required: false })
    menu: Menu[];
}
