import { CustomOverlayMap } from "react-kakao-maps-sdk";

interface EventSummaryOverlayProps {
  position: {
    lat: number;
    lng: number;
  };
}

const EventSummaryOverlay = (props: EventSummaryOverlayProps): JSX.Element => {
  const { position } = props;
  return (
    <CustomOverlayMap
      position={{
        lat: position.lat,
        lng: position.lng,
      }}
    >
      <div style={{ backgroundColor: "white" }}>
        <div>
          <p>test</p>
          <button>자세히보기</button>
        </div>
      </div>
    </CustomOverlayMap>
  );
};

export default EventSummaryOverlay;
