import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import PinPad from "./pinPad";

type DepositCardProps = {
  openDeposit: boolean;
  setOpenDeposit: React.Dispatch<React.SetStateAction<boolean>>;
};

const DepositCard = ({ openDeposit, setOpenDeposit }: DepositCardProps) => {
  const [amount, setAmount] = useState<string>("");
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
            className="fixed bottom-0 left-0 right-0 h-5/7 bg-[#353535] rounded-t-2xl shadow-lg p-4"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center">
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
              <div className="absolute flex content-between gap-3 right-[65%] translate-x-[50%] top-17 text-5xl font-bold bg-transparent w-35 h-11">
                <span>{amount === "" ? "0" : amount}</span>
                <span className="font-bold">TON</span>
              </div>
              <div className="absolute top-35 right-[60%] translate-x-[50%]">
                <PinPad numbers={amount} setNumber={setAmount} />
              </div>
              <button className="absolute top-124 left-3 rounded-2xl w-[25%] h-16 border border-white/50 font-semibold text-md bg-sky-500/80 cursor-pointer hover:bg-sky-500">
                Tonkeeper
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DepositCard;
