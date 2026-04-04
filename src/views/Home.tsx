// src/pages/Home.tsx
import { useState, useEffect, useRef } from "react";
import { PageLoader, Navbar, Footer, Countdown, Toast } from "../components/shared.tsx";
import "../styles/globals.css";

/* ── Animated floating orbs ── */
function Orbs() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
      {[
        { w: 400, h: 400, top: "5%", left: "70%", color: "rgba(110,231,179,0.06)", delay: "0s", dur: "18s" },
        { w: 300, h: 300, top: "55%", left: "5%", color: "rgba(59,130,246,0.07)", delay: "-6s", dur: "22s" },
        { w: 200, h: 200, top: "35%", left: "45%", color: "rgba(110,231,179,0.04)", delay: "-12s", dur: "14s" },
      ].map((o, i) => (
        <div key={i} style={{
          position: "absolute", width: o.w, height: o.h,
          top: o.top, left: o.left,
          background: `radial-gradient(circle, ${o.color}, transparent 70%)`,
          borderRadius: "50%",
          animation: `float ${o.dur} ease-in-out infinite`,
          animationDelay: o.delay,
        }} />
      ))}
    </div>
  );
}

/* ── Feature card ── */
function FeatureCard({ icon, title, desc, delay }: { icon: string; title: string; desc: string; delay: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(13,16,24,0.7)", backdropFilter: "blur(14px)",
        border: `1px solid ${hovered ? "rgba(110,231,179,0.5)" : "rgba(110,231,179,0.14)"}`,
        borderRadius: "1.8rem", padding: "2rem",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered ? "0 24px 48px rgba(0,0,0,0.45)" : "none",
        transition: "all 0.4s cubic-bezier(0.2,0.9,0.4,1.1)",
        animation: `fadeUp 0.8s ease-out ${delay} both`,
      }}>
      <div style={{
        width: 52, height: 52, borderRadius: "1rem", marginBottom: "1.2rem",
        background: "linear-gradient(135deg, rgba(110,231,179,0.15), rgba(59,130,246,0.1))",
        border: "1px solid rgba(110,231,179,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.5rem", color: "#6EE7B3",
        transition: "all 0.3s",
        transform: hovered ? "scale(1.1)" : "scale(1)",
      }}>
        <i className={icon} />
      </div>
      <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.6rem", color: "#F0F3FA" }}>{title}</h3>
      <p style={{ color: "#8896B3", fontSize: "0.9rem", lineHeight: 1.65 }}>{desc}</p>
    </div>
  );
}

