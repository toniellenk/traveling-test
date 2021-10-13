import { Form } from 'antd';
import { Col, Row } from 'reactstrap';
import './dadosPessoais.css';
import ButtonCustom from '../../../shared/ButtonCustom';
import InputCustom from '../../../shared/InputCustom';
import checkAlfanumerico from '../../../shared/checkAlfanumerico';
import checkAlfanumerioOr from '../../../shared/checkAlfanumerico';
import { useHistory } from 'react-router-dom';


function DadosPessoais() {
  const history = useHistory();

  const finalizar = () => { };

  return (
    <div>
      <Row className="containerDadosPessoais">
        <Col xs="12">
          <Row>
            <Col xs="12">
              <div className="d-flex justify-content-center p-2">
                <div className="p-3">
                  <div className="titleDadosPessoais titMob">Para terminar, defina um nome de usuário e uma senha</div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="rowDadosPessoais">
            <Col xs="12" style={{ width: '345px' }}>
              <div>
                <Form
                  autoComplete={'false'}
                  initialValues={{ remember: true }}
                  onFinish={finalizar}
                  scrollToFirstError>
                  <Form.Item
                    className="mb-2"
                    name="nome"
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
                    name="senha"
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
                    name="senhaConfirmacao"
                    dependencies={['senha']}
                    rules={[
                      {
                        required: true,
                        message: 'Favor confirmar a sua senha',
                      },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (
                            !value ||
                            getFieldValue('senha') === value
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
                  <div className="subLabel mt-5" style={{fontSize: '12px'}}>
                    Eu concordo com os termos e condições de uso
                    <a style={{ paddingLeft: '5px', textDecorationLine: 'underline', fontWeight: 700}}>termos e condições de uso</a>
                  </div>
                  <Form.Item>
                    <div className="text-center pt-2 btnProximo">
                      <ButtonCustom
                        fluid
                        className="my-1"
                        primary>
                        Concluir
                      </ButtonCustom>
                    </div>
                  </Form.Item>

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
