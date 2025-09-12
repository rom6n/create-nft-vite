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
import CreateNftPage from "./pages/create_nft_page";
import NftCardPage from "./pages/nft_card_page";
import { pingServers } from "./scripts/pingServers";
import CreateCollectionPage from "./pages/create_collection_page";
import CollectionCardPage from "./pages/collection_page";
import { init, backButton, useLaunchParams } from "@telegram-apps/sdk-react";

init();
backButton.mount();

function App() {
  const [user, setUser] = useState<User | undefined>();
  const [userCollections, setUserCollections] = useState<
    NftCollection[] | undefined
  >();
  const [selectedNft, setSelectedNft] = useState<NftItem>();
  const [selectedCollection, setSelectedCollection] = useState<NftCollection>();
  const [userNftItems, setUserNftItems] = useState<NftItem[] | undefined>();
  const [activePage, setActivePage] = useState(0);
  const lp = useLaunchParams();

  useEffect(() => {
    const fetchUser = async () => {
      pingServers();
      if (lp.tgWebAppData?.user?.id) {
        const userID = lp.tgWebAppData?.user?.id;
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
  }, [lp.tgWebAppData?.user]);

  return (
    <>
      <div className="absolute w-full h-full top-0 left-0 right-0 max-w-160">
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
      </div>
    </>
  );
}

export default App;
