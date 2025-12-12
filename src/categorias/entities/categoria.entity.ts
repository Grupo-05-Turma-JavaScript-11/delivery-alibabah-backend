import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

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

    @Column({ length: 5000 })
    icone: string;

    // @OneToMany(() => Produto, (produto) => produto.categoria)
    // produto?: Produto[];
}
