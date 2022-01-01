import React from 'react'
import Box from '@mui/material/Box'
import SettingsIcon from '@mui/icons-material/Settings'
import CloseIcon from '@mui/icons-material/Close'
import Tooltip from '@mui/material/Tooltip'

export default function Setting() {
  const [show, setShow] = React.useState<boolean>(false)

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
