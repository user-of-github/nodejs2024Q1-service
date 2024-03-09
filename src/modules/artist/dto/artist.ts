import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ArtistDto {
  @IsNotEmpty()
  @IsString()
  public readonly name: string;

  @IsNotEmpty()
  @IsBoolean()
  public readonly grammy: boolean;
}
