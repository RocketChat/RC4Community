import { BroadcastChannel } from "next-auth/client/_utils"
import { getCsrfToken } from "next-auth/react";

const broadcast = new BroadcastChannel();

export default async function signOutKC({
    callbackUrl = null
}){
    const csrfToken = await getCsrfToken();
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            csrfToken,
            callbackUrl: `/api/auth/signoutkc?token=${csrfToken}${callbackUrl?'&callbackUrl='+encodeURIComponent(callbackUrl):''}`,
            json: true,
        }),
    }
    const res = await fetch(`/api/auth/signout`, fetchOptions)
    const data = await res.json();

    broadcast.post({ event: "session", data: { trigger: "signout" } })

    const url = data.url ?? callbackUrl
    window.location.href = url
    // If url contains a hash, the browser does not reload the page. We reload manually
    if (url.includes("#")) window.location.reload();
}
