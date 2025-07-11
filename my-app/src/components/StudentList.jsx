import { useEffect, useState } from "react";

const StudentList = ({ data1 }) => {
    const list = data1.filter((items) => items.grade > 60);
    const [students, setStudents] = useState(0);
    const [isfiltered, setFiltered] = useState(false);
    const [f_students, setFstudents] = useState(0);
    useEffect(()=>{setStudents(data1.length)},[data1]);
    const sorted = () => {
        setFiltered(true);
        setFstudents(list.length);
    }
return (
        <>
            <h1>total no of students {students}</h1>
            <button onClick={sorted}>filter students 60 above</button>

            {(isfiltered) ? <h1>no of student whose grade 60 above is {f_students} </h1> : null}
            {(isfiltered) ? list.map((v, k) => (<li key={k}>{k}.{v.name}</li>)) : null}

        </>
    );
}
export default StudentList;