import React, { useState, useEffect } from "react";
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

  const [name, setName] = useState("");
  const [stateLoc, setStateLoc] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");

  const [stateList, setStateList] = useState([]);

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    };
    getStates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
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
      <PageTitle>Cadastro</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">Nome Completo</div>
            <div className="area--input">
              <input
                type="text"
                disabled={disabled}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Estado</div>
            <div className="area--input">
              <select
                required
                value={stateLoc}
                onChange={(e) => setStateLoc(e.target.value)}
              >
                <option></option>
                {stateList.map((i, k) => (
                  <option key={k} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
          </label>
          <label className="area">
            <div className="area--title">E-Mail</div>
            <div className="area--input">
              <input
                type="email"
                disabled={disabled}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Senha</div>
            <div className="area--input">
              <input
                type="password"
                disabled={disabled}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Confirmar Senha</div>
            <div className="area--input">
              <input
                type="password"
                disabled={disabled}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disabled}>Fazer Cadastro</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
