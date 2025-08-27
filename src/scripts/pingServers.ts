export async function pingServers() {
  await fetch(`https://create-nft-go.onrender.com/ping`, {
    method: "GET",
  });

  await fetch(`https://create-nft-node.onrender.com/ping`, {
    method: "GET",
  });
}
