# This file is part of the Symfony Standard project.
#
# Copyright (c) 2015-2016 LIN3S <info@lin3s.com>
#
# For the full copyright and license information, please view the LICENSE
# file that was distributed with this source code.
#
# @author Gorka Laucirica <gorka.lauzirika@gmail.com>
# @author Beñat Espiña <benatespina@gmail.com>
# @author Jon Torrado <jontorrado@gmail.com>

namespace :server do
  reset = "\033[0m"
  success =  "\e[1m\e[32m"
  failure =  "\e[1m\e[31m"
  desc "Ensure linked server files"
  task :ensure do
    on roles(:all) do |host|
      fetch(:linked_files, []).each do |file|
        if test("[ -f #{shared_path}/#{file} ]")
          puts "Checking #{shared_path}/#{file}... #{success}OK#{reset}"
        else
          puts "Checking #{shared_path}/#{file}... #{failure}failed! Uploading...#{reset}"
          filePaths, tmpFilePath = file.split('/'), ''
          for index in 0 ... (filePaths.size - 1)
            tmpFilePath += "/#{filePaths[index]}"
          end
          unless test("[ -d #{shared_path}#{tmpFilePath} ]")
            execute "mkdir -p #{shared_path}#{tmpFilePath}"
          end
          upload! file, "#{shared_path}/#{file}"
          if test("[ -f #{shared_path}/#{file} ]")
            puts "Uploading #{shared_path}/#{file}... #{success}uploaded!#{reset}"
          else
            puts "Uploading #{shared_path}/#{file}... #{failure}failed! Check manually!#{reset}"
          end
        end
      end
    end
  end
end
