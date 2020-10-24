import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import uploadConfig from '@config/upload';

@Entity('users') // a classe é um parâmetro dessa entidade (decorators)
class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column() // tipo padrão - string
    name: string;
    
    @Column()
    email: string;

    @Column() 
    @Exclude() // quando for para o front end, vai excluir
    password: string;

    @Column() 
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    @Expose({name: "avatar_url"}) // expor um novo campo que não existe dentro da classe
    
    getAvatarUrl(): string | null {
        if(!this.avatar) return null;

        switch(uploadConfig.driver) {
            case 'disk': return `${process.env.APP_API_URL}/files/${this.avatar}`;
            case 's3': return `` // url da amazon S3
            // https://nome-bucket.s3.amazonaws.com/this.avatar
        }
    }
};

export default User;

