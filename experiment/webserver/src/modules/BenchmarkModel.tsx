import {Box, Button, Stack, Typography} from "@mui/material";
import React, {useMemo} from "react";

export interface BenchmarkModelProps {
  title: string
  n: number
  ready?: boolean
  currentStep: number
  estimatedTime: number
  onButtonClick: () => any
}

const BenchmarkModel = ({title, n, onButtonClick, currentStep, ready, estimatedTime}: BenchmarkModelProps) => {

  const disableButton = useMemo(() => {
    return ready !== undefined && !ready
  }, [ready])

  return (
      <Box>
        <Stack direction="row" justifyContent="space-between" sx={{mb: 2}}>
          <Typography variant="h6">{title}</Typography>
          <Button variant="contained" disabled={disableButton} onClick={() => onButtonClick()}>Starten</Button>
        </Stack>
        <Typography variant="subtitle2" color="text.secondary">Geschätzte Zeit: {estimatedTime} Sekunden</Typography>
        <Typography variant="subtitle2" color="text.secondary">Status: {currentStep}/{n}</Typography>
      </Box>
  )
}

export default BenchmarkModel