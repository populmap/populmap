import { CustomOverlayMap } from "react-kakao-maps-sdk";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { axiosCityRoadAvg } from "../../network/axios/axios.city";
import { CityRoadAvgResponseDto } from "../../types/dto/CityRoadAvgResponse.dto";
import { CityPeopleResponseDto } from "../../types/dto/CityPeopleResponse.dto";

interface CityMarkerOverlayProps {
  cityPeopleInfo: CityPeopleResponseDto;
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

const CityMarkerOverlay = (props: CityMarkerOverlayProps): JSX.Element => {
  const { cityPeopleInfo } = props;
  const [type, setType] = useState<string>("people");
  const [roadAvgResponse, setRoadAvgResponse] = useState<
    CityRoadAvgResponseDto | undefined
  >(undefined);

  useEffect((): void => {
    console.log("effect called");
    axiosCityRoadAvg(cityPeopleInfo.cityId)
      .then((response) => setRoadAvgResponse(response))
      .catch((error) => console.error(error));
  }, [type]);

  return (
    <CustomOverlayMap
      position={{
        lat: cityPeopleInfo.lat,
        lng: cityPeopleInfo.lng,
      }}
      clickable
    >
      <SummaryBox>
        <div>
          <button onClick={(): void => setType("people")}>People</button>
          <button onClick={(): void => setType("road")}>Road</button>
        </div>
        {type === "people" ? (
          <>
            <span>{cityPeopleInfo.place}</span>
            <span>{cityPeopleInfo.type}</span>
            <span>{cityPeopleInfo.level}</span>
            <span>{cityPeopleInfo.densityMin}</span>
            <span>{cityPeopleInfo.densityMax}</span>
            <span>{cityPeopleInfo.residentRatio}</span>
            <span>{cityPeopleInfo.nonRegidentRatio}</span>
            <span>{cityPeopleInfo.updateTime.toString().substring(0, 10)}</span>
          </>
        ) : (
          <>
            <span>{roadAvgResponse?.place}</span>
            <span>{roadAvgResponse?.level}</span>
            <span>{roadAvgResponse?.message}</span>
            <span>{roadAvgResponse?.speed}</span>
            <span>
              {roadAvgResponse?.updateTime.toString().substring(0, 10)}
            </span>
          </>
        )}
      </SummaryBox>
    </CustomOverlayMap>
  );
};

export default CityMarkerOverlay;
