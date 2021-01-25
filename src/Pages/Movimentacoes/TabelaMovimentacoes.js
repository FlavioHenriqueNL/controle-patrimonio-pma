import React from 'react';
import {Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, TablePagination, Typography, Paper} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useState } from 'react';
import PropTypes from 'prop-types';

const LinhaMovimentacao = (mov) =>{
  const [open, setOpen] = useState(false);
  const {movimentacao} = mov;
  return(
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{movimentacao._id}</TableCell>
        <TableCell align="right">{movimentacao.patrimonio_id}</TableCell>
        <TableCell align="right">{movimentacao.origem}</TableCell>
        <TableCell align="right">{movimentacao.destino}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Detalhes
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell/>
                    <TableCell>Local</TableCell>
                    <TableCell>Setor</TableCell>
                    <TableCell>Responsável</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Origem</TableCell>
                    <TableCell>{movimentacao.origem}</TableCell>
                    <TableCell>{movimentacao.origem_setor}</TableCell>
                    <TableCell>{movimentacao.origem_responsavel}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Destino</TableCell>
                    <TableCell>{movimentacao.destino}</TableCell>
                    <TableCell>{movimentacao.destino_setor}</TableCell>
                    <TableCell>{movimentacao.destino_responsavel}</TableCell>
                  </TableRow>
                  <TableRow></TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onChangePage } = props;
  const theme = useTheme();

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className="pagination-buttons">
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
       <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
       <LastPageIcon />
      </IconButton>
    </div>
  );
}

const TabelaMovimentacoes = ({lista}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, lista.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell/>
                <TableCell>ID Documento</TableCell>
                <TableCell>Nº Patrimonio</TableCell>
                <TableCell>Origem</TableCell>
                <TableCell>Destino</TableCell>
                <TableCell>Data</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {
              (rowsPerPage > 0
                ? lista.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : lista
              ).map(movimentacao => (
                <LinhaMovimentacao key={movimentacao._id} movimentacao={movimentacao}/>
              ))
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                labelDisplayedRows={
                  ({ from, to, count }) => {
                    return '' + from + '-' + to + ' de ' + count + ' movimentações'
                  }
                }
                labelRowsPerPage = "Movimentações por página"
                rowsPerPageOptions={[5, 10, 25, { label: 'Tudo', value: -1 }]}
                colSpan={6}
                count={lista.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
        </TableFooter>
        </Table>
      </TableContainer>
    </>
  )
}

export default TabelaMovimentacoes;