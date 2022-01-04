import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { TransitionProps } from '@mui/material/transitions'
import Slide from '@mui/material/Slide'
import Button from '@mui/material/Button'
import React from 'react'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export const Dialogs = ({
  text,
  handleClose,
  open,
}: {
  text: string
  handleClose: () => void
  open: boolean
}) => {
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Timer Reminder'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose()
              document.title = 'Timer Application'
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
