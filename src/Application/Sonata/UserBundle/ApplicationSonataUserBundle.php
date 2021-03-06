<?php

/*
 * This file is part of the Symfony Standard project.
 *
 * Copyright (c) 2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Application\Sonata\UserBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

/**
 * Application Sonata user Bundle's kernel class.
 *
 * @author Jon Torrado <jontorrado@gmail.com>
 */
class ApplicationSonataUserBundle extends Bundle
{
    /**
     * {@inheritdoc}
     */
    public function getParent()
    {
        return 'SonataUserBundle';
    }
}
