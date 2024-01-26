import {Typography} from "@mui/material";

export interface MatrixDescriptionProps {

}

const MatrixDescription = (props: MatrixDescriptionProps) => {
  return (
      <>
        <Typography>
          Die Matrizenmultiplikation multipliziert zwei Matrizen mit einander. Dabei
          werden zwei Matrizen mit der göße N x N gebildet. Die Zeitkomplexität beläuft sich bei
          diesem Algorithms aus <code>O(n^3)</code>.
        </Typography>
      </>
  )
}

export default MatrixDescription