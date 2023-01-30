import IconButton from "@mui/material/IconButton";
import IosShareIcon from "@mui/icons-material/IosShare";

const ShareButton = (): JSX.Element => {
  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("복사되었습니다.");
    } catch (e) {
      alert("복사에 실패했습니다.");
    }
  };

  return (
    <IconButton
      style={{
        flexDirection: "column",
        fontSize: "0.5rem",
        height: "1.5rem",
        width: "3rem",
        color: "#1b73e8",
      }}
      onClick={handleClick}
    >
      <IosShareIcon style={{ color: "#1b73e8" }} />
      공유
    </IconButton>
  );
};

export default ShareButton;
