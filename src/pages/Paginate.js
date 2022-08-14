import React from 'react';


function Paginate({ postPerPage, totalPost, paginate, currentPage }) {

  
  const pageNumber = []

  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumber.push(i)
  }
  return (
    <div className="pagination">

      <ul className="page-item"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "3px"

        }}
      >

        {pageNumber.map(number => (

          <button className= "page-link" count={number} key={number} onClick={() => paginate(number)} aria-current={currentPage}>{number}</button>

        ))}
      </ul>
    </div>
  )
}

export default Paginate