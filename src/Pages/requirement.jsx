import React from 'react'
import ReactPaginate from 'react-paginate'
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";


// css 
// .pagination {
//     display: flex;
//     list-style: none;
//     padding: 0;
// }

// .pagination li {
//     margin: 0 5px;
// }

// .pagination li a {
//     box-shadow: none !important;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 30px;
//     height: 30px;
//     font-size: var(--font-size-14);
//     border-radius: 8px;
//     border: 1px solid #ddd;
//     text-decoration: none;
//     color: #000;
 
// }

// .pagination li a:hover {
//     background-color: #317a77 !important;
//     color: #fff !important;
// }

// .pagination li.active a {
//     background-color: #317a77 !important;
//     color: #fff;
//     font-weight: bold;
// }
// .my-i-button{
//   border: none;
//   background: none;
// }
// css 
const requirement = () => {

    const [searchKey, setSearchKey] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1);
    };

    {/* date picker  */ }
    const [errors, setErrors] = useState({});
    const [refresh, setRefresh] = useState(false);
    //  Date range 
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    console.log('my both date1 =', startDate)
    console.log('my both date2 =', endDate)

    const handleDateChange = (dates) => {
        setStartDate(formatDate(dates[0] == null ? '' : dates[0]));
        setEndDate(formatDate(dates[1] == null ? '' : dates[1]))
        console.log('hello date ')
    };

    const formatDate = (date) => {

        if (!date) return '';
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    {/* remove off canvas at api success response */ }
    // first your need to import useRef hook 

    const offcanvasRef = useRef(null);

    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
    offcanvasInstance.hide();

    return (
        <>
            {/* date picker  */}
            <div className="row  me-2">
                <div className="col-9 ">
                    <div className="date-picker-container">
                        <Flatpickr
                            class="form-control"
                            placeholder='Date'
                            value={[startDate, endDate]}
                            options={{
                                mode: 'range',
                                dateFormat: 'Y-n-j',
                            }}
                            onChange={handleDateChange}
                            render={({ defaultValue, ...props }, ref) => (
                                <div className="input-group d-flex">
                                    <input style={{ height: '34px' }} {...props} ref={ref} defaultValue={defaultValue} />
                                </div>
                            )}
                        />
                    </div>
                </div>

                <div className="col-3 p-0 ps-2" >
                    <Link type="submit" className="btn btn-primary mb-3 heading-1 remove-shadow button-bg-color heading-14" style={{ border: '1px solid #008479', lineHeight: '1.2', display: 'flex' }} onClick={showName}>
                        <svg width="40" height="16" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '2px' }}>
                            <path d="M4.57143 7.42857C4.57143 7.27702 4.63163 7.13167 4.7388 7.02451C4.84596 6.91735 4.9913 6.85714 5.14286 6.85714H8.57143C8.72298 6.85714 8.86833 6.91735 8.97549 7.02451C9.08265 7.13167 9.14286 7.27702 9.14286 7.42857C9.14286 7.58012 9.08265 7.72547 8.97549 7.83263C8.86833 7.9398 8.72298 8 8.57143 8H5.14286C4.9913 8 4.84596 7.9398 4.7388 7.83263C4.63163 7.72547 4.57143 7.58012 4.57143 7.42857ZM2.28571 4C2.28571 3.84845 2.34592 3.7031 2.45308 3.59594C2.56025 3.48878 2.70559 3.42857 2.85714 3.42857H10.8571C11.0087 3.42857 11.154 3.48878 11.2612 3.59594C11.3684 3.7031 11.4286 3.84845 11.4286 4C11.4286 4.15155 11.3684 4.2969 11.2612 4.40406C11.154 4.51122 11.0087 4.57143 10.8571 4.57143H2.85714C2.70559 4.57143 2.56025 4.51122 2.45308 4.40406C2.34592 4.2969 2.28571 4.15155 2.28571 4ZM0 0.571429C0 0.419876 0.060204 0.274531 0.167368 0.167368C0.274531 0.060204 0.419876 0 0.571429 0H13.1429C13.2944 0 13.4398 0.060204 13.5469 0.167368C13.6541 0.274531 13.7143 0.419876 13.7143 0.571429C13.7143 0.722981 13.6541 0.868326 13.5469 0.975489C13.4398 1.08265 13.2944 1.14286 13.1429 1.14286H0.571429C0.419876 1.14286 0.274531 1.08265 0.167368 0.975489C0.060204 0.868326 0 0.722981 0 0.571429Z" fill="white" />
                        </svg> &nbsp;
                        <p style={{ fontSize: '15px' }}>Filter</p>
                    </Link>

                </div>
            </div>

            {/* write this below table for pagination  */}
            <div className="d-flex" style={{ marginBottom: '10px' }}>
                <p className='font14'>Showing {currentPage} of {totalPages} Pages</p>
                <div className="ms-auto">
                    <ReactPaginate
                        previousLabel={<Icon icon="tabler:chevrons-left" width="1.4em" height="1.4em" />}
                        nextLabel={<Icon icon="tabler:chevrons-right" width="1.4em" height="1.4em" />}
                        breakLabel={'...'} breakClassName={'break-me'} pageCount={totalPages} marginPagesDisplayed={2} pageRangeDisplayed={10}
                        onPageChange={handlePageClick} containerClassName={'pagination'} subContainerClassName={'pages pagination'} activeClassName={'active'}
                    />
                </div>
            </div>


        </>
    )
}

export default requirement
