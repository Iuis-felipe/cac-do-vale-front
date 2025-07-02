import React from "react"

interface IPageTitle {
  title: string;
  subtitle: string;
}

const PageTitle: React.FC<IPageTitle> = ({ title, subtitle }) => {

  return (
    <div>
      <p className="text-2xl font-bold">
        {title}
      </p>
      <p className="text-sm text-slate-600">
        {subtitle}
      </p>
    </div>
  )
}

export default PageTitle