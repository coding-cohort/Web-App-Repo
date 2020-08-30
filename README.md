# ![Debbie Logo](./public/images/Logo.svg)

## Debbie

![Super woman logo](./public/images/super_woman.svg)

- ### How to install?

```npm
npm install
```

---

> This project is in currently development and all the pages linkage are still in implementation. Please follow the below routes to naviaget through pages.

---

- ### User Routes

'/ ' => Home page

'/register ' => Sign up page

'/login ' => Sign in page

'/update ' => Update user detail page ( only visible if user is signed in or signed up)

'/forget ' => Forget password page

'/signout ' => Will log out the user

---

- ### Pain Routes

'/pain ' => Pain input page ( only visible if user is signed in or signed up)

'/report ' => Show pain level route ( only visible if user is signed in or signed up)

---

- ### Simple API to retrieve pain data

> User id mandatory.

'/api/pain/:userId/' => Retrieve all the user data

> If the privided userId is wrong, the server will response with an error json

```json
{ "error": "No user found!" }
```

'/api/pain/:userId/daily ' => Retrieve an array of arrays for daily pain level of a specific user

'/api/pain/:userId/weekly ' => Retrieve an array of arrays for weekly pain level of a specific user

'/api/pain/:userId/monthly ' => Retrieve an array of arrays for monthly pain level of a specific user

'/api/pain/:userId/{timeframe} ' => If the provided timeframe is not valid ( or not one of the daily, weekly and monthly), the server will response with a json like below.

```json
{
  "error": "<timeframe from the url> is not a valid timeframe. You can only use daily, weekly and montly instead."
}
```

---

- ### Issues

[#1](https://github.com/coding-cohort/Web-App-Repo/issues/1)

[#22](https://github.com/coding-cohort/Web-App-Repo/issues/22)

[#23](https://github.com/coding-cohort/Web-App-Repo/issues/23)
