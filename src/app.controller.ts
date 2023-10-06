import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserRegisterDto } from './dto/user-register';

@Controller('users')
export class AppController {

  constructor(
    private readonly appService: AppService
  ) {}

  @Post()
  createUsers( @Body() createProductDto : UserRegisterDto ) {
    return this.appService.createUser(createProductDto);
  }

  @Post('send-email')
  sendEmail() {
    return this.appService.sendEmail();
  }

  @Get()
  getUsers() {
    return this.appService.getUsers();
  }

  @Delete(':id')
  async deleteUser( @Param('id', ParseUUIDPipe ) id: string ) {
    return await this.appService.deletUser(id);
  }

}
