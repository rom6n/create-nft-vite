import { useEffect, useState } from "react";
import BalanceCard from "../component/balanceCard";
import Feed from "../component/feed";
import { type User, fetchUserInfo } from "../scripts/fetchUserInfo";
import { fromNano } from "@ton/ton";
import WebApp from "@twa-dev/sdk";
import "../styles/main_page.style.css";
import CreateNftPage from "./create_nft";
import DepositCard from "../component/depositCard";
import WithdrawCard from "../component/withdrawCard";

function MainPage() {
  const [user, setUser] = useState<User | undefined>();
  const [activePage, setActivePage] = useState(0);
  const [openDeposit, setOpenDeposit] = useState<boolean>(false);
  const [openWithdraw, setOpenWithdraw] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      // Если WebApp.initDataUnsafe.user уже есть, используем его
      if (WebApp.initDataUnsafe.user?.id) {
        const userID = WebApp.initDataUnsafe.user.id;
        const fetchedUser = await fetchUserInfo(userID);
        setUser(fetchedUser);
      } else {
        console.log("user is not found");
        return;
      }
    };

    fetchUser();
  }, [WebApp.initDataUnsafe.user]);

  const tonAmount = user?.nanoTon !== undefined ? fromNano(user.nanoTon) : "--";
  return (
    <div>
      <div className="absolute overflow-x-hidden flex right-[50%] translate-x-[50%] top-5 w-[93%] justify-center">
        <BalanceCard
          tonAmount={tonAmount}
          setOpenDeposit={setOpenDeposit}
          setOpenWithdraw={setOpenWithdraw}
        />
      </div>
      <div className="absolute flex w-[93%] top-65 right-[50%] translate-x-[50%]">
        <Feed setActivePage={setActivePage} />
      </div>
      <div className="absolute flex space-x-2 top-190 right-[50%] translate-x-[50%]">
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
      {activePage === 1 && <CreateNftPage setActivePage={setActivePage} />}
      <DepositCard openDeposit={openDeposit} setOpenDeposit={setOpenDeposit} />
      <WithdrawCard
        openWithdraw={openWithdraw}
        setOpenWithdraw={setOpenWithdraw}
      />
    </div>
  );
}

export default MainPage;
