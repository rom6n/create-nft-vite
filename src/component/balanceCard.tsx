import CustomTonconnectButton from "./customTonConnectButton";
import WDIcon from "./WDIcon";

type balanceCardProps = {
  tonAmount: string;
  setOpenDeposit: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenWithdraw: React.Dispatch<React.SetStateAction<boolean>>;
};

const BalanceCard = ({
  tonAmount,
  setOpenDeposit,
  setOpenWithdraw,
}: balanceCardProps) => {
  return (
    <div className="relative w-[100%] h-55 lg:w-112.5 lg:h-62 bg-gradient-to-bl from-sky-500 to-sky-600 rounded-[15px]">
      <div className="absolute w-60 right-[-75px] top-[8px]">
        <CustomTonconnectButton />
      </div>
      <div className="absolute top-0.5 left-2 hover:text-sky-900 cursor-default z-1002">
        alpha v1.01
      </div>
      <div className="absolute left-5 bottom-18 text-3xl cursor-default">
        <b>{tonAmount} TON</b>
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
