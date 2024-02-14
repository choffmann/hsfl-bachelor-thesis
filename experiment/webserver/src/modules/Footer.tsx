import { DarkMode } from "@mui/icons-material";
import { Box, Stack, Typography, Link, Paper, IconButton } from "@mui/material";
import ColorModeSwitch from "./ColorModeSwitch";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
      }}
    >
      <Paper sx={{ py: 2 }}>
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translate(0, -50%)",
            mr: 2,
          }}
        >
          <ColorModeSwitch />
        </Box>
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
      </Paper>
    </Box>
  );
};

export default Footer;
