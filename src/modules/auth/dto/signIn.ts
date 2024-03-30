import { IsNotEmpty, IsString } from 'class-validator';

export class LogInDto {
  @IsNotEmpty()
  @IsString()
  public readonly login: string;

  @IsNotEmpty()
  @IsString()
  public readonly password: string;
}
