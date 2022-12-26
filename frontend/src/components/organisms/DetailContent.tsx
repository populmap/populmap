import styled from "@emotion/styled";
import LanguageIcon from "@mui/icons-material/Language";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CallIcon from "@mui/icons-material/Call";
import PaymentIcon from "@mui/icons-material/Payment";
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
  border-bottom: 0.05rem solid gray;
  height: 10rem;
`;

const Information = styled.div`
  text-align: left;
  font-size: 0.8rem;
  display: flex;
  justify-content: start;
  flex-direction: column;
  margin: 2rem;
  height: 25rem;
`;

const Update = styled.div`
  position: absolute;
  top: 75%;
  left: 70%;
  font-size: 0.1rem;
`;

const DetailContent = (props: DetailContentProps): JSX.Element => {
  const { detailResponse } = props;
  if (!detailResponse) return <h2>Loading....</h2>;
  return (
    <>
      <Summary>
        <h2>{detailResponse?.title}</h2>
        <p style={{marginBottom: "2rem"}}>{detailResponse?.description}</p>
        <BookmarkApiButton
          param={detailResponse?.eventId}
          value="북마크"
          api={axiosEventBookmarkPost}
        />
        <ShareButton />
      </Summary>
      <Information>
        <p>
          <PlaceIcon />{detailResponse?.place}
        </p>
        <p>
          <AccessTimeIcon />{detailResponse?.progress}
        </p>
        {detailResponse?.progress === "진행중" && (
          <p>
            <CalendarMonthIcon />
            {detailResponse?.beginTime.toString().substring(0, 10)} ~{" "}
            {detailResponse?.endTime.toString().substring(0, 10)}
          </p>
        )}
        <p>
          <LanguageIcon />
          <a href={`https://${detailResponse?.url}`} >{detailResponse?.url}</a>
        </p>
        <p>
          <CallIcon />
          <a href={`tel:${detailResponse?.call}`}>{detailResponse?.call}</a>
        </p>
        <p>
          <PaymentIcon /> {detailResponse?.fee}
        </p>
      </Information>
      <Update>
        <p>
          업데이트 {detailResponse?.modifiedDate.toString().substring(0, 10)}
        </p>
      </Update>
    </>
  );
};

export default DetailContent;
