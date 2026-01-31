import { ArrowRightIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

interface WelcomeFrameProps {
  setCurrentPage: (page: number) => void;
}

const WelcomeFrame = ({ setCurrentPage }: WelcomeFrameProps) => {
  const { slug } = useParams();

  const clinicName = useMemo(() => {
    if (!slug) return "";

    const slugMap: Record<string, string> = {
      "cac-do-vale": "CAC do Vale",
      "cac-blumed": "CAC Blumed",
    };

    if (slugMap[slug]) return slugMap[slug];

    const lowercaseWords = new Set(["da", "de", "do", "das", "dos", "e"]);
    return slug
      .split("-")
      .map((word, index) => {
        const lower = word.toLowerCase();
        if (index > 0 && lowercaseWords.has(lower)) return lower;
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      })
      .join(" ");
  }, [slug]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center p-4">
      <div className="w-full max-w-lg">
        <div className="flex justify-center mb-6">
          <CalendarDaysIcon className="size-16 text-blue-800" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Faça seu agendamento aqui!</h1>
          <p className="mt-3 text-[20px] text-red-500">
          <b>*</b>Antes de agendar o exame, certifique-se de que você foi <br />
            redirecionado pelo DETRAN para a clínica {clinicName || "CAC"}!
        </p>
        <p className="mt-3 text-base text-gray-500">
          Siga o passo a passo para agendar sua consulta. <br />
          Não se esqueça de preencher todos os campos obrigatórios.
        </p>

        <button
          className="w-full sm:w-auto mt-10 inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition-colors cursor-pointer"
          onClick={() => setCurrentPage(2)}
        >
          Começar
          <ArrowRightIcon className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default WelcomeFrame;