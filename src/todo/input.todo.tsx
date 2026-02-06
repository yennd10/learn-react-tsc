interface IProps {
    propsInfo: {
        name: string,
        age: number
    }
}

const InputTodo = (props: IProps) => {
    
    const {propsInfo} = props;

    return (
        <div style={{ border: "1px solid red" }}>
            <div>Get props: {JSON.stringify(propsInfo)}</div>
            <div>Add new todo</div>
            <input
                value="value item"
                type="text"            
            />
            &nbsp; &nbsp;
            <button>Save</button>
            <br />
            <ul>
                <li>Item</li>
                <li>Item</li>
                <li>Item</li>            
            </ul>
        </div>
    )
}

export default InputTodo;

/**
 * 1. create input.todo.tsx => call InputTodo component in App.tsx
 * 2. create Html for form input todo  
 * 3. create variables from parent component, sau đó truyền xuống child component thông qua props
 * 4. define data type on child component để get props data từ parent
 */