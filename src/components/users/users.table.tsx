import { useEffect, useState } from 'react';
// import '../../styles/users.css';
import { Table, Button, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
import CreateUserModal from './create.user.modal';
import UpdateUserModal from './update.user.modal';

export interface IUsers {
    _id: string;
    email: string;
    name: string;
    role: string;
    address: string;
    gender: string;
    password: string;
    age: string;
}

const UsersTable = () => {

    const [listUsers, setListUsers] = useState([]);    

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const [dataUpdate, setDataUpdate] = useState<null | IUsers>(null);

    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjk1MGFlZTQ1NmE3MzFkNjQwMDI2MmVlIiwiZW1haWwiOiJob2lkYW5pdEBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIEjhu49pIETDom4gSVQiLCJ0eXBlIjoiU1lTVEVNIiwicm9sZSI6IkFETUlOIiwiZ2VuZGVyIjoiTUFMRSIsImFnZSI6OTYsImlhdCI6MTc3MDY1MDQ5NCwiZXhwIjoxODU3MDUwNDk0fQ.62HU_sK4g0ZpTmiY-AbWRfQSQlcOnWEn1kxTMBOrVHc";

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
        
        if (!dataUsers.data) {
            notification.error({
                message: JSON.stringify(dataUsers.message)
            })
        }
        // add user data to listUsers
        setListUsers(dataUsers.data.result);
        // console.log("dataUsers:", dataUsers);
    }

    useEffect(()=>{
        getData();
    },[]);

    const columns: ColumnsType<IUsers> = [
        {
            title: 'Email',
            dataIndex: 'email',
            render: (value, record) => {
                // console.log("record:",record);
                return (<div>{record.email}</div>)
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Actions',
            render: (value, record) => {

                return (<div>
                    <button onClick={() => {
                        setDataUpdate(record);
                        setIsUpdateModalOpen(true)
                    }}>Edit</button>

                </div>)
            }
        }
    ];

    return(
        <div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <h2>Table Users</h2>
                <div>
                    <Button
                        icon={<PlusOutlined />}
                        type={"primary"}
                        onClick={() => setIsModalOpen(true)}
                    >Add new</Button>
                </div>

            </div>
            <Table
                columns={columns}
                dataSource={listUsers}
                rowKey={"_id"}
            />

            <CreateUserModal getData={getData} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} access_token={access_token}/>
            <UpdateUserModal  getData={getData} access_token={access_token} dataUpdate={dataUpdate} setDataUpdate={setDataUpdate} setIsModalOpen={setIsModalOpen}  isUpdateModalOpen={isUpdateModalOpen} setIsUpdateModalOpen= {setIsUpdateModalOpen} />
        </div>
    )
}

export default UsersTable;