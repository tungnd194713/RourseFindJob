# vn_find_jobs-frontend 

# Build Setup

## For development and local 
```bash
# 
$ cd source

# create env file

$ cp .env-example .env

# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

```
## Build for production

```
$ docker-compose up -d --build

```


# Folder Structure
```

|– components/
|   |-Header.vue            # Header component
|
|– pages/
|   |– index.vue            # Home page
|   ...                     # Etc…
|- plugins/
|   |- vee-validate.js
|   ...
|
|– static/
|   |– favicon.ico          # Favicon file
|   ...                     # Etc…
|
|– store/
|   |– posts.js             # Store post
|
|- layouts/
|   |- default.vue          # default layout
|
|-styles/                   # Structure of styles
|   |
|   |– base/
|   |   |– _reset.scss       # Reset/normalize
|   |   |– _typography.scss  # Typography rules
|   |   ...                  # Etc…
|   |
|   |– components/
|   |   |– _buttons.scss     # Buttons
|   |   |– _carousel.scss    # Carousel
|   |   |– _cover.scss       # Cover
|   |   |– _dropdown.scss    # Dropdown
|   |   ...                  # Etc…
|   |
|   |– layout/
|   |   |– _navigation.scss  # Navigation
|   |   |– _grid.scss        # Grid system
|   |   |– _header.scss      # Header
|   |   |– _footer.scss      # Footer
|   |   |– _sidebar.scss     # Sidebar
|   |   |– _forms.scss       # Forms
|   |   ...                  # Etc…
|   |
|   |– pages/
|   |   |– _home.scss        # Home specific styles
|   |   |– _contact.scss     # Contact specific styles
|   |   ...                  # Etc…
|   |
|   |– utils/
|   |   |– _variables.scss   # Sass Variables
|   |   |– _functions.scss   # Sass Functions
|   |   |– _mixins.scss      # Sass Mixins
|   |   |– _helpers.scss     # Class & placeholders helpers
|   |
|   |– vendors/
|   |   |– _bootstrap.scss   # Bootstrap
|   |   ...                  # Etc…
|   |
|   |
|   `– style.scss            # Primary Sass file
|
|- nuxt.config.js            # Nuxt config file
|- package.json 
...

```

## Explain

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.


### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.


### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.


### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.


### `store`

This directory contains your Vuex store files. 

