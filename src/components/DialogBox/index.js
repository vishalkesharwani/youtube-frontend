import Iconify from '@components/iconify/Iconify';
import { forwardRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Slide,
} from '@mui/material';
import PropTypes from 'prop-types';
import Scrollbar from '@components/scrollbar/Scrollbar';
import { he } from 'date-fns/locale';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function DialogBox({
  title,
  content,
  action,
  open,
  onClose,
  children,
  maxWidth,
  ScrollHeight,
  ...other
}) {
  DialogBox.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
    action: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    maxWidth: PropTypes.node.isRequired,
    ScrollHeight: PropTypes.node.isRequired,
    // ... add other prop types if needed
  };
  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth || 'sm'}
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          onClose();
        }
      }}
      {...other}
      disableBackdropClick
      TransitionComponent={Transition}
    >
      <Scrollbar sx={{height:ScrollHeight}}>
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              style={{
                fontWeight: 800,
                fontSize: '20px',
              }}
            >
              {title}
            </Typography>
            <IconButton color="primary" size="large" onClick={onClose}>
              <Iconify icon="carbon:close-filled" />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent> {children}</DialogContent>
      </Scrollbar>
    </Dialog>
  );
}
