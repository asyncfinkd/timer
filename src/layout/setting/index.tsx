/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Box from '@mui/material/Box'
import SettingsIcon from '@mui/icons-material/Settings'
import CloseIcon from '@mui/icons-material/Close'
import Tooltip from '@mui/material/Tooltip'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { ApplicationContext } from 'context'
import { Button } from '@mui/material'

export default function Setting() {
  const { setting, setSetting }: any = React.useContext(ApplicationContext)
  const [show, setShow] = React.useState<boolean>(false)
  const [notification, setNotification] = React.useState<string>(
    setting.notification
  )
  const [incrementDecrementTime, setIncrementDecrementTime] =
    React.useState<string>(setting.minutes)

  React.useEffect(() => {
    setSetting({
      minutes: incrementDecrementTime,
      minutesToSecond: parseInt(incrementDecrementTime) * 60,
      timer: 10 * 60,
    })
  }, [incrementDecrementTime])

  React.useEffect(() => {
    setting.notification = notification
  }, [notification])
  return (
    <>
      {show && (
        <>
          <Box
            position="fixed"
            top="0"
            left="0"
            bgcolor="rgba(0,0,0,0.7)"
            width="100%"
            height="100vh"
            onClick={() => setShow(!show)}
            zIndex="9"
            sx={{
              transition: 'background 0.3s ease 0s',
            }}
          ></Box>
          <Box
            position="fixed"
            top="0"
            right="0"
            width="45%"
            height="100vh"
            bgcolor="#fff"
            zIndex="12"
          >
            <Box
              display="flex"
              alignItems="center"
              minHeight="88px"
              maxHeight="88px"
              padding="0 40px"
              borderBottom="1px solid rgba(0, 0, 0, 0.08)"
            >
              <Box flexGrow="1" display="flex" alignItems="center">
                Timer Setting
              </Box>
              <Tooltip title="Close" placement="top">
                <Box marginLeft="16px" marginRight="-8px">
                  <CloseIcon
                    sx={{
                      color: 'rgba(0,0,0,0.32)',
                      height: 32,
                      cursor: 'pointer',
                    }}
                    onClick={() => setShow(!show)}
                  />
                </Box>
              </Tooltip>
            </Box>
            <Box sx={{ padding: '0 40px' }} marginTop="20px">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Notification
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={notification}
                  label="Notification"
                  onChange={(e) => setNotification(e.target.value)}
                >
                  <MenuItem value={'sound'}>By Sound</MenuItem>
                  <MenuItem value={'text'}>By Text</MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="outlined-name"
                label="Time to Increment/Decrement"
                sx={{ marginTop: '20px' }}
                fullWidth
                value={incrementDecrementTime}
                onChange={(e) => {
                  setIncrementDecrementTime(e.target.value)
                }}
              />

              <Button
                variant="contained"
                sx={{ width: '100%', marginTop: '2rem', height: 55 }}
                onClick={() => {
                  setSetting({
                    timer: 10 * 60,
                  })
                }}
              >
                Try Again
              </Button>
            </Box>
          </Box>
        </>
      )}
      <Box
        position="fixed"
        bottom="20px"
        right="40px"
        height="56px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="#fc6719"
        borderRadius="50%"
        width="56px"
        maxWidth="56px"
        color="white"
        sx={{
          cursor: 'pointer',
          boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
        }}
        onClick={() => setShow(!show)}
      >
        <SettingsIcon sx={{ fontSize: '1.35rem' }} />
      </Box>
    </>
  )
}
