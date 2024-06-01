import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import {
  Avatar,
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
// components
import ConfirmDialog from '@components/confirm-dialog';
import Iconify from '@components/iconify';
import Label from '@components/label';
import MenuPopover from '@components/menu-popover';
import { useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function UserTableRow({ row, selected, onEditRow, onViewRow, onSelectRow, onDeleteRow }) {
  const { title, thumbnail, duration, views, isPublished } = row;

  const { isDeleting } = useSelector((store) => store?.videos);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={title} src={thumbnail} variant='square' />

            <Typography variant="subtitle2" noWrap>
              {title}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">{duration}</TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {views}
        </TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={!isPublished ?  'error' :'success'}
            sx={{ textTransform: 'capitalize' }}
          >
            {isPublished ? 'Published' : 'Not Published'}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onViewRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="carbon:view-filled" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <LoadingButton loading={isDeleting} variant="contained" color="error" onClick={() => onDeleteRow(handleCloseConfirm)}>
            Delete
          </LoadingButton>
        }
      />
    </>
  );
}
