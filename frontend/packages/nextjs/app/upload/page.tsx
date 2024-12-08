"use client";

import SubgraphList from "../../components/SubgraphsList";
import UploadPage from "../../components/UploadPage";

const LandingPage = () => {
  return (
    <div className="grid grid-cols-2 gap-6 bg-black">
      <SubgraphList />
      <UploadPage />
    </div>
  );
};

export default LandingPage;
