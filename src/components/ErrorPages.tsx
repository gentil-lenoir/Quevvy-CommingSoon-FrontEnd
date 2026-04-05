// src/pages/NotFound.tsx
import { PageLoader, Navbar } from "./shared.js";
import "../styles/globals.css";

export function NotFound() {
  return (
    <>
      <PageLoader />
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(circle at 30% 40%, rgba(110,231,179,0.06), rgba(59,130,246,0.04), transparent 65%)",
        animation: "slowRotate 40s infinite linear",
      }} />

      <div className="container">
        <Navbar showLinks />

        {/* Hero */}
        <section style={{ textAlign: "center", margin: "3rem 0 4rem", animation: "fadeUp 0.7s ease-out both" }}>
          <span className="badge" style={{ marginBottom: "1.2rem" }}>
            <i className="fas fa-search" /> 404
          </span>
          <div style={{
            fontSize: "clamp(6rem, 20vw, 12rem)", fontWeight: 800, lineHeight: 1,
            background: "linear-gradient(135deg, rgba(110,231,179,0.15), rgba(59,130,246,0.1))",
            WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
            marginBottom: "0.5rem",
          }}>404</div>
          <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 800, margin: "0 0 1rem" }}>
            Oups ! <span className="gradient-text">Page non trouvée</span>
          </h1>
          <p style={{ color: "#C9D6FF", maxWidth: 560, margin: "0 auto 2.5rem", fontSize: "1.05rem", lineHeight: 1.7 }}>
            La page que vous cherchez n'existe pas (encore). Peut-être une erreur de frappe ou une ancienne URL ?
          </p>

          {/* Search box */}
          <div style={{ maxWidth: 460, margin: "0 auto 2.5rem" }}>
            <input
              type="search"
              placeholder="Rechercher sur Quevvy..."
              style={{
                width: "100%", padding: "1.1rem 1.6rem", borderRadius: 60,
                background: "rgba(16,20,32,0.9)", color: "#F0F3FA",
                border: "1.5px solid rgba(110,231,179,0.3)", fontSize: "1rem",
                fontFamily: "var(--font-body)", outline: "none", textAlign: "center",
                transition: "all 0.25s",
              }}
              onFocus={e => { e.target.style.borderColor = "#6EE7B3"; e.target.style.boxShadow = "0 0 0 3px rgba(110,231,179,0.18)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(110,231,179,0.3)"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/" className="btn-primary"><i className="fas fa-home" /> Accueil</a>
            <a href="/donate" className="btn-secondary"><i className="fas fa-heart" /> Soutenir Quevvy</a>
            <a href="https://partner.quevvy.com" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <i className="fas fa-handshake" /> Partenariats
            </a>
          </div>
        </section>

        {/* Features reminder */}
        <div style={{
          background: "rgba(13,16,24,0.7)", backdropFilter: "blur(14px)",
          border: "1px solid rgba(110,231,179,0.14)", borderRadius: "2rem",
          padding: "2.5rem", marginBottom: "4rem",
          animation: "fadeUp 0.8s ease-out 0.2s both",
        }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "1.8rem", textAlign: "center" }}>
            <i className="fas fa-magic" style={{ marginRight: 8, color: "#6EE7B3" }} />
            Explorez Quevvy entretemps
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: "fas fa-qrcode", title: "Invitations Sécurisées", desc: "QR Codes anti-fraude, cryptage AES-256, validation temps réel." },
              { icon: "fas fa-calendar-check", title: "20 Gratuites Toujours", desc: "Créez vos premiers événements sans frais, puis tarifs dégressifs." },
              { icon: "fas fa-chart-line", title: "Analytics Complets", desc: "Suivez ouvertures, arrivées, taux de participation en temps réel." },
            ].map(f => (
              <div key={f.title} style={{
                background: "rgba(8,10,16,0.5)", border: "1px solid rgba(110,231,179,0.12)",
                borderRadius: "1.5rem", padding: "1.5rem", textAlign: "center",
                transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(110,231,179,0.4)"; e.currentTarget.style.transform = "translateY(-5px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(110,231,179,0.12)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <i className={f.icon} style={{ fontSize: "2.2rem", color: "#6EE7B3", marginBottom: "1rem", display: "block" }} />
                <h3 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>{f.title}</h3>
                <p style={{ color: "#8896B3", fontSize: "0.88rem" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div style={{
          background: "rgba(13,16,24,0.75)", backdropFilter: "blur(20px)",
          border: "1px solid rgba(110,231,179,0.2)", borderRadius: "2rem",
          padding: "2rem", marginBottom: "4rem", textAlign: "center",
        }}>
          <p style={{ color: "#C9D6FF" }}>
            <i className="fas fa-life-ring" style={{ color: "#6EE7B3", marginRight: 8 }} />
            Besoin d'aide ? <strong>+243 978 089 552</strong> (WhatsApp 24/7)
          </p>
          <p style={{ color: "#4B5563", marginTop: "0.8rem", fontSize: "0.85rem" }}>
            © 2026 Quevvy — L'avenir des invitations est numérique
          </p>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────── */

// src/pages/ServerError.tsx
export function ServerError() {
  return (
    <>
      <PageLoader />
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(circle at 30% 40%, rgba(239,68,68,0.05), rgba(59,130,246,0.04), transparent 65%)",
      }} />

      <div className="container">
        <Navbar showLinks />

        <section style={{ textAlign: "center", margin: "3rem 0 4rem", animation: "fadeUp 0.7s ease-out both" }}>
          <span className="badge" style={{ marginBottom: "1.2rem", background: "rgba(239,68,68,0.12)", borderColor: "rgba(239,68,68,0.3)", color: "#fca5a5" }}>
            <i className="fas fa-bolt" /> 500
          </span>
          <div style={{
            fontSize: "clamp(6rem, 20vw, 12rem)", fontWeight: 800, lineHeight: 1,
            background: "linear-gradient(135deg, rgba(239,68,68,0.18), rgba(59,130,246,0.1))",
            WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
            marginBottom: "0.5rem",
          }}>500</div>
          <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 800, margin: "0 0 1rem" }}>
            Oups ! <span className="gradient-text">Erreur Serveur</span>
          </h1>
          <p style={{ color: "#C9D6FF", maxWidth: 560, margin: "0 auto 2.5rem", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Quelque chose s'est mal passé de notre côté. Nos systèmes sont sécurisés et nos ingénieurs sont déjà sur le problème.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => window.location.reload()}>
              <i className="fas fa-sync-alt" /> Réessayer
            </button>
            <a href="/" className="btn-primary"><i className="fas fa-home" /> Accueil</a>
            <a href={`mailto:quevvy.platform@outlook.com?subject=Erreur 500 — ${window.location.href}`} className="btn-secondary">
              <i className="fas fa-envelope" /> Signaler
            </a>
            <a href="/donate" className="btn-secondary"><i className="fas fa-heart" /> Soutenir Quevvy</a>
          </div>
        </section>

        <div style={{
          background: "rgba(13,16,24,0.75)", backdropFilter: "blur(20px)",
          border: "1px solid rgba(110,231,179,0.2)", borderRadius: "2rem",
          padding: "2rem", textAlign: "center",
        }}>
          <p style={{ color: "#C9D6FF" }}>
            <i className="fas fa-life-ring" style={{ color: "#6EE7B3", marginRight: 8 }} />
            Urgent ? <strong>+243 978 089 552</strong> (WhatsApp) ou{" "}
            <a href="mailto:quevvy.platform@outlook.com" style={{ color: "#6EE7B3" }}>quevvy.platform@outlook.com</a>
          </p>
          <p style={{ color: "#4B5563", marginTop: "0.8rem", fontSize: "0.85rem" }}>
            © 2026 Quevvy — L'avenir des invitations est numérique et sécurisé
          </p>
        </div>
      </div>
    </>
  );
}