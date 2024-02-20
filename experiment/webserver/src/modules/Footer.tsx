import { Box, Stack, Typography, Link, Paper } from "@mui/material";
import { forwardRef } from "react";
import ColorModeSwitch from "./ColorModeSwitch";

const Footer = forwardRef((_, ref) => {
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
      <Stack direction="row" spacing={2}>
        <Stack alignItems="center" justifyContent="center">
          <Typography color="text.secondary">
            {import.meta.env.VITE_APP_VERSION} &#x2022;{" "}
            {import.meta.env.VITE_CURRENT_BRANCH} &#x2022; (
            {import.meta.env.VITE_LAST_COMMIT})
          </Typography>
          <Stack direction="row" spacing={1}>
            <Typography color="text.secondary">
              {import.meta.env.VITE_AUTHOR}
            </Typography>
            <Typography color="text.secondary"> &#x2022; </Typography>
            <Link href={import.meta.env.VITE_APP_URL} color="text.secondary">
              {import.meta.env.VITE_APP_URL}
            </Link>
          </Stack>
        </Stack>
        <ColorModeSwitch />
      </Stack>
    </Box>
  );
});

export default Footer;
