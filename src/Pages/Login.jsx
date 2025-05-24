import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../firebase";
import "../App.css";

// Import images
import logo1 from "./logo1.png";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState("google");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slides for the carousel
  const slides = [
    {
      title: "دراسات كتابية متعمقة",
      description: "اكتشف المعرفة الروحية من خلال دروسنا المتنوعة",
      image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      title: "مجتمع روحي",
      description: "تواصل مع المؤمنين وشارك في النقاشات الروحية",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      title: "موارد تعليمية",
      description: "استفد من مكتبتنا الواسعة من المواد التعليمية",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Handle Google Sign In
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }));

      navigate("/user/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Email/Password Sign In
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email
      }));

      navigate("/user/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="new-login-container">
      <div className="login-grid">
        {/* Left side - Carousel */}
        <div className="carousel-section">
          <div className="carousel-container">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="slide-content">
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="login-section">
          <div className="login-content">
            <div className="logo-container">
              <img src={logo1} alt="Church Logo" className="church-logo" />
            </div>

            <div className="login-form-container">
              <h1 className="welcome-text">مرحباً بك في تطبيق دراسات الكنيسة</h1>
              <p className="subtitle">سجل دخولك للوصول إلى المحتوى التعليمي</p>

            

              {loginMethod === 'google' ? (
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="google-signin-button"
                >
                  <span className="button-content">
                    {isLoading ? (
                      <span className="loading-dots">
                        <span>.</span><span>.</span><span>.</span>
                      </span>
                    ) : (
                      <>
                        <img 
                          src="https://www.google.com/favicon.ico" 
                          alt="Google" 
                          className="google-icon"
                        />
                        تسجيل الدخول باستخدام Google
                      </>
                    )}
                  </span>
                </button>
              ) : (
                 <></>
              )}

              {error && (
                <div className="error-message">
                  <span className="error-icon">!</span>
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
