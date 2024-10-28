import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { PrismaService } from 'src/provider/prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async createAccount(dto: CreateAccountDto) {
    return this.prisma.account.create({
      data: dto,
    });
  }

  async getAllAccounts(): Promise<Account[]> {
    return this.prisma.account.findMany();
  }

  //   async downloadAccountsPDF(res: Response) {
  //     const accounts = await this.getAllAccounts();

  //     const doc = new PDFDocument();

  //     res.setHeader('Content-Type', 'application/pdf');
  //     res.setHeader('Content-Disposition', 'attachment; filename=accounts.pdf');

  //     doc.pipe(res);

  //     doc.fontSize(25).text('Accounts List', { align: 'center' });
  //     doc.moveDown();

  //     accounts.forEach((account) => {
  //       doc
  //         .fontSize(12)
  //         .text(`Name: ${account.name}`)
  //         .text(`Mobile No: ${account.mobileNo || 'N/A'}`)
  //         .text(`Email: ${account.email || 'N/A'}`)
  //         .text(`Address: ${account.address || 'N/A'}`)
  //         .text(`Type: ${account.type || 'N/A'}`)
  //         .text(`Pixel: ${account.pixel || 'N/A'}`)
  //         .text(`Height: ${account.height || 'N/A'}`)
  //         .text(`Length: ${account.length || 'N/A'}`)
  //         .moveDown();
  //     });

  //     doc.end();
  //   }
  async downloadAccountsPDF(res: Response) {
    const accounts = await this.getAllAccounts();

    const doc = new PDFDocument({ margin: 50 });

    const pdfName = `accounts_${new Date().toISOString().split('T')[0]}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${pdfName}`);

    doc.pipe(res);

    doc
      .fontSize(25)
      .font('Helvetica-Bold')
      .fillColor('#4B4B4B')
      .text('Accounts List', { align: 'center' })
      .moveDown(1.5);

    accounts.forEach((account, index) => {
      doc
        .fontSize(18)
        .font('Helvetica-Bold')
        .fillColor('#333333')
        .text(`Account ${index + 1}`, { underline: true })
        .moveDown(0.5);

      doc
        .fontSize(12)
        .font('Helvetica')
        .fillColor('#000000')
        .text(`Name: ${account.name}`)
        .text(`Mobile No: ${account.mobileNo || 'N/A'}`)
        .text(`Email: ${account.email || 'N/A'}`)
        .text(`Address: ${account.address || 'N/A'}`)
        .text(`Type: ${account.type || 'N/A'}`)
        .text(`Pixel: ${account.pixel || 'N/A'}`)
        .text(`Height: ${account.height || 'N/A'}`)
        .text(`Length: ${account.length || 'N/A'}`)
        .moveDown(1);

      if (index < accounts.length - 1) {
        doc
          .moveTo(doc.page.margins.left, doc.y)
          .lineTo(doc.page.width - doc.page.margins.right, doc.y)
          .strokeColor('#aaaaaa')
          .stroke()
          .moveDown();
      }
    });

    doc.end();
  }
}
