# Heydays starter

## Getting started

1. Run `npx heydays-cli setup` in parent directory of where you want your project.

2. From project root run `cd cms && sanity init`

3. Create `.env` from `/web/.env-sample` and add missing keys for sanity. You need `projectId` and `dataset` from `cms/sanity.json`. For access to drafts you can add a an access token in the sanity admin page. When in `/cms` run `sanity manage`. Retrive the token and add it to your `.env`

4a. In project root run `yarn workspace cms deploy:graphql`

4b. You might want to setup things in the cms before you start the web server so from project root run `yarn workspace cms start` and add a frontpage and assign a frontpage in siteSettings. Add menus, pages and a privacy page.

5a. You might need to install dependencies and build the netlify functions. From project root run `cd web/src/netlify-functions && npm i`. Once that is finished you can build with `yarn build:lambda`

5b. Then from project root run `yarn workspace web start`. Open a new tab/pane and run `yarn workspace cms start` in the second one.

!Protip add `yw` as an alias for `yarn workspaces` in your bash or zsh for less typing

<!-- **_ GOTCHA _**
TL;DR If you're content is not showing on the page restart the server.

Content types without content won't be added into graphql. This means that you'll need to restart the server if you're adding content to a
content type which previously did not have content. -->

### 📚Docs

- [Frontend](./web/README.md)
- [Backend](./cms/README.md)

### Tech

- Lerna for handling monorepos
- Yarn workspace addon for handling monorepos
- Gatsby for static site building
- React
- Sanity for cms
- Netlify for deploying
  - Functions for handling tasks that can't be performed on the client

---

### Commands

#### `yarn start`

To start the project

#### `yarn deploy:graphql`

When you add new things to the schema you need to deploy the graphql schema.

#### Installing dependencies and running commands with yarn

We use yarn workspaces together with lerna. Yarn workspaces is used to manage multiple packages in a project. Workspaces are defined in `/package.json`. They are currently `web` and `cms`. This means you'll have to install packages in a little bit different way. You need to prefix your commands with `yarn workspace <workspace>`.

ex. to install dep in web project
`yarn workspace web add lodash`

---

### Folder structure

```
project/
├── cms/
│   ├── heydays-config.js
│   ├── bootstrap.min.css
│   ├── bootstrap-theme.css
│   └── bootstrap-theme.min.css
├── web/
│   ├── heydays-config.js
│   ├── bootstrap.min.css
│   ├── bootstrap-theme.css
│   └── bootstrap-theme.min.css
├── .env
├── bootstrap.min.css
└──
```
