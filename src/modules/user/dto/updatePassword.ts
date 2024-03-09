import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  public readonly oldPassword: string;

  @IsNotEmpty()
  @IsString()
  public readonly newPassword: string;
}
