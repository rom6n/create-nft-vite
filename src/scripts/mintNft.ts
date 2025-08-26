export interface NftItemMetadata {
  name: string;
  image: string;
  attributes: Attribute[];
  description: string;
  external_url: string;
}

export interface Attribute {
  trait_type: string;
  value: string;
}

export async function mintNft(
  image: File | undefined,
  name: string,
  description: string,
  attributes: Attribute[],
  fwdMsg: string,
  collectionAddress: string | undefined,
  userId: number | undefined
) {
  let uploadedImageURL: string = "";
  let uploadedMetadataURL: string;

  if (image) {
    const res1 = await fetch(
      `https://create-nft-node.onrender.com/api/upload-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
        },
        body: await image.arrayBuffer(),
      }
    );
    const image_txid = await res1.text();
    if (res1.status === 400) {
      console.log(`${image_txid}`);
      return "Error";
    }

    uploadedImageURL = `https://gateway.irys.xyz/${image_txid}`;
  }

  const metadata = JSON.stringify({
    name: name,
    image: uploadedImageURL,
    attributes: attributes,
    description: description,
    external_url: "",
  });

  const res2 = await fetch(
    `https://create-nft-node.onrender.com/api/upload-metadata`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: metadata,
    }
  );
  const metadata_txid = await res2.text();
  if (res2.status === 400) {
    console.log(`${metadata_txid}`);
    return "Error";
  }

  uploadedMetadataURL = `https://gateway.irys.xyz/${metadata_txid}`;

  const res3 = await fetch(
    `https://create-nft-go.onrender.com/api/nft-item/mint?owner-wallet=&owner-id=${
      userId ? userId : "5003727541"
    }&content=${uploadedMetadataURL}&forward-amount=10000000&forward-message=${fwdMsg}&nft-collection-address=${
      collectionAddress
        ? collectionAddress
        : "kQB253d_QpJsEgBszsjTZlhh8mZi9XX4nKq1H9I5iVWDzz6j"
    }&is-testnet=true`,
    {
      method: "GET",
    }
  );

  const contentType = res3.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    console.log(`error minting NFT: ${await res3.text()}`);
    alert("error minting NFT");
    return "Error";
  }

  return "OK";
}
