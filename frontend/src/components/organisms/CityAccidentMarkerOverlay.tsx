import { CustomOverlayMap } from "react-kakao-maps-sdk";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { CityAccidentResponseDto } from "../../types/dto/CityAccidentResponse.dto";

interface CityAccidentMarkerOverlayProps {
  cityAccidentInfo: CityAccidentResponseDto;
}

const SummaryBox = styled.div`
  height: 11rem;
  width: 10rem;
  border-radius: 0.5rem;
  background-color: white;
  font-size: 0.5rem;
  padding: 0.5rem 1rem;
  text-align: center;
`;

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
        <p
          style={{
            fontSize: "0.7rem",
            backgroundColor: "#0080FE",
            color: "#ffffff",
            height: "1.2rem",
            borderRadius: "0.3rem",
          }}
        >
          {cityAccidentInfo.type}
        </p>
        <p style={{ fontSize: "0.6rem" }}>{cityAccidentInfo.detailType}</p>
        <p>{`${dayjs(cityAccidentInfo.beginTime).format(
          "YYYY/MM/DD HH:mm"
        )}`}</p>
        <p>{"~"}</p>
        <p>{`${dayjs(cityAccidentInfo.endTime).format("YYYY/MM/DD HH:mm")}`}</p>
        <p>
          {" "}
          업데이트{" "}
          {`${dayjs(cityAccidentInfo.updateTime).format("YYYY/MM/DD HH:mm")}`}
        </p>
      </SummaryBox>
    </CustomOverlayMap>
  );
};

export default CityAccidentMarkerOverlay;
