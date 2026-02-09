import { useEffect, useState } from 'react';
// import '../../styles/users.css';
import { Table, Input, Button, Modal, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';

interface IUsers {
    _id: string,
    email: string,
    name: string,
    address: string
}

const UsersTable = () => {

    const [listUsers, setListUsers] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjk1MGFlZTQ1NmE3MzFkNjQwMDI2MmVkIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3NzA2MDc2NjMsImV4cCI6MTg1NzAwNzY2M30.pzfUkOUBzdTI7G8AIRr6DsSr7oDqyg-B684VA9M7PBM";

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
        }
    ];

    const handleOk = async () => {
        // setIsModalOpen(false);
        const data = {name, email, password, age, gender, role, address}

        const fetchUsers = await fetch(
            "http://localhost:8000/api/v1/users", 
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...data}) //get data then insert to database by api
            }
        );

        const dataUsers = await fetchUsers.json();

        if(dataUsers.data) {
            //insert success
            await getData();
            notification.success({
                message: "Tạo mới user thành công.",
            })

            handleCloseCreateModal();

        } else {
            notification.error({
                message: "has error",
                description: JSON.stringify(dataUsers.message)
            });
        }
    };

    const handleCloseCreateModal = () => {
        //clear value of all input
        setName("");
        setEmail("");
        setPassword("");
        setAge("");
        setGender("");
        setAddress("");
        setRole("");
        //close modal
        setIsModalOpen(false);
    }

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

            <Modal
                title="Add new user"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={()=>setIsModalOpen(false)}
                maskClosable={false}
            >
                <div>
                    <label>Name:</label>
                    <Input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <Input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <Input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <Input
                        value={age}
                        onChange={(event) => setAge(event.target.value)}
                    />
                </div>
                <div>
                    <label>Gender:</label>
                    <Input
                        value={gender}
                        onChange={(event) => setGender(event.target.value)}
                    />
                </div>

                <div>
                    <label>Address:</label>
                    <Input
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                    />
                </div>

                <div>
                    <label>Role:</label>
                    <Input
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default UsersTable;