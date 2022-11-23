import { CustomOverlayMap } from "react-kakao-maps-sdk";

interface EventSummaryOverlayProps {
  position: {
    lat: number;
    lng: number;
  };
}

const EventSummaryOverlay = (props: EventSummaryOverlayProps): JSX.Element => {
  const { position } = props;

  const handleClick = (): void => {
    console.log("clicked");
  };
  return (
    <CustomOverlayMap
      position={{
        lat: position.lat,
        lng: position.lng,
      }}
    >
      <div>
        <span>1234</span>
      </div>
    </CustomOverlayMap>
  );
};

export default EventSummaryOverlay;
