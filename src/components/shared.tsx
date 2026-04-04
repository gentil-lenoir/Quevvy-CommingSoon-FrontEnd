// src/components/shared.tsx
import { useEffect, useState, useRef } from "react";

/* ─── Page Loader ─── */
export function PageLoader() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 700);
    return () => clearTimeout(t);
  }, []);
  if (!visible) return null;
  return (
    <div id="page-loader">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <div className="loader-ring" />
        <p style={{ fontSize: 13, fontWeight: 500, color: "#8896B3", letterSpacing: "1.5px", animation: "fadePulse 1.5s ease-in-out infinite" }}>
          QUEVVY
        </p>
      </div>
    </div>
  );
}

/* ─── Language Selector (GTranslate) ─── */
export function LanguageSelector() {
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    // Inject Google Translate script
    if (!(window as any).googleTranslateElementInit) {
      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: "fr", includedLanguages: "fr,en", autoDisplay: false },
          "google_translate_element"
        );
      };
      const s = document.createElement("script");
      s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.head.appendChild(s);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (combo) { combo.value = lang; combo.dispatchEvent(new Event("change")); }
  };

  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }} />
      <div style={{ position: "relative", display: "inline-block" }}>
        <select onChange={handleChange} style={{
          background: "rgba(16,20,32,0.85)",
          color: "#F0F3FA",
          border: "1px solid rgba(110,231,179,0.45)",
          padding: "6px 32px 6px 12px",
          borderRadius: 50,
          fontFamily: "var(--font-body)",
          fontSize: "0.83rem",
          fontWeight: 600,
          cursor: "pointer",
          outline: "none",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s",
          appearance: "none",
          WebkitAppearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236EE7B3'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 9px center",
          backgroundSize: 13,
        }}>
          <option value="fr">🇫🇷 Français</option>
          <option value="en">🇺🇸 English</option>
        </select>
      </div>
    </>
  );
}

/* ─── Navbar ─── */
interface NavbarProps {
  backLink?: { href: string; label: string; icon: string };
  showLinks?: boolean;
}
export function Navbar({ backLink, showLinks = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "1rem",
      marginBottom: "2.5rem",
      padding: scrolled ? "0.7rem 1.5rem" : "0",
      background: scrolled ? "rgba(8,10,16,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderRadius: scrolled ? "2rem" : 0,
      border: scrolled ? "1px solid rgba(110,231,179,0.12)" : "none",
      position: scrolled ? "sticky" : "relative",
      top: scrolled ? 12 : "auto",
      zIndex: 100,
      transition: "all 0.4s ease",
    }}>
      {/* Logo */}
      <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: "linear-gradient(135deg, #6EE7B3, #3B82F6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: "float 3s ease-in-out infinite",
          boxShadow: "0 4px 14px rgba(110,231,179,0.3)",
        }}>
          <i className="fas fa-envelope-open-text" style={{ color: "#080A10", fontSize: "1rem" }} />
        </div>
        <span style={{
          fontSize: "1.5rem", fontWeight: 800,
          background: "linear-gradient(135deg, #C0F2B6, #6EE7B3)",
          WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
          letterSpacing: "-0.02em",
        }}>Quevvy</span>
      </a>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        {showLinks && (
          <>
            <a href="/donate" style={{ color: "#C9D6FF", textDecoration: "none", fontWeight: 500, fontSize: "0.92rem", transition: "color 0.2s" }}
               onMouseEnter={e => (e.currentTarget.style.color = "#6EE7B3")}
               onMouseLeave={e => (e.currentTarget.style.color = "#C9D6FF")}>
              <i className="fas fa-heart" style={{ marginRight: 5, color: "#6EE7B3" }} />Soutenir
            </a>
            <a href="https://partner.quevvy.com" target="_blank" rel="noopener noreferrer"
               style={{ color: "#C9D6FF", textDecoration: "none", fontWeight: 500, fontSize: "0.92rem", transition: "color 0.2s" }}
               onMouseEnter={e => (e.currentTarget.style.color = "#6EE7B3")}
               onMouseLeave={e => (e.currentTarget.style.color = "#C9D6FF")}>
              <i className="fas fa-handshake" style={{ marginRight: 5, color: "#6EE7B3" }} />Partenaires
            </a>
          </>
        )}
        {backLink && (
          <a href={backLink.href} style={{ color: "#B9C8FF", textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: 6, transition: "color 0.2s" }}
             onMouseEnter={e => (e.currentTarget.style.color = "#6EE7B3")}
             onMouseLeave={e => (e.currentTarget.style.color = "#B9C8FF")}>
            <i className={backLink.icon} />{backLink.label}
          </a>
        )}
        <LanguageSelector />
      </div>
    </nav>
  );
}

