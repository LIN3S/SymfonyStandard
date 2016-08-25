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

namespace :git do
  desc 'Checks for same actual and deploy branch'
  task :check_branch do
    current_branch = `git branch`.match(/\* (\S+)\s/m)[1]
    if current_branch != fetch(:branch)
      puts "\e[31mCurrent branch '#{current_branch}' differs from deployment branch, stopping\e[0m"
      exit 1
    end
  end
end
