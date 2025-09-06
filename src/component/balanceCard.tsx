import CustomTonconnectButton from "./customTonConnectButton";
import LoadingIcon from "./loadingIcon";
import WDIcon from "./WDIcon";
import { Switch } from "@radix-ui/react-switch";

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
  const checked = true;

  return (
    <div className="relative w-[100%] h-55 lg:w-112.5 lg:h-62 bg-gradient-to-bl from-sky-500 to-sky-700 rounded-[15px]">
      <div className="absolute w-60 right-[-75px] top-[8px]">
        <CustomTonconnectButton />
      </div>
      <div className="absolute top-0.5 w-40 h-5 -left-8 hover:text-sky-900 cursor-default z-1002">
        alpha v1.1
      </div>
      <div className="absolute left-2 top-8 flex items-center space-x-2">
        <Switch
          checked={checked}
          className="peer flex h-5 w-11 shrink-0 cursor-pointer items-center rounded-full border-white/50 border transition-colors data-[state=checked]:bg-black/40 data-[state=unchecked]:bg-black/30"
        >
          <span className={`absolute left-12 bottom-[0.5px] font-semibold`}>
            testnet
          </span>
          <span
            className={`pointer-events-none block h-3 w-3 rounded-full bg-white shadow-lg ring-0 transition-transform ${
              checked ? "translate-x-6.5" : "translate-x-0.5"
            }`}
          />
        </Switch>
      </div>
      <div className="absolute flex gap-2 items-center left-5 bottom-18 text-3xl cursor-default">
        {tonAmount || tonAmount === 0 ? (
          <b>{tonAmount}</b>
        ) : (
          <div className="mt-0.5 w-5.5 h-5.5">
            <LoadingIcon />
          </div>
        )}
        <b>TON</b>
      </div>
      <button
        className="absolute flex w-20 h-13 bg-black/35 hover:bg-black/40 rounded-[10px] bottom-2 left-2 justify-center items-end text-[12px] font-semibold cursor-pointer"
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
        className="absolute flex w-20 h-13 bg-black/35 hover:bg-black/40 rounded-[10px] bottom-2 left-24 justify-center items-end text-[12px] font-semibold cursor-pointer "
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
