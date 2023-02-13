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

const SummaryStyle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 0.9rem;
  height: 9rem;
`;

const ButtonDivStyle = styled.div`
  border-top: 0.05rem solid gray;
  border-bottom: 0.05rem solid gray;
  padding-top: 1rem;
  height: 3rem;
`;

const InformationStyle = styled.div`
  text-align: left;
  font-size: 0.8rem;
  padding: 1rem;
  display: flex;
  justify-content: start;
  flex-direction: column;
  height: 12rem;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const DetailContent = (props: DetailContentProps): JSX.Element => {
  const { detailResponse } = props;
  if (!detailResponse) return <h2>Loading....</h2>;
  return (
    <>
      <SummaryStyle>
        <h3>{detailResponse?.title}</h3>
        <p>{detailResponse?.description}</p>
      </SummaryStyle>
      <ButtonDivStyle>
        <BookmarkApiButton
          param={detailResponse?.eventId}
          value="북마크"
          style={{
            flexDirection: "column",
            fontSize: "0.5rem",
            height: "1.5rem",
            width: "5rem",
            color: "#1b73e8",
          }}
          api={axiosEventBookmarkPost}
        />
        <ShareButton />
      </ButtonDivStyle>
      <InformationStyle>
        <h3>상세정보</h3>
        {detailResponse?.address && (
          <p>
            <PlaceIcon /> {detailResponse?.address}
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
            {`${dayjs(detailResponse?.beginTime).format("YYYY/MM/DD HH:mm")}`}{" "}
            {" ~ "}
            {`${dayjs(detailResponse?.endTime).format("YYYY/MM/DD HH:mm")}`}
          </p>
        )}
        {detailResponse?.url && (
          <p>
            <LanguageIcon />{" "}
            <a
              style={{ textDecoration: "none", color: "#1b73e8" }}
              href={`https://${detailResponse?.url}`}
            >
              {detailResponse?.url}
            </a>
          </p>
        )}
        {detailResponse?.call && (
          <p>
            <CallIcon />{" "}
            <a
              style={{ textDecoration: "none", color: "#1b73e8" }}
              href={`tel:${detailResponse?.call}`}
            >
              {detailResponse?.call}
            </a>
          </p>
        )}
        {detailResponse?.fee && (
          <p>
            <PaymentIcon /> {detailResponse?.fee}
          </p>
        )}
      </InformationStyle>
      {detailResponse?.modifiedTime && (
        <p style={{ fontSize: "0.5rem" }}>
          업데이트{" "}
          {`${dayjs(detailResponse?.modifiedTime).format("YYYY/MM/DD HH:mm")}`}
        </p>
      )}
    </>
  );
};

export default DetailContent;
