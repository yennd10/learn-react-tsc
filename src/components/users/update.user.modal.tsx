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
    const { access_token, getData, dataUpdate, setDataUpdate, isUpdateModalOpen, setIsUpdateModalOpen } = props;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {    
        //khi click edit sẽ nhận dataUpdate từ parent sau đó update value for data field state để  re-render value của input form.
        if (dataUpdate) {
            setName(dataUpdate.name);
            setEmail(dataUpdate.email);
            setPassword(dataUpdate.password);
            setAge(dataUpdate.age);
            setGender(dataUpdate.gender);
            setAddress(dataUpdate.address);
            setRole(dataUpdate.role);
        }
    }, [dataUpdate]); //useEffect chạy lần đầu thì chưa có dataUpdate, nó sẽ mount ra screen là value '', cần thành phần deps theo dõi sự thay đổi của dataUpdate

    const handleOk = async () => {
        if(dataUpdate) {
            const data = {
                _id: dataUpdate._id, // _Id cần update
                name, email, password, age, gender, role, address}

            const fetchUsers = await fetch(
                "http://localhost:8000/api/v1/users", 
                {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data) //get data then insert to database by api
                }
            );        

            const dataUsers = await fetchUsers.json();

            if(dataUsers.data) {
                //update success
                await getData();
                notification.success({
                    message: "Sửa user thành công.",
                })

                handleCloseUpdateModal();

            } else {
                notification.error({
                    message: "has error",
                    description: JSON.stringify(dataUsers.message)
                });
            }
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
                        disabled={true}
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