import {
  Button,
  Card,
  Container,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  Tooltip,
} from '@mui/material';
import { PATH_DASHBOARD } from '@routes/paths';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import ConfirmDialog from '@components/confirm-dialog';
import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import Iconify from '@components/iconify';
import Scrollbar from '@components/scrollbar';
import { useSettingsContext } from '@components/settings';
import { useSnackbar } from '@components/snackbar';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable
} from '@components/table';

import { deleteUserAsync,  deleteVideoAsync,  getVideoForUserAsync } from '@redux/services';
import { useDispatch, useSelector } from 'react-redux';
import UserTableRow from './components/UserTableRow';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Ttitle', align: 'left' },
  { id: 'Duration', label: 'Duration', align: 'left' },
  { id: 'Views', label: 'Views', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '' },
];

const limit = 10;
const DEFAULT_QUERY = { page: 1, limit: Number(limit) };

export default function UserListPage() {
  const {
    dense,
    order,
    orderBy,
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const { userVidoes, totalCount } = useSelector((store) => store?.videos);
  const dispatch = useDispatch();

  const [query, setQuery] = useState(DEFAULT_QUERY);



  const denseHeight = dense ? 52 : 72;
  const isNotFound = (!userVidoes.length && !!query?.name) || (!userVidoes.length && !!query?.role);


  const handleDeleteRow = async (row, closeModal) => {
    // API call to delete row.
    const response = await dispatch(deleteVideoAsync(row?._id))
    // If API is success then only call below code.
    if (userVidoes?.length === 1 && query?.page > 1) {
      setQuery((p) => {
        p.page -= 1;
        return { ...p };
      });
    } else {
      dispatch(getVideoForUserAsync(query));
    }
    closeModal();
    enqueueSnackbar('Delete success!')
  };


  const handleRowsPerPageChange = (event) => {
    const {value} = event.target;
    DEFAULT_QUERY.limit = parseInt(value, 10);
    onChangeRowsPerPage(event);
    setQuery((p) => {
      p.page = 1;
      p.limit = parseInt(value, 10);
      return { ...p };
    });
  };

  const handleEditRow = (row) => {
    console.log('row', row)
    navigate(PATH_DASHBOARD.video.edit(row?._id), { state: row });
  };

  const handleViewRow = (row) => {
    navigate(PATH_DASHBOARD.video.view(row?._id), { state: row });
  };

  const handlePageChange = (event, newPage) => {
    setQuery((p) => {
      p.page = newPage + 1;
      return { ...p };
    });
  };

  useEffect(() => {
    // setQuery((p) => {
    //   p.order = order;
    //   p.orderBy = orderBy;
    //   return { ...p };
    // });
    // set query to sort based on order
  }, [order, orderBy]);

  useEffect(() => {
    setSelected([]);
    dispatch(getVideoForUserAsync(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, query]);

  return (
    <>
      <Helmet>
        <title> My Video </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="User List"
        links={[{ name: '' }]}
        action={
          <Button
          component={RouterLink}
              to={PATH_DASHBOARD.video.new}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Upload Video
          </Button>
        }
      />

        <Card>
   

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={userVidoes?.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  userVidoes?.map((row) => row?.id)
                )
              }
        
            />

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userVidoes?.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      userVidoes?.map((row) => row?.id)
                    )
                  }
                />

                <TableBody>
                  {userVidoes?.map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row?._id)}
                      onSelectRow={() => onSelectRow(row?._id)}
                      onDeleteRow={(closeModal) => handleDeleteRow(row, closeModal)}
                      onEditRow={() => handleEditRow(row)}
                      onViewRow={() => handleViewRow(row)}
                    />
                  ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={userVidoes?.length ? query.limit - userVidoes.length : 0}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
          count={totalCount}
            page={query.page - 1}
            rowsPerPage={query?.limit}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>
    </>
  );
}
