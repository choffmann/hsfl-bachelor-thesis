import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Container,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import Icon from "@mdi/react";
import { mdiBaguette, mdiCake, mdiChevronRight, mdiCreation, mdiMatrix } from "@mdi/js";
import { useMemo } from "react";
import { ChevronRight } from "@mui/icons-material";

export interface IndexPageProps {

}

const IndexPage = (props: IndexPageProps) => {
  const navigate = useNavigate();
  const theme = useTheme()

  const navigateToBenchmark = (benchmark: string) => {
    navigate("benchmark/" + benchmark)
  }

  const items = useMemo(() => {
    return [
      {
        id: "matrix-multiplication",
        name: "Matrizenmultiplikation",
        icon: mdiMatrix,
        color: "#E55812"
      },
      {
        id: "mandelbrot",
        name: "Mandelbrot",
        icon: mdiBaguette,
        color: "#A7ABDD"
      }
    ]
  }, [])


  return (
    <Container>
      <Stack sx={{ mt: 3 }} spacing={3}>
        <Typography variant="h4">Benchmark Algorithmen</Typography>
        <Box sx={{
          border: "solid 1px",
          borderRadius: "10px",
          backgroundColor: theme.palette.background.paper,
          borderColor: theme.palette.grey.A200
        }}>
          <List disablePadding>
            {items.map(item => (
              <ListItemButton key={item.id} onClick={() => navigateToBenchmark(item.id)}>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: item.color }}>
                    <Icon path={item.icon} size={1} color="white" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
                <ChevronRight color="inherit"/>
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Stack>
    </Container>
  )
}

export default IndexPage
