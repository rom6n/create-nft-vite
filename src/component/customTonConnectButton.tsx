import { useEffect, useState } from "react";
import { address } from "@ton/core";
import { useTonConnectUI } from "@tonconnect/ui-react";
import WalletIcon from "../assets/icons/walletIcon";

const CustomTonconnectButton = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tonConnectUI] = useTonConnectUI();
  const [connected, setConnected] = useState(tonConnectUI.connected);
  const [menuOpened, setMenuOpened] = useState(false);

  function wait(millisecond: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, millisecond));
  }

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

  const handleMenuOpened = async (is: boolean) => {
    await wait(1);
    setMenuOpened(is);
  };

  const shortAddress =
    connected && tonConnectUI.account ? (
      `${address(tonConnectUI.account.address)
        .toString({ testOnly: false })
        .slice(0, 4)}...${address(tonConnectUI.account.address)
        .toString({ testOnly: false })
        .slice(43)}`
    ) : (
      <div className="flex gap-1 items-center w-full h-full">
        <div className="ml-3 w-6 h-6">
          <WalletIcon />
        </div>
        <span>Connect</span>
      </div>
    );

  return (
    <div className="absolute w-full h-25">
      {/* Основная кнопка */}
      {connected ? (
        <div>
          <button
            className="absolute bg-sky-500 left-3 text-white w-31 h-9 rounded-xl cursor-pointer font-semibold z-1000 border duration-300 border-white/15 hover:border-white/50"
            onClick={() => {
              if (!connected) {
                tonConnectUI.openModal();
              }
            }}
          >
            {shortAddress}
          </button>
          <button
            onClick={async () => {
              if (menuOpened) {
                await handleMenuOpened(!menuOpened);
                await wait(200);
                setMenuOpen(!menuOpen);
              } else {
                setMenuOpen(!menuOpen);
                await handleMenuOpened(!menuOpened);
              }
            }}
            className="absolute left-33 bg-black/45 hover:bg-black/50 ml-[-30px] text-[17px] text-white rounded-xl cursor-pointer pl-[40px] pb-[5px] pr-[10px] pt-[5px] z-999"
          >
            <b>⋮</b>
          </button>
        </div>
      ) : (
        <button
          className="absolute bg-sky-500 left-8 text-white w-31 h-9 rounded-xl cursor-pointer font-semibold z-1000 border transition-colors duration-300 border-white/15 hover:border-white/50"
          onClick={() => {
            if (!connected) {
              tonConnectUI.openModal();
            }
          }}
        >
          {shortAddress}
        </button>
      )}

      {/* Выпадающее меню */}
      {menuOpen && (
        <div className="absolute top-11 w-full h-10 z-1000">
          <button
            onClick={async () => {
              tonConnectUI.disconnect();
              await handleMenuOpened(!menuOpened);
              wait(200);
              setMenuOpen(false);
            }}
            className={`absolute bg-none w-25 h-9 right-21 items-center border border-white/50 justify-center bg-white/20 rounded-xl shadow-2xl cursor-pointer font-semibold text-white/80 transition-all duration-200 ${
              menuOpened ? "opacity-100" : "opacity-0"
            } hover:bg-white/25`}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomTonconnectButton;
