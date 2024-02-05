// import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class QuizDto {
  @IsString()
  @IsNotEmpty()
  numberOfQuestions: string;

  @IsArray()
  @IsNotEmpty()
  topics: string[];

  @IsString()
  @IsNotEmpty()
  difficulty: string;
}
