import { useEffect, useState } from "react";
import useUserLogin from "../hooks/useUserLogin";
import { useNavigate } from "react-router-dom";
import { ExclamationTriangleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./login.css";
import { SwiperSlide as SwiperSlideType } from "../types";
import { Input } from "../../../components/ui/Input/Input";

const Login = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error, isSuccess } = useUserLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  const slides: SwiperSlideType[] = [
    {
      title: "Image Slide",
      image: "/src/assets/auth-swiper/img-01.svg",
      type: "image",
    },
    {
      title: "Image Slide 2",
      image: "/src/assets/auth-swiper/img-02.jpg",
      type: "image",
    },
    {
      title: "Image Slide 3",
      image: "/src/assets/auth-swiper/img-03.jpg",
      type: "image",
    },
  ];

  return (
    <div className="auth">
      <div className="auth-container">
        {/* SWIPER */}
        <div className="swiper-section">
          <a className="link-site" href="https://novadevelopments.com.br/" target="_blank">
            Conheça nosso site
            <img src="/src/assets/icons/auth-arrow-right.svg" alt="Seta para a direita" width={12} height={12} />
          </a>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 8000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="auth-swiper"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="slide-content">
                  <div className="slide-media">
                    {slide.type === "image" ? (
                      <img src={slide.image} alt={slide.title} width={1080} height={1080} className="slide-image" />
                    ) : (
                      <div className="slide-emoji">{slide.image}</div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* SWIPER FIM */}

        {/* FORM INICIO */}
        <div className="form-section">
          <div className="form-header">
            <img src="/src/assets/weekly-logo.svg" alt="WEEKLY Logo" />
          </div>

          <form className="auth-form" onSubmit={handleLogin}>
            <Input type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <Input
              type={showPassword ? "text" : "password"}
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rightElement={
                <button
                  type="button"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="password-toggle"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="size-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="size-5 text-gray-400" />
                  )}
                </button>
              }
            />

            {isError && (
              <div className="flex items-center gap-2 p-2 w-full rounded-md bg-red-100 border border-red-400 text-red-700">
                <ExclamationTriangleIcon className="size-5" />
                <p className="text-sm font-medium">{error?.message || "Ocorreu um erro."}</p>
              </div>
            )}

            <button type="submit" disabled={isPending}>
              {isPending ? <span className="animate-pulse">Entrando...</span> : "Login"}
            </button>
          </form>
          <p className="versionName">Versão {__APP_VERSION__}</p>
        </div>
        {/* Form Section END */}
      </div>
    </div>
  );
};

export default Login;
