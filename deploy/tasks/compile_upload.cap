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

namespace :compile_and_upload do
  desc 'Execute Gulp tasks'
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

  desc 'Upload needed files'
  task :upload do
    if fetch(:env) == "prod"
    on roles(:all) do |host|
      upload! "#{fetch(:web_path)}/css", "#{release_path}/#{fetch(:web_path)}", recursive: true
      upload! "#{fetch(:web_path)}/js", "#{release_path}/#{fetch(:web_path)}", recursive: true
    end
    end
  end
end
