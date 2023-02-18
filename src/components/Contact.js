import { useState,useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import d1 from "../assets/img/1.svg"
import d2 from "../assets/img/2.svg"
import d3 from "../assets/img/3.svg"
import d4 from "../assets/img/4.svg"
import d5 from "../assets/img/5.svg"
import d6 from "../assets/img/6.svg"
import d7 from "../assets/img/7.svg"
import test from "../assets/img/test.svg"
import d8 from "../assets/img/d8.png"
import arrow from "../assets/img/arrow.svg"
import i1 from "../assets/img/icon1.svg"
import i2 from "../assets/img/icon2.svg"
import i3 from "../assets/img/icon3.svg"
import i5 from "../assets/img/icon5.svg"
import i6 from "../assets/img/icon6.svg"
import i7 from "../assets/img/icon7.svg"
import i8 from "../assets/img/icon8.svg"
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import Swal from 'sweetalert2'
import Wave from 'react-wavify'
import axios from 'axios';
import { useTranslation,} from "react-i18next";

export const Contact = () => {
  const url = "https://youtubercrypto.com.tw/api/crypto_friend"
  const i_data = {
    "cryptoFriendUuid": "0",
    "exchangeUuid": "4e83c3fb-2ca5-11ec-b5a3-001132d44c7a",
    "exchangeUID": "BYBIT",
    "discordId": ""
  }
  const [data, setData] = useState(i_data);
  const [status, setStatus] = useState({});
  const ref = useRef(null);


  function handle(e){
    const newdata = {...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
  }
  async function submit(e){
      e.preventDefault();
      if(data.exchangeUID === ""){
           Swal.fire('請輸入UID')
      }else if(data.discordId === ""){
            Swal.fire('請輸入Discord ID')
      }else{
          const params = new URLSearchParams()
          const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
          params.append('cryptoFriendUuid', "0")
          params.append('exchangeUuid', data.exchangeUuid)
          params.append('exchangeUID', data.exchangeUID)
          params.append('discordId', data.discordId)
          axios.put(url, params, config)
          .then(function (response) {
            if(response.data.errorMsg === "Success"){
              Swal.fire('成功')
            }else if(response.data.errorMsg === "Error.System.DataInComplete"){
              Swal.fire('已加入')
            }
          })
          .catch(function (response) {
            console.log(response.data);
          });
    }

  }
  const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };

  const [exchanges, setExchanges] = useState([]);
  useEffect(() => {
    const getExchange = async () => {
      const response = await axios.get("/api/crypto_friend/exchange", {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }});
      setExchanges(response.data.response)
    };
    getExchange();
  }, []);
  const { t } = useTranslation();
  return (
    <div>
    <div className="contact-outer" >
    </div>
    <section className="contact">
        <Container>
          <Row>
            <Col size={15} md={1} xs={0}></Col>
            <Col size={15} md={5} xs={0}>
                <div className="form-right d-none d-sm-block">
                <h2>{t('content9')} </h2>
                    <TrackVisibility>
                    {({ isVisible }) =>
                      <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                        <div className="contact-icon">
                          <p><img className = "dicon" src={i1} alt={t('content1')}/>{t('content1')}</p>
                          <p><img className = "dicon" src={i2} alt={t('content2')}/>{t('content2')}</p>
                          <p><img className = "dicon" src={i3} alt={t('content3')}/>{t('content3')}</p>
                          <p><img className = "dicon" src={i5} alt={t('content4')}/>{t('content4')}</p>
                          <p><img className = "dicon" src={i6} alt={t('content5')}/>{t('content5')}</p>
                          <p><img className = "dicon" src={i7} alt={t('content6')}/>{t('content6')}</p>
                          <p><img className = "dicon" src={i8} alt={t('content7')}/>{t('content7')}</p>
                          <p><img className = "dicon" src={test} alt={t('content10')}/>{t('content10')}</p>
                        </div>
                    </div>}
                  </TrackVisibility>
                </div>
            </Col>
            <Col md={1} xs={0}></Col>
            <Col md={5} xs={12}>
            <p className="d-md-none mobile-title">{t('content9')}</p>
              <TrackVisibility>
                {({ isVisible }) =>
                  <div className={isVisible ? "animate__animated animate__fadeIn" : "animate__animated animate__fadeIn"}>
                  <div className="rounded form-back p-5">
                    <div className="p-md-5">
                        <form onSubmit={(e)=>submit(e)} encType="application/json" >
                            <p>交易所</p>
                            <select id="exchangeUuid" onChange={(e) => handle(e)} value={data.exchangeUuid}>
                            {exchanges.map((exchange) => (
                                <option key={exchange.value} value={exchange.value}>{exchange.text}</option>
                              ))}
                            </select>
                            <p>UID</p>
                            <input id="exchangeUID" type="number" placeholder="UID" onChange={(e) => handle(e)} value={data.exchangeUID}  onWheel={(e) => e.target.blur()}/>
                            <p>Discord ID </p>
                            <input id="discordId" type="text"  placeholder="Discord" onChange={(e) => handle(e)} value={data.discordId} />
                            <button type="submit"><span>{t('content8')}</span></button>
                            {
                              status.message &&<p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                            }
                      </form>
                    </div>
                  </div>
                </div>}
              </TrackVisibility>
            </Col>
          </Row>
        </Container>
        <div className="middle d-none d-sm-block"><img src={arrow} className="bounce" alt=""  onClick={handleClick}/></div>
      <Wave mask="url(#mask)" fill="#2D4458" options={{amplitude: 80 }}>
                <defs>
                  <linearGradient id="gradient" gradientTransform="rotate(90)">
                    <stop offset="0" stopColor="white" />
                    <stop offset="0.5" stopColor="black" />
                  </linearGradient>
                  <mask id="mask">
                    <rect x="0" y="0" width="2000" height="200" amplitude="20" fill="url(#gradient)"  />
                  </mask>
                </defs>
      </Wave>
      <Container>

        <div className="row">
          <div className="col-md-3 mt-5 mx-auto">
            <div className="my-card mycustom_class w3-animate-left">
                    <div className="img-scale mx-auto">
                      <img src={d1} alt=""/>
                    </div>
                      <div className="group">
                        <img class="my-card-icon" src={i1} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '5px'}} alt={t('content1')} />
                        <h3 style={{display: 'inline-block', verticalAlign: 'middle'}}>{t('content1')}</h3>
                        <div>
                        {t('content11')}
                        </div>
                      </div>
                  </div>
          </div>
          <div className="col-md-3 mt-5 pt-1 mx-auto">
            <div className="my-card mycustom_class w3-animate-left">
                    <div className="img-scale mx-auto">
                      <img src={d2} alt=""/>
                    </div>
                      <div className="group">
                        <img class="my-card-icon" src={i2} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '5px'}} alt={t('content2')} />
                        <h3 style={{display: 'inline-block', verticalAlign: 'middle'}}>{t('content2')}</h3>
                        <div>
                        {t('content22')}
                        </div>
                      </div>
                  </div>
          </div>
          <div className="col-md-3 mt-5 mx-auto">
            <div className="my-card mycustom_class w3-animate-left">
                    <div className="img-scale mx-auto">
                      <img src={d3} alt=""/>
                    </div>
                    <div className="group">
                        <img class="my-card-icon" src={i3} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '5px'}} alt="{t('content3')}"/>
                        <h3 style={{display: 'inline-block', verticalAlign: 'middle'}}>{t('content3')}</h3>
                      <div>
                        {t('content33')}
                      </div>
                    </div>
                </div>
          </div>
          <div className="col-md-3 mt-5 mx-auto">
              <div className="my-card mycustom_class w3-animate-left">
                      <div className="img-scale mx-auto">
                        <img src={d4} alt=""/>
                      </div>
                      <div className="group">
                        <img class="my-card-icon" src={i5} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '5px'}} alt="{t('content4')}" />
                        <h3 style={{display: 'inline-block', verticalAlign: 'middle'}}>{t('content4')}</h3>
                        <div>
                          {t('content44')}
                        </div>
                      </div>
                  </div>
          </div>
          <div className="col-md-3 mt-5 mx-auto">
            <div className="my-card mycustom_class w3-animate-left">
                      <div className="img-scale mx-auto">
                        <img src={d5} alt=""/>
                      </div>
                      <div className="group">
                        <img class="my-card-icon" src={i6} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '5px'}} alt="{t('content5')}"/>
                        <h3 style={{display: 'inline-block', verticalAlign: 'middle'}}>{t('content5')}</h3>
                        <div>
                          {t('content55')}
                        </div>
                      </div>
                  </div>
          </div>
          <div className="col-md-3 mt-5 mx-auto">
            <div className="my-card mycustom_class w3-animate-left">
                    <div className="img-scale mx-auto">
                      <img src={d6} alt=""/>
                    </div>
                    <div className="group">
                      <img class="my-card-icon" src={i7} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '5px'}} alt="{t('content6')}" />
                      <h3 style={{display: 'inline-block', verticalAlign: 'middle'}}>{t('content6')}</h3>
                      <div>
                        {t('content66')}
                        <br/>
                        <br/>
                  
                      </div>
                    </div>
                  </div>
          </div>
          <div className="col-md-3 mt-5 mx-auto">
            <div className="my-card mycustom_class w3-animate-left">
                  <div className="img-scale mx-auto">
                    <img src={d7} alt=""/>
                  </div>
                  <div className="group">
                    <img class="my-card-icon" src={i8} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '5px'}} alt="{t('content7')}" />
                    <h3 style={{display: 'inline-block', verticalAlign: 'middle'}}>{t('content7')}</h3>
                    <div>
                      {t('content77')}
                    </div>
                    </div>
                </div>
          </div>
          <div className="col-md-3 mt-5 mx-auto">
            <div className="my-card mycustom_class w3-animate-left">
                  <div className="img-scale2 mx-auto">
                    <img src={d8} alt=""/>
                  </div>
                  <div className="group">
                    <img class="my-card-icon" src={test} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '5px'}} alt="{t('content10')}" />
                    <h3 style={{display: 'inline-block', verticalAlign: 'middle'}}>{t('content10')}</h3>
                    <div>
                      {t('content88')}
                    </div>
                    </div>
                </div>
          </div>
        </div>
      </Container>
    </section>
    
    </div>
  )
}
