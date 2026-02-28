import React from "react";
import { PageTitleRoot, PageTitleText, PageTitleSubtext } from "./PageTitle.styled";

interface IPageTitle {
  title: string;
  subtitle?: string;
}

const PageTitle: React.FC<IPageTitle> = ({ title, subtitle }) => {
  return (
    <PageTitleRoot>
      <PageTitleText>{title}</PageTitleText>
      {subtitle && <PageTitleSubtext>{subtitle}</PageTitleSubtext>}
    </PageTitleRoot>
  );
};

export default PageTitle;
