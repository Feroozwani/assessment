import React, {useEffect,useState} from 'react'
import './apidata.css'
import Logo from '../apiData/logo.png'
import ReactPaginate from 'react-paginate';
const Apidata = () => {
const [data, setdata] = useState([]);
const [filterVal,setFilterVal] = useState('');
const [searchApiData,setSearchApiData] = useState([]);
const getApiData = async () => {
   const res = await fetch('https://assessment.api.vweb.app/products');
   const actualData = await res.json();
    console.log(actualData);
    setdata(actualData);
    setSearchApiData(actualData);
}

useEffect(() => {
  
    getApiData();

}, []);

const handleFilter =(e)=>{
    if(e.target.value === 'hello'){
        setdata(setSearchApiData)
    }else{
    const filterResult = searchApiData.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
    
        setdata(filterResult);
}
    setFilterVal(e.target.value)
}
const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9
  

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);


  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
  
    setItemOffset(newOffset);
  };
  return (
    <>

    <div className="Search-btn">
        
    </div>
   
        <div className='container-fluid mt-5'>
            <h1 className='mb-5 text-center'><img src={Logo} alt="logo" /> <br />Assessment</h1>
            <div className='main-heading'>
                
                 
                 <input className="Search-btn" placeholder='Search' value={filterVal} onInput={(e) =>handleFilter(e)}/>
            </div>
             <div className='table-responsive'>
                    <table className='table table-hover'>
                    <thead className='thead-dark'>
                        <tr style={{backgroundColor: '#ffcdb2'}}>
                            <th>Product id</th>
                            <th>Name</th>
                            <th>Stock</th>
                            <th>Selling Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems.map((curElem, ind) => {
                                return(
                                     <tr key={ind}>
                            <td>{curElem.product_id}</td>
                            <td>{curElem.name}</td>
                            <td>{curElem.stock}</td>
                            <td>{curElem.selling_price}</td>
                        </tr>
                                )
                            })
                        }
                       
                    </tbody>
                    </table>
                 </div>
                 <div>
                    <ReactPaginate
        breakLabel="..."
        nextLabel="Next "
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={pageCount}
        previousLabel=" Previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName='page-num'
        previousClassName='page-num'
        nextLinkClassName='page-num'
        

      />
                 </div>
               
        </div>

    </>
  )
}

export default Apidata