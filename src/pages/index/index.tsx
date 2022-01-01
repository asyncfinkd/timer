import Box from '@mui/material/Box'
import Hero from 'layout/hero'
import SettingsIcon from '@mui/icons-material/Settings'

export default function IndexPage() {
  return (
    <>
      <Hero />
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
      >
        <SettingsIcon sx={{ fontSize: '1.35rem' }} />
      </Box>
    </>
  )
}
