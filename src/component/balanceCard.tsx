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
    <div className="relative flex flex-col gap-1.5 w-[100%] h-53 lg:w-112.5 lg:h-62 bg-sky-900 rounded-[15px] -z-1">
      <div
        className={`relative w-[98.5%] h-52 lg:w-111 lg:h-61 transition-colors duration-5000 bg-gradient-to-bl ${
          gradientPos === 1
            ? "from-sky-600 via-sky-400 to-blue-500"
            : gradientPos === 2
            ? "from-blue-500 via-sky-600 to-sky-400"
            : "from-sky-400 via-blue-500 to-sky-600"
        } rounded-[15px]`}
      >
        <div className="absolute w-60 right-[-75px] top-[8px]">
          <CustomTonconnectButton />
        </div>
        <div className="absolute flex top-0.5 w-full h-5 left-2 font-satoshi text-[10px] hover:text-sky-900 cursor-default z-1">
          beta v1.03 testnet
        </div>
        <div className="absolute flex items-center left-2 bottom-16 cursor-default">
          <div className="w-12 h-12 mb-1">
            <TonLogo />
          </div>
          {tonAmount || tonAmount === 0 ? (
            <span className="font-geist font-semibold mt-0.5 text-[30px]">
              {tonAmount}
            </span>
          ) : (
            <div className="mt-0.5 w-5.5 h-5.5">
              <LoadingIcon />
            </div>
          )}
        </div>
        <button
          className="absolute flex w-24 h-13 transition-all duration-200 active:scale-95 bg-white/10 border border-white/15 hover:border-white/50 rounded-[10px] bottom-2 left-2 justify-center items-end text-[12px] font-semibold font-geist cursor-pointer"
          onClick={() => {
            setOpenDeposit(true);
          }}
        >
          <div className="absolute flex bottom-5 left-9 fill-white rotate-180 z-1002">
            <WDIcon />
          </div>
          Deposit
        </button>
        <button
          className="absolute flex w-24 h-13 transition-all duration-200 active:scale-95 bg-white/10 border border-white/15 hover:border-white/50 rounded-[10px] bottom-2 left-27.5 justify-center font-geist font-semibold items-end text-[12px] cursor-pointer "
          onClick={() => {
            setOpenWithdraw(true);
          }}
        >
          <div className="absolute font-semibold font-geist flex bottom-5 left-9 fill-white z-1002">
            <WDIcon />
          </div>
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default BalanceCard;
