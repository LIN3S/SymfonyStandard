Symfony Standard
===========================
The "Symfony Standard" distribution in the LIN3S way.

Why?
----
[**Symfony**][1] Symfony is a set of reusable PHP components and a PHP framework for web projects. In
[*LIN3S*][2] we implement this solution providing some useful features that the standard edition of
Symfony doesn't come with:

1. [SonataAdminBundle][3]
2. [SonataUserBundle][4]
 * ToDo
3. [LiipImagineBundle][5]
3. Front-end workflow
 * [Sass][6]
 * [Npm][7]
 * [Bower][8]
 * [Gulp.js][9]
4. [Capistrano][10] deploy
5. A complete base.html.twig based on [HTML5 Boilerplate][11]

**Section under construction**

Prerequisites
-------------
The above sounds great so now, to start developing with our Symfony Standard, you need the the following
requirements:

1. [PHP][12] 5.4 or higher
2. [MySQL][13] or [MongoDB][14]
3. [Composer][15]: `curl -sS https://getcomposer.org/installer | php`
4. [Ruby][16]
  * Bundler: `gem install bundler`
5. [Node.js][17]
  * Bower: `npm install -g bower`
  * Gulp.js: `npm install -g gulp`

**Section under construction**

Getting Started
---------------
After installing all the prerequisites, to create a Symfony project based on this *Symfony Standard*,
you should follow these steps.

First of all, you need to **clone the project**:
```
$ git clone git@github.com:LIN3S/SymfonyStandard.git <project-name> && cd <project-name>
```

Then, *if you use Apache*, you should visit the [Symfony permissions section][18] of the
installation documentation so your CLI user and Apache user are allowed to write.

After that, just run the following command in order to download the Composer dependencies:
```
$ composer install
```

If your *parameters.yml* file was not created, right after finishing the composer process,
the system will ask you some questions in order to create the needed file. If you want to
create it by hand, just copy the *app/config/parameters.yml.dist* file:
```
$ cp app/config/parameters.yml.dist app/config/parameters.yml
```

If you are willing to use LiipImagineBundle, create the needed folder
```
$ mkdir -p web/media/cache
```
You can modify this path editing the `cache` parameter in the liip_imagine section
within the `app/config/config.yml` file. Also remember to give this folder the right
permissions so the web server is allowed to write.

If you want to create an admin user, follow these steps:
```
$ php app/console fos:user:create
$ php app/console fos:user:promote --> give the ROLE_SUPER_ADMIN permission
```

In order to use the built-in server, use the following command:
```
$ php app/console server:run
```

Access to your admin panel by going to `<domain>/admin`

A complete `app/Resources/views/base.html.twig` file is provided by default.
Be sure to modify this file and override the meta blocks whenever is needed. Commented
out you can find usefull examples with the full information links and validators.

**Section under construction**

Front-end workflow
------------------

First of all, download all the dependencies needed, for Ruby, bower and Node.js:
```
$ bundle install
$ bower install
$ npm install
```

Feel free to add and/or edit the bower dependencies by editing the `bower.json` file.

After this initial step, you will have the following gulp tasks available:
* `gulp sass`: compiles `app/Resources/assets/scss/app.scss` and moves the resulting files to `web/` folder.
* `gulp scsslint`: it helps you to keep your SCSS files clean and readable.
* `gulp watch`: check modifications within the `app/Resources/assets/scss/` in order to compile again.

As you see, create and/or edit .scss files within the `app/Resources/assets/scss/` folder. An
initial structure is already given for you.

**Section under construction**

[1]: http://symfony.com/
[2]: http://lin3s.com
[3]: https://sonata-project.org/bundles/admin
[4]: https://sonata-project.org/bundles/user
[5]: http://sass-lang.com/
[6]: https://github.com/liip/LiipImagineBundle
[7]: https://www.npmjs.com/
[8]: http://bower.io/
[9]: http://gulpjs.com/
[10]: http://capistranorb.com/
[11]: https://html5boilerplate.com/
[12]: http://php.net
[13]: http://dev.mysql.com/downloads/
[14]: https://www.mongodb.org/
[15]: https://getcomposer.org/
[16]: https://www.ruby-lang.org/en/downloads/
[17]: https://nodejs.org/download/
[18]: http://symfony.com/doc/current/book/installation.html#book-installation-permissions
