import React, { useEffect, useState } from 'react'

const Todo = () => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");
    const [result, setResult] = useState([]);
    const [iscreate, setcreate] = useState(true);
    const [isloading, setLoading] = useState(false);
    const [updateId, setUpdateId] = useState(0);
    const [len, setLen] = useState(0);
    const [delLen, setDelLen] = useState(0);
    const [complen, setCompLen] = useState(0);

    useEffect(() => { setLen(result.length) }, [result]);

    const add = () => {
        if (!value2) { return alert("please enter value") }
        setResult([...result, { id: len, title: value2 }])
        setValue2("");
        setLoading(true);
    }
    const search = () => {
        if (!value1) { return alert("please enter value") }
        if (!len) { return alert("no task") }
        const filtered = result.filter((items) => items.title === value1);
        setResult(filtered);
        setValue1("");
        setLoading(true);
    }
    const update = () => {
        if (!value3) { return alert("please enter value") }
        const updater = result.map((items) => (items.id === updateId) ? { id: updateId, title: value3 } : items);
        setResult(updater)
        setcreate(true)
        setValue3("");
        setLoading(true);
    }
    const markAsDelete = (delID) => {
        setDelLen(delLen + 1);
        const filtered = result.filter((items) => items.id !== delID);
        setResult(filtered);
    }
    const markAsComplete = (delID) => {
        setCompLen(complen + 1);
        const filtered = result.filter((items) => items.id !== delID);
        setResult(filtered);
    }
    const markAsUpdate = (ID) => {
        setUpdateId(ID);
        setcreate(false);
        setLoading(false);
    }


    return (
        <>
            <div className="container">
                <div className="inp">
                    <ul>
                        <li>
                            <h1>search</h1>
                            <input type="text" value={value1} onChange={(e) => { setValue1(e.target.value) }} />
                            <button onClick={search}>search</button>
                        </li>
                        {(iscreate) ?
                            <li>
                                <h1>add</h1>
                                <input type="text" value={value2} onChange={(e) => { setValue2(e.target.value) }} />
                                <button onClick={add} >add</button>
                            </li> :
                            <li>
                                <h1>update</h1>
                                <input type="text" value={value3} onChange={(e) => { setValue3(e.target.value) }} />
                                <button onClick={update} >update</button>
                            </li>
                        }

                    </ul>
                </div>
                
                {(!isloading && len===0) && <h1>No task</h1>}

                <h1>The number of Overall Task {len + delLen + complen}</h1>
                <h1>The number of Incompleted Task {len}</h1>
                <h1>The number of completed Task {complen}</h1>
                <h1>The number of Deleted Task {delLen}</h1>
                
                {(isloading) && <div className="listed">
                    {result.map((v, k) => (
                        <div style={{ display: "flex", gap: "20px" }} key={v.id}>
                            <li key={k}>{`${v.id} ${v.title}`}</li>
                            <button onClick={() => { markAsDelete(v.id) }}>delete</button>
                            <button onClick={() => { markAsUpdate(v.id) }}>update</button>
                            <button onClick={() => { markAsComplete(v.id) }}>complete</button>
                        </div>))}
                </div>}
            </div>
        </>
    )
}

export default Todo