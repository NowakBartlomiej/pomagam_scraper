import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate'
import '../pages/Collections.css'

function moneyFormat(x) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ' ').slice(0, -2) + ' zł';
}

export default function Images(props) {
    
            const {data} = props
            const [currentItems, setCurrentItems] = useState([]);
            const [pageCount, setPageCount] = useState(0);
            const [itemOffset, setItemOffset] = useState(0);
            const itemsPerPage = 30
        
            useEffect(() => {
            
            const endOffset = itemOffset + itemsPerPage;
            
            setCurrentItems(data.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(data.length / itemsPerPage));
            }, [itemOffset, itemsPerPage, data]);
        
            
            const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % data.length;
            
            setItemOffset(newOffset);
            };
        
            return (
            <>
                <div className="tables">
                <table className="content-table">
            
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Collection Id</th>
                        <th>Title</th>
                        <th>Slug</th>
                        <th>Amount</th>
                    </tr>
                </thead>

                <tbody>
                    {currentItems.map(image => {
                        return (
                        <tr>
                            <td>{image.category}</td>
                            <td>{image.external_collection_id}</td>
                            <td>{image.title}</td>
                            <td>{image.slug}</td>
                            <td>{moneyFormat(image.amount)}</td>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
                </div>


                <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName='pagination'
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="active"
                />
            </>
            );
        
}