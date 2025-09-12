import { useEffect, useState } from "react";
import BalanceCard from "../component/balanceCard";
import Feed from "../component/feed";
import {
  type NftCollection,
  type NftItem,
  type User,
} from "../scripts/fetchUserData";
import { fromNano } from "@ton/ton";
import "../styles/main_page.style.css";
import DepositCard from "../component/depositCard";
import WithdrawCard from "../component/withdrawCard";
import { postEvent } from "@telegram-apps/sdk-react";

type MainPageProps = {
  user: User | undefined;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  userNftItems: NftItem[] | undefined;
  userCollections: NftCollection[] | undefined;
  setSelectedNft: React.Dispatch<React.SetStateAction<NftItem | undefined>>;
  setSelectedCollection: React.Dispatch<
    React.SetStateAction<NftCollection | undefined>
  >;
};

function MainPage({
  user,
  setActivePage,
  userNftItems,
  setSelectedNft,
  userCollections,
  setSelectedCollection,
}: MainPageProps) {
  const [openDeposit, setOpenDeposit] = useState<boolean>(false);
  const [openWithdraw, setOpenWithdraw] = useState<boolean>(false);
  const [isTransition, setIsTransition] = useState(false);
  const [isTransitionEnded, setIsTransitionEnded] = useState(false);

  postEvent("web_app_set_header_color", { color: "#000000" });

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

  const tonAmount = user?.nano_ton && fromNano(user.nano_ton);
  return (
    <div className="absolute top-0 left-0 w-full h-full max-w-150 min-h-100">
      <div className="relative flex overflow-x-hidden right-[50%] translate-x-[57.5%] mt-3 w-[93%] justify-center">
        <BalanceCard
          tonAmount={tonAmount}
          setOpenDeposit={setOpenDeposit}
          setOpenWithdraw={setOpenWithdraw}
        />
      </div>
      <div className="relative flex w-[93%] mt-4 right-[50%] translate-x-[57.5%]">
        <Feed
          setActivePage={setActivePage}
          userNftItems={userNftItems}
          userNftCollections={userCollections}
          setSelectedNft={setSelectedNft}
          setSelectedCollection={setSelectedCollection}
        />
      </div>
      <div className="relative overflow-x-hidden space-x-2 mt-2 pb-2 right-[50%] translate-x-[50%]">
        <p>
          See on{" "}
          <a
            href="https://github.com/rom6n/create-nft-vite"
            className="cursor-pointer text-sky-500 font-semibold hover:w-15 hover:h-3 hover:bg-sky-600 hover:rounded-xs hover:text-white active:border-none"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </p>
      </div>
      <DepositCard
        openDeposit={openDeposit}
        setOpenDeposit={setOpenDeposit}
        isReady={user ? true : false}
      />
      <WithdrawCard
        openWithdraw={openWithdraw}
        setOpenWithdraw={setOpenWithdraw}
        userBalance={user?.nano_ton}
      />
      <div
        className={`absolute left-0 top-0 bottom-0 right-0 w-full h-full bg-black transition-opacity duration-400 ease-in-out z-[3000] 
          ${isTransition ? "opacity-0" : "opacity-100"} 
          ${isTransitionEnded ? "hidden" : ""}`}
        onTransitionEnd={() => setIsTransitionEnded(true)}
      />
    </div>
  );
}

export default MainPage;
