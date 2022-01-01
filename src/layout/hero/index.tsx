import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import PauseRounded from '@mui/icons-material/PauseRounded'
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded'
import FastRewindRounded from '@mui/icons-material/FastRewindRounded'
import FastForwardRounded from '@mui/icons-material/FastForwardRounded'
import Tooltip from '@mui/material/Tooltip'
import { formatTime } from '../../lib/time'

export default function Hero() {
  const [timer, setTimer] = useState(20 * 60)
  const [paused, setPaused] = useState<boolean>(true)

  useEffect(() => {
    if (!paused) {
      document.title = `${formatTime(timer)} | Timer`

      setTimeout(() => {
        setTimer(timer - 1)
      }, 1000)
    }
  }, [paused, timer])
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box
          sx={{
            padding: '2rem',
            border: '5px solid #3b5998',
            borderRadius: '50%',
            width: 200,
            height: 200,
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Box sx={{ fontSize: '1.5rem' }}>{formatTime(timer)}</Box>
          <Box marginTop="1rem">
            <Tooltip title="-10m" placement="top">
              <IconButton
                aria-label="-10m"
                onClick={() => setTimer(timer - 600)}
              >
                <FastRewindRounded sx={{ fontSize: '1.5rem' }} />
              </IconButton>
            </Tooltip>
            <IconButton
              aria-label={paused ? 'play' : 'pause'}
              onClick={() => setPaused(!paused)}
            >
              {paused ? (
                <Tooltip title="Resume" placement="top">
                  <PlayArrowRounded sx={{ fontSize: '1.5rem' }} />
                </Tooltip>
              ) : (
                <Tooltip title="Pause" placement="top">
                  <PauseRounded sx={{ fontSize: '1.5rem' }} />
                </Tooltip>
              )}
            </IconButton>
            <IconButton aria-label="+10m" onClick={() => setTimer(timer + 600)}>
              <Tooltip title="+10m" placement="top">
                <FastForwardRounded sx={{ fontSize: '1.5rem' }} />
              </Tooltip>
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  )
}
