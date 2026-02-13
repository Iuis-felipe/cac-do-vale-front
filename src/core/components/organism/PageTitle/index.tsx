import React from "react";

interface IPageTitle {
  title: string;
}

const PageTitle: React.FC<IPageTitle> = ({ title }) => {
  return (
    <div>
      <p className="text-2xl font-bold">{title}</p>
    </div>
  );
};

export default PageTitle;
