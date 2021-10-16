import { Form, Divider, Spin } from 'antd';
import { useState } from 'react';
import { Col, Row } from 'reactstrap';
import keySvg from '../../../icons/key.svg';
import userSvg from '../../../icons/user.svg';
import googleSvg from '../../../icons/google.svg';
import facebookSvg from '../../../icons/facebook.svg';
import './login.css';
import ButtonCustom from '../../../shared/ButtonCustom';
import InputCustom from '../../../shared/InputCustom';
import api from '../../../services/api';
import Notify from '../../../shared/Notify';
import { useHistory } from 'react-router-dom';

declare interface ILogin {
  email: string,
  senha: string
}

declare interface ILoginResponse {
  id: string,
  email: string,
  fullName: string,
  role: string,
  token: string,
}

function Login() {
  const [loading, setIsLoading] = useState(false);
  const history = useHistory();

  async function logar(values: ILogin) {
    setIsLoading(true);

    const payload = {
      id: values.email,
      password: values.senha,
    };

    api.post<ILoginResponse>('o/customer-login/login', payload)
      .then((user) => {
        setIsLoading(false);

        localStorage.setItem('travellingToken', user.data.token);
        localStorage.setItem('travellingUsuarioId', user.data.id);
        localStorage.setItem('travellingUser', JSON.stringify(user.data.fullName));
        localStorage.setItem('travellingRole', JSON.stringify(user.data.role));

        setIsLoading(false);
        history.push('/home');
        window.location.reload();
      })
      .catch((err) => {
        if (err?.response?.data) {
          const { message } = err?.response?.data;
          Notify('error', 'Atenção', message);
        }
        else
          Notify('error', 'Atenção', err?.response);

        setIsLoading(false);
        history.push('/');
      });
  }


  return (
    <div>
      <Row className="containerLogin">
        <Col xs="12">
          <Row>
            <Col xs="12">
              <div className="d-flex justify-content-center p-2">
                <div className="p-3">
                  <div className="titleLogin titMob">Olá! Seja bem-vindo ao EasyBind4U</div>
                  <div className="subLabel pt-3 titMob">Entre com seu nome de usuário e senha.</div>

                </div>
              </div>
            </Col>
          </Row>
          <Row className="rowLogin">
            <Col xs="12" style={{ width: '345px' }}>
              <div>
                <Form
                  autoComplete={'false'}
                  initialValues={{ remember: true }}
                  onFinish={logar}
                  scrollToFirstError>
                  <Form.Item
                    className="mb-2"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Favor inserir um E-mail',
                      },
                    ]}>
                    <InputCustom
                      prefix={<img src={userSvg} />}
                      placeholder=" Email" />
                  </Form.Item>
                  <Form.Item
                    className="my-2"
                    name="senha"
                    rules={[
                      {
                        required: true,
                        message: 'Favor informar a sua senha',
                      },
                    ]}>
                    <InputCustom
                      prefix={<img src={keySvg} alt="Entrar" />}
                      password
                      autoComplete="off"
                      placeholder=" Senha"
                    />
                  </Form.Item>
                  <div className="subLabel pt-3" style={{ textAlign: 'right', textDecorationLine: 'underline' }}><a href="#">Esqueceu a Senha?</a></div>
                  {loading ? <Spin style={{ display: 'flex', justifyContent: 'center' }} /> :
                    <Form.Item>
                      <div className="text-center pt-2 btnEntrar">
                        <ButtonCustom
                          fluid
                          className="my-1"
                          primary>
                          Entrar
                        </ButtonCustom>
                      </div>
                    </Form.Item>
                  }
                  <div className="subLabel mt-5">
                    Não têm uma conta?
                    <a onClick={() => history.push('/cadastro')} style={{ paddingLeft: '5px', textDecorationLine: 'underline', fontWeight: 700 }}>Cadastre-se</a>
                  </div>
                  <Divider className="mt-4"><span className="subLabel"> ou </span></Divider>
                </Form>
                <div className="mt-4 btnCenter">
                  <ButtonCustom
                    prefix={<img style={{ paddingRight: '20px' }} alt="Google" src={googleSvg} />}
                    fluid
                    className="my-1 btnGoogle"
                    primary>
                    Entrar com Google
                  </ButtonCustom>
                </div>
                <div className="mt-2 btnCenter">
                  <ButtonCustom
                    prefix={<img style={{ paddingRight: '15px' }} alt="Facebook" src={facebookSvg} />}
                    fluid
                    className="my-1 btnFacebook"
                    primary>
                    Entrar com Facebook
                  </ButtonCustom>
                </div>

              </div>
            </Col>
          </Row>
        </Col>
      </Row>

    </div>
  );
}

export default Login;
