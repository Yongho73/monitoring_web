import React, { useEffect} from 'react';
import Paging from './Paging'
import noResultImg from '../static/images/no_result.png'

export default function CommonTablePaging(props) {
  
  // const classes = useStyles();  
  const [rowsPerPage, setRowsPerPage] = React.useState(props.rowPerPage ? props.rowPerPage : 15);  
  const [list, setList ] = React.useState([])
  const [columns, setColumns ] = React.useState([])    

  const handleChangePage = (newPage) => {        
    props.handleChangePage(newPage);
  }

  const handleRowClick = row => {
	props.handleRowClick(row)
  }

  useEffect(() => {
    if(props){
      setList(props.list)
      setColumns(props.columns)
    }
    
  }, [props])

  return (
    <div className="box">
			{list.length > 0 ? 
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
								<tr role="checkbox" tabIndex={-1} key={index} onClick={event => handleRowClick(row)}>
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
				:
				<div className="list-no-result" >
					<div><img src={noResultImg} width="100%" alt="no result" title="no result" /></div>
					<h3>검색결과가 없습니다.</h3>
					<h4>검색어를 바르게 입력하셨는지 확인하시거나,<br/>다른 키워드로 검색해주세요.</h4>
				</div>
			}

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