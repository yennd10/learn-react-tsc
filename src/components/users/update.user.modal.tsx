import { Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import type { IUsers } from "./users.table";

interface IProps {
    getData: () => void,
    setIsUpdateModalOpen: (v: boolean) => void,
    access_token: string,
    isUpdateModalOpen: boolean,
    setDataUpdate: any,
    dataUpdate: null | IUsers;
}

const UpdateUserModal = (props: IProps) => {
    const { getData, setIsUpdateModalOpen, access_token, isUpdateModalOpen,dataUpdate, setDataUpdate } = props;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        //update value for data state
        if (dataUpdate) {
            setName(dataUpdate.name);
            setEmail(dataUpdate.email);
            setPassword(dataUpdate.password);
            setAge(dataUpdate.age);
            setGender(dataUpdate.gender);
            setAddress(dataUpdate.address);
            setRole(dataUpdate.role);
        }
    }, [dataUpdate])

    const handleOk = async () => {
        // setIsUpdateModalOpen(false);
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

            handleCloseUpdateModal();

        } else {
            notification.error({
                message: "has error",
                description: JSON.stringify(dataUsers.message)
            });
        }
    };

    const handleCloseUpdateModal = () => {        
        //close modal
        setIsUpdateModalOpen(false);
        setDataUpdate(null);
        //clear value of all input
        setName("");
        setEmail("");
        setPassword("");
        setAge("");
        setGender("");
        setAddress("");
        setRole("");
        
    }

    return(
        <>
            <Modal
                title="Updated user"
                open={isUpdateModalOpen}
                onOk={handleOk}
                onCancel={handleCloseUpdateModal}
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
        </>
    );
}

export default UpdateUserModal;