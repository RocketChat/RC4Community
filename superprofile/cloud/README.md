### Fauna Superprofile Saas Setup
To access the Admin section which includes the Event Create Menu, there would be a need to setup the Superprofile, currently we use FaunaDB for handling this.
Follow this [link](https://graphql.workshops.fauna.com/building/build-with-nextjs/client-setup/#creating-a-front-end-role) instructions to get the Fauna key, then paste it in the `.env` as:
```
NEXT_PUBLIC_FAUNA_SECRET="your private key"
```
To get more familiar with Fauna here is a quick short [workshop link](https://graphql.workshops.fauna.com/getting-started/)

Or here is a quick guide to get started with Fauna:
1. Head to [dashboard.fauna.com](https://dashboard.fauna.com/), if you are logged in, click __CREATE DATABASE__, choose the US server.
<img width="356" alt="image" src="https://user-images.githubusercontent.com/61188295/178947597-158a4c05-3c92-4ba6-87df-c3a808f79134.png">
2. In the left section click the __GraphQL__ and then __IMPORT SCHEMA__; schema to be uploaded is located in `../assets/rc4community-schema.graphql`.
3. Go to the __Functions__ tab, there will be two functions, in the UpserUser, replace it with the following function code.
<details>
<summary>UpsertUser function</summary>

```
Query(
  Lambda(
    ["uid", "email", "displayName", "phoneNumber", "photoURL"],
    Let(
      {
        user: Match(Index("getByEmail"), Var("email")),
        upsert: If(
          Exists(Var("user")),
          Update(Select(["ref"], Get(Var("user"))), {
            data: {
              displayName: Var("displayName"),
              phoneNumber: Var("phoneNumber"),
              photoURL: Var("photoURL")
            }
          }),
          Create(Collection("User"), {
            data: {
              uid: Var("uid"),
              email: Var("email"),
              displayName: Var("displayName"),
              phoneNumber: Var("phoneNumber"),
              photoURL: Var("photoURL")
            }
          })
        )
      },
      Var("upsert")
    )
  )
)
```
</details>

4. Under the __Security__ tab click on __NEW KEY__ no need to modify anything, go with defaults, then hit the __SAVE__, copy the _KEY'S SECRET_ and paste it in the `.env` as:
```
NEXT_PUBLIC_FAUNA_SECRET="your key's secret"
NEXT_PUBLIC_FAUNA_DOMAIN="https://graphql.us.fauna.com/graphql"

```
5. Create the first basic user using the __GraphQL__ tab, following is the mutation schema of a GraphQL query to create a user
```
mutation {
  createUser(data: {
    displayName: "YOUR_NAME"
    email: "NEXT_PUBLIC_EVENT_ADMIN_MAIL"
    uid: "ANY_UNIQUE_NUMBER"
    events: {
      create: {
        role: "Admin"
        email: "NEXT_PUBLIC_EVENT_ADMIN_MAIL"
      }
    }
  }) {
    _id
    displayName
  }
}
```

6. Congrats! and thank you! for reading this. With this you are all set, to access Admin menus.