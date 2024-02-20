import {
  Box,
  Stack,
  Typography,
  Link,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { forwardRef } from "react";
import ColorModeSwitch from "./ColorModeSwitch";

const Footer = forwardRef((_, ref) => {
  const small = useMediaQuery("(min-width:900px)");
  return (
    <Box
      ref={ref}
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "center",
        mb: 2,
        mt: 2,
        width: "100%",
      }}
    >
      <Stack direction={{ md: "row", sm: "column" }} useFlexGap spacing={2}>
        <Stack alignItems="center" justifyContent="center">
          <Stack
            direction="row"
            spacing={1}
            divider={<Typography color="text.secondary"> &#x2022; </Typography>}
          >
            <Typography variant="body1" color="text.secondary">
              {import.meta.env.VITE_APP_VERSION}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {import.meta.env.VITE_CURRENT_BRANCH}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              ({import.meta.env.VITE_LAST_COMMIT})
            </Typography>
          </Stack>
          <Stack
            direction={{ sm: "column", md: "row" }}
            alignItems={small ? "center" : "inherit"}
            useFlexGap
            spacing={1}
            divider={
              small && (
                <Typography color="text.secondary"> &#x2022; </Typography>
              )
            }
          >
            <Typography color="text.secondary">
              {import.meta.env.VITE_AUTHOR}
            </Typography>
            <Link href={import.meta.env.VITE_APP_URL} color="text.secondary">
              {import.meta.env.VITE_APP_URL}
            </Link>
          </Stack>
        </Stack>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ColorModeSwitch />
        </Box>
      </Stack>
    </Box>
  );
});

export default Footer;
