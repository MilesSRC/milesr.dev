
<div align="center">
    <img align="center" src="https://milesr.dev/res/img/logo.png" width="100">
    <h1>milesr.dev (Version 2)</h1>
    <p>A refreshed version of milesr.dev refreshed design & new technologies.</p>
</div>

## What is milesr.dev?
It's my portfolio website containing information about me, previous works, experience, and current projects.
People can contact me through the website, and I can edit my portfolio and site settings on the fly with a panel/dashboard.

## Whats improved in milesr.dev V2?
- New look and new technologies
- (TODO) New dashboard panel
- (TODO) New contact form
- (TODO) New contact form settings
- (TODO) CMS (Content Management System) for works and projects

## What technologies are new?
As aposed to milesr.dev V1, milesr.dev V2 uses the following technologies:
- [Next.js & React](https://nextjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [SASS](https://sass-lang.com/)

Forming a "MENTS" (MongoDB, Express.js, Next.js, TailwindCSS, SASS) stack. <br>
Unlike milesr.dev V1, milesr.dev V2 takes advantage of SSR (Server Side Rendering) to render the website to optimize SEO and performance.

## Accessibility
In V2 of the site, I've made sure that the website is accessible to all users with a minimum of difficulty.

## Build
In ``.env`` replace ``SECRET=your_secret_key`` to your own <br>
Run ``npm run build`` to build the website. <br>
Then ``npm run start`` to start the server. <br>

## API
Using ``/api/reg?secret=your_secret_key`` to regenerate/revalidate a page with new static content. <br>
Pages are all built during build time to maximize performance and must be manually regenerated if you want to update the content.

## License
Copyright (C) milesr.dev - All Rights Reserved <br>
Unauthorized copying of this file, via any medium is strictly prohibited <br>
Written by Miles Rush <miles@milesr.dev>, July 2022
