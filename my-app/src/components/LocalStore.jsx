import React, { useEffect, useState } from 'react'

const LocalStore = () => {
    const[name,setName]=useState("");
    const[result,setResult]=useState("");
    useEffect(()=>{
        const interval=setInterval(()=>{
        const item = localStorage.getItem("key");
        if (!item) return setResult("user");
        const expiry = JSON.parse(localStorage.getItem("key")).expiry;
        if(getstore(expiry)){
        const named = JSON.parse(localStorage.getItem("key")).name || "user";
        setResult(named);
        }
        else{
            setResult('user')
        }

        return ()=> clearInterval(interval);
        },1000)
    },[]);

    const setStore = (name)=>{
        const now =Date.now()+10000;
        const items={name:name,expiry:now};
        localStorage.setItem("key",JSON.stringify(items))
        setName("")
    }

    const getstore=(expiry)=>{
        if(Date.now()>expiry){
            localStorage.removeItem("key"); 
            return false;
        }
        return true
    }

  return (
    <>
    <div className="container">
        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />
        <button onClick={()=>{setStore(name)}}>button</button>
        <h1>hi{result}</h1>
    </div>
    
    </>
  )
}

export default LocalStore