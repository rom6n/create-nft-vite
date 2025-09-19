import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import PinPad from "./pinPad";
import { useLaunchParams, useRawInitData } from "@telegram-apps/sdk-react";
import { toNano } from "@ton/ton";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { withdrawUserTon } from "../scripts/withdrawUserTon";
import LoadingIcon from "../assets/icons/loadingIcon";
import TonLogo from "../assets/icons/tonLogoIcon";
import ErrorIcon from "../assets/icons/errorIcon";

type WithdrawCardProps = {
  openWithdraw: boolean;
  setOpenWithdraw: React.Dispatch<React.SetStateAction<boolean>>;
  userBalance: number | undefined;
};

const WithdrawCard = ({
  openWithdraw,
  setOpenWithdraw,
  userBalance,
}: WithdrawCardProps) => {
  const [amount, setAmount] = useState<string>("0");
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [isSuccess, setIsSuccess] = useState(0);
  const [error, setError] = useState("");
  const lp = useLaunchParams();
  const [tonConnectUI] = useTonConnectUI();
  const initData = useRawInitData();

  return (
    <AnimatePresence>
      {openWithdraw && (
        <>
          {/* затемнение фона */}
          <motion.div
            className="fixed inset-0 bg-black/50"
            onClick={() => setOpenWithdraw(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* само окно */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 min-h-5/9 max-h-9/9 bg-white/5 backdrop-blur-md rounded-t-2xl shadow-lg p-4"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween" }}
          >
            <div className="flex flex-col items-center">
              <button
                className="absolute right-3 top-2 text-2xl cursor-pointer"
                onClick={() => setOpenWithdraw(false)}
              >
                ✕
              </button>
              <div className="absolute top-3 left-4">
                <span className="absolute flex content-between gap-1 font-semibold font-clash top-0 left-1 text-xl cursor-default">
                  WITHDRAW
                </span>
              </div>
              <div className="flex w-full mt-14 pr-10 items-center justify-center content-between bg-transparent h-11">
                <div className="w-15 h-15">
                  <TonLogo />
                </div>
                <span className="font-geist font-semibold mt-2 text-[42px]">
                  {amount}
                </span>
              </div>
              <div className="flex items-center justify-center w-full h-full mt-4">
                <PinPad numbers={amount} setNumber={setAmount} />
              </div>
              <button
                className={`flex mt-4 rounded-2xl items-center justify-center w-[100%] h-15 border-1 transition-colors duration-200 border-white/50 font-semibold text-2xl ${
                  isSuccess === 1
                    ? "bg-green-600/90"
                    : !tonConnectUI.account?.address ||
                      !(userBalance && userBalance >= toNano(Number(amount)))
                    ? "bg-sky-600/60"
                    : lp.tgWebAppData?.user?.id && isSuccess == 0
                    ? "bg-sky-600"
                    : "bg-red-600/70"
                } cursor-pointer hover:to-sky-500`}
                onClick={async () => {
                  if (
                    Number(amount) > 0 &&
                    tonConnectUI.account?.address &&
                    lp.tgWebAppData?.user?.id &&
                    userBalance &&
                    userBalance > toNano(Number(amount)) &&
                    initData
                  ) {
                    setIsWithdraw(true);
                    const result = await withdrawUserTon(
                      tonConnectUI.account.address,
                      true,
                      toNano(Number(amount)),
                      lp.tgWebAppData.user.id,
                      initData
                    );
                    setIsWithdraw(false);
                    if (result !== "OK") {
                      setIsSuccess(2);
                      setError(result);
                      return;
                    }
                    setIsSuccess(1);
                  }
                }}
              >
                {isWithdraw ? (
                  <div className="w-9 h-9">
                    <LoadingIcon />
                  </div>
                ) : isSuccess === 1 ? (
                  <span>Success</span>
                ) : isSuccess === 2 ? (
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <div>
                      <span className="text-2xl font-semibold">Failed</span>
                    </div>
                    <span className="text-[10px] font-semibold">{error}</span>
                  </div>
                ) : tonConnectUI.account?.address === undefined ? (
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="w-9 h-9">
                      <ErrorIcon />
                    </div>
                    <span className="text-[10px]">Wallet is not connected</span>
                  </div>
                ) : lp.tgWebAppData?.user?.id &&
                  userBalance &&
                  userBalance >= toNano(Number(amount)) ? (
                  <div className="flex items-center justify-center">
                    <span className="font-clash font-semibold">Withdraw</span>
                    <div className="w-7 h-7 mb-0.5 ml-2">
                      <TonLogo />
                    </div>
                    <span className="font-geist mt-0.5 text-lg">{amount}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="w-9 h-9">
                      <ErrorIcon />
                    </div>
                    <span className="text-[10px]">Not enough TON</span>
                  </div>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WithdrawCard;
