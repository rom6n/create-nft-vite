import { useEffect, useState } from "react";
import CustomTonconnectButton from "../component/customTonConnectButton";
import { type User, useUserInfo } from "../hooks/useUserInfo";
import { fromNano } from "@ton/ton";
import WebApp from "@twa-dev/sdk";

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
      <div 
      className="balance-card"
      style={{
        position: "absolute",
        display: "flex",
        width: "630px",
        height: "200px",
        top: "60px",
        left: "50%",           // сдвигаем в центр экрана
        transform: "translateX(-50%)", // корректируем так, чтобы центр совпал
        background: "#44b4f0ff",
        borderRadius: "15px",
        boxShadow: "0 0 10px #000000ff",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        zIndex: 100,
      }}
      >
        <div className='div.custom-tonconnect-button'>{CustomTonconnectButton()}</div>
        <div className="ton-balance"
          style={{
            position: "absolute",
            left: "20px",
            bottom: "6px",
            fontSize: "40px",
            cursor: "default"
          }}
        ><b>{tonAmount} TON</b></div>
        <button 
          onClick={() => {
            WebApp.showAlert("Deposit")
          }}
          className="deposit-button"
          style={{
            position:"absolute",
            width: "140px",
            height: "44px",
            background: "#5ebef3ff",
            borderRadius: "12px",
            right: "166px",
            bottom: "13px",
            cursor: "pointer",
            fontSize: "20px",
            boxShadow: "0 0 10px rgba(50, 50, 50, 0.12)",
          }}
        ><b>Deposit</b></button>
        <button 
          className="withdraw-button"
          onClick={() => {
            WebApp.showAlert("Withdraw")
          }}
          style={{
            position:"absolute",
            width: "140px",
            height: "44px",
            background: "#5ebef3ff",
            borderRadius: "12px",
            right: "15px",
            bottom: "13px",
            cursor: "pointer",
            fontSize: "20px",
            boxShadow: "0 0 10px rgba(50, 50, 50, 0.12)",
          }}
        ><b>Withdraw</b></button>
      </div>
    </div>
  );
}

export default MainPage;