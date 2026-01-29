import { IsInt, IsNotEmpty, IsNumber, IsPositive, MaxLength } from 'class-validator';  
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';  
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Categoria } from '../../categorias/entities/categoria.entity';
import { ApiProperty } from '@nestjs/swagger';
  
@Entity({ name: "tb_menu" })  
export class Menu {  
  @PrimaryGeneratedColumn()  
  @ApiProperty()
  id: number;  
  
  @IsNotEmpty({ message: "O nome não pode estar vazio." })  
  @MaxLength(100, { message: "O nome deve ter no máximo 100 caracteres." })  
  @Column({ length: 100, nullable: false })  
  @ApiProperty()
  nome: string;  
  
  @IsNotEmpty({ message: "A descrição não pode estar vazia." })  
  @MaxLength(500, { message: "A descrição deve ter no máximo 500 caracteres." })  
  @Column({ length: 500, nullable: false })  
  @ApiProperty()
  descricao: string;  
  
  @IsNotEmpty({ message: "O preço não pode estar vazio." })  
  @IsNumber({}, { message: "O preço deve ser um número." })  
  @IsPositive({ message: "O preço deve ser um valor positivo." })  
  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })  
  @ApiProperty()
  preco: number;
  
  @IsNotEmpty({ message: "As calorias não podem estar vazias." })
  @IsInt({ message: "As calorias devem ser um número inteiro." })  
  @Column({ nullable: false })  
  @ApiProperty()
  calorias: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.menu, {
        onDelete: "CASCADE"
  })
  @ApiProperty()
  categoria: Categoria;

  @ManyToOne(() => Usuario, (user) => user.menu) 
  usuario: Usuario;
}