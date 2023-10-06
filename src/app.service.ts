import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const sgMail = require('@sendgrid/mail');

import { UserRegister } from './entities/user-register.entity';
import { UserRegisterDto } from './dto/user-register';

@Injectable()
export class AppService {


  constructor(
    @InjectRepository( UserRegister ) private readonly userRepository: Repository<UserRegister>,
  ){}

  async createUser( createUser:UserRegisterDto ) {

    try {
      const user = this.userRepository.create(createUser);

      const userCreate = await this.userRepository.save(user);

      this.sendEmail(userCreate.email);

      return {
        status  : 'ok',
        data    : userCreate,
        message : 'Usuario registrado correctamente'
      }

    } catch (error) {
      this.handleErrors( error );
    }

  }

  async getUsers() {

    const users = await this.userRepository.find();

    return {
      status  : 'ok',
      data    : users,
      message : 'Todo correcto'
    };
  }

  async getOneUser( idUser:string ) {

    const user = await this.userRepository.findBy({ id: idUser });

    return user;
  }

  async deletUser( idUser:string ) {

    try {
      const userDelete = await this.userRepository.remove( await this.getOneUser(idUser) );

      if( userDelete.length == 0 ) {
        return {
          status: 'false',
          data: userDelete,
          message: 'Usuario no se encuentra en la BD'
        }  
      }
      
      return {
        status: 'ok',
        data: userDelete,
        message: 'Usuario eliminado correctamente'
      }
    } catch (error) {
      this.handleErrors( error );
    }

  }

  async sendEmail( email:string = 'skiap17@gmail.com' ) {

    sgMail.setApiKey(process.env.API_KEY_SENDGRIDE);
    
    const msg = {
      to      : [email],
      from    : 'manypark@live.com',
      subject : 'Sending with SendGrid is Fun',
      html    : '<p> Hola manu </p>'
    }
    
    sgMail.send(msg).then((response) => {
      console.log(response[0].statusCode)

      return {
        status  : 'ok',
        message : 'Correo enviado'
      };
    }).catch((error) => {

      console.error('err: ',error);

      return {
        status  : 'false',
        message : 'Correo no enviado'
      }
    });
  }

  private handleErrors( error:any ) : never {

    if( error.code === '23505' ) throw new BadRequestException(`${error.detail }`);

    throw new InternalServerErrorException('Check server logs');
    
  }
}
