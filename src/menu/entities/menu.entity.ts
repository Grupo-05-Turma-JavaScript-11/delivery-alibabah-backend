import { IsNotEmpty, IsNumber, IsPositive, MaxLength } from 'class-validator';  
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';  
  
@Entity({ name: "tb_menu" })  
export class Menu {  
  @PrimaryGeneratedColumn()  
  id: number;  
  
  @IsNotEmpty({ message: "O nome não pode estar vazio." })  
  @MaxLength(100, { message: "O nome deve ter no máximo 100 caracteres." })  
  @Column({ length: 100, nullable: false })  
  nome: string;  
  
  @IsNotEmpty({ message: "A descrição não pode estar vazia." })  
  @MaxLength(500, { message: "A descrição deve ter no máximo 500 caracteres." })  
  @Column({ length: 500, nullable: false })  
  descricao: string;  
  
  @IsNotEmpty({ message: "O preço não pode estar vazio." })  
  @IsNumber({}, { message: "O preço deve ser um número." })  
  @IsPositive({ message: "O preço deve ser um valor positivo." })  
  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })  
  preco: number;  
}  