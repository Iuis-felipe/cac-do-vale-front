
interface ClinicSelectionFrameProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setData: (data: any) => void;
  setCurrentPage: (page: number) => void;
}

const ClinicSelectionFrame = ({ data }: ClinicSelectionFrameProps) => {

  // if (!clinics || clinics.length === 0) {
  //   return (
  //     <div className="w-full h-full flex flex-col justify-center items-center p-4 text-center">
  //       <Building2Icon className="size-12 text-gray-400 mb-4" />
  //       <p className="text-gray-600">Nenhuma clínica disponível no momento.</p>
  //       <p className="text-xs text-gray-500 mt-2">Dados recebidos: {JSON.stringify(clinics)}</p>
  //     </div>
  //   );
  // }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Selecione a Clínica</h2>
          <p className="text-gray-600">Escolha a clínica onde deseja realizar seu exame</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {/* {clinics.map((clinic: IClinic) => (
            <button
              key={clinic.id}
              onClick={() => handleClinicSelect(clinic)}
              className={`
                relative p-6 rounded-xl border-2 transition-all duration-200
                hover:shadow-lg hover:scale-105 cursor-pointer text-left
                ${data.clinicId === clinic.id 
                  ? 'border-blue-800 bg-blue-50 shadow-md' 
                  : 'border-gray-200 bg-white hover:border-blue-400'
                }
              `}
              style={{
                borderColor: data.clinicId === clinic.id ? clinic.cor || '#1e40af' : undefined,
              }}
            >
              <div className="flex flex-col gap-3 mt-2">
                <div className="flex items-start gap-2">
                  <Building2Icon 
                    className="size-5 mt-0.5 flex-shrink-0" 
                    style={{ color: clinic.cor || '#1e40af' }}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg leading-tight">
                      {clinic.nome}
                    </h3>
                  </div>
                </div>

                {clinic.endereco && (
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPinIcon className="size-4 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{clinic.endereco}</span>
                  </div>
                )}

                {clinic.telefone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <PhoneIcon className="size-4 flex-shrink-0" />
                    <span>{clinic.telefone}</span>
                  </div>
                )}
              </div>

              {data.clinicId === clinic.id && (
                <div className="absolute top-4 right-4">
                  <div 
                    className="size-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: clinic.cor || '#1e40af' }}
                  >
                    <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          ))} */}
        </div>

        {data.clinicId && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Clínica selecionada: <span className="font-semibold text-gray-700">{data.clinicName}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicSelectionFrame;
