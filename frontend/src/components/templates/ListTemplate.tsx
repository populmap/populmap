import styled from "@emotion/styled";
import { PropsWithChildren, useEffect, useState } from "react";
import SelectBox from "../organisms/SelectBox";
import { axiosEventSearchList } from "../../network/axios/axios.event";

const ListSection = styled.section`
  position: absolute;
  text-align: center;
  top: 5%;
  width: 100%;
  height: 95%;
`;

const ListTemplate = ({ children }: PropsWithChildren): JSX.Element => {
  const [city, setCity] = useState<string>("전국");
  const [progress, setProgress] = useState<string>("전체");
  const [page, setPage] = useState<number>(0);
  const [length, setLength] = useState<number>(10);

  useEffect((): void => {
    axiosEventSearchList(page, length, city, progress)
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    console.log("effect");
  }, [page, length, city, progress]);

  return (
    <ListSection>
      {/* <SelectFrom /> */}
      <SelectBox setCity={setCity} setProgress={setProgress} />
      {children}
      {/* <Pagination /> */}
    </ListSection>
  );
};

export default ListTemplate;
