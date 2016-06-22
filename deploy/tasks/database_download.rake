# This file is part of the Symfony Standard project.
#
# Copyright (c) 2016 LIN3S <info@lin3s.com>
#
# For the full copyright and license information, please view the LICENSE
# file that was distributed with this source code.
#
# @author Jon Torrado <jontorrado@gmail.com>

namespace :database do
  desc 'Remote database download'
  task :download do
    on roles(:all) do |host|
      dbuser, dbpass, dbname = nil, nil, nil
      file = capture "cat #{shared_path}/app/config/parameters.yml"
      file.each_line do |line|
        line.split("\t").each do |item|
          if item.include? "database_user"
            dbuser = item.gsub(/(\'|\"|\:|\ |\n|database_user)/, '')
          end
          if item.include? "database_password"
            dbpass = item.gsub(/(\'|\"|\:|\ |\n|database_password)/, '')
          end
          if item.include? "database_name"
            dbname = item.gsub(/(\'|\"|\:|\ |\n|database_name)/, '')
          end
        end
      end
      if dbuser != nil and dbpass != nil and dbname != nil
        execute "cd #{shared_path};mysqldump -u'#{dbuser}' -p'#{dbpass}' #{dbname} > #{dbname}_cap.sql"
        download! "#{shared_path}/#{dbname}_cap.sql", "."
        execute :rm, "-f", "#{shared_path}/#{dbname}_cap.sql"
      else
        puts "Cannot download file (dbuser or dbpass or dbname not found)"
      end
    end
  end
end
