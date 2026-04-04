// src/pages/Donate.tsx
import { useState } from "react";
import { PageLoader, Navbar, Footer, Toast } from "../components/shared.tsx";
import "../styles/globals.css";

const BANK_DETAILS = {
  beneficiary: "GENTIL MALIYAMUNGU BALEGAMIRE",
  numero: "5273 6400 0161 3969",
  bank: "MTM Momo Virtual Card",
};

const MOBILE_DETAILS = [
  { label: "Airtel (DRC)", number: "+243 978 089 552", name: "Gentil Maliyamungu B" },
  { label: "Airtel (Rwanda)", number: "+250 738 663 519", name: "Gentil Maliyamungu B" },
  { label: "MTN Mobile Money (Rwanda)", number: "+250 792 871 952", name: "Gentil Maliyamungu B" },
];

const MOCK_DONORS = [
  { name: "Diane Vanessa M.", amount: 150, message: "Pour l'empowerment féminin en tech !", date: "29 Mars 2026" },
  { name: "John Santos N.", amount: 200, message: "Fier de soutenir l'innovation locale 🇷🇼", date: "01 Avril 2026" },
  { name: "Sophie Ntumba", amount: 75, message: "Pour un avenir numérique inclusif", date: "04 Avril 2026" },
  { name: "Mme Claire Kabila", amount: 250, message: "Éducation numérique pour tous !", date: "12 Mars 2026" },
  { name: "Dr. Christophe Mupenzi", amount: 80, message: "Soutien précieux au lancement", date: "En vedette" },
  { name: "Député Matayo John", amount: 125, message: "Engagé pour l'innovation locale", date: "En vedette" },
];

function CopyBtn({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <button onClick={copy} style={{
      background: "none", border: "none", color: copied ? "#6EE7B3" : "#8896B3",
      cursor: "pointer", fontSize: "0.85rem", padding: "2px 6px", transition: "all 0.2s",
    }}>
      <i className={copied ? "fas fa-check" : "fas fa-copy"} />
    </button>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "0.65rem 0", borderBottom: "1px solid rgba(110,231,179,0.1)",
      flexWrap: "wrap", gap: "0.4rem",
    }}>
      <span style={{ fontWeight: 600, color: "#9effcf", fontSize: "0.87rem" }}>{label}</span>
      <span style={{ color: "#F0F3FA", display: "flex", alignItems: "center", gap: 4, fontSize: "0.9rem" }}>
        {value} <CopyBtn value={value} />
      </span>
    </div>
  );
}

