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
 * ToDo
3. [Doctrine Migrations][5]
3. [LiipImagineBundle][6]
4. [StofDoctrineExtensions][7]
5. Front-end workflow
 * [Sass][8]
 * [Npm][9]
 * [Bower][10]
 * [Gulp.js][11]
6. [Capistrano][12] deploy
7. A complete base.html.twig based on [HTML5 Boilerplate][13]
8. As dev dependency, [Doctrine Fixtures][23]
9. [SymfonyFoundation][24] made by LIN3S
10. [Coding standards library][25] made by LIN3S

**Section under construction**

## Prerequisites
The above sounds great so, now, to start developing with our Symfony Standard, you need to meet the following
requirements:

1. [PHP][14] 5.4 or higher
2. [MySQL][15] or [MongoDB][16]
3. [Composer][17]: `curl -sS https://getcomposer.org/installer | php`
4. [Ruby][18]
  * Bundler: `gem install bundler`
5. [Node.js][19] 4.0 or higher
  * Bower: `npm install -g bower`
  * Gulp.js: `npm install -g gulp`

## Getting Started
After installing all the prerequisites, to create a Symfony project based on this *Symfony Standard*, you should
follow these steps.

First of all, you need to **clone the project**:
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

After that, *if you use a Web server*, you should visit the [Symfony permissions section][20] of the installation
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

We improved the production logs managed by [*monologs*][21]. Edit `app/config/config_prod.yml`
so it suits your needs.

Also, if your development IDE is [PhpStorm][22], uncomment the following line in `app/config/config.yml`:
```
framework:
    ide: "phpstorm://open?file=%%f&line=%%l"
```

## Front-end workflow
First of all, download all the dependencies needed for Ruby, Bower and Node.js:
```
$ bundle install
$ bower install
$ npm install
```

Feel free to add and/or edit the Bower dependencies by editing the `bower.json` file.

After this initial step, you will have the following gulp tasks available:
* `gulp sass`: compiles `app/Resources/assets/scss/app.scss` and moves the resulting files to `web/` folder.
* `gulp scsslint`: it helps you to keep your SCSS files clean and readable.
* `gulp watch`: check modifications within the `app/Resources/assets/scss/` and `app/Reources/assets/js/` folders in order to compile again.
* `gulp js:prod`: combines and minifies the needed JS files.
* `gulp prod`: executes sass and js:prod tasks.

As you see, you should create and/or edit .scss files within the `app/Resources/assets/scss/` folder. An initial
structure is already given for you. You can also add/or edit .js files, but **remember** to modify `gulpfile.js`
`js:prod` tasks in order to add what your project needs.

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
the full configuration [here](https://github.com/stof/StofDoctrineExtensionsBundle/blob/master/Resources/doc/index.rst#step-3-add-the-extensions-to-your-mapping).

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

[1]: http://symfony.com/
[2]: http://lin3s.com
[3]: https://sonata-project.org/bundles/admin
[4]: https://sonata-project.org/bundles/user
[5]: http://sass-lang.com/
[6]: https://symfony.com/doc/master/bundles/DoctrineMigrationsBundle/index.html
[7]: https://github.com/stof/StofDoctrineExtensionsBundle/blob/master/Resources/doc/index.rst
[8]: https://github.com/liip/LiipImagineBundle
[9]: https://www.npmjs.com/
[10]: http://bower.io/
[11]: http://gulpjs.com/
[12]: http://capistranorb.com/
[13]: https://html5boilerplate.com/
[14]: http://php.net
[15]: http://dev.mysql.com/downloads/
[16]: https://www.mongodb.org/
[17]: https://getcomposer.org/
[18]: https://www.ruby-lang.org/en/downloads/
[19]: https://nodejs.org/download/
[20]: http://symfony.com/doc/current/book/installation.html#book-installation-permissions
[21]: http://symfony.com/doc/master/cookbook/logging/monolog.html
[22]: https://www.jetbrains.com/phpstorm/
[23]: http://symfony.com/doc/current/bundles/DoctrineFixturesBundle/index.html
[24]: https://github.com/LIN3S/SymfonyFoundation
[25]: https://github.com/LIN3S/CS
