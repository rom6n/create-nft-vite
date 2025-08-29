import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import PinPad from "./pinPad";

type WithdrawCardProps = {
  openWithdraw: boolean;
  setOpenWithdraw: React.Dispatch<React.SetStateAction<boolean>>;
};

const WithdrawCard = ({ openWithdraw, setOpenWithdraw }: WithdrawCardProps) => {
  const [amount, setAmount] = useState<string>("0");
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
            className="fixed bottom-0 left-0 right-0 min-h-5/9 max-h-8/9 bg-[#353535] rounded-t-2xl shadow-lg p-4"
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
                <span className="absolute flex content-between gap-1 font-mono top-0 left-1 text-xl cursor-default">
                  Withdraw
                </span>
              </div>
              <div className="flex w-full mt-14 items-center justify-center content-between gap-3 text-5xl font-bold bg-transparent h-11">
                <b>{amount}</b>
                <b>TON</b>
              </div>
              <div className="flex items-center justify-center w-full h-full mt-4">
                <PinPad numbers={amount} setNumber={setAmount} />
              </div>
              <button className="mt-4 rounded-2xl w-[100%] h-15 border-3 border-white/50 font-semibold text-2xl bg-gradient-to-r from-sky-400/80 to-sky-700/80 cursor-pointer hover:to-sky-500/80">
                Withdraw
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WithdrawCard;
