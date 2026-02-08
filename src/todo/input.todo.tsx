import { useState } from "react";

interface IProps {
    propsInfo: {
        name: string,
        age: number
    },
    listTodo: string[],
    setListTodo: (v: string[]) => void
}

const InputTodo = (props: IProps) => {
    
    const {propsInfo, listTodo, setListTodo} = props;

    // todo là state để manage status của input value
    const [todo, setTodo] = useState("");

    // Không gọi setTodo() trực tiếp trong body component → gây vòng lặp re-render vô hạn.
    // Chỉ gọi setTodo trong event handler (onChange, onClick) hoặc trong useEffect.    

    const handleClick = () => {
        if(!todo) { //todo = "" = false;        
            alert("Please enter value item");
            return;
        }
        setListTodo([...listTodo, todo]);
        setTodo(""); // set todo = "" sau khi đã update listTodo
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(e.target.value);
    }

    return (
        <div>
            {/* <div>Get props: {JSON.stringify(propsInfo)}</div> */}
            <div>Add new todo</div>
            <input
                value={todo} // khởi tạo value ""
                type="text"
                onChange={handleOnChange}      
            />
            &nbsp; &nbsp;
            <button onClick={handleClick}>Save</button>            
        </div>
    )
}

export default InputTodo;

/**
 * 1. create input.todo.tsx => call InputTodo component in App.tsx
 * 2. create Html for form input todo  
 * 3. create variables from parent component, sau đó truyền xuống child component thông qua props
 * 4. define data type on child component để get props data từ parent
 * 5. create handleOnChange để get value assign cho todo thông qua setTodo
 * 6. create handleClick, add todo to listTodo
 * 7. hiển thị item bằng listTodo.map()
 */