import CustomTonconnectButton from "./customTonConnectButton";
import LoadingIcon from "../assets/icons/loadingIcon";
import WDIcon from "../assets/icons/WDIcon";
import TonLogo from "../assets/icons/tonLogoIcon";
import { useEffect, useState } from "react";

type balanceCardProps = {
  tonAmount: string | 0 | undefined;
  setOpenDeposit: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenWithdraw: React.Dispatch<React.SetStateAction<boolean>>;
};

const BalanceCard = ({
  tonAmount,
  setOpenDeposit,
  setOpenWithdraw,
}: balanceCardProps) => {
  const [gradientPos, setGradientPos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPos((prev) => (prev === 2 ? 0 : prev + 1));
    }, 2500);

    return () => clearInterval(interval); // очистка при размонтировании
  }, []);

  return (
    <div
      className={`relative w-[100%] h-53 lg:w-112.5 lg:h-62 transition-colors duration-5000 bg-gradient-to-bl ${
        gradientPos === 1
          ? "from-sky-600 via-sky-500 to-indigo-400"
          : gradientPos === 2
          ? "from-indigo-400 via-sky-600 to-sky-500"
          : "from-sky-500 via-indigo-400 to-sky-600"
      } rounded-[15px] overflow-hidden`}
    >
      <div className="absolute w-60 right-[-75px] top-[8px]">
        <CustomTonconnectButton />
      </div>
      <div className="absolute flex top-0.5 w-full h-5 left-2 text-[10px] hover:text-sky-900 cursor-default z-1">
        beta v1.0 testnet
      </div>
      <div className="absolute flex items-center left-2 bottom-16 cursor-default">
        <div className="w-12 h-12 mb-1">
          <TonLogo />
        </div>
        {tonAmount || tonAmount === 0 ? (
          <span className="font-medium mt-0.5 text-[30px]">{tonAmount}</span>
        ) : (
          <div className="mt-0.5 w-5.5 h-5.5">
            <LoadingIcon />
          </div>
        )}
      </div>
      <button
        className="absolute flex w-20 h-13 transition-all duration-200 active:scale-95 bg-black/35 hover:bg-black/38 rounded-[10px] bottom-2 left-2 justify-center items-end text-[12px] font-semibold cursor-pointer"
        onClick={() => {
          setOpenDeposit(true);
        }}
      >
        <div className="absolute flex bottom-5 left-7 fill-white rotate-180 z-1002">
          <WDIcon />
        </div>
        Deposit
      </button>
      <button
        className="absolute flex w-20 h-13 transition-all duration-200 active:scale-95 bg-black/35 hover:bg-black/38 rounded-[10px] bottom-2 left-24 justify-center items-end text-[12px] font-semibold cursor-pointer "
        onClick={() => {
          setOpenWithdraw(true);
        }}
      >
        <div className="absolute flex bottom-5 left-7 fill-white z-1002">
          <WDIcon />
        </div>
        Withdraw
      </button>
    </div>
  );
};

export default BalanceCard;
