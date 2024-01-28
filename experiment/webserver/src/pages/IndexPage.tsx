import {useNavigate} from "react-router-dom";
import {
  Avatar,
  Box,
  Container,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import Icon from "@mdi/react";
import {mdiBaguette, mdiCake, mdiChevronRight, mdiMatrix} from "@mdi/js";

export interface IndexPageProps {

}

const IndexPage = (props: IndexPageProps) => {
  const navigate = useNavigate();
  const theme = useTheme()

  const randomColor = () => {
    let hex = Math.floor(Math.random() * 0xFFFFFF);
    return "#" + hex.toString(16);
  }

  const navigateToBenchmark = (benchmark: string) => {
    navigate("benchmark/" + benchmark)
  }


  return (
      <Container>
        <Stack sx={{mt: 3}} spacing={3}>
          <Typography variant="h5">Benchmark Algorithmen</Typography>
          <Box sx={{
            border: "solid 1px",
            borderRadius: "10px",
            backgroundColor: theme.palette.background.paper,
            borderColor: theme.palette.grey.A200
          }}>
            <List disablePadding>
              <ListItemButton onClick={() => navigateToBenchmark("matrix-multiplication")}>
                <ListItemAvatar>
                  <Avatar sx={{backgroundColor: randomColor()}}>
                    <Icon path={mdiMatrix} size={1}/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Matrizenmultiplikation"/>
                <Icon path={mdiChevronRight} size={1}/>
              </ListItemButton>
              <ListItemButton  onClick={() => navigateToBenchmark("mandelbrot")}>
                <ListItemAvatar>
                  <Avatar sx={{backgroundColor: randomColor()}}>
                    <Icon path={mdiBaguette} size={1}/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Mandelbrot"/>
                <Icon path={mdiChevronRight} size={1}/>
              </ListItemButton>
            </List>
          </Box>
        </Stack>
      </Container>
  )
}

export default IndexPage