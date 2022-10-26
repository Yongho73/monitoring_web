import React, { useEffect} from 'react';
// import Table from '@material-ui/core/Table';
// import TableHead from '@material-ui/core/TableHead';
// import TableBody from '@material-ui/core/TableBody';
// import TableRow from '@material-ui/core/TableRow';
// import TableCell from '@material-ui/core/TableCell';
import Paging from './Paging'

// const useStyles = makeStyles({
//   root: {
//     width: '100%',
//   },
//   container: {
//     maxHeight: 750,
//   },
// });

export default function CommonTablePaging(props) {
  
  // const classes = useStyles();  
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
    <div class="box">
			<table className='list'>
				<thead>
					<tr>
						{columns.map((column) => (
							<th
								key={column.id}
								align={column.align}
								style={{ minWidth: column.minWidth }}
								className='list-title'
							>
								{column.label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{list.map((row, index) => {              
						return (
							<tr role="checkbox" tabIndex={-1} key={index}>
								{columns.map((column) => {
									const value = row[column.id];
									return (
										<td key={column.id} align={column.align}>
											{column.format && typeof value === 'number' ? column.format(value) : value}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>

      {props.pagination.totalCount > 0 && 
        <Paging
          totalCount={props.pagination.totalCount  }
          rowsPerPage={props.pagination.pagePerSize}
          page={props.pagination.pageIndex}
          onPageChange={handleChangePage}
        />
      }
    </div>
  );
}