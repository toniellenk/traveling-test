/* eslint-disable */
import { notification } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined, ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Icon } from 'semantic-ui-react';
import { IconType } from 'antd/lib/notification';



function Notify(type: IconType, title: string, message: string, width?: number) {
  let icone = null;
  switch (type) {
    case 'error':
      icone = <CloseCircleOutlined style={{ color: 'red' }} />;
      break;
    case 'success':
      icone = <CheckCircleOutlined style={{ color: 'green' }} />;
      break;
    case 'warning':
      icone = <ExclamationCircleOutlined style={{ color: 'orange' }} />;
      break;
    default:
      icone = <InfoCircleOutlined style={{ color: 'gray' }} />;
  }

  if (type === 'success' || type === 'warning' || type === 'error')
    notification[type]({
      message: title ? title : 'Atenção',
      description: message,
      icon: icone,
      duration: 8,
      style: {
        width: width && width,
      },
    });
}

export default Notify;
