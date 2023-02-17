import styled from "@emotion/styled";
import LanguageIcon from "@mui/icons-material/Language";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CallIcon from "@mui/icons-material/Call";
import PaymentIcon from "@mui/icons-material/Payment";
import IosShareIcon from "@mui/icons-material/IosShare";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import dayjs from "dayjs";
import BookmarkApiButton from "../atoms/buttons/BookmarkApiButton";
import BaseButton from "../atoms/buttons/BaseButton";
import { EventDetailResponseDto } from "../../types/dto/EventDetailResponse.dto";
import colorTypes from "../../types/colorTypes";

interface DetailContentProps {
  detailResponse: EventDetailResponseDto | undefined;
}

const DetailDivStyle = styled.div`
  text-align: center;
`;

const SummaryDivStyle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 0.9rem;
`;

const ButtonDivStyle = styled.div`
  border-top: 0.05rem solid gray;
  border-bottom: 0.05rem solid gray;
  padding-top: 1rem;
  height: 3rem;
  button {
    margin: 0 1rem;
  }
`;

const InformationDivStyle = styled.div`
  text-align: left;
  font-size: 0.8rem;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;

  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert("복사되었습니다.");
  } catch (e) {
    alert("복사에 실패했습니다.");
  }
};

const DetailContent = (props: DetailContentProps): JSX.Element => {
  const { detailResponse } = props;
  if (!detailResponse) return <h2>결과가 없습니다.</h2>;
  return (
    <DetailDivStyle>
      <SummaryDivStyle>
        <h3>{detailResponse?.title}</h3>
        <p>{detailResponse?.description}</p>
      </SummaryDivStyle>
      <ButtonDivStyle>
        <BookmarkApiButton
          theme={"icon"}
          eventId={detailResponse?.eventId}
          icon={<BookmarkBorderIcon />}
          color={"secondary"}
        />
        <BaseButton
          theme={"icon"}
          icon={<IosShareIcon />}
          color={"secondary"}
          handleClick={handleCopy}
        />
      </ButtonDivStyle>
      <InformationDivStyle>
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
              style={{ textDecoration: "none", color: colorTypes.blue }}
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
              style={{ textDecoration: "none", color: colorTypes.blue }}
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
      </InformationDivStyle>
      {detailResponse?.modifiedTime && (
        <p
          style={{
            fontSize: "0.5rem",
            textAlign: "right",
            padding: "0 1.5rem",
          }}
        >
          업데이트{" "}
          {`${dayjs(detailResponse?.modifiedTime).format("YYYY/MM/DD HH:mm")}`}
        </p>
      )}
    </DetailDivStyle>
  );
};

export default DetailContent;
