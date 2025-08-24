import { useEffect, useState } from "react";
import BalanceCard from "../component/balanceCard";
import Feed from "../component/feed";
import { type NftItem, type User } from "../scripts/fetchUserData";
import { fromNano } from "@ton/ton";
import "../styles/main_page.style.css";
import DepositCard from "../component/depositCard";
import WithdrawCard from "../component/withdrawCard";
import ConnectIrysPage from "./connect_irys";

type MainPageProps = {
  user: User | undefined;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  userNftItems: NftItem[] | undefined;
};

function MainPage({ user, setActivePage, userNftItems }: MainPageProps) {
  const [openDeposit, setOpenDeposit] = useState<boolean>(false);
  const [openWithdraw, setOpenWithdraw] = useState<boolean>(false);
  const [isTransition, setIsTransition] = useState(false);
  const [isTransitionEnded, setIsTransitionEnded] = useState(false);
  const [devPageClicks, setDevPageClicks] = useState(0);

  function wait(millisecond: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, millisecond));
  }

  useEffect(() => {
    (async () => {
      await wait(50);
      setIsTransition(true);
      return;
    })();
    // запускаем анимацию сразу после монтирования
  }, []);

  const tonAmount =
    user?.nano_ton !== undefined ? fromNano(user.nano_ton) : "--";
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="relative flex overflow-x-hidden right-[50%] translate-x-[57.5%] mt-3 w-[93%] justify-center">
        <BalanceCard
          tonAmount={tonAmount}
          setOpenDeposit={setOpenDeposit}
          setOpenWithdraw={setOpenWithdraw}
          setDevPageClicks={setDevPageClicks}
          devPageClicks={devPageClicks}
        />
      </div>
      <div className="relative flex w-[93%] mt-4 right-[50%] translate-x-[57.5%]">
        <Feed setActivePage={setActivePage} userNftItems={userNftItems} />
      </div>
      <div className="relative overflow-x-hidden space-x-2 mt-3 pb-3 right-[50%] translate-x-[50%]">
        <p>
          See on{" "}
          <a
            href="https://github.com/rom6n/create-nft-vite"
            className="cursor-pointer text-sky-500 font-semibold hover:w-15 hover:h-3 hover:bg-sky-600 hover:rounded-xs hover:text-white active:border-none"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </div>
      <DepositCard openDeposit={openDeposit} setOpenDeposit={setOpenDeposit} />
      <WithdrawCard
        openWithdraw={openWithdraw}
        setOpenWithdraw={setOpenWithdraw}
      />
      <div
        className={`absolute left-0 top-0 w-full h-full bg-black transition-opacity duration-400 ease-in-out z-[3000] 
          ${isTransition ? "opacity-0" : "opacity-100"} 
          ${isTransitionEnded ? "hidden" : ""}`}
        onTransitionEnd={() => setIsTransitionEnded(true)}
      />
      {devPageClicks === 4 && (
        <ConnectIrysPage setDevPageClicks={setDevPageClicks} />
      )}
    </div>
  );
}

export default MainPage;
