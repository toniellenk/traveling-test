import { Col, Row } from 'reactstrap';
import './home.css';
import api from '../../../services/api';
import Notify from '../../../shared/Notify';
import { useEffect, useState } from 'react';
import ButtonCustom from '../../../shared/ButtonCustom';
import { authenticationService } from '../../../services/authentication.service'
import { Spin } from 'antd';

declare interface ICadastroResponse {
  active: boolean,
  birthday: string,
  cpfCnpj: string,
  dateCreated: string,
  deleted: false,
  email: string,
  fullName: string,
  lastUpdated: string,
  nickname: string,
  status: string,
  type: string,
  _id: string

}
function Home() {
  const [loading, setIsLoading] = useState(false);
  const [data, setData] = useState<ICadastroResponse>();

  const carregar = () => {
    setIsLoading(true);

    api.get<ICadastroResponse>('p/customer')
      .then((reponse) => {
        setData(reponse.data)
        setIsLoading(false);
      })
      .catch((err) => {
        if (err?.response) {
          if (err?.response?.data) {
            const { message } = err?.response?.data;
            Notify('error', 'Atenção', message);
          }
          else
            Notify('error', 'Atenção', err?.response);
        }
        setIsLoading(false);
      });
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div>
      <Row className="containerHome">
        {loading ? <Spin style={{ display: 'flex', justifyContent: 'center' }} /> :

          <Col xs="12">
            <Row>
              <Col xs="12">
                <div className="d-flex justify-content-center p-2">
                  <div className="p-3">
                    <div className="titleLogin titMob">Olá! Seja bem-vindo {data?.fullName}</div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="rowHome">
              <Col className="colHome" xs="12" style={{ width: '600px' }}>
                <Row>
                  <Col xs="6" md="3">
                    <label>ID: </label>
                  </Col>
                  <Col xs="6" md="9">
                    {data?._id}
                  </Col>
                </Row>
                <Row>
                  <Col xs="6" md="3">
                    <label>Active: </label>
                  </Col>
                  <Col xs="6" md="9">
                    {data?.active?.toString()}
                  </Col>
                </Row>
                <Row>
                  <Col xs="6" md="3">
                    <label>Birthday: </label>
                  </Col>
                  <Col xs="6" md="9">
                    {data?.birthday?.toString()}
                  </Col>
                </Row>
                <Row>
                  <Col xs="6" md="3">
                    <label>CPF/ CNPJ: </label>
                  </Col>
                  <Col xs="6" md="9">
                    {data?.cpfCnpj}
                  </Col>
                </Row>
                <Row>
                  <Col xs="6" md="3">
                    <label>Date Created: </label>
                  </Col>
                  <Col xs="6" md="9">
                    {data?.dateCreated}
                  </Col>
                </Row>
                <Row>
                  <Col xs="6" md="3">
                    <label>Deleted: </label>
                  </Col>
                  <Col xs="6" md="9">
                    {data?.deleted?.toString()}
                  </Col>
                </Row>
                <Row>
                  <Col xs="6" md="3">
                    <label>E-mail: </label>
                  </Col>
                  <Col xs="6" md="9">
                    {data?.email}
                  </Col>
                </Row>
                <Row>
                  <Col xs="6" md="3">
                    <label>Full Name: </label>
                  </Col>
                  <Col xs="6" md="9">
                    {data?.fullName}
                  </Col>
                </Row>
                <Row>
                  <Col xs="6" md="3">
                    <label>Last Updated: </label>
                  </Col>
                  <Col xs="6" md="9">
                    {data?.lastUpdated}
                  </Col>
                </Row>
                <Row>
                  <Col xs="6" md="3">
                    <label>Nickname: </label>
                  </Col>
                  <Col xs="6" md="9">
                    {data?.nickname}
                  </Col>
                </Row>
                <Row>
                  <Col xs="6" md="3">
                    <label>Status: </label>
                  </Col>
                  <Col xs="6" md="9">
                    {data?.status}
                  </Col>
                </Row>
                <Row>
                  <Col xs="6" md="3">
                    <label>Type: </label>
                  </Col>
                  <Col xs="6" md="9">
                    {data?.type}
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="mt-4 btnCenter">
              <ButtonCustom
                onClick={() => authenticationService.logout()}
                fluid
                className="my-1 btnVoltar"
                primary>
                Logout
              </ButtonCustom>
            </div>
          </Col>
        }
      </Row>

    </div>
  );
}

export default Home;
