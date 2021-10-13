/*eslint-disable*/
import { Input } from 'antd';
import { ReactNode } from 'react';
import './InputCustom.css';

const InputCustom = (props: any, Icon: ReactNode) => {
    return (props.password ?
        <Input.Password {...props} className={`inputCustom ${props.className}`}>
            {props.children}
        </Input.Password>
        :
        <Input {...props} className={`inputCustom ${props.className}`}>
            {props.children}
        </Input>)
}

export default InputCustom;
