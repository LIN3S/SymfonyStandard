# This file is part of the Symfony Standard project.
#
# Copyright (c) 2016 LIN3S <info@lin3s.com>
#
# For the full copyright and license information, please view the LICENSE
# file that was distributed with this source code.
#
# @author Gorka Laucirica <gorka.lauzirika@gmail.com>
# @author Beñat Espiña <benatespina@gmail.com>
# @author Jon Torrado <jontorrado@gmail.com>

######################################################################
# Setup Server
######################################################################
server "dev.company.com", user: "sshuser", roles: %w{web}
set :deploy_to, "/path/to/your/deployment/directory"
set :env,  "dev"
set :cache_opts, "-u user:password"
set :domain, "http://devwebsite.domain.com"

######################################################################
# Capistrano Symfony - https://github.com/capistrano/symfony/#settings
######################################################################
set :file_permissions_users, ['www-data']
set :webserver_user, "www-data"

######################################################################
# Setup Git
######################################################################
set :branch, "master"
