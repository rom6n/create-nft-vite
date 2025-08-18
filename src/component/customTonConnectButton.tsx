import { useEffect, useState } from "react";
import { address } from "@ton/core";
import { useTonConnectUI } from "@tonconnect/ui-react";

const CustomTonconnectButton = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tonConnectUI] = useTonConnectUI();
  const [connected, setConnected] = useState(tonConnectUI.connected);

  // Подписываемся на изменения статуса
  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange((status) => {
      setConnected(status?.account.address !== undefined && status?.account.address !== null);
    });
    return () => unsubscribe();
  }, [tonConnectUI]);

  const shortAddress =
    connected && tonConnectUI.account
      ? `${address(tonConnectUI.account.address)
          .toString({ testOnly: false })
          .slice(0, 4)}...${address(tonConnectUI.account.address)
          .toString({ testOnly: false })
          .slice(43)}`
      : "Connect Wallet";

  return (
    <div style={{ 
        position: "absolute", 
        display: "flex",
        top: "10px",
        right: "15px",
        background: "transparent",
    }}>
      {/* Основная кнопка */}
      <button
        className="custom-tonconnect-button"
        onClick={() => {
          if (!connected) {
            tonConnectUI.openModal();
          }
        }}
        style={{
          backgroundColor: "rgba(71, 178, 236, 1)",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          zIndex: 1000,
        }}
      >
        {shortAddress}
      </button>

      {/* Иконка меню показывается только если подключен */}
      {connected && (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            marginLeft: "-30px",
            background: "#2f2e2eff",
            border: "none",
            fontSize: "17px",
            fontWeight: 900,
            borderRadius: "12px",
            cursor: "pointer",
            color: "#f4f4f4ff",
            paddingLeft: "40px",
            paddingBottom:"10px",
            paddingTop:"10px",
            paddingRight: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 102,
          }}
        >
          <b>⋮</b>
        </button>
      )}

      {/* Выпадающее меню */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "50px",
            right: 0,
            background: "#2c2c2cff",
            border: "none",
            borderRadius: "6px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            padding: "5px 0",
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => {
              tonConnectUI.disconnect();
              setMenuOpen(false);
            }}
            style={{
              background: "none",
              border: "none",
              width: "100%",
              padding: "4px 8px",
              textAlign: "left",
              cursor: "pointer",
              color: "#ff4d4f",
            }}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomTonconnectButton;
