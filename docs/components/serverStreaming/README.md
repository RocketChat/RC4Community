# Setup Mainstage Video Source

To setup video source based on different geo IP server locations, visit [ipinfo.io](https://ipinfo.io/account/home) and from the dashboard grab the access token (if not registered, please create a account, the **Free** license provides 50k lookups per month) and add this token to the `.env.local` with the key `IPINFO_TOKEN`. Next, add two stream source links in the `env.local` which would be `NEXT_PUBLIC_SERVER_STREAM_LINK0` and `NEXT_PUBLIC_SERVER_STREAM_LINK1`. The users accessing the site with an IP address from Asia region would be alloted the link `NEXT_PUBLIC_SERVER_STREAM_LINK0` and for other server IPs the link `NEXT_PUBLIC_SERVER_STREAM_LINK1` would be used.


---











