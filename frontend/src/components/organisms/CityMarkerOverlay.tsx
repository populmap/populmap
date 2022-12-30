import { CustomOverlayMap } from "react-kakao-maps-sdk";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { axiosCityRoadAvg } from "../../network/axios/axios.city";
import { CityRoadAvgResponseDto } from "../../types/dto/CityRoadAvgResponse.dto";
import { CityPeopleResponseDto } from "../../types/dto/CityPeopleResponse.dto";
import { levelColor } from "../../types/dto/CityPeopleResponse.dto";

interface CityMarkerOverlayProps {
  cityPeopleInfo: CityPeopleResponseDto;
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

type buttonProps = {
  isChange: boolean;
};

const TypeButtonStyle = styled.button<buttonProps>`
  border-radius: 0.3rem;
  height: 1.5rem;
  border: 0;
  width: 50%;
  background-color: ${(props): string =>
    props.isChange ? "#0080FE" : "white"};
  color: ${(props): string => (props.isChange ? "white" : "inherit")};
  font-size: 0.5rem;
`;

const SummaryNavStyle = styled.div`
  height: 1.5rem;
  width: 100%;
`;

const UpdateStyle = styled.div`
  position: fixed;
  transform: translate(15%, 20%);
  font-size: 0.1rem;
`;

const CityMarkerOverlay = (props: CityMarkerOverlayProps): JSX.Element => {
  const { cityPeopleInfo } = props;
  const [isChange, setIsChange] = useState<boolean>(true);
  const [roadAvgResponse, setRoadAvgResponse] = useState<
    CityRoadAvgResponseDto | undefined
  >(undefined);

  useEffect((): void => {
    axiosCityRoadAvg(cityPeopleInfo.cityId)
      .then((response) => {
        setRoadAvgResponse(response.data);
      })
      .catch((error) => console.error(error));
  }, [isChange]);

  return (
    <CustomOverlayMap
      position={{
        lat: cityPeopleInfo.lat,
        lng: cityPeopleInfo.lng,
      }}
      clickable
    >
      <SummaryBox>
        <SummaryNavStyle>
          <TypeButtonStyle
            isChange={isChange}
            onClick={(): void => setIsChange((state) => !state)}
          >
            인구 복잡도
          </TypeButtonStyle>
          <TypeButtonStyle
            isChange={!isChange}
            onClick={(): void => setIsChange((state) => !state)}
          >
            도로 상태
          </TypeButtonStyle>
        </SummaryNavStyle>
        <p style={{ fontWeight: "bold", fontSize: "0.6rem" }}>
          {cityPeopleInfo.place}
        </p>
        {isChange ? (
          <>
            <></>
            <p
              style={{
                height: "1rem",
                fontSize: "0.5rem",
                border: `0.01rem solid ${levelColor(cityPeopleInfo.level)}`,
                borderRadius: "0.2rem",
                backgroundColor: `${levelColor(cityPeopleInfo.level)}`,
              }}
            >
              {cityPeopleInfo.level}
            </p>
            <p>최소 {cityPeopleInfo.densityMin}(명)</p>
            <p>최대 {cityPeopleInfo.densityMax}(명)</p>
            <p>
              상주({cityPeopleInfo.residentRatio}%) 비상주(
              {cityPeopleInfo.nonResidentRatio}%)
            </p>
            <UpdateStyle>
              <p>
                업데이트{" "}
                {`${dayjs(cityPeopleInfo.updateTime).format(
                  "YYYY/MM/DD HH:mm"
                )}`}
              </p>
            </UpdateStyle>
          </>
        ) : (
          <>
            <p
              style={{
                height: "1rem",
                fontSize: "0.5rem",
                border: `0.01rem solid ${levelColor(roadAvgResponse?.level)}`,
                borderRadius: "0.2rem",
                backgroundColor: `${levelColor(roadAvgResponse?.level)}`,
              }}
            >
              {roadAvgResponse?.level}
            </p>
            <p style={{ whiteSpace: "normal", marginBottom: "1rem" }}>
              {roadAvgResponse?.message}
            </p>
            <span>평균 주행 속도 </span>
            <span style={{ color: `${levelColor(roadAvgResponse?.level)}` }}>
              {roadAvgResponse?.speed}km/h
            </span>
            <UpdateStyle>
              <p>
                업데이트{" "}
                {`${dayjs(roadAvgResponse?.updateTime).format(
                  "YYYY/MM/DD HH:mm"
                )}`}
              </p>
            </UpdateStyle>
          </>
        )}
      </SummaryBox>
    </CustomOverlayMap>
  );
};

export default CityMarkerOverlay;
