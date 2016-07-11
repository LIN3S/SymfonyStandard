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

namespace :cache do
  desc 'Clear accelerator caches'
  task :clear do
    invoke 'symfony:console', 'cache:accelerator:clear', '--opcode --no-interaction'
  end
end
