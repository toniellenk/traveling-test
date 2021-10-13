/*eslint-disable*/
import { ReactNode } from 'react';
import { Button } from 'semantic-ui-react';
import './buttonCustom.css';


const ButtonCustom = (props: any) => {
    return (
        <Button  {...props} className={`${props.className} btmCustom`} style={{ background: '#00C1A5' }}>
            {props.prefix}
            {props.children}
        </Button>
    );

}

export default ButtonCustom;
