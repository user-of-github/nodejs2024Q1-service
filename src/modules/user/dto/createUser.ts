import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  public readonly login: string;

  @IsNotEmpty()
  public readonly password: string;
}
