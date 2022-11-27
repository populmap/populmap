import { EventDetailResponseDto } from "../../types/dto/EventDetailResponse.dto";
import PageNavigateButton from "../atoms/buttons/PageNavigateButton";
import BookmarkApiButton from "../atoms/buttons/BookmarkApiButton";
import CallButton from "../atoms/buttons/CallButton";
import { axiosEventBookmarkPost } from "../../network/axios/axios.event";

interface DetailContentProps {
  detailResponse: EventDetailResponseDto | undefined;
}

const ButtonStyle = {
  border: "0.05rem solid gray",
  fontSize: "0.5rem",
  height: "3rem",
  width: "3rem",
};

const DetailContent = (props: DetailContentProps): JSX.Element => {
  const { detailResponse } = props;
  if (!detailResponse) return <h2>Loading....</h2>;
  return (
    <>
      <div>
        <h2>{detailResponse?.title}</h2>
        <p>{detailResponse?.description}</p>
      </div>
      <div>
        <CallButton
          value="전화"
          call={detailResponse?.call}
          style={ButtonStyle}
        />
        <PageNavigateButton value="지도" route="/" style={ButtonStyle} />
        <BookmarkApiButton
          style={ButtonStyle}
          param={detailResponse?.eventId}
          value="북마크"
          api={axiosEventBookmarkPost}
        />
      </div>
      <hr style={{ width: "80%" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          marginLeft: "5rem",
        }}
      >
        <p>{detailResponse?.place}</p>
        <p>{detailResponse?.progress}</p>
        {detailResponse?.progress === "진행중" && (
          <span>
            일정
            {detailResponse?.beginTime.toString().substring(0, 10)} ~{" "}
            {detailResponse?.endTime.toString().substring(0, 10)}
          </span>
        )}
        <p>
          홈페이지
          <a href={detailResponse?.url}>{detailResponse?.url}</a>
        </p>
        <p>
          전화번호
          <a href={`tel:${detailResponse?.call}`}>{detailResponse?.call}</a>
        </p>
        <p>요금 {detailResponse?.fee}</p>
      </div>
      <div>
        <p>
          수정시간 {detailResponse?.modifiedDate.toString().substring(0, 10)}
        </p>
      </div>
    </>
  );
};

export default DetailContent;
