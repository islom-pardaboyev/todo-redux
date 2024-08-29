import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "./redux/actions";
import toast from "react-hot-toast";

function App() {
  const filteredTodos = useSelector((state) => state.todos);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  console.log(filteredTodos);

  function handleFormSubmit(e) {
    e.preventDefault();
    if (value) {
      const data = {
        id: filteredTodos.length
          ? filteredTodos[filteredTodos.length - 1].id + 1
          : 1,
        value: value.toLowerCase(),
        completed: false,
      };

      dispatch({ type: ACTIONS.ADD_TODO, payload: data });
    } else {
      toast.error("Please fill the field");
      e.target[0].classList.add("border", "!border-red-600");
    }
    setValue("");
  }

  return (
    <section className="w-screen h-screen text-white flex flex-col items-center justify-center overflow-hidden">
      <div className="fixed top-0 left-0 h-full w-full bg-black">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
      </div>

      <h1 className="text-5xl font-bold text-center mb-10 text-white z-10">
        Todos
      </h1>
      <div className="z-10 w-[500px] overflow-y-auto p-5 rounded-md bg-white">
        <form onSubmit={handleFormSubmit} autoComplete="off" className="">
          <div className="flex items-center gap-3">
            <Input
              onChange={(e) => setValue(e.target.value)}
              value={value}
              placeholder="Enter Your Todo"
              size="large"
            />
            <Button
              size="large"
              type="primary"
              icon={<PlusOutlined />}
              iconPosition="end"
            >
              Add Todo
            </Button>
          </div>
        </form>
        <div className="flex items-center py-5 justify-between">
          <Button size="large" type="primary">
            All ({filteredTodos.length})
          </Button>
          <Button size="large" type="primary">
            Completed ({filteredTodos.filter((item) => item.completed).length})
          </Button>
          <Button size="large" type="primary">
            Uncompleted (
            {filteredTodos.filter((item) => !item.completed).length})
          </Button>
        </div>
        <ul className="h-[300px] overflow-y-auto flex flex-col gap-2">
          {filteredTodos.length ? (
            filteredTodos.map((item, index) => (
              <li
                key={index + 1}
                className="flex items-center justify-between p-4 rounded-md bg-neutral-500"
              >
                <div className="flex items-center gap-3">
                  <p>{index + 1}.</p>
                  <strong className={`capitalize ${item.completed ? 'line-through' : ""}`}>{item.value}</strong>
                </div>
                <div className={`flex items-center gap-3`}>
                  <Checkbox className="scale-125" checked={item.completed} onChange={() => dispatch({type:ACTIONS.MAKE_COMPLETED_TODO, payload:item.id})}/>
                  <Button className="!bg-rose-500 !border-transparent text-white hover:!text-white" size="large">Delete</Button>
                  <Button className="!bg-green-500 !border-transparent text-white hover:!text-white" size="large">Update</Button>
                </div>
              </li>
            ))
          ) : (
            <p className="flex items-center justify-center capitalize text-neutral-400 h-full font-semibold text-3xl">
              not yet todos
            </p>
          )}
        </ul>
      </div>
    </section>
  );
}

export default App;
