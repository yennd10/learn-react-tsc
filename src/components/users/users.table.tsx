import { useEffect, useState } from 'react';
import '../../styles/users.css';

interface IUsers {
    _id: string,
    email: string,
    name: string,
    address: string
}

const UsersTable = () => {

    const [listUsers, setListUsers] = useState([]);


    const getData = async () => {       

        // api url, method, body, headers
        // const res = await fetch(            
        //     "http://localhost:8000/api/v1/auth/login",
        //     {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({
        //             username: "hoidanit@gmail.com",
        //             password: "123456"
        //         })
        //     }
        // );

        //res.json()
        // const data = await res.json();

        // console.log("data:", data);       

        const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjk1MGFlZTQ1NmE3MzFkNjQwMDI2MmVkIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3NzA2MDc2NjMsImV4cCI6MTg1NzAwNzY2M30.pzfUkOUBzdTI7G8AIRr6DsSr7oDqyg-B684VA9M7PBM";
        const fetchUsers = await fetch(
            "http://localhost:8000/api/v1/users/all", 
            {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                }
            }
        );

        const dataUsers = await fetchUsers.json();

        // add user data to listUsers
        setListUsers(dataUsers.data.result);
        // console.log("dataUsers:", dataUsers);
    }

    useEffect(()=>{
        getData();
    },[]);

    return(
        <div>
            <h2>HTML Table</h2>
            <table>
                <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Address</th>
                </tr>    
            
                { listUsers.map((item: IUsers) => {
                    return (
                        <tr key={item._id}>
                            <td>{item.email}</td>
                            <td>{item.name}</td>
                            <td>{item.address}</td>
                        </tr>    
                    );
                }) }                            
            </table>
        </div>
    )
}

export default UsersTable;