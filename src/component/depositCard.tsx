import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import PinPad from "./pinPad";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import LoadingIcon from "./loadingIcon";
import { toNano } from "@ton/ton";
import TonkeeperLogo from "./tonkeeperLogo";

type DepositCardProps = {
  openDeposit: boolean;
  setOpenDeposit: React.Dispatch<React.SetStateAction<boolean>>;
};

const DepositCard = ({ openDeposit, setOpenDeposit }: DepositCardProps) => {
  const [amount, setAmount] = useState<string>("0");
  const lp = useLaunchParams();
  return (
    <AnimatePresence>
      {openDeposit && (
        <>
          {/* затемнение фона */}
          <motion.div
            className="fixed inset-0 bg-black/50"
            onClick={() => setOpenDeposit(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* само окно */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 min-h-5/9 max-h-8/9 bg-[#353535] rounded-t-2xl shadow-lg p-4"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween" }}
          >
            <div className="flex flex-col">
              <button
                className="absolute right-3 top-2 text-2xl cursor-pointer"
                onClick={() => setOpenDeposit(false)}
              >
                ✕
              </button>
              <div className="absolute top-3 left-4">
                <span className="absolute flex content-between gap-1 font-mono top-0 left-1 text-xl cursor-default">
                  DEPOSIT
                </span>
              </div>
              <div className="flex w-full mt-14 items-center justify-center content-between gap-3 text-5xl font-bold bg-transparent h-11">
                <b>{amount}</b>
                <b>TON</b>
              </div>
              <div className="flex items-center justify-center w-full h-full mt-4">
                <PinPad numbers={amount} setNumber={setAmount} />
              </div>
              <a
                className="flex items-center justify-center mt-4 rounded-2xl h-15 border-1 border-white/20 bg-sky-900/50 cursor-pointer"
                href={
                  lp.tgWebAppData?.user?.id && amount !== "0" && amount !== "0."
                    ? `https://app.tonkeeper.com/transfer/0QDU46qYz4rHAJhszrW9w6imF8p4Cw5dS1GpPTcJ9vqNSmnf?amount=${toNano(
                        amount
                      )}&text=${lp.tgWebAppData.user.id}`
                    : ""
                }
                rel="noopener noreferrer"
                target="_blank"
              >
                {lp.tgWebAppData?.user?.id ? (
                  <div className="flex gap-1 items-center justify-center">
                    <div className="w-7 h-7">
                      <TonkeeperLogo />
                    </div>
                    <span className="font-semibold text-md">Tonkeeper</span>
                  </div>
                ) : (
                  <div className="w-10 h-10">
                    <LoadingIcon />
                  </div>
                )}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DepositCard;
