import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import CityAccident from "src/entities/city.accident.entity";
import City from "src/entities/city.entity";
import CityPeople from "src/entities/city.people.entity";
import CityRoad from "src/entities/city.road.entity";
import { UtilsModule } from "src/utils/utils.module";
import { CityController } from "./city.controller";
import { CityService } from "./city.service";
import { CityRepository } from "./repository/city.repository";


const repo = {
  provide: 'ICityRepository',
  useClass: CityRepository,
};

@Module({
  imports: [
    TypeOrmModule.forFeature([City, CityPeople, CityRoad, CityAccident]),
    forwardRef(() => UtilsModule),
  ],
  providers: [CityService, repo],
  controllers: [CityController],
  exports: [CityService],
})
export class CityModule {}
