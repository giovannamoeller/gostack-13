import { uuid } from 'uuidv4';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('appointments') // a classe é um parâmetro dessa entidade (decorators)
class Appointment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column() // tipo padrão - string
    provider: string;
    
    @Column('timestamp with time zone')
    date: Date;
    
};

export default Appointment;

