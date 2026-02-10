import { useEffect, useState } from 'react';
// import '../../styles/users.css';
import { Table, Button, notification, Popconfirm, message } from 'antd';
import type { PopconfirmProps } from 'antd';
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

    const [dataUpdate, setDataUpdate] = useState<null | IUsers>(null); // dataUpdate có type là null or IUsers giá trị khởi tạo là null
    const [messageApi, holder] = message.useMessage();

   
    const confirm = async (user: IUsers) => {
        const fetchUsers = await fetch(
            `http://localhost:8000/api/v1/users/${user._id}`, 
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                }                
            }
        );        

        const dataUsers = await fetchUsers.json();

        if(dataUsers.data) {
            //delete success
            await getData();
            notification.success({
                message: "Xóa user thành công.",
            })

        } else {
            notification.error({
                message: "has error",
                description: JSON.stringify(dataUsers.message)
            });
        }
    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
        messageApi.error('Click on No');
    };

    const access_token = localStorage.getItem("access_token") as string;

    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 2,
        pages: 0,
        total: 0
    });


    const handleOnchange = (page: number, pageSize: number) => {
        console.log(page+'-'+pageSize);
    }

    const getData = async () => {      
        const fetchUsers = await fetch(
            `http://localhost:8000/api/v1/users?current=${meta.current}&pageSize=${meta.pageSize}`, 
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
        setMeta({
            current: dataUsers.data.meta.current,
            pageSize: dataUsers.data.meta.pageSize,
            pages: dataUsers.data.meta.pages,
            total: dataUsers.data.meta.total
        })
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
                        setDataUpdate(record); // truyền dataUpdate là record qua update modal để  show value edit
                        setIsUpdateModalOpen(true)
                    }}>Edit</button>
                    {holder}
                    <Popconfirm
                        title="Delete the task"
                        description={`Are you sure to delete name=${record.name}?`}
                        onConfirm={() => confirm(record)} // truyền user record đến confirm function để  xóa theo _id
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger style={{marginLeft: 20}}>Delete</Button>
                    </Popconfirm>
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
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    total: meta.total,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    onChange: handleOnchange
                }}
            />

            <CreateUserModal getData={getData} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} access_token={access_token}/>
            
            {/* truyền các props, method xuống cho child component sử dụng */}
            <UpdateUserModal  
                access_token={access_token} 
                getData={getData}
                isUpdateModalOpen={isUpdateModalOpen} 
                setIsUpdateModalOpen= {setIsUpdateModalOpen}                
                dataUpdate={dataUpdate} 
                setDataUpdate={setDataUpdate}         
            />

           
        </div>
    )
}

export default UsersTable;