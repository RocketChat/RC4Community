### SuperProfile Setup

1. In the directory `/superprofile`, run
```
sh initFaunaOnce.sh 
```

On a successful run two flag files would be created an flag file `init_flag` and `init_key_flag` to track the first time data initialization run, and...
```
NEXT_PUBLIC_FAUNA_SECRET
NEXT_PUBLIC_FAUNA_DOMAIN
```
...the above two variables with some values would be appended inside the `.env` file inside the `app` directory.

Congrats 🎉! The Superprofile setup is done.