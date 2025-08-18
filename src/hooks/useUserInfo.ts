import { useEffect, useState } from "react";

export interface User {
    uuid: string | undefined;
    nanoTon: bigint | undefined;
    role: string | undefined;
    level: number | undefined;
    ID: number | undefined;
}


export async function useUserInfo(userID: number) {
    const [user, setUser] = useState<User>()
    const response = await fetch(`https://create-nft-go.onrender.com/api/user/${userID}`)
    if (response.status === 200) {
        console.log("Status is OK")
    } else {
        console.log(`BAD STATUS`)
        console.log(`${response.text}`)
    }
    useEffect(() => {
        (async () => {
            setUser(await response.json())
        })()
    }, [response])

    return {
        uuid: user?.uuid,
        nanoTon: user?.nanoTon,
        role: user?.role,
        level: user?.level,
        ID: user?.ID,
    }
}