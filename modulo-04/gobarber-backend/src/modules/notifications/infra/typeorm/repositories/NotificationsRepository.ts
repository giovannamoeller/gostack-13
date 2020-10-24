// Persistência <-> Repositório <-> Rotas
import { getMongoRepository, MongoRepository } from 'typeorm';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notifications from '../schemas/Notifications';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

class NotificationsRepository implements INotificationsRepository {
    private ormRepository: MongoRepository<Notifications>;

    constructor() {
        this.ormRepository = getMongoRepository(Notifications, "mongo");
    }

    public async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notifications> {
        const notification = await this.ormRepository.create({ content, recipient_id });

        await this.ormRepository.save(notification);

        return notification;
    }

}

export default NotificationsRepository;