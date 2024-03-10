import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

// functional component for the login page
const LoginPage = () => {
  const theme = useTheme(); // hook to access theme properties for consistent styling
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); 
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Links
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
        Welcome to Links! Connect, play, and share with fellow golf enthusiasts.
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;