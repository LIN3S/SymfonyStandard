/*
 * This file is part of the Symfony Standard project.
 *
 * Copyright (c) 2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Gorka Laucirica <gorka.lauzirika@gmail.com>
 * @author Beñat Espiña <benatespina@gmail.com>
 */

'use strict';

(function ($) {

  var
    allLinks = 'a, button, .cookies__actions, .cookies__cross-icon, .button',
    $cookies = $('.cookies'),
    $googleTagManager = $('.google-tag-manager'),
    $window = $(window),
    scrollTop = 400;

  function addGoogleTagManager() {
    if (typeof googleTagManagerId === 'undefined') {
      console.log('Please define googleTagManagerId global JS variable to append GTM code');

      return;
    }
    if ($googleTagManager.html()) {
      return;
    }

    $googleTagManager.append(
      '<noscript><iframe src="//www.googletagmanager.com/ns.html?id=' + googleTagManagerId + '"' +
      'height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>' +
      '<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":' +
      'new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],' +
      'j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src=' +
      '"//www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);' +
      '})(window,document,"script","dataLayer","' + googleTagManagerId + '");</script>'
    );
  }

  function removeGoogleTagManager() {
    $googleTagManager.empty();
  }

  function setCookie(name, value, expirationDays) {
    var
      date = new Date(),
      expires = 'expires=';

    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    expires += date.toGMTString();
    document.cookie = name + '=' + value + '; ' + expires + '; ' +
      location.hostname.split('.').reverse()[1] + '.' +
      location.hostname.split('.').reverse()[0] + '; path=/';
  }

  function getCookie(name) {
    var cookies = document.cookie.split(';');

    name = name + '=';
    for (var i = 0, length = cookies.length; i < length; i++) {
      var cookie = cookies[i];

      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }

    return false;
  }

  function acceptCookies() {
    setCookie('username', Math.floor((Math.random() * 100000000) + 1), 30);
    addGoogleTagManager();
    $cookies.removeClass('cookies--visible');
  }

  function scrollingAcceptCookies() {
    if ($window.scrollTop() > scrollTop) {
      acceptCookies();
    }
  }

  $window.on('scroll', function () {
    if (typeof window.requestAnimationFrame !== 'undefined') {
      window.requestAnimationFrame(scrollingAcceptCookies);
    } else {
      scrollingAcceptCookies();
    }
  });

  $(document).ready(function () {
    if (!getCookie('username')) {
      removeGoogleTagManager();
      $cookies.addClass('cookies--visible');
    } else {
      addGoogleTagManager();
    }

    $(document).on('click', allLinks, function () {
      acceptCookies();
    });
  });

}(jQuery));
