import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PageArea } from "./styled";
import useAPI from "../../helpers/OlxAPI";

import { PageContainer } from "../../components/MainComponents";

const Page = () => {
  const api = useAPI();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [adInfo, setAdinfo] = useState([]);

  return (
    <PageContainer>
      <PageArea>
        <div className="leftSide">
          <div className="box">
            <div className="adImage">...</div>
            <div className="adInfo">
              <div className="adName">...</div>
              <div className="adDescription">...</div>
            </div>
          </div>
        </div>
        <div className="rigtSide">...</div>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
