import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import PauseRounded from '@mui/icons-material/PauseRounded'
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded'
import { useState } from 'react'
import FastRewindRounded from '@mui/icons-material/FastRewindRounded'
import FastForwardRounded from '@mui/icons-material/FastForwardRounded'

export default function Hero() {
  const [paused, setPaused] = useState(false)

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
          <Box sx={{ fontSize: '1.5rem' }}>20:00</Box>
          <Box marginTop="1rem">
            <IconButton aria-label="previous song">
              <FastRewindRounded sx={{ fontSize: '1.5rem' }} />
            </IconButton>
            <IconButton
              aria-label={paused ? 'play' : 'pause'}
              onClick={() => setPaused(!paused)}
            >
              {paused ? (
                <PlayArrowRounded sx={{ fontSize: '1.5rem' }} />
              ) : (
                <PauseRounded sx={{ fontSize: '1.5rem' }} />
              )}
            </IconButton>
            <IconButton aria-label="previous song">
              <FastForwardRounded sx={{ fontSize: '1.5rem' }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  )
}
