import { Suspense, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import Router from './core/routes'
import clinicStore from './core/store/clinic'
import { useAppTheme } from './core/components/AppThemeProvider'
import { getReadableTextColor } from './core/utils/colors'

function App() {
  const clinic = clinicStore((state) => state.clinic);
  const { updateCustomPalette } = useAppTheme();

  useEffect(() => {
    const root = document.documentElement;

    if (!clinic?.cor) {
      return;
    }

    // Calcula a cor de texto ideal para garantir legibilidade sobre a cor da clínica
    const foregroundColor = getReadableTextColor(clinic.cor);

    // Aplicar cores como CSS variables (mantém compatibilidade com sistema existente)
    root.style.setProperty("--clinic-color", clinic.cor);
    root.style.setProperty("--primary", clinic.cor);
    root.style.setProperty("--ring", clinic.cor);
    root.style.setProperty("--sidebar-primary", clinic.cor);
    root.style.setProperty("--primary-foreground", foregroundColor);
    root.style.setProperty("--sidebar-primary-foreground", foregroundColor);

    // Sobrescrever paleta do Material UI com cores da clínica
    updateCustomPalette({
      primary: {
        main: clinic.cor,
        contrastText: foregroundColor,
      },
    });
  }, [clinic?.cor, updateCustomPalette]);

  return (
    <Suspense fallback={<p> Carregando... </p>}>
      <RouterProvider router={Router}  />
    </Suspense>
  )
}

export default App
