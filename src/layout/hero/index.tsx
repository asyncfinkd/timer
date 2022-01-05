/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import PauseRounded from '@mui/icons-material/PauseRounded'
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded'
import FastRewindRounded from '@mui/icons-material/FastRewindRounded'
import FastForwardRounded from '@mui/icons-material/FastForwardRounded'
import Tooltip from '@mui/material/Tooltip'
import { formatTime } from '../../lib/time'
import { ApplicationContext } from 'context'
import toast from 'react-hot-toast'
import { Dialogs } from 'components/dialog'
import * as assert from 'assert'
import { setItem, getItem } from 'fp-ts-local-storage'
import { some } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { chain } from 'fp-ts/lib/IO'

export default function Hero() {
  const { setting }: any = React.useContext(ApplicationContext)
  const [timer, setTimer] = React.useState<number>(0.05 * 60)
  const [paused, setPaused] = React.useState<boolean>(true)
  const [breakLength] = React.useState<string[]>(['00:00'])
  const [open, setOpen] = React.useState<boolean>(false)

  const getLocalStorage: any = pipe(
    getItem('dev_loc_time'),
    chain(() => getItem('dev_loc_time'))
  )

  const [storage, setStorage] = React.useState(getLocalStorage)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const LocalStorage = (value: string, secondValue: number) => {
    const program = pipe(
      setItem(
        'dev_loc_time',
        JSON.stringify({
          minutes: value,
          minutesToSecond: secondValue,
          notification: setting.notification,
        })
      ),
      chain(() => getItem('dev_loc_time'))
    )

    assert.deepStrictEqual(
      program(),
      some(`{"minutes":${value}}{"minutesToSecond":${secondValue}}`)
    )
  }

  React.useEffect(() => {
    if (!paused) {
      if (formatTime(timer) === breakLength[0]) {
        document.title = 'Reminder!'
        setPaused(true)

        if (setting.notification === 'text') {
          setOpen(true)
        }
      } else {
        document.title = `${formatTime(timer)} | Timer`

        setTimeout(() => {
          setTimer(timer - 1)
        }, 1000)
      }
    }

    // LocalStorage(timer)
  }, [paused, timer])

  const renderTime = () => {
    if (typeof storage.value !== 'undefined') {
      console.log(JSON.parse(storage.value))
      return formatTime(JSON.parse(storage.value).minutesToSecond)
    } else {
      return formatTime(timer)
    }
  }
  return (
    <>
      <Dialogs
        text={
          'The time chosen for you has expired. You have selected the text message and that is why you will get a similar dialog box. If you want to use other services, click "Agree"'
        }
        handleClose={handleClose}
        open={open}
      />
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
          <Box sx={{ fontSize: '1.5rem' }}>{renderTime()}</Box>
          <Box marginTop="1rem">
            <Tooltip title={`-${setting.minutes}m`} placement="top">
              <IconButton
                aria-label={`-${setting.minutes}m`}
                onClick={() => {
                  if (paused) {
                    if (formatTime(timer) !== breakLength[0]) {
                      setTimer(timer)

                      LocalStorage(
                        String(Math.floor(timer / 60)),
                        timer - setting.minutesToSecond
                      )
                    }
                  } else {
                    toast.error(
                      'If you want to change time first of all stop timer'
                    )
                  }
                }}
              >
                <FastRewindRounded sx={{ fontSize: '1.5rem' }} />
              </IconButton>
            </Tooltip>
            <IconButton
              aria-label={paused ? 'play' : 'pause'}
              onClick={() => {
                if (formatTime(timer) === breakLength[0]) {
                  toast.error('Please choose time.')
                } else {
                  toast.dismiss()
                  setPaused(!paused)
                }
              }}
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
            <IconButton
              aria-label={`+${setting.minutes}m`}
              onClick={() => {
                if (paused) {
                  setTimer(timer + setting.minutesToSecond)

                  LocalStorage(
                    String(Math.floor(timer / 60)),
                    timer - setting.minutesToSecond
                  )
                } else {
                  toast.error(
                    'If you want to change time first of all stop timer'
                  )
                }
              }}
            >
              <Tooltip title={`+${setting.minutes}m`} placement="top">
                <FastForwardRounded sx={{ fontSize: '1.5rem' }} />
              </Tooltip>
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  )
}
