import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import PinPad from "./pinPad";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import LoadingIcon from "../assets/icons/loadingIcon";
import { toNano } from "@ton/ton";
import TonkeeperLogo from "../assets/icons/tonkeeperLogo";
import TonLogo from "../assets/icons/tonLogoIcon";

type DepositCardProps = {
  openDeposit: boolean;
  setOpenDeposit: React.Dispatch<React.SetStateAction<boolean>>;
  isReady: boolean;
};

const DepositCard = ({
  openDeposit,
  setOpenDeposit,
  isReady,
}: DepositCardProps) => {
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
            className="fixed bottom-0 scroll- left-0 right-0 min-h-5/9 max-h-9/9 bg-[#353535] rounded-t-2xl shadow-lg p-4"
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
              <div className="flex w-full mt-14 pr-10 items-center justify-center content-between gap-0 font-bold bg-transparent h-11">
                <div className="w-16 h-16">
                  <TonLogo />
                </div>
                <span className="font-medium mt-1 text-[42px]">{amount}</span>
              </div>
              <div className="flex items-center justify-center w-full h-full mt-4">
                <PinPad numbers={amount} setNumber={setAmount} />
              </div>
              {lp.tgWebAppData?.user?.id && isReady ? (
                <a
                  className="flex items-center justify-center mt-4 rounded-2xl h-15 border-1 border-white/20 bg-sky-900/50 cursor-pointer"
                  href={`https://app.tonkeeper.com/transfer/0QDU46qYz4rHAJhszrW9w6imF8p4Cw5dS1GpPTcJ9vqNSmnf?amount=${toNano(
                    amount
                  )}&text=${lp.tgWebAppData.user.id}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {lp.tgWebAppData?.user?.id && isReady ? (
                    <div className="flex gap-1.5 items-center justify-center">
                      <div className="w-6 h-6">
                        <TonkeeperLogo />
                      </div>
                      <span className="font-semibold text-xl">Tonkeeper</span>
                    </div>
                  ) : (
                    <div className="w-10 h-10">
                      <LoadingIcon />
                    </div>
                  )}
                </a>
              ) : (
                <div className="flex items-center justify-center mt-4 rounded-2xl h-15 border-1 border-white/20 bg-sky-900/50 cursor-pointer">
                  <div className="w-9 h-9">
                    <LoadingIcon />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DepositCard;
