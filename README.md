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
3. Front-end workflow
 * [Sass][5]
 * [Npm][6]
 * [Bower][7]
 * [Gulp.js][8]
4. [Capistrano][9] deploy

**Section under construction**

Prerequisites
-------------
The above sounds great so now, to start developing with our Symfony Standard, you need the the following
requirements:

1. [PHP][10] 5.4 or higher
2. [MySQL][11] or [MongoDB][12]
3. [Composer][13]: `curl -sS https://getcomposer.org/installer | php`
4. [Ruby][14]
  * Bundler: `gem install bundler`
5. [Node.js][15]
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

Then, *if you use Apache*, you should visit the [Symfony permissions section][16] of the
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

**Section under construction**

[1]: http://symfony.com/
[2]: http://lin3s.com
[3]: https://sonata-project.org/bundles/admin
[4]: https://sonata-project.org/bundles/user
[5]: http://sass-lang.com/
[6]: https://www.npmjs.com/
[7]: http://bower.io/
[8]: http://gulpjs.com/
[9]: http://capistranorb.com/
[10]: http://php.net
[11]: http://dev.mysql.com/downloads/
[12]: https://www.mongodb.org/
[13]: https://getcomposer.org/
[14]: https://www.ruby-lang.org/en/downloads/
[15]: https://nodejs.org/download/
[16]: http://symfony.com/doc/current/book/installation.html#book-installation-permissions
