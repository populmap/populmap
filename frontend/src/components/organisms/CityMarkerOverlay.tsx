import { CustomOverlayMap } from "react-kakao-maps-sdk";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { axiosCityRoadAvg } from "../../network/axios/axios.city";
import { CityRoadAvgResponseDto } from "../../types/dto/CityRoadAvgResponse.dto";
import { CityPeopleResponseDto } from "../../types/dto/CityPeopleResponse.dto";

interface CityMarkerOverlayProps {
  cityPeopleInfo: CityPeopleResponseDto;
}

const SummaryBox = styled.div`
  width: 10rem;
  height: 11rem;
  border-radius: 0.5rem;
  background-color: white;
  font-size: 0.2rem;
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
    axiosCityRoadAvg(cityPeopleInfo.cityId)
      .then((response) => {
        setRoadAvgResponse(response.data);
      })
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
        <p>{cityPeopleInfo.place}</p>
        <div>
          <Button style={ButtonStyle} onClick={(): void => setType("people")}>
            People
          </Button>
          <Button style={ButtonStyle} onClick={(): void => setType("road")}>
            Road
          </Button>
        </div>
        <hr style={{ width: "80%" }} />
        {type === "people" ? (
          <>
            <p>{cityPeopleInfo.type}</p>
            <p>{cityPeopleInfo.level}</p>
            <p>{cityPeopleInfo.densityMin}</p>
            <p>{cityPeopleInfo.densityMax}</p>
            <p>{cityPeopleInfo.residentRatio}</p>
            <p>{cityPeopleInfo.nonResidentRatio}</p>
            <p>{cityPeopleInfo.updateTime.toString().substring(0, 10)}</p>
          </>
        ) : (
          <>
            <p>{roadAvgResponse?.level}</p>
            <p>{roadAvgResponse?.message}</p>
            <p>{roadAvgResponse?.speed}</p>
            <p>{roadAvgResponse?.updateTime.toString().substring(0, 10)}</p>
          </>
        )}
      </SummaryBox>
    </CustomOverlayMap>
  );
};

export default CityMarkerOverlay;
