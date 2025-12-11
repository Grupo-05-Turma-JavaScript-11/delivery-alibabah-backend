import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nome: string; // nome da categoria (ex: Saladas, Wraps)

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  descricao: string; // descrição da categoria
}
