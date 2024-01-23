import {Box, Container, Stack, Typography} from "@mui/material";
import MatrixTypeScript from "../modules/matrix/MatrixTypeScript";
import MatrixWasm from "../modules/matrix/MatrixWasm";

export interface MatrixMultiplicationProps {

}

const MatrixMultiplication = (props: MatrixMultiplicationProps) => {
  return (
      <Container>
        <Box sx={{mt: 3, mb: 3}}>
          <Typography variant="h5">Matrizenmultiplikation</Typography>
            <MatrixTypeScript/>
            <MatrixWasm/>
        </Box>

      </Container>
  )
}

export default MatrixMultiplication