import React, { useState, useRef } from "react";
import { PageArea } from "./styled";
import useAPI from "../../helpers/OlxAPI";
import { doLogin } from "../../helpers/AuthHandler";

import {
  PageContainer,
  PageTitle,
  ErrorMessage,
} from "../../components/MainComponents";

const Page = () => {
  const api = useAPI();
  const fileFild = useRef();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [desc, setDesc] = useState("");

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setError("");
    /*
    const json = await api.login(email, password);

    if (json.error) {
      setError(json.error);
    } else {
      doLogin(json.token, remenberPassword);
      window.location.href = "/";
    }*/
    setDisabled(false);
  };

  return (
    <PageContainer>
      <PageTitle>Postar um anúncio</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">Título</div>
            <div className="area--input">
              <input
                type="text"
                disabled={disabled}
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Categoria</div>
            <div className="area--input">
              <select></select>
            </div>
          </label>
          <label className="area">
            <div className="area--title">Preço</div>
            <div className="area--input">...</div>
          </label>
          <label className="area">
            <div className="area--title">Preço Negociável</div>
            <div className="area--input">
              <input
                type="checkbox"
                disabled={disabled}
                checked={priceNegotiable}
                onChange={(e) => setPriceNegotiable(!priceNegotiable)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Descrição</div>
            <div className="area--input">
              <textarea
                disabled={disabled}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>
          </label>
          <label className="area">
            <div className="area--title">Imagens (1 ou mais)</div>
            <div className="area--input">
              <input type="file" disabled={disabled} multiple ref={fileFild} />
            </div>
          </label>
          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disabled}>Adicionar Anúncio</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
