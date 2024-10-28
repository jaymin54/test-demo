import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from '@prisma/client';
import { CreateAccountDto } from './dto/create-account.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('accounts')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The account has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() accountData: CreateAccountDto): Promise<Account> {
    return this.accountService.createAccount(accountData);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Successfully retrieved accounts.' })
  async findAll() {
    const account = await this.accountService.getAllAccounts();
    // const downloadPdf = await this.accountService.downloadAccountsPDF(res);
    return account;
  }

  @Get('pdf/:id')
  async downloadPdf(@Res() res: Response, @Param('id') id: string) {
    const downloadPdf = await this.accountService.downloadAccountPDF(res, id);
    return downloadPdf;
  }
}
