import { Form } from 'antd';
import { Col, Row } from 'reactstrap';
import './cadastro.css';
import ButtonCustom from '../../../shared/ButtonCustom';
import InputCustom from '../../../shared/InputCustom';
import checkDocumento from '../../../shared/checkDocumento';
import { useHistory } from 'react-router-dom';

export declare interface ICadastro {
  fullName: string,
  email: string,
  nickname: string,
  birthday: string,
  cpfCnpj: string,
  account: {
    id: string,
    pass: string,
    checkPass: string
  }
}

function Cadastro() {
  const history = useHistory();

  const dadosPessoais = (values: ICadastro) => {
    history.push('/dados-pessoais', values)
  };

  return (
    <div>
      <Row className="containerCadastro">
        <Col xs="12">
          <Row>
            <Col xs="12">
              <div className="d-flex justify-content-center p-2">
                <div className="p-3">
                  <div className="titleCadastro titMob">Preencha os campos para prosseguir com o cadastro</div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="rowCadastro">
            <Col xs="12" style={{ width: '345px' }}>
              <div>
                <Form
                  autoComplete={'false'}
                  initialValues={{}}
                  onFinish={dadosPessoais}
                  scrollToFirstError>
                  <Form.Item
                    className="mb-2"
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        message: 'Favor inserir um Nome Completo válido',
                      },
                    ]}>
                    <InputCustom
                      placeholder=" Nome Completo" />
                  </Form.Item>
                  <Form.Item
                    className="mb-2"
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: 'email',
                        message: 'Favor inserir um E-mail válido',
                      },
                    ]}>
                    <InputCustom
                      placeholder=" E-mail" />
                  </Form.Item>
                  <Form.Item
                    className="mb-2"
                    name="birthday"
                    rules={[
                      {
                        required: true,
                        type: 'date',
                        message: 'Favor inserir um Data de Nascimento válida',
                      },
                    ]}>
                    <InputCustom
                      type="date"
                      placeholder=" Data de Nascimento" />
                  </Form.Item>
                  <Form.Item
                    className="mb-2"
                    name="cpfCnpj"
                    rules={[
                      // eslint-disable-next-line no-empty-pattern
                      ({ }) => ({
                        validator(rule, value) {
                          if (!value) {
                            return Promise.reject('Favor inserir um CPF válido (somente números)');
                          }

                          if (value) {
                            const isDocumento = checkDocumento('cpf', value);
                            if (isDocumento === true) {
                              return Promise.reject('Favor inserir um CPF válido (somente números)');
                            }
                          }

                          return Promise.resolve();
                        },
                      }),
                    ]}>
                    <InputCustom
                      type="number"
                      placeholder=" CPF" />
                  </Form.Item>
                  <Form.Item>
                    <div className="text-center pt-2 btnProximo">
                      <ButtonCustom
                        fluid
                        className="my-1"
                        primary>
                        Próxima
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

export default Cadastro;
