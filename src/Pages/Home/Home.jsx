import { useNavigate } from "react-router-dom";
import "./Home.css";
import Footer from "../../Components/Footer";
import Btn from "../../Components/Btn";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/Calculate");
  };

  return (
    <>
      <main>
        <div className="home-container">
          <div className="bg-image-overlay"></div>

          <div className="content-wrapper">
            <div className="hero-section">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                {" "}
                Calculate Your Dowry
              </motion.h1>
              <p>Calculate to understand, not to promote.</p>
              <Btn onClick={handleNavigate} />
            </div>

            <div className="disclaimer-section">
              <div className="disclaimer-content">
                <span className="warning-icon">⚠️</span>
                <p>
                  Dowry is illegal under Nepal law (Dowry Prohibition Act,
                  1961). This tool is for Fun purposes only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
