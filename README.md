# Log

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.6.

Log is a simple record keeping application I am building with the intention of tracking the maintenence I perform to my vehicle but can be ultimately be used to track many objects and their progression. I intend to include the ability for the user to create different "logs" representing the object they wish to keep a record for. One log could be your vehicle, your bike or whatever; upon creation the user will add attributes to identify their new log. Within said log, the user can define different devices to track the object; initially the user will be able to create data tables, todo lists or just a scratch pad to keep notes. All user created data will be written to a firebase databse (if they have created an account) that way this data can be accessed from multiple devices anywhere. 

______

### Progress Update for Feb 5, 2021 

So far, I have implemented my auth service (thanks to the amazing ui [ngx-auth-firebaseui](https://github.com/AnthonyNahas/ngx-auth-firebaseui) by Anthony Nahas) and now I am going onward to the database services. As it stands the app is set up with a Firebase I created and any new user that registers can create a log and see a selection on the sidebar of their currrent logs. 

![update](https://github.com/bgunson/log/blob/main/src/assets/screenshot_feb52021.PNG)

Further on the agenda is to make clean up the sidebar interface, and working on the main content area where the log data will be displayed and manipulated.
