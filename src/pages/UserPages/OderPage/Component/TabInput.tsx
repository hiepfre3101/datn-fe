import { useState } from "react";
import {  Radio , Input } from 'antd';
const InputComponent = ({ inputs }) => {
    const [input, setInput] = useState(inputs[0]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClick = (id: any) => {
        setInput(inputs[id]);
    };

    return (
        <div>
            <div className="mb-5">
                <Radio.Button onClick={() => handleClick(0)} >Tên</Radio.Button>
                <Radio.Button onClick={() => handleClick(1)} >Địa chỉ</Radio.Button>
                <Radio.Button onClick={() => handleClick(2)} >Số điện thoại</Radio.Button>
                <Radio.Button onClick={() => handleClick(3)} >Ngày mua</Radio.Button>
                <Radio.Button onClick={() => handleClick(4)} >ID</Radio.Button>
            </div >
            <div>

                <Input className="w-[40%]" type="text" value={input.value} placeholder={input.label} />
            </div>
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
//  const inputs = [
//   {
//     id: 1,
//     label: "Tên",
//     value: "",
//   },
//   {
//     id: 2,
//     label: "Địa chỉ",
//     value: "",
//   },
//   {
//     id: 3,
//     label: "Số điện thoại",
//     value: "",
//   },
// ];

export default InputComponent;