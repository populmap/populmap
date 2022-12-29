import { CustomOverlayMap } from "react-kakao-maps-sdk";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { CityAccidentResponseDto } from "../../types/dto/CityAccidentResponse.dto";

interface CityAccidentMarkerOverlayProps {
  cityAccidentInfo: CityAccidentResponseDto;
}

const SummaryBox = styled.div`
  position: relative;
  width: 10rem;
  height: 11rem;
  border-radius: 0.5rem;
  background-color: white;
  font-size: 0.2rem;
  padding: 0.5rem 1rem;
`;

const ButtonStyle = {
  border: "0.01rem solid gray",
  fontSize: "0.5rem",
  height: "1.5rem",
};

const UpdateStyle = styled.div`
  position: fixed;
  transform: translate(15%, 65%);
  font-size: 0.1rem;
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
        <p style={{ fontWeight: "bold", fontSize: "0.8rem" }}>
          {cityAccidentInfo.type}
        </p>
        <p style={{ fontSize: "0.6rem" }}>{cityAccidentInfo.detailType}</p>
        <p>{dayjs(cityAccidentInfo.beginTime).format("YYYY/MM/DD HH:mm")}</p>
        <p>{"~"}</p>
        <p>{dayjs(cityAccidentInfo.endTime).format("YYYY/MM/DD HH:mm")}</p>
        <UpdateStyle>
          <p>
            {" "}
            업데이트{" "}
            {dayjs(cityAccidentInfo.updateTime).format("YYYY/MM/DD HH:mm")}
          </p>
        </UpdateStyle>
      </SummaryBox>
    </CustomOverlayMap>
  );
};

export default CityAccidentMarkerOverlay;
