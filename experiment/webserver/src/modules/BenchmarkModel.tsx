import { useTheme } from "@emotion/react";
import { Box, Button, LinearProgress, Stack, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

export interface BenchmarkModelProps {
  title: string
  n: number
  ready?: boolean
  currentStep: number
  estimatedTime: number
  onButtonClick: () => any,
  versionSelection?: boolean
  onTitleClick?: () => any
}

const BenchmarkModel = ({ versionSelection, onTitleClick, title, n, onButtonClick, currentStep, ready, estimatedTime }: BenchmarkModelProps) => {
  const theme = useTheme()
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

  const ModelTitel = () => {
    return (
      versionSelection ? (
        <Tooltip title="Version ändern" placement="top" arrow>
          <Typography sx={{
            ":hover": {
              cursor: "pointer",
              // @ts-ignore
              color: theme.palette!!.primary.main
            }
          }} onClick={(e) => onTitleClick && onTitleClick() && e.preventDefault} variant="h6">{title}</Typography>
        </Tooltip>
      ) : (
        <Typography variant="h6">{title}</Typography>
      )
    )
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }} alignItems="center">
        <ModelTitel />
        <Button variant="contained" disabled={disableButton} onClick={() => handleButtonClick()}>Starten</Button>
      </Stack>
      <Typography variant="subtitle2" color="text.secondary">Geschätzte Zeit: {Math.round(estimatedTime)} Sekunden</Typography>
      {running &&
        <Box sx={{ mt: 1 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="subtitle2" color="text.secondary">Status: {currentStep}/{n}</Typography>
        </Box>
      }
    </Box>
  )
}

export default BenchmarkModel
