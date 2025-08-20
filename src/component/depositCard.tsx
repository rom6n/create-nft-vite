import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type DepositCardProps = {
  openDeposit: boolean;
  setOpenDeposit: React.Dispatch<React.SetStateAction<boolean>>;
};

const DepositCard = ({ openDeposit, setOpenDeposit }: DepositCardProps) => {
  const [amount, setAmount] = useState<string>("0");

  const setAmountFunc = (amount: string) => {
    const amountNumber = Number(amount);
    console.log(amountNumber);
    if (Number.isNaN(amountNumber)) {
      setAmount("Error");
    } else if (amountNumber > 99999999) {
      setAmount("99999999");
    } else {
      setAmount(amount);
    }
  };
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
            className="fixed bottom-0 left-0 right-0 h-3/13 bg-[#353535] rounded-t-2xl shadow-lg p-4"
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
                <span className="absolute flex content-between gap-1 font-serif left-1 text-3xl cursor-default">
                  Amount
                </span>
                <div className="absolute left-[-10px] top-9 text-5xl font-bold bg-transparent w-35 h-11">
                  <label className="w-[100%] h-[100%] flex content-between gap-3 cursor-text">
                    <input
                      type="text"
                      className=" w-0 h-0 opacity-0"
                      onChange={(a) => {
                        setAmountFunc(a.target.value);
                      }}
                    />
                    <span>{amount === "" ? "0" : amount}</span>
                    <span className="font-bold">TON</span>
                  </label>
                </div>
              </div>
              <button className="absolute bottom-2 rounded-2xl w-[25%] h-15 border border-white/50 font-semibold text-md bg-sky-600 cursor-pointer hover:bg-sky-500">
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
