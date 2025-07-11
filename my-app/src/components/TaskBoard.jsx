import React, { useEffect, useState } from 'react'

const TaskBoard = (props) => {
    const [result, Setresult] = useState([]);
    const [isloding, setLoded] = useState(false);
    const [pList, setPlist] = useState(0);
    const filtered = props.data3.filter((items) => items.status === "pending");
    useEffect(() => { setPlist(result.length) }, [result]);

    const show = () => {
        Setresult(filtered);
        setLoded(true);
    }

    return (
        <>
            <button onClick={show}>filter pending</button>
            {(isloding) && <h1>pending list : {pList}</h1>}
            {isloding && result.map((value) => (
                <div key={value.id}>
                    <li>{value.title}</li>
                    <button onClick={() => Setresult(result.filter((items) => Number.parseInt(items.id) !== value.id))}>complete</button>
                </div>
            ))}
        </>
    )
}

export default TaskBoard