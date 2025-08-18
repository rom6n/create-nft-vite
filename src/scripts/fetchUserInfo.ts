export interface User {
    uuid: string | undefined;
    nanoTon: number | undefined;
    role: string | undefined;
    level: number | undefined;
    ID: number | undefined;
}


export async function fetchUserInfo(userID: number): Promise<User | undefined> {
    try {
        const response = await fetch(`https://create-nft-go.onrender.com/api/user/${userID}`)
        if (response.status !== 200) {
            console.log("BAD STATUS", response.status)
            return undefined
        } else {
            console.log("User's data fetched")
        }

        const data = await response.json()
        console.log(`User nano ton: ${data.nano_ton}`)
        return {
            uuid: data.uuid,
            nanoTon: data.nano_ton,
            role: data.role,
            level: data.level,
            ID: data.id,
        }
    } catch (err) {
        console.log("Fetch error:", err)
        return undefined
    }
}