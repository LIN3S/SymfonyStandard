# Symfony Standard
> The "Symfony Standard" distribution in the LIN3S way.

[![SensioLabsInsight](https://insight.sensiolabs.com/projects/00c67aae-3f52-419b-93df-751050299dcb/mini.png)](https://insight.sensiolabs.com/projects/00c67aae-3f52-419b-93df-751050299dcb)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/LIN3S/SymfonyStandard/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/LIN3S/SymfonyStandard/?branch=master)
[![Total Downloads](https://poser.pugx.org/lin3s/symfony-standard/downloads)](https://packagist.org/packages/lin3s/symfony-standard)
&nbsp;&nbsp;&nbsp;&nbsp;
[![Latest Stable Version](https://poser.pugx.org/lin3s/symfony-standard/v/stable.svg)](https://packagist.org/packages/lin3s/symfony-standard)
[![Latest Unstable Version](https://poser.pugx.org/lin3s/symfony-standard/v/unstable.svg)](https://packagist.org/packages/lin3s/symfony-standard)

## Why?
[**Symfony**][1] is a set of reusable PHP components and a PHP framework for web projects. In [*LIN3S*][2] we implement
this solution providing some useful features that the standard edition of Symfony doesn't come with:

1. [SonataAdminBundle][3]
2. [SonataUserBundle][4]
 * Dependencies not included in this file.
3. [Doctrine Migrations][5]
3. [LiipImagineBundle][6]
4. [StofDoctrineExtensions][7]
5. Front-end workflow
 * [Sass][8]
 * [Npm][9]
 * [Gulp.js][10]
6. [Capistrano][11] deploy
7. A complete base.html.twig based on [HTML5 Boilerplate][12]
8. As dev dependency, [Doctrine Fixtures][13]
9. [Coding standards library][14] made by LIN3S

## Prerequisites
The above sounds great so, now, to start developing with our Symfony Standard, you need to meet the following
requirements:

1. [PHP][15] 5.4 or higher
2. [MySQL][16] or [MongoDB][178]
3. [Composer][18]: `curl -sS https://getcomposer.org/installer | php`
4. [Ruby][19]
  * Bundler: `gem install bundler`
  * After bundler: `bundle install` (see Gemfile)
5. [Node.js][20] 4.0 or higher
  * Gulp.js: `npm install -g gulp`
  * ESLint: `npm install -g eslint`

## Getting Started
After installing all the prerequisites, to create a Symfony project based on this *Symfony Standard*, you should
follow these steps.

Firstly, you need to **create the project**:
```
$ composer create-project lin3s/symfony-standard <project-name> && cd <project-name>
```

> If your `app/config/parameters.yml` file was not created right after finishing the composer process, the system
will ask you some questions in order to create the needed file. If you want to create it by hand, just copy the
*app/config/parameters.yml.dist* file:
`$ cp app/config/parameters.yml.dist app/config/parameters.yml`

> If the process fails as soon as it finishes, it's because the database is not created yet. Run
`php app/console doctrine:database:create` in order to create it and then create the needed tables with
`php app/console doctrine:migrations:migrate` command.

After that, *if you use a Web server*, you should visit the [Symfony permissions section][21] of the installation
documentation so your CLI user and Web server user are allowed to write. Also, if you are using Apache Web server,
consider renaming `.htaccess.dist` files located within `app`, `src` and `web` folders to `.htaccess` or create the
proper server configuration to improve global performances.

If you are willing to use LiipImagineBundle, create the needed folder:
```
$ mkdir -p web/media/cache
```

You can modify this path editing the `cache` parameter in the `liip_imagine` section within the `app/config/config.yml`
file. Also remember to give this folder the right permissions so the web server is allowed to write.

If you want to load some default users, run the following command in order to create an *admin/admin* account and 50
fake users:
```
$ php app/console doctrine:fixtures:load
```

Also, if you want to create an admin user by hand, follow these steps:
```
$ php app/console fos:user:create
$ php app/console fos:user:promote --> give the ROLE_SUPER_ADMIN permission
```

In order to use the built-in server, use the following command:
```
$ php app/console server:run
```

Access to your admin panel by going to `<domain>/admin`

A complete `app/Resources/views/base.html.twig` file is provided by default. Be sure to modify this file and override
the meta blocks whenever it's needed. Commented out you can find usefull examples with the full information links and
validators.

We improved the production logs managed by [*monolog*][22]. Edit `app/config/config_prod.yml` so it suits your needs.

If you are planning to add some tests, be sure to edit your composer.json `autoload` section with something like this:
```
"autoload": {
    "psr-4": { "": "src/" },
    "classmap": [ "app/AppKernel.php", "app/AppCache.php" ],
    "exclude-from-classmap": [ "/Tests/", "/test/", "/tests/" ]
},
```

Also, if your development IDE is [PhpStorm][23], uncomment the following line in `app/config/config.yml`:
```
framework:
    ide: "phpstorm://open?file=%%f&line=%%l"
```

## Front-end workflow
First of all, download all the dependencies needed for Ruby and Node.js:
```
$ bundle install
$ npm install
```

Feel free to add and/or edit the npm dependencies by editing the `package.json` file.

After this initial step, you will have the following gulp tasks available:
* `gulp sass`: compiles `app/Resources/assets/scss/app.scss` and moves the resulting file to `web/` folder.
* `gulp sass:prod`: compiles and minifies `app/Resources/assets/scss/app.scss` and moves the resulting file to `web/` folder.
* `gulp scss-lint`: it helps you to keep your SCSS files clean and readable.
* `gulp modernizr`: creates a `modernizr.js` file with the selected tests.
* `gulp js:prod`: combines and minifies the needed JS files, including `modernizr.js`.
* `gulp sprites`: creates a SVG sprite.
* `gulp watch`: checks SCSS, JS and SVG changes to launch the corresponding task.
* `gulp default`: executes sass, js:prod, sprites and starts watching.
* `gulp prod`: executes sass:prod, modernizr, js:prod and spritest tasks.

As you see, you should create and/or edit .scss files within the `app/Resources/assets/scss/` folder. An initial
structure is already given for you. You can also add/or edit .js files, but **remember** to modify `gulpfile.js`
`js:prod` tasks in order to add what your project needs.

Also, `livereload` is up and running when launching `gulp watch`. You should install the correct browser extension and
be sure to navigate through the dev environment.

## Doctrine Extensions
This bundle is installed by default. You just have to enable what your project needs, for example:
```
stof_doctrine_extensions:
    orm:
        default:
            sluggable: true
            timestampable: true
```

Some extensions do need an extra configuration in the `doctrine` section of the `app/config/config.yml` file. Check
the full configuration [here][24].

For the other possible configurations, visit the [bundle documentation][7]

## Doctrine Migrations
Capistrano will run the needed migrations when running a deployment. You just need to generate the correct files within
the `app/migrations` folder. In order to do so, just run `php app/console doctrine:migrations:diff` and push the
generated file to your SCM before runnning the deploy.

For other possible configurations, visit the [bundle documentation][5]

## Deployment
To automatize the deployment process this project is using **Capistrano** with **capistrano-symfony** plugin. You can
find the whole configuration within the `deploy` directory. Customize deploy tasks modifying the `deploy/deploy.rb` file.

You should update the *symfony-standard* application name for your awesome project name and the repo url with your
Git project url.

Inside `deploy/stages` directory there are two files that can be considered as pre-production stage and production stage.
There is no logic, these files only contain few parameters that you should customize for your proper deployment.

After all, and following the Capistrano [documentation][11] to configure the server, you can deploy executing:
```
$ cap <stage> deploy    # <stage> can be dev1, prod or whatever file inside stages directory
```

> In the Capistrano shared directory you should create the `app/config/parameters.yml` file, `app/logs`, `app/sessions`
and `web/uploads` folder should be created for you.

###Clearing remote caches

When working with PHP7 & Opcache, for example, you won't see all changes after deploying. Caches need to be flushed
with the correct website domain. If you need this feature, just open the `deploy.rb` file and remove the commented line:

```
  #after :finishing, 'cache:clear'
```

If you need different configurations for your deployment stages, feel free to create a variable and add the required
parameters to the `stages/*.rb` files.

[1]: http://symfony.com/
[2]: http://www.lin3s.com/
[3]: https://sonata-project.org/bundles/admin
[4]: https://sonata-project.org/bundles/user
[5]: http://symfony.com/doc/current/bundles/DoctrineMigrationsBundle/index.html
[6]: https://github.com/liip/LiipImagineBundle
[7]: https://github.com/stof/StofDoctrineExtensionsBundle/blob/master/Resources/doc/index.rst
[8]: http://sass-lang.com/
[9]: https://www.npmjs.com/
[10]: http://gulpjs.com/
[11]: http://capistranorb.com/
[12]: https://html5boilerplate.com/
[13]: http://symfony.com/doc/current/bundles/DoctrineFixturesBundle/index.html
[14]: https://github.com/LIN3S/CS
[15]: http://php.net
[16]: http://dev.mysql.com/downloads/
[17]: https://www.mongodb.org/
[18]: https://getcomposer.org/
[19]: https://www.ruby-lang.org/en/downloads/
[20]: https://nodejs.org/download/
[21]: http://symfony.com/doc/current/book/installation.html#book-installation-permissions
[22]: http://symfony.com/doc/master/cookbook/logging/monolog.html
[23]: https://www.jetbrains.com/phpstorm/
[24]: https://github.com/stof/StofDoctrineExtensionsBundle/blob/master/Resources/doc/index.rst#step-3-add-the-extensions-to-your-mapping
