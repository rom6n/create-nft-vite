import { useState } from "react";

export interface User {
    uuid: string | undefined;
    nanoTon: bigint | undefined;
    role: string | undefined;
    level: number | undefined;
    ID: number | undefined;
}


export async function useUserInfo(userID: number) {
    const [user, setUser] = useState<User>()
    const response = await fetch(`http://localhost:2000/api/user/${userID}`)
    const data = await response.json()
    setUser(data)

    return {
        uuid: user?.uuid,
        nanoTon: user?.nanoTon,
        role: user?.role,
        level: user?.level,
        ID: user?.ID,
    }
}