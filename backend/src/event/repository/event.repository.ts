import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IEventRepository } from "./event.repository.interface";

export class EventRepository implements IEventRepository {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

}
