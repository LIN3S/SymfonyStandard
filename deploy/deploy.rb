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

############################################
# Setup project
############################################

set :application,   "symfony-standard"
set :repo_url,      "https://github.com/LIN3S/SymfonyStandard.git"
set :scm,           :git
set :sessions_path, fetch(:app_path) + "/sessions"

############################################
# Setup Capistrano
############################################

set :log_level, :info
set :use_sudo, false

set :ssh_options, {
  forward_agent: true
}

set :keep_releases, 3

############################################
# Linked files and directories (symlinks)
############################################

set :linked_files,           ["app/config/parameters.yml"]
set :linked_dirs,            [fetch(:log_path), fetch(:sessions_path), fetch(:web_path) + "/uploads"]
set :file_permissions_paths, [fetch(:cache_path), fetch(:log_path), fetch(:sessions_path)]

set :composer_install_flags, '--no-interaction --optimize-autoloader'

##############################################
# Checks for local and deploy branch diff
##############################################
load File.expand_path('../tasks/git_check_branch.rake', __FILE__)

##############################################
# Compiles and uploads needed files
##############################################
load File.expand_path('../tasks/compile_upload.rake', __FILE__)

##############################################
# Database migrations
##############################################
load File.expand_path('../tasks/database_migrations.rake', __FILE__)

##############################################
# Clear accelerator caches
##############################################
load File.expand_path('../tasks/cache_clear.rake', __FILE__)

namespace :deploy do
  after :starting, 'git:check_branch'
  after :starting, 'composer:install_executable'
  after :updated, 'compile_and_upload:gulp'
  after :updated, 'compile_and_upload:upload'
  after :updated, 'database:migrate'
  #after :finishing, 'cache:clear'
end
