# ![Debbie Logo](./public/images/Logo.svg)

## Debbie

![Super woman logo](https://res.cloudinary.com/yelpcampmm/image/upload/v1599541863/superwoman_ot1yyt.png)

- ### How to install?

```npm
npm install
```

---

- ### Seting up the environmental variables on local machines

1.  Creat a .env file under the root directory (Web-App-Repo/)

2.  Paste the following code in the newly created .env file and change the values.

    ```
    DATABASEURL="MongoDB connection string"

    SECRET="Debbie is my first open source app"

    PORT="3000"

    EMAIL="johndoe@gmail.com"

    TWOFACT="password Or 2-factor secret string"
    ```

3.  `DATABASEURL` is the connection string provided by the MongoDB or MongoDB Atlas. **_I think @gsw-codes has a common string for all of the projects._**

4.  `SECRET` can be any string or even dummy text.

5.  `PORT` is the port number for example `3000` or `8080`.

6.  `EMAIL`, this variable is the admin or the debbie email. This email will use to send mails to users when they try to change or reset their password.

7.  `TWOFACT`, this is the secret string provided by Gmail or your mail provider. I have to use this because I use 2-factor authentication for my Google account. If the admin or debbie email has no 2-fact, then you have to add your Google password instead.

> If your account has no 2FA, then go to [Google](https://myaccount.google.com/lesssecureapps) and allow your app to use your Gmail service. This option won't be available for 2FA accounts

> If you have a 2FA account, then go to [Google](https://security.google.com/settings/security/apppasswords) and generate a secret string for your project.

> In Heroku, you can add env variables on the project dashboard, then _setting_ tab, then _Reveal Config Vars_ button and you can add there.

![heroku project panel](https://res.cloudinary.com/yelpcampmm/image/upload/v1599540334/Screenshot_130__LI_vikpsg.jpg)

> This project is in currently development and all the pages linkage are still in implementation. Please follow the below routes to naviaget through pages.

---

- ### User Routes

1. '/ ' => Home page

2. '/register ' => Sign up page

3. '/login ' => Sign in page

4. '/update ' => Update user detail page ( only visible if user is signed in or signed up)

5. '/forget ' => Forget password page

6. '/signout ' => Will log out the user

---

- ### Pain Routes

1. '/pain ' => Pain input page ( only visible if user is signed in or signed up)

2. '/report ' => Show pain level route ( only visible if user is signed in or signed up)

---

- ### Simple API to retrieve pain data

> User id mandatory.

1. '/api/pain/:userId/' => Retrieve all the user data

> If the privided userId is wrong, the server will response with an error json

```json
{ "error": "No user found!" }
```

2. '/api/pain/:userId/daily ' => Retrieve an array of arrays for daily pain level of a specific user

3. '/api/pain/:userId/weekly ' => Retrieve an array of arrays for weekly pain level of a specific user

4. '/api/pain/:userId/monthly ' => Retrieve an array of arrays for monthly pain level of a specific user

5. '/api/pain/:userId/{timeframe} ' => If the provided timeframe is not valid ( or not one of the daily, weekly and monthly), the server will response with a json like below.

```json
{
  "error": "<timeframe from the url> is not a valid timeframe. You can only use daily, weekly and montly instead."
}
```

---

