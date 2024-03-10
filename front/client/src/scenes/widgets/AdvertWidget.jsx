import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

// component for displaying advertisements
const AdvertWidget = () => {
  // accessing theme properties for consistent styling
  const { palette } = useTheme();
  // theme colors for text
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Callaway</Typography>
        <a href="https://www.callawaygolf.com" target="_blank" rel="noopener noreferrer">
          <Typography color={medium}>callawaygolf.com</Typography>
        </a>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Better, Faster, Further, Callaway Paradym.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;