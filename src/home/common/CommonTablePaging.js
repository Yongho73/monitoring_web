import React, { useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paging from './Paging'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 750,
  },
});

export default function CommonTablePaging(props) {
  
  const classes = useStyles();  
  const [rowsPerPage, setRowsPerPage] = React.useState(props.rowPerPage ? props.rowPerPage : 15);  
  const [list, setList ] = React.useState([])
  const [columns, setColumns ] = React.useState([])    

  const handleChangePage = (newPage) => {        
    props.handleChangePage(newPage);
  }

  useEffect(() => {
    if(props){
      setList(props.list)
      setColumns(props.columns)
    }
    
  }, [props])

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row, index) => {              
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {props.pagination.totalCount > 0 && 
        <Paging
          totalCount={props.pagination.totalCount  }
          rowsPerPage={props.pagination.pagePerSize}
          page={props.pagination.pageIndex}
          onPageChange={handleChangePage}
        />
      }
    </Paper>
  );
}