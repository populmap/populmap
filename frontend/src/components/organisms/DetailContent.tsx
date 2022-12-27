import styled from "@emotion/styled";
import LanguageIcon from "@mui/icons-material/Language";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CallIcon from "@mui/icons-material/Call";
import PaymentIcon from "@mui/icons-material/Payment";
import dayjs from "dayjs";
import PageNavigateButton from "../atoms/buttons/PageNavigateButton";
import BookmarkApiButton from "../atoms/buttons/BookmarkApiButton";
import ShareButton from "../atoms/buttons/ShareButton";
import CallButton from "../atoms/buttons/CallButton";
import { EventDetailResponseDto } from "../../types/dto/EventDetailResponse.dto";
import { axiosEventBookmarkPost } from "../../network/axios/axios.event";

interface DetailContentProps {
  detailResponse: EventDetailResponseDto | undefined;
}

const Summary = styled.div`
  font-size: 1rem;
  height: 10rem;
`;

const Information = styled.div`
  text-align: left;
  font-size: 0.8rem;
  display: flex;
  justify-content: start;
  flex-direction: column;
  margin: 2rem;
  height: 17rem;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Update = styled.div`
  position: fixed;
  top: 80%;
  left: 55%;
  font-size: 0.1rem;
`;

const DetailContent = (props: DetailContentProps): JSX.Element => {
  const { detailResponse } = props;
  if (!detailResponse) return <h2>Loading....</h2>;
  return (
    <>
      <Summary>
        <h3>{detailResponse?.title}</h3>
        <p style={{ marginBottom: "2rem" }}>{detailResponse?.description}</p>
        <BookmarkApiButton
          param={detailResponse?.eventId}
          value="북마크"
          api={axiosEventBookmarkPost}
        />
        <ShareButton />
      </Summary>
      <Information>
        {detailResponse?.place && (
          <p>
            <PlaceIcon /> {detailResponse?.place}
          </p>
        )}
        {detailResponse?.progress && (
          <p>
            <AccessTimeIcon /> {detailResponse?.progress}
          </p>
        )}
        {(detailResponse?.beginTime || detailResponse?.endTime) && (
          <p>
            <CalendarMonthIcon />{" "}
            {dayjs(detailResponse?.beginTime).format("YYYY/MM/DD HH:mm")}{" "}
            {" ~ "}
            {dayjs(detailResponse?.endTime).format("YYYY/MM/DD HH:mm")}
          </p>
        )}
        {detailResponse?.url && (
          <p>
            <LanguageIcon />{" "}
            <a href={`https://${detailResponse?.url}`}>{detailResponse?.url}</a>
          </p>
        )}
        {detailResponse?.call && (
          <p>
            <CallIcon />{" "}
            <a href={`tel:${detailResponse?.call}`}>{detailResponse?.call}</a>
          </p>
        )}
        {detailResponse?.fee && (
          <p>
            <PaymentIcon /> {detailResponse?.fee}
          </p>
        )}
      </Information>
      <Update>
        {detailResponse?.modifiedTime && (
          <p>
            업데이트{" "}
            {dayjs(detailResponse?.modifiedTime).format("YYYY/MM/DD HH:mm")}
          </p>
        )}
      </Update>
    </>
  );
};

export default DetailContent;
