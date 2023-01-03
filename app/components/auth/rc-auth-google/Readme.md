# RC Google Auth Component

RC4Community integrates the **Google Auth** with Rocket.Chat to enable smooth and easy authentication to get you started!

For trying out the Google Auth in **RC4Community**, please follow [this documentation](https://docs.rocket.chat/guides/administration/admin-panel/settings/oauth/google-oauth-setup) to receive the `GOOGLE_CLIENT_ID` as well as to setup Google SSO for the **RC Google Auth** Component.
 
Now after getting the `Google Cloud Client ID` and the Rocket Chat instance url paste them in the **`app/.env`** with the following key name,

```dosini
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your google client id"
NEXT_PUBLIC_RC_URL="your url of the RC instance"
NEXT_PUBLIC_RC_ROOM_ID="public channel room id"
```

**The `NEXT_PUBLIC_RC_ROOM_ID` defaults to "GENERAL".**
