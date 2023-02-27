# Style guide for contributing in the front-end part

All the frontend related code is located in the... well `frontend` folder.

# Code

Use Typescript whenever you can (the project doesn't enforce his utilization but it is highly recommanded to contribute :) ) and the prettier command to fix your style.
Have a look to the `types` folder and the `.prettierrc`.

# design

Each component is responsible for his own style, **we use tailwindcss** except for some 3rd party component library such as react-toastify where we load css files at the top of `./pages/_app.tsx`.
Have a look to the `tailwind.config.js` file for all the main colors, fonts and theme customizations.

# Architecture with Next.js

This is a Next.js project so we use the page pattern (see `pages` folder) and every page defined in that page folder will have a `index.tsx` associated in `component/pages` folder. Every component related to this page are located next to the index.tsx file.
Reusable components such as buttons and inputs are located in the common folder. Exception for layout component such as navigation related things.
If you feel the need to re-use a component currently only used in a specific page, then the component should be moved from his page folder to the common folder. You can always try to extract any components and propose changes if you think it is a good thing to make it a re-usable component, dont be shy. The project isn't very strict on this, if a component is use in only 2 differents pages, it is not a big deal.