/* ─── Footer ─── */
export function Footer() {
  return (
    <footer style={{
      background: "rgba(13,16,24,0.8)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(110,231,179,0.2)",
      borderRadius: "2rem",
      padding: "2.5rem",
      marginTop: "5rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "2rem",
    }}>
      {/* Brand */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #6EE7B3, #3B82F6)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <i className="fas fa-envelope-open-text" style={{ color: "#080A10", fontSize: "0.85rem" }} />
          </div>
          <span style={{ fontWeight: 800, fontSize: "1.2rem", background: "linear-gradient(135deg, #C0F2B6, #6EE7B3)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Quevvy</span>
        </div>
        <p style={{ color: "#8896B3", fontSize: "0.88rem", lineHeight: 1.7 }}>
          L'avenir des invitations numériques sécurisées. <br />
          <span style={{ color: "rgba(110,231,179,0.7)", fontSize: "0.8rem" }}>— Coming Soon —</span>
        </p>
        <div style={{ display: "flex", gap: "0.8rem", marginTop: "1.2rem" }}>
          {[
            { href: "https://quevvy.com", icon: "fas fa-globe" },
            { href: "https://linkedin.com/company/azenium", icon: "fab fa-linkedin-in" },
            { href: "https://x.com/quevvyplatform", icon: "fab fa-twitter" },
            { href: "https://chat.whatsapp.com/E9On6Tbcv260KVYFD5hqjK", icon: "fab fa-whatsapp" },
            { href: "https://www.pinterest.com/quevvy_platform", icon: "fab fa-pinterest" },
          ].map(s => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "rgba(110,231,179,0.08)", border: "1px solid rgba(110,231,179,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#6EE7B3", fontSize: "0.85rem", transition: "all 0.25s",
              textDecoration: "none",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(110,231,179,0.18)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(110,231,179,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <i className={s.icon} />
            </a>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div>
        <p style={{ fontWeight: 700, color: "#6EE7B3", marginBottom: "1rem", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>Navigation</p>
        {[
          { href: "/", label: "Accueil" },
          { href: "/donate", label: "Faire un don" },
          { href: "/donors", label: "Nos donateurs" },
          { href: "https://partner.quevvy.com", label: "Partenaires", external: true },
        ].map(l => (
          <a key={l.href} href={l.href} target={l.external ? "_blank" : undefined} rel={l.external ? "noopener noreferrer" : undefined}
            style={{ display: "block", color: "#8896B3", textDecoration: "none", marginBottom: "0.6rem", fontSize: "0.9rem", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#6EE7B3")}
            onMouseLeave={e => (e.currentTarget.style.color = "#8896B3")}>
            {l.label} {l.external && <i className="fas fa-arrow-up-right-from-square" style={{ fontSize: "0.7rem" }} />}
          </a>
        ))}
      </div>

      {/* Contact */}
      <div>
        <p style={{ fontWeight: 700, color: "#6EE7B3", marginBottom: "1rem", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>Contact</p>
        {[
          { icon: "fas fa-envelope", text: "quevvy.platform@outlook.com", href: "mailto:quevvy.platform@outlook.com" },
          { icon: "fab fa-whatsapp", text: "+243 978 089 552", href: "https://wa.me/243978089552" },
          { icon: "fab fa-whatsapp", text: "+250 792 871 952", href: "https://wa.me/250792871952" },
        ].map((c, i) => (
          <a key={i} href={c.href} style={{ display: "flex", alignItems: "center", gap: 8, color: "#8896B3", textDecoration: "none", marginBottom: "0.6rem", fontSize: "0.88rem", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#6EE7B3")}
            onMouseLeave={e => (e.currentTarget.style.color = "#8896B3")}>
            <i className={c.icon} style={{ color: "#6EE7B3", width: 16 }} />{c.text}
          </a>
        ))}
        <p style={{ color: "#8896B3", fontSize: "0.82rem", marginTop: "0.8rem" }}>
          <i className="fas fa-user-tie" style={{ color: "#6EE7B3", marginRight: 6 }} />
          Fondateur: Gentil Le NoiR Maliyamungu B
        </p>
      </div>
    </footer>
  );
}

/* ─── Toast ─── */
interface ToastProps { message: string; type: "success" | "error" | "info"; onClose: () => void; }
export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);
  const colors = { success: "#6EE7B3", error: "#ef4444", info: "#3B82F6" };
  const icons = { success: "fas fa-check-circle", error: "fas fa-exclamation-circle", info: "fas fa-info-circle" };
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 9999,
      background: "rgba(13,16,24,0.96)", border: `1px solid ${colors[type]}40`,
      borderRadius: "1rem", padding: "1rem 1.4rem",
      display: "flex", alignItems: "center", gap: 12,
      boxShadow: `0 8px 32px rgba(0,0,0,0.5)`,
      animation: "fadeUp 0.35s ease-out",
      maxWidth: 380,
    }}>
      <i className={icons[type]} style={{ color: colors[type], fontSize: "1.2rem" }} />
      <p style={{ color: "#F0F3FA", fontSize: "0.92rem", flex: 1 }}>{message}</p>
      <button onClick={onClose} style={{ background: "none", border: "none", color: "#8896B3", cursor: "pointer", fontSize: "1rem" }}>
        <i className="fas fa-times" />
      </button>
    </div>
  );
}

/* ─── Countdown ─── */
export function Countdown({ targetDate }: { targetDate: Date }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return;
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const items = [
    { n: time.days, l: "Jours" },
    { n: time.hours, l: "Heures" },
    { n: time.minutes, l: "Minutes" },
    { n: time.seconds, l: "Sec" },
  ];

  return (
    <div style={{
      display: "inline-flex", gap: "1.2rem", flexWrap: "wrap", justifyContent: "center",
      background: "rgba(0,0,0,0.45)", backdropFilter: "blur(14px)",
      padding: "0.8rem 1.8rem", borderRadius: "80px",
      border: "1px solid rgba(110,231,179,0.4)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
      animation: "pulse-glow 3s ease-in-out infinite",
    }}>
      {items.map(({ n, l }) => (
        <div key={l} style={{ textAlign: "center", minWidth: 58 }}>
          <div style={{
            fontSize: "2rem", fontWeight: 800, lineHeight: 1,
            background: "linear-gradient(135deg, #fff, #9effcf)",
            WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
            letterSpacing: "2px",
          }}>{String(n).padStart(2, "0")}</div>
          <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "1.5px", color: "#8896B3", marginTop: 2 }}>{l}</div>
        </div>
      ))}
    </div>
  );
}