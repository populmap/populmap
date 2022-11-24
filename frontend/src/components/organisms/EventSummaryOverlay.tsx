import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { EventBasicInfoResponseDto } from "../../types/dto/EventBasicInfoResponse.dto";

interface EventSummaryOverlayProps {
  eventInfo: EventBasicInfoResponseDto;
}

const EventSummaryOverlay = (props: EventSummaryOverlayProps): JSX.Element => {
  const { eventInfo } = props;

  // navigate event Id
  const handleClick = (): void => {
    console.log("click");
  };
  return (
    <CustomOverlayMap
      position={{
        lat: eventInfo.lat,
        lng: eventInfo.lng,
      }}
      clickable
    >
      <div
        role="presentation"
        onClick={(e): void => {
          e.stopPropagation();
        }}
      >
        <p>{eventInfo.title}</p>
        <p>{eventInfo.address}</p>
        <button onClick={handleClick}>자세히보기</button>
      </div>
    </CustomOverlayMap>
  );
};

export default EventSummaryOverlay;
