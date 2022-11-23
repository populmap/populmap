import { InjectRepository } from "@nestjs/typeorm";
import { SearchByPlaceDto } from "src/dto/search.by.place.dto";
import EventDetail from "src/entities/event.detail.entity";
import Event from "src/entities/event.entity";
import { Repository } from "typeorm";
import { IEventRepository } from "./event.repository.interface";

export class EventRepository implements IEventRepository {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(EventDetail)
    private eventDetailRepository: Repository<EventDetail>,
  ) {}

  async insertToEventIfExists(event, searchByPlace: SearchByPlaceDto): Promise<{ title: string, endDate: Date }> {
    const found = await this.eventRepository.findOne({
      where: {
        title: event.TITLE,
      },
    });
    if (found && found.eventDetail) {
      return {
        title: found.title,
        endDate: found.eventDetail.endDate,
      };
    }
    const result = await this.eventRepository.createQueryBuilder()
      .insert()
      .into(Event)
      .values({
        type: event.CODENAME,
        disctrict: event.GUNAME,
        title: event.TITLE,
        address: searchByPlace.address,
        lat: searchByPlace.lat,
        lng: searchByPlace.lng,
      })
      .execute();
    await this.eventDetailRepository.createQueryBuilder()
      .insert()
      .into(EventDetail)
      .values({
        eventId: result.identifiers[0].eventId,
        beginDate: new Date(event.STRTDATE),
        endDate: new Date(event.END_DATE),
        orgName: event.ORG_NAME,
        target: event.USE_TRGT,
        fee: event.USE_FEE,
        playerInfo: event.PLAYER,
        programInfo: event.PROGRAM,
        eventDescription: event.ETC_DESC,
        orgLink: event.ORG_LINK,
        imgLink: event.MAIN_IMG,
      })
      .execute();
    const title: string = event.TITLE;
    const endDate: Date = new Date(event.END_DATE);
    return { title, endDate };
  }

  async deleteEvent(title: string): Promise<void> {
    await this.eventRepository.delete({
      title,
    });
  }
}
