# Passport JS User Authentication Course

At 3 min at `Your complete guide to understanding the express-session`.

The code in this repository is base on the
[Course: Passport JS User Authentication](https://youtu.be/J1qXK66k1y4)
video series.

The mongodb setup use the same storage location as
[rnp](https://github.com/carltonj2000/react-node-passport)
but uses the `pjs` database.
Before starting mongo verify if it is already running.

# Video 1 - What is Use Authentication

# Video 2 - HTTP Headers and Cookies

Run in the browsers inspect console and see the cookie expire when refreshing.

```js
date = new Date();
date.setTime(date.getTime() + 20000);
document.cookie = "custom2=1234; expires=" + date.toUTCString() + ";";
```

# Video 4 - What is Express JS middleware and how does it work?

Watched video 4 before 3 because I believe the play order is incorrect.

# Video 3 - Your complete guide to understanding the express-session
