import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { PageArea, Fake } from "./styled";
import useAPI from "../../helpers/OlxAPI";

import { PageContainer } from "../../components/MainComponents";

const Page = () => {
  const api = useAPI();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [adInfo, setAdinfo] = useState({});

  useEffect(() => {
    const getAdInfo = async (id) => {
      const json = await api.getAd(id, true);
      setAdinfo(json);
      setLoading(false);
    };
    getAdInfo(id);
  }, []);

  const formatDate = (date) => {
    let cDate = new Date(date);
    let months = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];
    let cDay = cDate.getDate();
    let cMonth = cDate.getMonth();
    let cYear = cDate.getFullYear();

    return `${cDay} de ${months[cMonth]} de ${cYear}`;
  };

  return (
    <PageContainer>
      <PageArea>
        <div className="leftSide">
          <div className="box">
            <div className="adImage">
              {loading && <Fake height={300} />}
              {adInfo.images && (
                <Slide>
                  {adInfo.images.map((img, k) => (
                    <div key={k} className="each-slide">
                      <img src={img} alt="" />
                    </div>
                  ))}
                </Slide>
              )}
            </div>
            <div className="adInfo">
              <div className="adName">
                {loading && <Fake height={20} />}
                {adInfo.title && <h2>{adInfo.title}</h2>}
                {adInfo.dateCreated && (
                  <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                )}
              </div>
              <div className="adDescription">
                {loading && <Fake height={100} />}
                {adInfo.description}
                <hr />
                {adInfo.views && <small>Visualizações: {adInfo.views}</small>}
              </div>
            </div>
          </div>
        </div>
        <div className="rigtSide">
          <div className="box box--padding">
            {loading && <Fake height={20} />}
            {adInfo.priceNegotiable && "Preço Negociável"}
            {!adInfo.priceNegotiable && adInfo.price && (
              <div className="price">
                Preço: <span>R$ {adInfo.price}</span>
              </div>
            )}
          </div>

          {loading && <Fake height={50} />}
          {adInfo.userInfo && (
            <>
              <a
                href={`mailto:${adInfo.userInfo.email}`}
                className="contactSellerLink"
                target="_black"
              >
                Fale com o vendedor
              </a>
              <div className="createdBy box box--padding">
                <strong>{adInfo.userInfo.name}</strong>
                <small>E-mail: {adInfo.userInfo.email}</small>
                <small>Estado: {adInfo.stateName}</small>
              </div>
            </>
          )}
        </div>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
