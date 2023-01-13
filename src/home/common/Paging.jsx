import React, { useState, useEffect } from "react";
import './Paging.css';
import Pagination from "react-js-pagination";

export default function Paging (props) {
  
  const [page, setPage] = useState(props.page ? props.page : 1);
  const [show , setShow] = useState(false);
  const handlePageChange = (page) => {
    setPage(page)
    props.onPageChange(page);
  };

  useEffect(() => {
    if(props.totalCount > 0){
      setShow(true)
    }else{
      setShow(false)
    }
    
  },[props])

  return (
    <>
    {show && 
      <Pagination
        activePage={page}
        itemsCountPerPage={props.rowsPerPage}
        totalItemsCount={props.totalCount}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handlePageChange}
      />
    }
    </>
  );
};