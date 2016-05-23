<?php

/*
 * This file is part of the LaboralKutxa project.
 *
 * Copyright (c) 2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Gorka Laucirica <gorka@lin3s.com>
 */

if (isset($_SERVER['HTTP_CLIENT_IP'])
    || isset($_SERVER['HTTP_X_FORWARDED_FOR'])
    || !(in_array(@$_SERVER['REMOTE_ADDR'], [
            // localhost
            '127.0.0.1',
            'fe80::1',
            '::1',
            // DEV server IP, PROD server ip...
        ]) || php_sapi_name() === 'cli-server')
) {
    header('HTTP/1.0 403 Forbidden');
    exit('You are not allowed to access this file.');
}

echo 'Clearing cache...' . "<br>" . "<br>";


if (function_exists('apcu_clear_cache') && apcu_clear_cache()) {
    echo 'APC User Cache: success.' . "<br>";
}

if (function_exists('apc_clear_cache') && function_exists('opcache_reset') && apc_clear_cache()) {
    echo 'APC User Cache: success.' . "<br>";
}

if (function_exists('apc_clear_cache') && apc_clear_cache('user')) {
    echo 'APC User Cache: success.' . "<br>";
}

if (function_exists('wincache_ucache_clear') && wincache_ucache_clear()) {
    echo 'Wincache User Cache: success.' . "<br>";
}

if (function_exists('opcache_reset') && opcache_reset()) {
    echo 'Zend OPcache: success.' . "<br>";
}

if (function_exists('apc_clear_cache') && apc_clear_cache('opcode')) {
    echo 'APC Opcode Cache: success.' . "<br>";
}

echo "<br>" . 'Cache cleared successfully';
