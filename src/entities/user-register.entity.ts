import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserRegister {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column( 'text' )
    name:string;

    @Column( 'text' , {
        unique  : true,
        nullable: true
    })
    email:string;

    @Column( 'text' )
    resident:string;

    @Column( 'text' )
    phone:string;

    @Column( 'text' )
    lada:string;
}