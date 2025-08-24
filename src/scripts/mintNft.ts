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
  collectionAddress: string | undefined
) {
  let uploadedImageURL: string = "";
  let uploadedMetadataURL: string;
  alert("got 1");

  if (image) {
    const res1 = await fetch(
      `https://create-nft-node.onrender.com/api/upload-image`,
      {
        method: "POST",
        body: await image.arrayBuffer(),
      }
    );
    const image_link = await res1.text();
    if (image_link.startsWith("Error")) {
      console.log(`${image_link}`);
      return "Error";
    }

    uploadedImageURL = image_link;
  }
  alert("got 2");

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
  const metadata_link = await res2.text();
  if (metadata_link.startsWith("Error")) {
    console.log(`${metadata_link}`);
    return "Error";
  }
  alert("got 3");

  uploadedMetadataURL = metadata_link;

  const res3 = await fetch(
    `https://create-nft-go.onrender.com/api/nft-item/mint?owner-wallet=0QDU46qYz4rHAJhszrW9w6imF8p4Cw5dS1GpPTcJ9vqNSmnf&owner-id=5003727541&content=${uploadedMetadataURL}&forward-amount=10000000&forward-message=${fwdMsg}&nft-collection-address=${
      collectionAddress
        ? collectionAddress
        : "kQB253d_QpJsEgBszsjTZlhh8mZi9XX4nKq1H9I5iVWDzz6j"
    }&is-testnet=true`,
    {
      method: "GET",
    }
  );

  alert("got 4");

  const contentType = res3.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    console.log(`error minting NFT: ${await res3.text()}`);
    alert("error minting NFT");
    return "Error";
  }

  return "OK";
}
