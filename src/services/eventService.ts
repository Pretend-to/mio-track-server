import Event from '../models/event';

class EventService {
    async createEvent(eventData: any) {
        return await Event.create(eventData);
    }
}

export default new EventService();