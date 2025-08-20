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
      setConnected(
        status?.account.address !== undefined &&
          status?.account.address !== null
      );
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
    <div
      style={{
        position: "absolute",
        display: "flex",
        background: "transparent",
      }}
    >
      {/* Основная кнопка */}
      {connected ? (
        <button
          className="bg-sky-500 text-white w-33 h-10 rounded-xl cursor-pointer font-semibold z-1000 border border-black/45 hover:border-black/50"
          onClick={() => {
            if (!connected) {
              tonConnectUI.openModal();
            }
          }}
        >
          {shortAddress}
        </button>
      ) : (
        <button
          className="absolute bg-sky-500 left-6 text-white w-33 h-10 rounded-xl cursor-pointer font-semibold z-1000 border border-black/45 hover:border-black/50"
          onClick={() => {
            if (!connected) {
              tonConnectUI.openModal();
            }
          }}
        >
          {shortAddress}
        </button>
      )}

      {/* Иконка меню показывается только если подключен */}
      {connected && (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-black/45 hover:bg-black/50 ml-[-30px] text-[17px] text-white rounded-xl cursor-pointer pl-[40px] pb-[3px] pr-[10px] pt-[3px] z-999"
        >
          <b>⋮</b>
        </button>
      )}

      {/* Выпадающее меню */}
      {menuOpen && (
        <div className="absolute flex top-13 bg-[#2c2c2cff] hover:bg-[#343434] rounded-[10px] shadow-2xl right-0 w-25 h-10 z-1000">
          <button
            onClick={() => {
              tonConnectUI.disconnect();
              setMenuOpen(false);
            }}
            className="flex bg-none w-[100%] items-center justify-center cursor-pointer text-[#ff4d4f]"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomTonconnectButton;
