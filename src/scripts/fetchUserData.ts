export interface User {
  uuid: string | undefined;
  nano_ton: number | undefined;
  role: string | undefined;
  level: number | undefined;
  id: number | undefined;
}

export interface NftCollection {
  address: string | undefined;
  next_item_index: number | undefined;
  owner: string | undefined;
  metadata: NftCollectionMetadata;
  is_testnet: boolean | undefined;
}

export interface NftCollectionMetadata {
  name: string | undefined;
  image: string | undefined;
  cover_image: string | undefined;
  description: string | undefined;
  externa_url: string | undefined;
  external_link: string | undefined;
  social_links: string[] | undefined;
  marketplace: string | undefined;
}

export async function fetchUserInfo(userID: number): Promise<User | undefined> {
  try {
    const response = await fetch(
      `https://create-nft-go.onrender.com/api/user/${userID}`
    );
    console.log("Fetching user's data");
    if (response.status !== 200) {
      console.log("BAD STATUS", response.status);
      return undefined;
    } else {
      console.log("User's data fetched");
    }
    const data = await response.json();
    const user: User = data;

    return user;
  } catch (err) {
    console.log("Fetch error:", err);
    return undefined;
  }
}

export async function fetchUserCollections(
  userID: number
): Promise<NftCollection[] | undefined> {
  try {
    const response = await fetch(
      `https://create-nft-go.onrender.com/api/user/nft-collections/${userID}`
    );
    console.log("Fetching user's collections");
    if (response.status !== 200) {
      console.log("BAD STATUS", response.status);
      return undefined;
    } else {
      console.log("User's data fetched");
    }

    const data: NftCollection[] = await response.json();

    console.log(`User Collections: ${data}`);
    return data;
  } catch (err) {
    console.log("Fetch error:", err);
    return undefined;
  }
}
