import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import User from './User';

@Entity('appointments') // a classe é um parâmetro dessa entidade (decorators)
class Appointment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column() // tipo padrão - string
    provider_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' })
    provider: User;
    
    @Column('timestamp with time zone')
    date: Date;

};

export default Appointment;

