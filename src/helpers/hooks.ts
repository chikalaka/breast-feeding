import React, { useEffect, useRef, useState } from "react"
import { Log } from "../types/common"
import _ from "lodash"

export function useLocalStorage<T>(key: string, initialValue?: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.log(error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((t: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore: T =
        value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error)
    }
  }

  return [storedValue, setValue]
}

export const useInterval = ({ callback = () => {}, delay = 1000 }) => {
  const savedCallback = useRef()

  const tick = () => {
    // @ts-ignore
    savedCallback.current()
  }

  // Remember the latest callback.
  useEffect(() => {
    // @ts-ignore
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
    return () => {}
  }, [delay])
}

export const useRerender = (interval?: number) => {
  const [flag, setFlag] = useState(false)
  const rerender = () => setFlag(f => !f)
  useInterval({ callback: rerender, delay: interval })
  return rerender
}

export const useLogs = () => {
  // @ts-ignore
  const [logs, setLogs]: [
    Array<Log>,
    ((logs: Array<Log>) => void) | ((logs: Array<Log>) => Array<Log>)
  ] = useLocalStorage<Array<Log>>("logs", [])

  return [_.sortBy<Log>(logs, "finishTime").reverse(), setLogs]
}

export const useSettings = () => {
  const [calculateFromDuration, setCalculateFromDuration] = useLocalStorage<
    number
  >("calculateFromDuration", 16)
  const [minimumFeedingDuration, setMinimumFeedingDuration] = useLocalStorage<
    number
  >("minimumFeedingDuration", 1)

  return {
    calculateFromDuration: {
      value: calculateFromDuration,
      setValue: setCalculateFromDuration
    },
    minimumFeedingDuration: {
      value: minimumFeedingDuration,
      setValue: setMinimumFeedingDuration
    }
  }
}
