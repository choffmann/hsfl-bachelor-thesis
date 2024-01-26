import {Box, Button, LinearProgress, Stack, Typography} from "@mui/material";
import React, {useEffect, useMemo, useState} from "react";

export interface BenchmarkModelProps {
  title: string
  n: number
  ready?: boolean
  currentStep: number
  estimatedTime: number
  onButtonClick: () => any
}

const BenchmarkModel = ({title, n, onButtonClick, currentStep, ready, estimatedTime}: BenchmarkModelProps) => {
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (n === currentStep) {
      setRunning(false)
    }
  }, [currentStep]);

  const progress = useMemo(() => {
    return Math.round(100 / n * currentStep)
  }, [currentStep])

  const disableButton = useMemo(() => {
    return (ready !== undefined && !ready) || running
  }, [ready, running])

  const handleButtonClick = () => {
    setRunning(true)
    onButtonClick()
  }

  return (
      <Box>
        <Stack direction="row" justifyContent="space-between" sx={{mb: 2}}>
          <Typography variant="h6">{title}</Typography>
          <Button variant="contained" disabled={disableButton} onClick={() => handleButtonClick()}>Starten</Button>
        </Stack>
        <Typography variant="subtitle2" color="text.secondary">Geschätzte Zeit: {Math.round(estimatedTime)} Sekunden</Typography>
        {running &&
          <Box sx={{mt: 1}}>
            <LinearProgress variant="determinate" value={progress}/>
            <Typography variant="subtitle2" color="text.secondary">Status: {currentStep}/{n}</Typography>
          </Box>
        }
      </Box>
  )
}

export default BenchmarkModel