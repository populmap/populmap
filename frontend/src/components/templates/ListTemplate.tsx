import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import SelectBox from "../organisms/SelectBox";
import EventCard from "../organisms/EventCard";
import Pagination from "../organisms/Pagination";
import {
  EventPagiNationResponseDto,
  EventListDto,
} from "../../types/dto/EventPagiNationResponse.dto";
import {
  axiosEventSearchList,
  axiosEventBookmarkList,
} from "../../network/axios/axios.event";
import { useAppSelector } from "../../redux/hook";

const ListSectionStyle = styled.section`
  width: 100%;
  height: calc(100% - 200px);
  text-align: center;
`;

const SelectBoxStyle = styled.div`
  height: 26px;
`;

const CardListStyle = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  height: 65vh;
`;

const PaginationStyle = styled.div`
  padding: 6px 0;
  height: 24px;
`;

const ListTemplate = (): JSX.Element => {
  const [city, setCity] = useState<string>("전국");
  const [progress, setProgress] = useState<string>("전체");
  const [index, setIndex] = useState<number>(0);
  const [length, setLength] = useState<number>(10);
  const [eventLists, setEventLists] = useState<EventPagiNationResponseDto>();
  const user = useAppSelector((state) => state.user);
  const reload = useAppSelector((state) => state.reload);
  const type = window.location.pathname;

  useEffect((): void => {
    if (type === "/event") {
      axiosEventSearchList(index, length, city, progress)
        .then((response) => setEventLists(response.data))
        .catch((err) => console.error(err));
    } else if (type === "/bookmark" && user.userId !== -1) {
      axiosEventBookmarkList(index, length, city, progress)
        .then((response) => {
          setEventLists(response.data);
        })
        .catch((err) => console.error(err));
    }
  }, [index, length, city, progress, reload.active]);

  return (
    <ListSectionStyle>
      <SelectBoxStyle>
        <SelectBox setCity={setCity} setProgress={setProgress} />
      </SelectBoxStyle>
      <CardListStyle>
        {(!eventLists || eventLists?.eventLists.length === 0) && (
          <p style={{ marginTop: "15rem" }}>등록된 행사가 없습니다.</p>
        )}
        {eventLists?.eventLists.map((cardInfo, index) => {
          return <EventCard cardInfo={cardInfo} key={index} />;
        })}
      </CardListStyle>
      <PaginationStyle>
        <Pagination
          totalLength={eventLists?.totalLength}
          length={length}
          index={index}
          setIndex={setIndex}
        />
      </PaginationStyle>
    </ListSectionStyle>
  );
};

export default ListTemplate;
