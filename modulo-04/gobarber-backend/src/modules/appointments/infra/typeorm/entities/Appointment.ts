import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import User from '../../../../users/infra/typeorm/entities/User';

@Entity('appointments') // a classe é um parâmetro dessa entidade (decorators)
class Appointment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column() // tipo padrão - string
    provider_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' })
    provider: User;

    @Column() 
    user_id: string;

    @ManyToOne(() => User) // eager: automaticamente quando trazermos os dados do appointment ele vai trazer os do usuário
    // problema = vai ter vezes que queremos trazer os dados do appointment sem trazer os dados do usuário

    // lazy = buscar dados de um usuário através de appointments.user;
    // 1 usuário pode realizar vários atendimentos -> é um relacionamento, não é convertido para o banco
    @JoinColumn({ name: 'user_id' })
    user: User;
    
    @Column('timestamp with time zone')
    date: Date;

};

export default Appointment;

