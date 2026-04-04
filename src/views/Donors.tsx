// src/pages/Donors.tsx
import { useState } from "react";
import { PageLoader, Navbar, Footer } from "../components/shared.tsx";
import "../styles/globals.css";

const DONORS = [
  { name: "Dr. Christophe Mupenzi", amount: 80, message: "Soutien précieux au lancement", date: "En vedette", initials: "CM", color: "#6EE7B3" },
  { name: "Député Matayo John", amount: 125, message: "Engagé pour l'innovation locale", date: "En vedette", initials: "MJ", color: "#3B82F6" },
  { name: "Mulimodero Bahati Michel", amount: 200, message: "Visionnaire du numérique africain", date: "En vedette", initials: "MB", color: "#C0F2B6" },
  { name: "Diane Vanessa M.", amount: 150, message: "Pour l'empowerment féminin en tech !", date: "15 Jan 2026", initials: "DV", color: "#F472B6" },
  { name: "John Santos N.", amount: 200, message: "Fier de soutenir l'innovation locale 🇷🇼", date: "14 Jan 2026", initials: "JS", color: "#60A5FA" },
  { name: "Sophie Ntumba", amount: 75, message: "Pour un avenir numérique inclusif", date: "13 Jan 2026", initials: "SN", color: "#A78BFA" },
  { name: "Mme Claire Kabila", amount: 250, message: "Éducation numérique pour tous !", date: "12 Jan 2026", initials: "CK", color: "#FBBF24" },
  { name: "Jean-Paul Mukendi", amount: 100, message: "Soutien local et fier", date: "11 Jan 2026", initials: "JM", color: "#6EE7B3" },
  { name: "Startup Hub KIN", amount: 500, message: "Innovation collaborative", date: "10 Jan 2026", initials: "SH", color: "#3B82F6" },
];

const totalAmount = DONORS.reduce((s, d) => s + d.amount, 0);

function DonorCard({ donor, delay }: { donor: typeof DONORS[0]; delay: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(13,16,24,0.75)", backdropFilter: "blur(14px)",
        border: `1px solid ${hovered ? "rgba(110,231,179,0.5)" : "rgba(110,231,179,0.14)"}`,
        borderRadius: "1.8rem", padding: "2rem", textAlign: "center",
        transform: hovered ? "translateY(-10px)" : "translateY(0)",
        boxShadow: hovered ? "0 28px 50px rgba(0,0,0,0.5)" : "none",
        transition: "all 0.4s cubic-bezier(0.2,0.9,0.4,1.1)",
        animation: `fadeUp 0.7s ease-out ${delay} both`,
      }}>
      {/* Avatar */}
      <div style={{
        width: 72, height: 72, borderRadius: "50%", margin: "0 auto 1.2rem",
        background: `linear-gradient(135deg, ${donor.color}33, ${donor.color}11)`,
        border: `3px solid ${donor.color}66`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.5rem", fontWeight: 800, color: donor.color,
        transition: "transform 0.3s",
        transform: hovered ? "scale(1.08)" : "scale(1)",
        boxShadow: hovered ? `0 0 20px ${donor.color}30` : "none",
      }}>
        {donor.initials}
      </div>
      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.4rem", color: "#F0F3FA" }}>{donor.name}</h3>
      <div style={{
        fontSize: "1.8rem", fontWeight: 800, color: "#6EE7B3", marginBottom: "0.3rem",
        background: "linear-gradient(135deg, #6EE7B3, #3B82F6)",
        WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
      }}>${donor.amount}</div>
      <p style={{ fontSize: "0.8rem", color: "#8896B3", marginBottom: "0.8rem" }}>{donor.date}</p>
      <p style={{ fontSize: "0.9rem", color: "#C9D6FF", lineHeight: 1.55, fontStyle: "italic" }}>"{donor.message}"</p>
    </div>
  );
}

export default function Donors() {
  return (
    <>
      <PageLoader />
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(circle at 60% 20%, rgba(110,231,179,0.06), transparent 55%), radial-gradient(circle at 20% 80%, rgba(59,130,246,0.05), transparent 55%)",
      }} />

      <div className="container">
        <Navbar backLink={{ href: "/donate", label: "Faire un don", icon: "fas fa-arrow-left" }} />

        {/* Hero */}
        <section style={{ textAlign: "center", margin: "1rem 0 4rem", animation: "fadeUp 0.7s ease-out both" }}>
          <span className="badge" style={{ marginBottom: "1rem" }}>
            <i className="fas fa-users" /> Nos généreux soutiens
          </span>
          <h1 style={{ fontSize: "clamp(2.4rem, 7vw, 4rem)", fontWeight: 800, margin: "0.8rem 0", lineHeight: 1.2 }}>
            Merci à nos <span className="gradient-text">bienfaiteurs</span>
          </h1>
          <p style={{ color: "#C9D6FF", maxWidth: 580, margin: "0 auto 2rem", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Chaque contribution propulse Quevvy vers un avenir d'invitations numériques sécurisées et accessibles à tous.{" "}
            <span style={{ color: "#6EE7B3", fontWeight: 600 }}>— Coming Soon —</span>
          </p>

          {/* Stats */}
          <div style={{
            display: "inline-flex", gap: "3rem", flexWrap: "wrap", justifyContent: "center",
            background: "rgba(13,16,24,0.7)", backdropFilter: "blur(14px)",
            border: "1px solid rgba(110,231,179,0.18)", borderRadius: "2rem",
            padding: "1.5rem 3rem",
          }}>
            {[
              { n: `${DONORS.length}+`, l: "Soutiens" },
              { n: `$${totalAmount.toLocaleString()}`, l: "Collectés" },
              { n: "24h", l: "Réponse max" },
            ].map(s => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: "2.2rem", fontWeight: 800,
                  background: "linear-gradient(135deg, #6EE7B3, #3B82F6)",
                  WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
                }}>{s.n}</div>
                <div style={{ color: "#8896B3", fontSize: "0.82rem", marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Donors grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.5rem", marginBottom: "4rem",
        }}>
          {DONORS.map((d, i) => (
            <DonorCard key={d.name} donor={d} delay={`${0.05 * i}s`} />
          ))}
        </div>

        {/* CTA */}
        <div style={{
          background: "linear-gradient(135deg, rgba(110,231,179,0.08), rgba(59,130,246,0.08))",
          border: "1px solid rgba(110,231,179,0.2)", borderRadius: "2rem",
          padding: "3rem", textAlign: "center", marginBottom: "4rem",
          animation: "fadeUp 0.8s ease-out 0.3s both",
        }}>
          <i className="fas fa-heart" style={{ fontSize: "2.5rem", color: "#ef4444", display: "block", marginBottom: "1rem" }} />
          <h2 style={{ fontSize: "1.9rem", fontWeight: 800, marginBottom: "1rem" }}>
            Rejoignez nos <span className="gradient-text">soutiens</span>
          </h2>
          <p style={{ color: "#C9D6FF", maxWidth: 520, margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Votre nom pourrait figurer ici. Chaque don compte, aussi petit soit-il. Ensemble, construisons l'avenir numérique de l'Afrique.
          </p>
          <a href="/donate" className="btn-primary" style={{ fontSize: "1.05rem", padding: "1rem 2.5rem" }}>
            <i className="fas fa-heart" /> Faire un don maintenant
          </a>
        </div>

        <Footer />
      </div>
    </>
  );
}