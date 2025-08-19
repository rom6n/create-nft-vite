import { useEffect, useState } from "react";
import CustomTonconnectButton from "../component/customTonConnectButton";
import BalanceCard from "../component/balanceCard";
import { type User, fetchUserInfo } from "../scripts/fetchUserInfo";
import { fromNano } from "@ton/ton";
import WebApp from "@twa-dev/sdk";
import "../styles/main_page.style.css";

function MainPage() {
  const [user, setUser] = useState<User | undefined>();
  const [activeNav, setActiveNav] = useState(1);

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
      <div className="absolute right-[50%] translate-x-[50%] top-5">
        <div className="absolute w-60 right-[-75px] top-[8px]">
          <CustomTonconnectButton />
        </div>
        <BalanceCard tonAmount={tonAmount} />
      </div>
      <div className="feed-background">
        <button
          className={`select-nfts ${activeNav === 1 ? "active" : ""}`}
          onClick={() => {
            setActiveNav(1);
          }}
        >
          NFTs
        </button>
        {activeNav === 1 && (
          <button className="absolute cursor-pointer top-20 left-4">
            <div className="flex bg-white/15 w-40 h-40 justify-center items-center rounded-xl text-white text-[25px] border-[2px] border-white hover:text-white hover:bg-white/20 font-semibold">
              +NFT
              <p className="absolute text-[10px] text-white/30 top-25 w-27">Create your own unique NFT</p>
            </div>
          </button>
        )}
        <button
          className={`select-nft-collections ${
            activeNav === 2 ? "active" : ""
          }`}
          onClick={() => {
            setActiveNav(2);
          }}
        >
          Collections
        </button>
        {activeNav === 2 && (
          <button className="absolute cursor-pointer top-20 left-4">
            <div className="flex bg-white/15 w-40 h-40 justify-center items-center rounded-xl text-white text-[25px] border-[2px] border-white hover:text-white hover:bg-white/20 font-semibold">
              +Collection
              <p className="absolute text-[10px] text-white/30 top-25 w-23">Create your own NFT collection</p>
            </div>
          </button>
        )}
        <div className="nt" />
        <div className={`selected ${activeNav === 1 ? "nft" : "collection"}`} />
      </div>
    </div>
  );
}

export default MainPage;
