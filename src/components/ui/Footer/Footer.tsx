import { Typography } from "@mui/material";
import { AplicationName, FooterContent, FooterRoot, Version } from "./Footer.styled";
import { useState } from "react";
import { version } from '../../../../package.json'

export function Footer() {
  const [companyName, _setCompanyName] = useState("CAC Do Vale");
  return (
    <FooterRoot>
      <FooterContent>
        <AplicationName variant="body2">Nova Weekly</AplicationName>
        <Typography variant="body2">
          , Licença para <b>{companyName}</b>
        </Typography>
        <Typography variant="body2"><i>. Todos os direitos reservados.</i></Typography>
      </FooterContent>
      <Version variant="body2">Versão {version}</Version>
    </FooterRoot>
  );
}
