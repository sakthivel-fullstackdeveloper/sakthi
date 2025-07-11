import React, {  useEffect, useState } from 'react'

const ProductList = (props) => {
    const [search,setSearch]=useState("");
    const [isLoading,setLoaded]=useState(false);
    const [result,setResult]=useState([]);
    const [number,setNumber]=useState(0);
    useEffect(()=>{setNumber(result.length)},[result, search])
    
    const searching=()=>{
        setNumber(result.length)
        const filtered= props.data2.filter((items)=>items.name===search)
        setSearch("");
        setLoaded(true);
        setResult(filtered)
    }
  return (
    <>
    <div>
        <input type="text" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
        <button onClick={searching}>search</button>
        {(isLoading)? <h1>the number of filtered elements {number}</h1>:null}
        {(isLoading&&result.length)?result.map((v,k)=>(<li key={k}>{` ${v.id}   ${v.name} ${v.category}`}</li>)):null}
    </div>
    
    </>
  )
}

export default ProductList