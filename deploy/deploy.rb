# This file is part of the Symfony Standard project.
#
# Copyright (c) 2015 LIN3S <info@lin3s.com>
#
# For the full copyright and license information, please view the LICENSE
# file that was distributed with this source code.
#
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

namespace :tasks do
  task :migrate do
    invoke 'symfony:console', 'doctrine:migrations:migrate', '--no-interaction'
  end

  task :bower do
    if fetch(:env) == "prod"
      run_locally do
        execute "bower install"
      end
    else
      on roles(:all) do |host|
        execute "cd #{release_path}; bower install"
      end
    end
  end

  task :gulp do
    if fetch(:env) == "prod"
      run_locally do
        execute "gulp prod"
      end
    else
      on roles(:all) do |host|
        execute "cd #{release_path}; npm install && gulp prod"
      end
    end
  end

  task :upload do
    if fetch(:env) == "prod"
      on roles(:all) do |host|
        upload! "#{fetch(:web_path)}/css", "#{release_path}/#{fetch(:web_name)}", recursive: true
        upload! "#{fetch(:web_path)}/js", "#{release_path}/#{fetch(:web_name)}", recursive: true
      end
    end
  end
end

namespace :deploy do
  after :starting, 'composer:install_executable'
  after :updated, 'tasks:migrate'
  after :updated, 'tasks:bower'
  after :updated, 'tasks:gulp'
  after :updated, 'tasks:upload'
end
