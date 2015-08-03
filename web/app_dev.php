<?php

/*
 * This file is part of the Symfony Standard project.
 *
 * Copyright (c) 2015 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Jon Torrado <jontorrado@gmail.com>
 * @author Beñat Espiña <benatespina@gmail.com>
 */

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Debug\Debug;

if (isset($_SERVER['HTTP_CLIENT_IP'])
    || isset($_SERVER['HTTP_X_FORWARDED_FOR'])
    || !(in_array(@$_SERVER['REMOTE_ADDR'], ['127.0.0.1', 'fe80::1', '::1']) || php_sapi_name() === 'cli-server')
) {
    header('HTTP/1.0 403 Forbidden');
    exit('You are not allowed to access this file. Check ' . basename(__FILE__) . ' for more information.');
}

$loader = require_once __DIR__ . '/../app/bootstrap.php.cache';
Debug::enable();

require_once __DIR__ . '/../app/AppKernel.php';

$kernel = new AppKernel('dev', true);
$kernel->loadClassCache();
$request = Request::createFromGlobals();
$response = $kernel->handle($request);
$response->send();
$kernel->terminate($request, $response);
