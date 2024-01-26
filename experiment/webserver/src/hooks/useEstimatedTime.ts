import {useEffect, useMemo, useState} from "react";

export function useEstimatedTimeONPow3(defaultValues: {
  medianTime: number,
  medianN: number
}, n: number) {
  const [estimatedTime, setEstimatedTime] = useState(0)
  const calculateTimeConstant = useMemo(() => {
    return defaultValues.medianTime / (Math.pow(defaultValues.medianN, 3))
  }, [defaultValues])

  useEffect(() => {
    setEstimatedTime(calculateTimeConstant * Math.pow(n, 3))
  }, [n])

  return estimatedTime
}