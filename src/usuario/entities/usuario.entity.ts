
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';



@Entity({ name: "tb_usuario" })
export class Usuario{

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    nome: string;

    @Column({ length: 255, nullable: true })
    foto: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    endereco: string;

    @IsNotEmpty()
    @Column({ length: 50, nullable: false, unique: true })
    email: string;

    @IsNotEmpty()
    @Column({ length: 70, nullable: false })
    senha: string;

    @OneToMany(() => menu, (menu) => menu.usuario)
}

   





