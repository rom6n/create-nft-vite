export async function mintNft(
  image: File | undefined,
  coverImage: File | undefined,
  name: string,
  description: string,
  links: string[],
  fwdMsg: string,
  royaltyDividend: number,
  royaltyDivisor: number,
  userId: number | undefined
) {
  let uploadedImageURL: string = "";
  let uploadedCoverImageURL: string = "";
  let uploadedMetadataURL: string;
  if (image) {
    const res = await fetch(
      `https://create-nft-node.onrender.com/api/upload-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
        },
        body: await image.arrayBuffer(),
      }
    );

    const image_txid = await res.text();
    if (res.status !== 200) {
      console.log(`image error: ${image_txid}`);
      return "Error";
    }

    uploadedImageURL = `https://gateway.irys.xyz/${image_txid}`;
  }

  if (coverImage) {
    const res = await fetch(
      `https://create-nft-node.onrender.com/api/upload-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
        },
        body: await coverImage.arrayBuffer(),
      }
    );

    const image_txid = await res.text();
    if (res.status !== 200) {
      console.log(`cover image error: ${image_txid}`);
      return "Error";
    }

    uploadedCoverImageURL = `https://gateway.irys.xyz/${image_txid}`;
  }

  const metadata = JSON.stringify({
    name: name,
    image: uploadedImageURL,
    cover_image: uploadedCoverImageURL,
    description: description,
    external_url: "",
    external_link: "",
    social_links: links,
    marketplace: "create-nft-tma",
  });

  const res = await fetch(
    `https://create-nft-node.onrender.com/api/upload-metadata`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: metadata,
    }
  );
  const metadata_txid = await res.text();
  if (res.status !== 200) {
    console.log(`${metadata_txid}`);
    return "Error";
  }
  uploadedMetadataURL = `https://gateway.irys.xyz/${metadata_txid}`;

  const res2 = await fetch(
    `https://create-nft-go.onrender.com/api/nft-collection/deploy?owner-wallet=&owner-id=${
      userId ? userId : "5003727541"
    }&common-content=&collection-content=${uploadedMetadataURL}&royalty-dividend=${royaltyDividend}&royalty-divisor=${royaltyDivisor}&is-testnet=true`,
    {
      method: "GET",
    }
  );
  const contentType = res2.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    console.log(`error minting NFT: ${await res2.text()}`);
    alert("error minting NFT");
    return "Error";
  }

  uploadedMetadataURL = `https://gateway.irys.xyz/${metadata_txid}`;
}
