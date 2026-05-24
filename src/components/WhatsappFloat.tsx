import { WHATSAPP_URL } from "@/App";

const WhatsappFloat = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 9999,
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
        textDecoration: "none",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 28px rgba(37,211,102,0.6)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(37,211,102,0.45)";
      }}
      aria-label="Falar no WhatsApp"
    >
      {/* Ping animado */}
      <span style={{
        position: "absolute",
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        background: "rgba(37,211,102,0.4)",
        animation: "wpp-ping 2s ease-out infinite",
      }}/>

      {/* Ícone WhatsApp SVG oficial inline */}
      <svg viewBox="0 0 48 48" width="30" height="30" xmlns="http://www.w3.org/2000/svg" style={{ position: "relative", zIndex: 1 }}>
        <path fill="white" d="M24 4C12.95 4 4 12.95 4 24c0 3.55.92 6.89 2.54 9.78L4 44l10.5-2.5A19.87 19.87 0 0024 44c11.05 0 20-8.95 20-20S35.05 4 24 4zm0 36c-3.07 0-5.97-.8-8.48-2.2l-.6-.36-6.23 1.48 1.52-6.06-.4-.63A15.93 15.93 0 018 24c0-8.82 7.18-16 16-16s16 7.18 16 16-7.18 16-16 16zm8.73-11.97c-.48-.24-2.83-1.4-3.27-1.56-.44-.16-.76-.24-1.08.24-.32.48-1.24 1.56-1.52 1.88-.28.32-.56.36-1.04.12-.48-.24-2.03-.75-3.87-2.39-1.43-1.28-2.4-2.85-2.68-3.33-.28-.48-.03-.74.21-.98.22-.22.48-.56.72-.84.24-.28.32-.48.48-.8.16-.32.08-.6-.04-.84-.12-.24-1.08-2.6-1.48-3.56-.38-.92-.78-.8-1.08-.82-.28-.02-.6-.02-.92-.02s-.84.12-1.28.6c-.44.48-1.68 1.64-1.68 4s1.72 4.64 1.96 4.96c.24.32 3.38 5.16 8.2 7.24 1.14.5 2.04.8 2.73 1.02 1.15.36 2.2.31 3.02.19.92-.14 2.83-1.16 3.23-2.28.4-1.12.4-2.08.28-2.28-.12-.2-.44-.32-.92-.56z"/>
      </svg>

      <style>{`
        @keyframes wpp-ping {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </a>
  );
};

export default WhatsappFloat;
