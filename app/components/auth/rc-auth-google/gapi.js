import { Rocketchat } from "@rocket.chat/sdk";

import Cookies from "js-cookie";

export default class RocketChatInstance {
  host = process.env.NEXT_PUBLIC_RC_URL;
  rid = "";
  rcClient = null;

  constructor(host, rid) {
    this.host = host;
    this.rid = rid;
    this.rcClient = new Rocketchat({
      protocol: "ddp",
      host: this.host,
      useSsl: !/http:\/\//.test(host),
    });
  }

  getCookies() {
    return {
      rc_token: Cookies.get("rc_token"),
      rc_uid: Cookies.get("rc_uid"),
    };
  }

  setCookies(cookies) {
    Cookies.set("rc_token", cookies.rc_token || "");
    Cookies.set("rc_uid", cookies.rc_uid || "");
  }

  async googleSSOLogin(signIn, acsCode) {
    const tokens = await signIn();
    let acsPayload = null

    if (typeof acsCode === "string") {
      acsPayload = acsCode
    }

    const payload = acsCode
      ? JSON.stringify({
        serviceName: "google",
        accessToken: tokens.access_token,
        idToken: tokens.id_token,
        expiresIn: 3600,
        totp: {
          code: acsPayload,
        },
      })
      : JSON.stringify({
        serviceName: "google",
        accessToken: tokens.access_token,
        idToken: tokens.id_token,
        expiresIn: 3600,
        scope: "profile"
      });

    try {
      const req = await fetch(`${this.host}/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      });
      const response = await req.json();

      if (response.status === "success") {
        this.setCookies({
          rc_token: response.data.authToken,
          rc_uid: response.data.userId,
        });
        if (!response.data.me.username) {
          await this.updateUserUsername(
            response.data.userId,
            response.data.me.name
          );
        }
        return { status: response.status, me: response.data.me };
      }

      if (response.error === "totp-required") {
        return response;
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async resend2FA(emailOrUsername) {
    try {
      const response = await fetch(`${this.host}/api/v1/users.2fa.sendEmailCode`, {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": null,
          "X-User-Id": null,
        },
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          emailOrUsername: emailOrUsername,
        })
      });
      return await response.json();
    } catch (err) {
      console.error(err.message);
    }
  }

  async logout() {
    try {
      const response = await fetch(`${this.host}/api/v1/logout`, {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": Cookies.get("rc_token"),
          "X-User-Id": Cookies.get("rc_uid"),
        },
        method: "POST",
      });
      this.setCookies({});
      return await response.json();
    } catch (err) {
      console.error(err.message);
    }
  }
}