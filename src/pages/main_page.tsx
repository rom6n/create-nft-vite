import { useEffect, useState } from "react";
import CustomTonconnectButton from "../component/customTonConnectButton";
import { type User, useUserInfo } from "../hooks/useUserInfo";
import { fromNano } from "@ton/ton";
import WebApp from "@twa-dev/sdk";
import "../styles/main_page.style.css"

function MainPage() {
  const [user, setUser] = useState<User | undefined>()
  useEffect(() => {
    (async () => {
    if (WebApp.initDataUnsafe.user) {
      const userID = WebApp.initDataUnsafe.user.id;
      setUser(await useUserInfo(userID));
    }
  })();
  }, [WebApp.initDataUnsafe.user]);

  const tonAmount = user?.nanoTon ? fromNano(user.nanoTon) : "--";
  return (
    <div>
      <div className="balance-card">
        {CustomTonconnectButton()}
        <div className='ton-balance'><b>{tonAmount} TON</b></div>
        <button className='deposit-button' onClick={() => {console.log("Deposit")}}>Deposit</button>
        <button className='withdraw-button' onClick={() => {console.log("Withdraw")}}>Withdraw</button>
      </div>
    </div>
  );
}

export default MainPage;