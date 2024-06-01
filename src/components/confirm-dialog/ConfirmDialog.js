import PropTypes from 'prop-types';
// @mui
import { Dialog, Button, DialogTitle, DialogActions, DialogContent, Slide } from '@mui/material';
import { forwardRef } from 'react';

// ----------------------------------------------------------------------

ConfirmDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.node,
  action: PropTypes.node,
  content: PropTypes.node,
  onClose: PropTypes.func,
};

export default function ConfirmDialog({ title, content, action, open, onClose, ...other }) {
  const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}      TransitionComponent={Transition}>
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      {content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}

      <DialogActions>
        {action}

        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
