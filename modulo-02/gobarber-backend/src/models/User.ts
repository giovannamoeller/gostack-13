import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity('users') // a classe é um parâmetro dessa entidade (decorators)
class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column() // tipo padrão - string
    name: string;
    
    @Column()
    email: string;

    @Column() 
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
};

export default User;

