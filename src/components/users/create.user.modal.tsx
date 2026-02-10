import { Input, Modal, notification } from "antd";
import { useState } from "react";

interface IProps {
    getData: () => void,
    setIsModalOpen: (v: boolean) => void,
    access_token: string,
    isModalOpen: boolean,
}

const CreateUserModal = (props: IProps) => {
    const { getData, setIsModalOpen, access_token, isModalOpen } = props;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

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
        <>
            <Modal
                title="Add new user"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCloseCreateModal}
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

export default CreateUserModal;