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
import CreateNftPage from "./pages/create_nft_page";
import NftCardPage from "./pages/nft_card_page";
import { pingServers } from "./scripts/pingServers";
import CreateCollectionPage from "./pages/create_collection_page";
import CollectionCardPage from "./pages/collection_page";

WebApp.ready();

function App() {
  const [user, setUser] = useState<User | undefined>();
  const [userCollections, setUserCollections] = useState<
    NftCollection[] | undefined
  >();
  const [selectedNft, setSelectedNft] = useState<NftItem>();
  const [selectedCollection, setSelectedCollection] = useState<NftCollection>();
  const [userNftItems, setUserNftItems] = useState<NftItem[] | undefined>();
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      pingServers();
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
          user={user}
        />
      ) : activePage === 2 ? (
        <NftCardPage
          setActivePage={setActivePage}
          nftItem={selectedNft}
          userBalance={user?.nano_ton}
        />
      ) : activePage === 3 ? (
        <CreateCollectionPage setActivePage={setActivePage} user={user} />
      ) : activePage === 4 ? (
        <CollectionCardPage
          NftCollection={selectedCollection}
          userBalance={user?.nano_ton}
          setActivePage={setActivePage}
        />
      ) : (
        <MainPage
          setActivePage={setActivePage}
          userNftItems={userNftItems}
          userCollections={userCollections}
          user={user}
          setSelectedNft={setSelectedNft}
          setSelectedCollection={setSelectedCollection}
        />
      )}
    </>
  );
}

export default App;