/* ── Stat pill ── */
function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ textAlign: "center", padding: "0 1rem" }}>
      <div style={{
        fontSize: "2rem", fontWeight: 800,
        background: "linear-gradient(135deg, #6EE7B3, #3B82F6)",
        WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
      }}>{value}</div>
      <div style={{ color: "#8896B3", fontSize: "0.82rem", marginTop: 2 }}>{label}</div>
    </div>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "info" } | null>(null);
  const launchDate = new Date("2025-09-01T00:00:00");

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setToast({ msg: "Veuillez entrer une adresse email valide.", type: "error" });
      return;
    }
    setLoading(true);
    // Redirect to mailto for contact — no backend
    setTimeout(() => {
      setLoading(false);
      window.location.href = `mailto:quevvy.platform@outlook.com?subject=Waitlist Quevvy&body=Je souhaite être notifié du lancement de Quevvy.%0A%0AEmail: ${encodeURIComponent(email)}`;
      setToast({ msg: "Merci ! Vous allez être notifié au lancement ✨", type: "success" });
      setEmail("");
    }, 600);
  };

  const features = [
    { icon: "fas fa-qrcode", title: "QR Codes Anti-fraude", desc: "Invitations sécurisées avec cryptage AES-256 et validation en temps réel. Zéro fraude, zéro doublon.", delay: "0.1s" },
    { icon: "fas fa-calendar-check", title: "20 Gratuites Toujours", desc: "Créez vos premiers événements sans frais. Tarifs dégressifs ensuite, adaptés à tous les budgets.", delay: "0.2s" },
    { icon: "fas fa-chart-line", title: "Analytics Complets", desc: "Suivez ouvertures, arrivées et taux de participation en temps réel depuis votre tableau de bord.", delay: "0.3s" },
    { icon: "fas fa-globe-africa", title: "Afrique & Monde", desc: "Multilingue, multi-devises, conçu pour l'Afrique et déployé mondiallement. Votre événement, partout.", delay: "0.4s" },
    { icon: "fas fa-ticket-alt", title: "Ticketing Intégré", desc: "Vendez des billets, gérez les capacités, envoyez des rappels automatiques. Tout en un.", delay: "0.5s" },
    { icon: "fas fa-leaf", title: "Éco-Responsable", desc: "Zéro papier, zéro déchet. Chaque invitation numérique est un geste pour la planète.", delay: "0.6s" },
  ];

  return (
    <>
      <PageLoader />
      <Orbs />
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div className="container">
        <Navbar showLinks />

        {/* ── HERO ── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "1.5rem", margin: "1rem 0 5rem", maxWidth: 720 }}>
          <div style={{ animation: "fadeUp 0.6s ease-out both" }}>
            <span className="badge" style={{ marginBottom: "0.5rem" }}>
              <span style={{
                display: "inline-block", width: 8, height: 8, borderRadius: "50%",
                background: "#6EE7B3", marginRight: 4,
                animation: "pulse-glow 2s ease-in-out infinite",
              }} />
              🚀 Coming Soon — Lancement imminent
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(2.6rem, 7vw, 4.8rem)", fontWeight: 800,
            lineHeight: 1.18, letterSpacing: "-0.025em",
            animation: "fadeUp 0.7s ease-out 0.1s both",
          }}>
            L'avenir des<br />
            <span className="gradient-text">invitations</span><br />
            est numérique.
          </h1>

          <p style={{
            fontSize: "1.2rem", color: "#C9D6FF", maxWidth: 560, lineHeight: 1.7,
            animation: "fadeUp 0.7s ease-out 0.2s both",
          }}>
            Quevvy révolutionne la gestion d'événements avec des invitations sécurisées, des QR codes anti-fraude et des analytics en temps réel.{" "}
            <strong style={{ color: "#6EE7B3" }}>Préparez-vous.</strong>
          </p>

          {/* Notify form */}
          <form onSubmit={handleNotify} style={{
            display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.5rem",
            animation: "fadeUp 0.7s ease-out 0.4s both",
          }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="votre@email.com"
              style={{
                flex: "1 1 240px", padding: "0.95rem 1.4rem", borderRadius: 60,
                background: "rgba(16,20,32,0.9)", color: "#F0F3FA",
                border: "1.5px solid rgba(110,231,179,0.35)", fontSize: "0.97rem",
                outline: "none", transition: "all 0.25s",
              }}
              onFocus={e => { e.target.style.borderColor = "#6EE7B3"; e.target.style.boxShadow = "0 0 0 3px rgba(110,231,179,0.18)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(110,231,179,0.35)"; e.target.style.boxShadow = "none"; }}
            />
            <button type="submit" className="btn-primary" disabled={loading} style={{ height: "auto" }}>
              {loading
                ? <><i className="fas fa-spinner fa-spin" /> Envoi...</>
                : <><i className="fas fa-bell" /> Me notifier</>}
            </button>
          </form>

          <p style={{ color: "#8896B3", fontSize: "0.8rem", animation: "fadeUp 0.7s ease-out 0.45s both" }}>
            <i className="fas fa-shield-alt" style={{ color: "#6EE7B3", marginRight: 5 }} />
            Pas de spam. Juste une notification au lancement.
          </p>
        </section>

        {/* ── STATS BAR ── */}
        <div style={{
          display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap",
          background: "rgba(13,16,24,0.65)", backdropFilter: "blur(14px)",
          border: "1px solid rgba(110,231,179,0.12)", borderRadius: "2rem",
          padding: "1.8rem 2.5rem", marginBottom: "5rem",
          animation: "fadeUp 0.8s ease-out 0.5s both",
        }}>
          {[
            { value: "20+", label: "Invitations gratuites" },
            { value: "AES-256", label: "Cryptage bancaire" },
            { value: "∞", label: "Événements gérés" },
            { value: "0", label: "Déchet papier" },
          ].map(s => (
            <StatPill key={s.label} {...s} />
          ))}
        </div>

        {/* ── FEATURES ── */}
        <section style={{ marginBottom: "5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="badge" style={{ marginBottom: "1rem" }}>
              <i className="fas fa-sparkles" /> Fonctionnalités — Coming Soon
            </span>
            <h2 style={{
              fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 800,
              letterSpacing: "-0.02em", lineHeight: 1.2,
            }}>
              Tout ce dont vous avez<br />
              <span className="gradient-text">besoin pour votre événement</span>
            </h2>
            <p style={{ color: "#8896B3", marginTop: "1rem", fontSize: "1rem", maxWidth: 540, margin: "1rem auto 0" }}>
              Une plateforme complète pensée pour l'Afrique et le monde. Bientôt disponible.
            </p>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}>
            {features.map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </section>

        {/* ── SUPPORT STRIP ── */}
        <section style={{
          background: "linear-gradient(135deg, rgba(110,231,179,0.07), rgba(59,130,246,0.07))",
          border: "1px solid rgba(110,231,179,0.2)", borderRadius: "2rem",
          padding: "3rem 2.5rem", marginBottom: "5rem", textAlign: "center",
          animation: "fadeUp 0.8s ease-out 0.2s both",
        }}>
          <span className="badge" style={{ marginBottom: "1.2rem" }}>
            <i className="fas fa-heart" style={{ color: "#ef4444" }} /> Soutenir le projet
          </span>
          <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 800, marginBottom: "1rem" }}>
            Croyez en l'avenir numérique<br />
            <span className="gradient-text">de l'Afrique</span>
          </h2>
          <p style={{ color: "#C9D6FF", maxWidth: 560, margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Quevvy est en phase de lancement. Vos dons nous aident à construire une infrastructure robuste et sécurisée pour des millions d'événements à venir.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/donate" className="btn-primary">
              <i className="fas fa-heart" /> Faire un don
            </a>
            <a href="/donors" className="btn-secondary">
              <i className="fas fa-users" /> Voir les donateurs
            </a>
            <a href="https://partner.quevvy.com" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <i className="fas fa-handshake" /> Devenir partenaire
            </a>
          </div>
        </section>

        {/* ── PRICING TEASER ── */}
        <section style={{ marginBottom: "5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="badge" style={{ marginBottom: "1rem" }}>
              <i className="fas fa-tag" /> Tarifs — Bientôt disponibles
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 800 }}>
              Simple, <span className="gradient-text">transparent</span>, accessible
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: "fas fa-seedling", name: "Starter", price: "Gratuit", desc: "20 invitations/mois, QR codes inclus, analytics de base.", accent: "#6EE7B3" },
              { icon: "fas fa-rocket", name: "Pro", price: "Bientôt", desc: "Invitations illimitées, analytics avancés, support prioritaire.", accent: "#3B82F6", featured: true },
              { icon: "fas fa-building", name: "Enterprise", price: "Sur mesure", desc: "API dédiée, intégrations custom, SLA garanti, account manager.", accent: "#C0F2B6" },
            ].map(p => (
              <div key={p.name} style={{
                background: p.featured ? "linear-gradient(135deg, rgba(110,231,179,0.1), rgba(59,130,246,0.1))" : "rgba(13,16,24,0.7)",
                backdropFilter: "blur(14px)",
                border: `1px solid ${p.featured ? "rgba(110,231,179,0.4)" : "rgba(110,231,179,0.14)"}`,
                borderRadius: "1.8rem", padding: "2rem", textAlign: "center",
                position: "relative",
                boxShadow: p.featured ? "0 0 40px rgba(110,231,179,0.1)" : "none",
              }}>
                {p.featured && (
                  <div style={{
                    position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                    background: "linear-gradient(90deg, #6EE7B3, #3B82F6)",
                    color: "#080A10", fontSize: "0.72rem", fontWeight: 700,
                    padding: "0.3rem 1rem", borderRadius: 20, whiteSpace: "nowrap",
                  }}>⭐ Recommandé</div>
                )}
                <i className={p.icon} style={{ fontSize: "2rem", color: p.accent, marginBottom: "1rem", display: "block" }} />
                <h3 style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.4rem" }}>{p.name}</h3>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: p.accent, marginBottom: "0.8rem" }}>{p.price}</div>
                <p style={{ color: "#8896B3", fontSize: "0.88rem", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTACT FORM ── */}
        <ContactSection />

        <Footer />

        <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.78rem", color: "#4B5563" }}>
          Quevvy <strong>v^1.0.0 LTS</strong> — L'avenir des invitations est numérique &amp; sécurisé<br />
          © 2026 Quevvy by Quevvy Company
        </p>
      </div>
    </>
  );
}

/* ── Contact Section ── */
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setToast({ msg: "Veuillez remplir tous les champs obligatoires.", type: "error" });
      return;
    }
    if (!form.email.includes("@")) {
      setToast({ msg: "Adresse email invalide.", type: "error" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const body = encodeURIComponent(
        `Nom: ${form.name}\nEmail: ${form.email}\nSujet: ${form.subject}\n\nMessage:\n${form.message}`
      );
      window.location.href = `mailto:quevvy.platform@outlook.com?subject=${encodeURIComponent(`[Quevvy] ${form.subject}`)}&body=${body}`;
      setToast({ msg: "Votre client email va s'ouvrir. Envoyez le message pour nous contacter !", type: "success" });
    }, 400);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "1rem 1.3rem",
    background: "rgba(16,20,32,0.9)",
    border: "1.5px solid rgba(110,231,179,0.25)", borderRadius: "1.2rem",
    color: "#F0F3FA", fontSize: "0.97rem", fontFamily: "var(--font-body)",
    outline: "none", transition: "all 0.25s",
  };

  return (
    <section style={{ marginBottom: "5rem" }}>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <span className="badge" style={{ marginBottom: "1rem" }}>
          <i className="fas fa-envelope" /> Contact
        </span>
        <h2 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 800 }}>
          Parlons de votre <span className="gradient-text">projet</span>
        </h2>
        <p style={{ color: "#8896B3", marginTop: "0.8rem" }}>Réponse sous 24h · WhatsApp disponible 24/7</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
        {/* Info */}
        <div style={{
          background: "rgba(13,16,24,0.7)", backdropFilter: "blur(14px)",
          border: "1px solid rgba(110,231,179,0.14)", borderRadius: "2rem", padding: "2rem",
        }}>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1.5rem", color: "#6EE7B3" }}>
            <i className="fas fa-info-circle" style={{ marginRight: 8 }} />Informations
          </h3>
          {[
            { icon: "fas fa-envelope", label: "Email", value: "quevvy.platform@outlook.com", href: "mailto:quevvy.platform@outlook.com" },
            { icon: "fab fa-whatsapp", label: "WhatsApp DRC", value: "+243 978 089 552", href: "https://wa.me/243978089552" },
            { icon: "fab fa-whatsapp", label: "WhatsApp RWA", value: "+250 792 871 952", href: "https://wa.me/250792871952" },
          ].map(c => (
            <a key={c.label} href={c.href} style={{ display: "flex", gap: 12, marginBottom: "1.2rem", textDecoration: "none" }}>
              <div style={{
                width: 38, height: 38, borderRadius: "0.8rem", flexShrink: 0,
                background: "rgba(110,231,179,0.1)", border: "1px solid rgba(110,231,179,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#6EE7B3",
              }}>
                <i className={c.icon} />
              </div>
              <div>
                <p style={{ fontSize: "0.75rem", color: "#8896B3", marginBottom: 1 }}>{c.label}</p>
                <p style={{ color: "#F0F3FA", fontSize: "0.92rem" }}>{c.value}</p>
              </div>
            </a>
          ))}
          <div style={{
            marginTop: "1.5rem", padding: "1.2rem", borderRadius: "1.2rem",
            background: "rgba(110,231,179,0.06)", border: "1px solid rgba(110,231,179,0.15)",
          }}>
            <p style={{ color: "#C9D6FF", fontSize: "0.88rem", lineHeight: 1.6 }}>
              <i className="fas fa-user-tie" style={{ color: "#6EE7B3", marginRight: 6 }} />
              Fondateur: <strong style={{ color: "#F0F3FA" }}>Gentil Le NoiR Maliyamungu B</strong>
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          background: "rgba(13,16,24,0.7)", backdropFilter: "blur(14px)",
          border: "1px solid rgba(110,231,179,0.14)", borderRadius: "2rem", padding: "2rem",
          display: "flex", flexDirection: "column", gap: "1rem",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", fontWeight: 600, color: "#C9D6FF" }}>
                <i className="fas fa-user" style={{ color: "#6EE7B3", marginRight: 5 }} />Nom *
              </label>
              <input style={inputStyle} type="text" placeholder="Votre nom" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                onFocus={e => { e.target.style.borderColor = "#6EE7B3"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(110,231,179,0.25)"; }} />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", fontWeight: 600, color: "#C9D6FF" }}>
                <i className="fas fa-envelope" style={{ color: "#6EE7B3", marginRight: 5 }} />Email *
              </label>
              <input style={inputStyle} type="email" placeholder="vous@email.com" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                onFocus={e => { e.target.style.borderColor = "#6EE7B3"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(110,231,179,0.25)"; }} />
            </div>
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", fontWeight: 600, color: "#C9D6FF" }}>
              <i className="fas fa-tag" style={{ color: "#6EE7B3", marginRight: 5 }} />Sujet *
            </label>
            <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} value={form.subject}
              onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}>
              <option value="">Choisissez un sujet</option>
              <option value="Partenariat / Collaboration">Partenariat / Collaboration</option>
              <option value="Don / Soutien">Don / Soutien</option>
              <option value="Demande de fonctionnalité">Demande de fonctionnalité</option>
              <option value="Support technique">Support technique</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", fontWeight: 600, color: "#C9D6FF" }}>
              <i className="fas fa-comment" style={{ color: "#6EE7B3", marginRight: 5 }} />Message *
            </label>
            <textarea style={{ ...inputStyle, minHeight: 130, resize: "vertical" }} placeholder="Dites-nous en plus sur votre projet..."
              value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              onFocus={e => { e.target.style.borderColor = "#6EE7B3"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(110,231,179,0.25)"; }} />
          </div>
          <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%", justifyContent: "center", padding: "1.1rem 2rem" }}>
            {loading
              ? <><i className="fas fa-spinner fa-spin" /> Ouverture email...</>
              : <><i className="fas fa-paper-plane" /> Envoyer le message</>}
          </button>
          <p style={{ color: "#4B5563", fontSize: "0.78rem", textAlign: "center" }}>
            <i className="fas fa-info-circle" style={{ marginRight: 5 }} />
            Votre client email s'ouvrira pour envoyer le message à Quevvy.
          </p>
        </form>
      </div>
    </section>
  );
}