import {
  IsString,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({
    description: 'The name of the account holder',
    example: 'John Doe',
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100, { message: 'Name must be at most 100 characters long.' })
  name: string;

  @ApiProperty({
    description: 'The mobile number of the account holder',
    example: '1234567890',
    required: false,
  })
  @IsOptional()
  @IsPhoneNumber(null, {
    message: 'Mobile number must be a valid phone number.',
  })
  mobileNo?: string;

  @ApiProperty({
    description: 'The email address of the account holder',
    example: 'john@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email?: string;

  @ApiProperty({
    description: 'The address of the account holder',
    example: '123 Main St, Springfield, USA',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'The type of account',
    example: 'Regular',
    required: false,
  })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({
    description: 'A pixel identifier for the account',
    example: 'Pixel123',
    required: false,
  })
  @IsOptional()
  @IsString()
  pixel?: string;

  @ApiProperty({
    description: 'The height associated with the account',
    example: '180',
    required: false,
  })
  @IsOptional()
  @IsString()
  height?: string;

  @ApiProperty({
    description: 'The length associated with the account',
    example: '75',
    required: false,
  })
  @IsOptional()
  @IsString()
  length?: string;
}
