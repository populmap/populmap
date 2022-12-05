import { CustomOverlayMap } from "react-kakao-maps-sdk";
import styled from "@emotion/styled";
import { CityAccidentResponseDto } from "../../types/dto/CityAccidentResponse.dto";

interface CityAccidentMarkerOverlayProps {
  cityAccidentInfo: CityAccidentResponseDto;
}

const SummaryBox = styled.div`
  width: 10rem;
  height: 7rem;
  border-radius: 0.5rem;
  background-color: white;
  font-size: 0.5rem;
`;

const ButtonStyle = {
  border: "0.01rem solid gray",
  fontSize: "0.5rem",
  height: "1.5rem",
};

const CityAccidentMarkerOverlay = (
  props: CityAccidentMarkerOverlayProps
): JSX.Element => {
  const { cityAccidentInfo } = props;

  return (
    <CustomOverlayMap
      position={{
        lat: cityAccidentInfo.lat,
        lng: cityAccidentInfo.lng,
      }}
      clickable
    >
      <SummaryBox>
        <p>{cityAccidentInfo.beginTime}</p>
        <p>{cityAccidentInfo.endTime}</p>
        <p>{cityAccidentInfo.type}</p>
        <p>{cityAccidentInfo.detailType}</p>
        <p>{cityAccidentInfo.updateTime.toString().substring(0, 10)}</p>
      </SummaryBox>
    </CustomOverlayMap>
  );
};

export default CityAccidentMarkerOverlay;
