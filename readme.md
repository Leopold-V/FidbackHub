# FidbackHub

Fidbackhub is a user feedback management tools.
This is a passion and hobby project inspired by already existing application such as ![marker.io](https://marker.io/) and ![usersnap](https://usersnap.com/).
The core difference between them and Fidbackhub is that it is opensource, and as far as I have looked out, I haven't found any existing opensources alternatives to those tools.

## How does it work ?

A user is peacefully navigating on your newly created website when suddenly he spots that horrible yellow color title on a white background, the constrast is awful, the title is not visible enough ! He must report this mess-up design to the developer.
Fortunately for both part, fidbackhub is in the website corner, in one click it is open, there is a form and a screenshot of the current page opened in an editor.
The user can do annotation and markup on the screenshot providing more content to the developer to undertand the problem better. He also has the choice to record a short GIF so he can reproduce a problem.
The developer or the team received that feedback in the Fidbackhub web application which is quite similar to a project management tool.
With the feedback description and screenshot/GIF also come additionnal context such as user screen resolution, browser version, console logs errors.

Fidbackhub want to focus on providing the more possible informations and context to the developers so it easier to understand a problem while staying easy-to-use for the users.

## Tech stack

- Frontend: Next.js (TypeScript)
- Backend: Strapi (Headless CMS)
- Widget: Vite + react.js
- Using Docker to bootstrap an sql database while the application is in his early development, I aim to dockerize every part of the application in the future.

### Projects page:
![main](https://i.gyazo.com/fee1798e4654a141342facc8a2f775d1.png)
### Feedbacks page:
![main](https://i.gyazo.com/bc12a6ca72318ff0e64bd07991c7be13.png)
### Feedback page:
![main](https://i.gyazo.com/a514a2ea7e8ad12ce597f9be9da41145.png)