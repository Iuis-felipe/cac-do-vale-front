import { Stack, Typography } from "@mui/material";
import { AplicationName, FooterRoot } from "./Footer.styled";
import { useState } from "react";

export function Footer() {
  const [companyName, setCompanyName] = useState("CAC Do Vale");
  return (
    <FooterRoot direction="row" spacing={2} justifyContent="space-between">
      <Stack direction="row">
        <AplicationName variant="body2">Nova Weekly</AplicationName>
        <Typography variant="body2">
          , Licença para <b>{companyName}</b>. Todos os direitos reservados.
        </Typography>
      </Stack>
      <Typography>Versão 202601</Typography>
    </FooterRoot>
  );
}
