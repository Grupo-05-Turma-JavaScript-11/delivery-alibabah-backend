import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Menu } from '../../menu/entities/menu.entity';

// cria uma tabela 'tb_categorias' e mapeia cada instância da classe 'Categoria' para um registro dessa tabela
@Entity('tb_categorias')
export class Categoria {

    // atributos da classe (id, nome, descricao), que se tornam colunas da tabela 'tb_categorias'

    @PrimaryGeneratedColumn()   // coluna 'id', do tipo number e único, gerado automaticamente
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: false })    // coluna 'nome' da categoria, armazenando texto com limite de 100 caracteres, e não pode ser nulo
    nome: string;

    @Column({ type: 'varchar', length: 255, nullable: false })   // coluna 'descricao' da categoria, armazenando texto com limite de 100 caracteres, e não pode ser nulo
    descricao: string;

    @OneToMany(() => Menu, (prato) => prato.categoria)
    menu: Menu[];
}
