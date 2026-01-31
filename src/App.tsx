import { Suspense, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import Router from './core/routes'
import clinicStore from './core/store/clinic'

function App() {
  const clinic = clinicStore((state) => state.clinic);

  useEffect(() => {
    const root = document.documentElement;

    if (!clinic?.cor) {
      return;
    }

    const getReadableTextColor = (hexColor: string) => {
      const normalized = hexColor.replace("#", "");
      const isShort = normalized.length === 3;
      const r = parseInt(isShort ? normalized[0] + normalized[0] : normalized.slice(0, 2), 16);
      const g = parseInt(isShort ? normalized[1] + normalized[1] : normalized.slice(2, 4), 16);
      const b = parseInt(isShort ? normalized[2] + normalized[2] : normalized.slice(4, 6), 16);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance > 0.6 ? "#111827" : "#ffffff";
    };

    const foregroundColor = getReadableTextColor(clinic.cor);

    root.style.setProperty("--clinic-color", clinic.cor);
    root.style.setProperty("--primary", clinic.cor);
    root.style.setProperty("--ring", clinic.cor);
    root.style.setProperty("--sidebar-primary", clinic.cor);
    root.style.setProperty("--primary-foreground", foregroundColor);
    root.style.setProperty("--sidebar-primary-foreground", foregroundColor);
  }, [clinic?.cor]);

  return (
    <Suspense fallback={<p> Carregando... </p>}>
      <RouterProvider router={Router}  />
    </Suspense>
  )
}

export default App
