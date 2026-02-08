import { useEffect } from 'react';
import '../../styles/users.css';

const UsersTable = () => {

    const getData = async () => {
        // api url, method, body, headers
        const res = await fetch(            
            "http://localhost:8000/api/v1/auth/login",
            {
                method: "POST",
                body: JSON.stringify({
                    username: "hoidanit@gmail.com",
                    password: "123456"
                }),
                headers: {
                    "Content-type": "Aplication/json"
                }
            }
        );

        //res.json()
        // const data = await res.json();

        const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjk1MGFlZTQ1NmE3MzFkNjQwMDI2MmVkIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3NzA1NDUxMDYsImV4cCI6MTg1Njk0NTEwNn0.AuWh5Kv5XBCED-XH54yCR8Bbb9BORWf6DqcVp9LneBk";

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

        console.log("dataUsers:", dataUsers);
    }

    useEffect(()=>{
        getData();
    },[]);

    return(
        <div>
            <h2>HTML Table</h2>

            <table>
                <tr>
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Country</th>
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                </tr>
                <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                </tr>
                <tr>
                    <td>Ernst Handel</td>
                    <td>Roland Mendel</td>
                    <td>Austria</td>
                </tr>
                <tr>
                    <td>Island Trading</td>
                    <td>Helen Bennett</td>
                    <td>UK</td>
                </tr>
                <tr>
                    <td>Laughing Bacchus Winecellars</td>
                    <td>Yoshi Tannamuri</td>
                    <td>Canada</td>
                </tr>
                <tr>
                    <td>Magazzini Alimentari Riuniti</td>
                    <td>Giovanni Rovelli</td>
                    <td>Italy</td>
                </tr>
            </table>


        </div>
    )
}

export default UsersTable;