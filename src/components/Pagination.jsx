'use client'
import ReactPaginate from 'react-paginate';

const Pagination = ({pageCount,handlePageClick}) => {

  return (
    <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="prev"
        renderOnZeroPageCount={null}
        className='pagination'
    />
  );
};

export default Pagination;
