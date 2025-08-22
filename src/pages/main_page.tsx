import { useEffect, useState } from "react";
import BalanceCard from "../component/balanceCard";
import Feed from "../component/feed";
import {
  type NftCollection,
  type User,
  fetchUserCollections,
  fetchUserInfo,
} from "../scripts/fetchUserData";
import { fromNano } from "@ton/ton";
import WebApp from "@twa-dev/sdk";
import "../styles/main_page.style.css";
import CreateNftPage from "./create_nft";
import DepositCard from "../component/depositCard";
import WithdrawCard from "../component/withdrawCard";
import ConnectIrysPage from "./connect_irys";

function MainPage() {
  const [user, setUser] = useState<User | undefined>();
  const [userCollections, setUserCollections] = useState<
    NftCollection[] | undefined
  >();
  const [activePage, setActivePage] = useState(0);
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

  useEffect(() => {
    const fetchUser = async () => {
      // Если WebApp.initDataUnsafe.user уже есть, используем его
      if (WebApp.initDataUnsafe.user?.id) {
        const userID = WebApp.initDataUnsafe.user.id;
        const fetchedUser = await fetchUserInfo(userID);
        const fetchedUserCollections = await fetchUserCollections(userID);
        setUser(fetchedUser);
        setUserCollections(fetchedUserCollections);
      } else {
        console.log("user is not found");
        return;
      }
    };

    fetchUser();
  }, [WebApp.initDataUnsafe.user]);

  const tonAmount =
    user?.nano_ton !== undefined ? fromNano(user.nano_ton) : "--";
  return (
    <div>
      <div className="absolute overflow-x-hidden flex right-[50%] translate-x-[50%] top-5 w-[93%] justify-center">
        <BalanceCard
          tonAmount={tonAmount}
          setOpenDeposit={setOpenDeposit}
          setOpenWithdraw={setOpenWithdraw}
          setDevPageClicks={setDevPageClicks}
          devPageClicks={devPageClicks}
        />
      </div>
      <div className="absolute flex w-[93%] top-65 right-[50%] translate-x-[50%]">
        <Feed setActivePage={setActivePage} />
      </div>
      <div className="absolute flex space-x-2 bottom-3 right-[50%] translate-x-[50%]">
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
      {activePage === 1 && (
        <CreateNftPage
          setActivePage={setActivePage}
          userNftCollections={userCollections}
          userBalance={user?.nano_ton}
        />
      )}
      <DepositCard openDeposit={openDeposit} setOpenDeposit={setOpenDeposit} />
      <WithdrawCard
        openWithdraw={openWithdraw}
        setOpenWithdraw={setOpenWithdraw}
      />
      <div
        className={`absolute left-0 top-0 w-full h-full bg-black transition-opacity duration-600 ease-in-out z-[3000] 
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
