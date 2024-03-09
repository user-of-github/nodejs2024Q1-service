import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AlbumDto {
  @IsNotEmpty()
  @IsString()
  public readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  public readonly year: number;

  @IsOptional()
  @IsString()
  public readonly artistId: string | null = null;
}
