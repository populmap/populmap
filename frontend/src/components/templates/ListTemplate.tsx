import styled from "@emotion/styled";
import { PropsWithChildren, useEffect, useState } from "react";
import {
  EventPagiNationResponseDto,
  EventListDto,
} from "../../types/dto/EventPagiNationResponse.dto";
import SelectBox from "../organisms/SelectBox";
import EventCard from "../organisms/EventCard";
import {
  axiosEventSearchList,
  axiosEventBookmarkList,
} from "../../network/axios/axios.event";

const ListSectionStyle = styled.section`
  position: absolute;
  top: 5%;
  width: 100%;
  height: 80%;
`;

const SelectBoxStyle = styled.div`
  height: 5%;
`;

const CardListStyle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  height: ${window.ontouchstart ? "60%" : "88%"}; ;
`;

const PaginationStyle = styled.div`
  height: 7%;
`;

const ListTemplate = (): JSX.Element => {
  const [city, setCity] = useState<string>("전국");
  const [progress, setProgress] = useState<string>("전체");
  const [page, setPage] = useState<number>(0);
  const [length, setLength] = useState<number>(10);
  const [eventLists, setEventLists] = useState<EventPagiNationResponseDto>();
  const type = window.location.pathname;

  useEffect((): void => {
    if (type === "/event") {
      axiosEventSearchList(page, length, city, progress)
        .then((response) => setEventLists(response.data))
        .catch((err) => console.error(err));
    } else if (type === "/bookmark") {
      axiosEventBookmarkList(page, length, city, progress)
        .then((response) => {
          setEventLists(response.data);
        })
        .catch((err) => console.error(err));
    }
  }, [page, length, city, progress]);

  return (
    <ListSectionStyle>
      <SelectBoxStyle>
        <SelectBox setCity={setCity} setProgress={setProgress} />
      </SelectBoxStyle>
      <CardListStyle>
        {eventLists?.eventLists.map((cardInfo, index) => {
          return <EventCard cardInfo={cardInfo} key={index} />;
        })}
      </CardListStyle>
      <PaginationStyle>
        pagination
        {/* <Pagination /> */}
      </PaginationStyle>
    </ListSectionStyle>
  );
};

export default ListTemplate;