export default function Donate() {
  const [form, setForm] = useState({
    name: "", email: "", amount: "", txId: "", message: "", method: ""
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "info" } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.amount || !form.txId || !form.method) {
      setToast({ msg: "Veuillez remplir tous les champs obligatoires.", type: "error" });
      return;
    }
    if (parseFloat(form.amount) < 1) {
      setToast({ msg: "Le montant minimum est de 1 USD.", type: "error" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const body = encodeURIComponent(
        `CONFIRMATION DE DON QUEVVY\n\nNom: ${form.name}\nEmail: ${form.email || "Non fourni"}\nMontant: $${form.amount}\nMéthode: ${form.method}\nID Transaction: ${form.txId}\nMessage: ${form.message || "Aucun"}\n\n---\nMerci pour votre soutien !`
      );
      window.location.href = `mailto:quevvy.platform@outlook.com?subject=${encodeURIComponent(`[Don Quevvy] ${form.name} — $${form.amount}`)}&body=${body}`;
      setToast({ msg: "Merci ! Votre confirmation de don va être envoyée par email. Vérification sous 24h.", type: "success" });
      setForm({ name: "", email: "", amount: "", txId: "", message: "", method: "" });
    }, 600);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.95rem 1.2rem",
    background: "rgba(16,20,32,0.9)", border: "1.5px solid rgba(110,231,179,0.22)",
    borderRadius: "1.1rem", color: "#F0F3FA", fontSize: "0.95rem",
    fontFamily: "var(--font-body)", outline: "none", transition: "all 0.25s",
  };

  return (
    <>
      <PageLoader />
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(circle at 20% 20%, rgba(110,231,179,0.06), transparent 60%), radial-gradient(circle at 80% 80%, rgba(59,130,246,0.06), transparent 60%)",
      }} />

      <div className="container">
        <Navbar backLink={{ href: "/", label: "Accueil", icon: "fas fa-arrow-left" }} />

        {/* Hero */}
        <section style={{ textAlign: "center", margin: "1rem 0 3.5rem" }}>
          <span className="badge" style={{ marginBottom: "1rem" }}>
            <i className="fas fa-heart" style={{ color: "#ef4444" }} /> Soutenir Quevvy — Coming Soon
          </span>
          <h1 style={{ fontSize: "clamp(2.2rem, 6vw, 3.8rem)", fontWeight: 800, margin: "0.8rem 0", lineHeight: 1.2 }}>
            Soutenez la révolution<br />
            <span className="gradient-text">des invitations numériques</span>
          </h1>
          <p style={{ color: "#C9D6FF", maxWidth: 600, margin: "0 auto", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Quevvy est en phase de développement. Vos dons financent directement la sécurité, l'infrastructure et l'accessibilité de la plateforme.
          </p>
        </section>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "4rem" }}>
          {/* Payment info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Bank */}
            <div style={{
              background: "rgba(13,16,24,0.75)", backdropFilter: "blur(14px)",
              border: "1px solid rgba(110,231,179,0.18)", borderRadius: "2rem", padding: "1.8rem",
            }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: 8 }}>
                <i className="fas fa-university" style={{ color: "#6EE7B3" }} /> Carte Bancaire
              </h2>
              <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "1.2rem", padding: "1.2rem" }}>
                <DetailRow label="Bénéficiaire" value={BANK_DETAILS.beneficiary} />
                <DetailRow label="Numero" value={BANK_DETAILS.numero} />
                <DetailRow label="Banque" value={BANK_DETAILS.bank} />
              </div>
            </div>

            {/* Mobile Money */}
            <div style={{
              background: "rgba(13,16,24,0.75)", backdropFilter: "blur(14px)",
              border: "1px solid rgba(110,231,179,0.18)", borderRadius: "2rem", padding: "1.8rem",
            }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: 8 }}>
                <i className="fas fa-mobile-alt" style={{ color: "#6EE7B3" }} /> Mobile Money
              </h2>
              {MOBILE_DETAILS.map(m => (
                <div key={m.label} style={{ background: "rgba(0,0,0,0.3)", borderRadius: "1.2rem", padding: "1.2rem", marginBottom: "1rem" }}>
                  <p style={{ color: "#6EE7B3", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>{m.label}</p>
                  <DetailRow label="Numéro" value={m.number} />
                  <DetailRow label="Nom" value={m.name} />
                </div>
              ))}
            </div>
          </div>

          {/* Confirmation form */}
          <div style={{
            background: "rgba(13,16,24,0.75)", backdropFilter: "blur(14px)",
            border: "1px solid rgba(110,231,179,0.18)", borderRadius: "2rem", padding: "1.8rem",
          }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.6rem", display: "flex", alignItems: "center", gap: 8 }}>
              <i className="fas fa-check-circle" style={{ color: "#6EE7B3" }} /> Confirmer mon don
            </h2>
            <p style={{ color: "#8896B3", fontSize: "0.88rem", marginBottom: "1.5rem" }}>
              Après votre virement, remplissez ce formulaire. Votre profil sera affiché sur la page des donateurs après vérification.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.83rem", fontWeight: 600, color: "#C9D6FF" }}>
                    Nom complet *
                  </label>
                  <input style={inputStyle} type="text" placeholder="Votre nom" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    onFocus={e => (e.target.style.borderColor = "#6EE7B3")}
                    onBlur={e => (e.target.style.borderColor = "rgba(110,231,179,0.22)")} />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.83rem", fontWeight: 600, color: "#C9D6FF" }}>
                    Email (optionnel)
                  </label>
                  <input style={inputStyle} type="email" placeholder="vous@email.com" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    onFocus={e => (e.target.style.borderColor = "#6EE7B3")}
                    onBlur={e => (e.target.style.borderColor = "rgba(110,231,179,0.22)")} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.83rem", fontWeight: 600, color: "#C9D6FF" }}>
                    Montant (USD) *
                  </label>
                  <input style={inputStyle} type="number" placeholder="ex: 25" min="1" value={form.amount}
                    onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                    onFocus={e => (e.target.style.borderColor = "#6EE7B3")}
                    onBlur={e => (e.target.style.borderColor = "rgba(110,231,179,0.22)")} />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.83rem", fontWeight: 600, color: "#C9D6FF" }}>
                    Méthode *
                  </label>
                  <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} value={form.method}
                    onChange={e => setForm(f => ({ ...f, method: e.target.value }))}>
                    <option value="">Sélectionner</option>
                    <option value="Virement Bancaire">Virement Bancaire</option>
                    <option value="M-Pesa">M-Pesa</option>
                    <option value="MTN Mobile Money">MTN Mobile Money</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.83rem", fontWeight: 600, color: "#C9D6FF" }}>
                  ID Transaction *
                </label>
                <input style={inputStyle} type="text" placeholder="Numéro/référence de transaction" value={form.txId}
                  onChange={e => setForm(f => ({ ...f, txId: e.target.value }))}
                  onFocus={e => (e.target.style.borderColor = "#6EE7B3")}
                  onBlur={e => (e.target.style.borderColor = "rgba(110,231,179,0.22)")} />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.83rem", fontWeight: 600, color: "#C9D6FF" }}>
                  Message (*)
                </label>
                <textarea style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
                  placeholder="Un mot pour la communauté Quevvy..."
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  onFocus={e => (e.target.style.borderColor = "#6EE7B3")}
                  onBlur={e => (e.target.style.borderColor = "rgba(110,231,179,0.22)")} />
              </div>

              <button type="submit" className="btn-primary" disabled={loading}
                style={{ width: "100%", justifyContent: "center", padding: "1.1rem", fontSize: "1rem" }}>
                {loading
                  ? <><i className="fas fa-spinner fa-spin" /> Envoi en cours...</>
                  : <><i className="fas fa-heart" /> Envoyer ma confirmation</>}
              </button>
              <p style={{ color: "#4B5563", fontSize: "0.78rem", textAlign: "center" }}>
                <i className="fas fa-info-circle" style={{ marginRight: 4 }} />
                Votre client email s'ouvrira — envoyez le message à Quevvy. Vérification sous 24h.
              </p>
            </form>
            {/* PayPal hint */}
            <div style={{
              background: "rgba(13,16,24,0.75)", backdropFilter: "blur(14px)",
              border: "1px solid rgba(59,130,246,0.25)", borderRadius: "2rem", padding: "1.5rem",
              textAlign: "center",
            }}>
              <i className="fab fa-paypal" style={{ fontSize: "2rem", color: "#60A5FA", marginBottom: 8, display: "block" }} />
              <p style={{ fontWeight: 700, marginBottom: 4 }}>Pas Moyen de Payer ???</p>
              <p style={{ color: "#8896B3", fontSize: "0.88rem", marginBottom: "0.8rem" }}>
                Contactez-nous: <strong style={{ color: "#F0F3FA" }}>+243 978 089 552</strong>
              </p>
              <CopyBtn value="quevvy.platform@outlook.com" />
            </div>          </div>
        </div>

        {/* Recent donors preview */}
        <section style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.8rem", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800 }}>
              Nos <span className="gradient-text">généreux soutiens</span>
            </h2>
            <a href="/donors" className="btn-secondary">
              <i className="fas fa-users" /> Voir tous →
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.2rem" }}>
            {MOCK_DONORS.slice(0, 3).map((d, i) => (
              <div key={i} style={{
                background: "rgba(13,16,24,0.75)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(110,231,179,0.15)", borderRadius: "1.5rem",
                padding: "1.5rem", textAlign: "center", transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(110,231,179,0.45)"; e.currentTarget.style.transform = "translateY(-6px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(110,231,179,0.15)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%", margin: "0 auto 1rem",
                  background: "linear-gradient(135deg, rgba(110,231,179,0.2), rgba(59,130,246,0.2))",
                  border: "2px solid rgba(110,231,179,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.4rem",
                }}>👤</div>
                <p style={{ fontWeight: 700, marginBottom: "0.3rem" }}>{d.name}</p>
                <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#6EE7B3", marginBottom: "0.3rem" }}>${d.amount}</p>
                <p style={{ color: "#8896B3", fontSize: "0.8rem", marginBottom: "0.6rem" }}>{d.date}</p>
                <p style={{ color: "#C9D6FF", fontSize: "0.85rem", fontStyle: "italic" }}>"{d.message}"</p>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}