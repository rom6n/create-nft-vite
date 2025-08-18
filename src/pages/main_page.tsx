import { useEffect, useState } from "react";
import CustomTonconnectButton from "../component/customTonConnectButton";
import { type User, fetchUserInfo } from "../scripts/fetchUserInfo";
import { fromNano } from "@ton/ton";
import WebApp from "@twa-dev/sdk";
import "../styles/main_page.style.css"

function MainPage() {
  const [user, setUser] = useState<User | undefined>();

useEffect(() => {
  const fetchUser = async () => {
    // Если WebApp.initDataUnsafe.user уже есть, используем его
    if (WebApp.initDataUnsafe.user?.id) {
      const userID = WebApp.initDataUnsafe.user.id;
      const fetchedUser = await fetchUserInfo(userID);
      setUser(fetchedUser);
    } else {
      console.log("user is not found")
      return
    }
  };

  fetchUser();
}, [WebApp.initDataUnsafe.user]);

  const tonAmount = user?.nanoTon !== undefined ? fromNano(user.nanoTon) : "--";
  return (
    <div>
      <div className="balance-card">
        {CustomTonconnectButton()}
        <div className="version">v1.0</div>
        <div className='ton-balance'><b>{tonAmount} TON</b></div>
        <button className='deposit-button' onClick={() => {console.log("Deposit")}}>Deposit</button>
        <button className='withdraw-button' onClick={() => {console.log("Withdraw")}}>Withdraw</button>
      </div>
      <div className="feed-background">
          <button className="select-nfts">🖼️ NFTs 🖼️</button>
          <button className="select-nft-collections">🔢 Collections 🔢</button>
          <div className="nt" />
      </div>
    </div>
  );
}

export default MainPage;