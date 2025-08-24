import { useEffect, useState } from "react";
import "./App.css";
import MainPage from "./pages/main_page";
import {
  fetchUserCollections,
  fetchUserInfo,
  fetchUserNftItems,
  type NftCollection,
  type NftItem,
  type User,
} from "./scripts/fetchUserData";
import WebApp from "@twa-dev/sdk";
import CreateNftPage from "./pages/create_nft";

function App() {
  const [user, setUser] = useState<User | undefined>();
  const [userCollections, setUserCollections] = useState<
    NftCollection[] | undefined
  >();
  const [userNftItems, setUserNftItems] = useState<NftItem[] | undefined>();
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      // Если WebApp.initDataUnsafe.user уже есть, используем его
      if (WebApp.initDataUnsafe.user?.id) {
        const userID = WebApp.initDataUnsafe.user.id;
        const fetchedUser = await fetchUserInfo(userID);
        const fetchedUserCollections = await fetchUserCollections(userID);
        const fetchedUserNftItems = await fetchUserNftItems(userID);
        setUser(fetchedUser);
        setUserCollections(fetchedUserCollections);
        setUserNftItems(fetchedUserNftItems);
      } else {
        const userID = 5003727541;
        const fetchedUser = await fetchUserInfo(userID);
        const fetchedUserCollections = await fetchUserCollections(userID);
        const fetchedUserNftItems = await fetchUserNftItems(userID);
        setUser(fetchedUser);
        setUserCollections(fetchedUserCollections);
        setUserNftItems(fetchedUserNftItems);
        console.log("user is not found");
        return;
      }
    };

    fetchUser();
  }, [WebApp.initDataUnsafe.user]);

  return (
    <>
      {activePage === 1 ? (
        <CreateNftPage
          setActivePage={setActivePage}
          userNftCollections={userCollections}
          userBalance={user?.nano_ton}
        />
      ) : (
        <MainPage setActivePage={setActivePage} userNftItems={userNftItems} user={user} />
      )}
    </>
  );
}

export default App;
