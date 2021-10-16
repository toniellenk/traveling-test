import { Form, Spin } from 'antd';
import { Col, Row } from 'reactstrap';
import './dadosPessoais.css';
import ButtonCustom from '../../../shared/ButtonCustom';
import InputCustom from '../../../shared/InputCustom';
import checkAlfanumerico from '../../../shared/checkAlfanumerico';
import { checkAlfanumerioOr } from '../../../shared/checkAlfanumerico';
import { useHistory, useLocation } from 'react-router-dom';
import { ICadastro } from '../Cadastro';
import api from '../../../services/api';
import Notify from '../../../shared/Notify';
import { useState } from 'react';


function DadosPessoais() {
  const history = useHistory();
  const [loading, setIsLoading] = useState(false);

  const { state } = useLocation<ICadastro>();

  const finalizar = (values: any) => {
    setIsLoading(true);

    const payload = {
      ...state,
      nickname: values.nickname,
      account: {
        id: values.email,
        pass: values.pass,
        checkPass: values.checkPass
      },
    };

    api.post('o/customer', payload)
      .then(() => {
        setIsLoading(false);
        Notify('success', 'Sucesso', 'Cadastro realizado com sucesso. Faça o Login!');
        history.push('/');
      })
      .catch((err) => {
        if (err?.response?.data) {
          const { message } = err?.response?.data;
          Notify('error', 'Atenção', message);
        }
        else
          Notify('error', 'Atenção', err?.response);

        setIsLoading(false);
      });
  };

  return (
    <div>
      <Row className="containerDadosPessoais">
        <Col xs="12">
          <Row>
            <Col xs="12">
              <div className="d-flex justify-content-center p-2">
                <div className="p-3">
                  <div className="titleDadosPessoais titMobDados">Para terminar, defina um nome de usuário e uma senha</div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="rowDadosPessoais">
            <Col xs="12" style={{ width: '345px' }}>
              <div>
                <Form
                  autoComplete={'false'}
                  initialValues={{}}
                  onFinish={finalizar}
                  scrollToFirstError>
                  <Form.Item
                    className="mb-2"
                    name="nickname"
                    rules={[
                      {
                        required: true,
                        message: 'Favor informar o Nome de usuário',
                      },
                      ({ }) => ({
                        validator(rule, value) {
                          if (value && value.length < 5) {
                            return Promise.reject(
                              'Sua nome deve possuir no mínimo 5 caracteres',
                            );
                          } else {
                            const isAlfaNumerico = checkAlfanumerioOr(
                              value,
                            );
                            if (!isAlfaNumerico) {
                              return Promise.reject(
                                'Só é permitido letras ou números.',
                              );
                            }
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}>
                    <InputCustom
                      placeholder=" Nome de Usuário" />
                  </Form.Item>
                  <div className="subLabel" style={{ fontSize: '12px', paddingTop: '8px', paddingBottom: '40px' }}>Use letras ou números, mas evite pontos e espaços.</div>
                  <Form.Item
                    className="my-2"
                    name="pass"
                    rules={[
                      {
                        required: true,
                        message: 'Favor informar a sua senha',
                      },
                      ({ }) => ({
                        validator(rule, value) {
                          if (value && value.length < 6) {
                            return Promise.reject(
                              'Sua senha deve possuir no mínimo 6 caracteres',
                            );
                          } else {
                            const isAlfaNumerico = checkAlfanumerico(
                              value,
                            );
                            if (!isAlfaNumerico) {
                              return Promise.reject(
                                'Sua senha deve possuir letras e números',
                              );
                            }
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}>
                    <InputCustom
                      password
                      size="large"
                      placeholder=" Senha"
                    />
                  </Form.Item>
                  <Form.Item
                    className="my-2"
                    name="checkPass"
                    dependencies={['pass']}
                    rules={[
                      {
                        required: true,
                        message: 'Favor confirmar a sua senha',
                      },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (
                            !value ||
                            getFieldValue('pass') === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            'Confirmação de senha diferentes',
                          );
                        },
                      }),
                    ]}>
                    <InputCustom
                      password
                      size="large"
                      placeholder=" Confirmar senha"
                    />
                  </Form.Item>
                  <div className="subLabel mt-5" style={{ fontSize: '12px' }}>
                    Eu concordo com os termos e condições de uso
                    <a style={{ paddingLeft: '5px', textDecorationLine: 'underline', fontWeight: 700 }}>termos e condições de uso</a>
                  </div>
                  {loading ? <Spin style={{ display: 'flex', justifyContent: 'center' }} /> :
                    <Form.Item>
                      <div className="text-center pt-2 btnProximo">
                        <ButtonCustom
                          fluid
                          className="my-1"
                          primary>
                          Concluir
                        </ButtonCustom>
                      </div>
                    </Form.Item>}

                  <div className="subLabel mt-5">
                    Já têm cadastro? Faça
                    <a onClick={() => history.push('/')} style={{ paddingLeft: '5px', textDecorationLine: 'underline', fontWeight: 700 }}>login aqui</a>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

    </div>
  );
}

export default DadosPessoais;
