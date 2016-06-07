<?php

/*
 * This file is part of the Symfony Standard project.
 *
 * Copyright (c) 2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Application\Sonata\UserBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Loads users to the database.
 *
 * @author Jon Torrado <jontorrado@gmail.com>
 */
class LoadUserData extends AbstractFixture implements ContainerAwareInterface, OrderedFixtureInterface
{
    private static $names = [
        'Tricia Carbonneau',
        'Cindy Mendoza',
        'Alessandra Wollard',
        'Vernell Fleeman',
        'Chad Ferebee',
        'Olinda Resendez',
        'Iva Moniz',
        'Alec Cuthbertson',
        'Candie Foret',
        'Burma Stgermain',
        'Rosaline Spiegel',
        'Elois Hipsher',
        'Fleta Hatter',
        'Jordan Muirhead',
        'Shala Thrift',
        'Dannette Newell',
        'Brett Voigt',
        'Lesley Varney',
        'Rich Larocca',
        'Ofelia Deckert',
        'Tamera Bagdon',
        'Kecia Buttner',
        'Bronwyn Mattia',
        'Brooks Mcpartland',
        'Candelaria Buechner',
        'Yolando Dery',
        'Daniele Guan',
        'Ehtel Durrant',
        'Rocco Medlen',
        'Sally Cornejo',
        'Dorinda Riser',
        'Tana Berthiaume',
        'Clelia Senger',
        'Norbert Petteway',
        'Agatha Gaus',
        'Lauran Depaolo',
        'Treasa Waid',
        'Truman Sybert',
        'Annmarie Helt',
        'Librada Mistretta',
        'Kristan Mount',
        'Gertha Hines',
        'Ashley Mangual',
        'Florrie Hallford',
        'Pricilla Weekes',
        'Celestine Boelter',
        'Chas Manross',
        'Elvie Glavin',
        'Rolanda Mcspadden',
        'Kimberlee Wood',
    ];

    private $container;

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    /**
     * @return \FOS\UserBundle\Model\UserManagerInterface
     */
    public function getUserManager()
    {
        return $this->container->get('fos_user.user_manager');
    }

    public function load(ObjectManager $manager)
    {
        $manager = $this->getUserManager();

        // Create admin user
        $user = $manager->createUser();
        $user->setUsername('admin');
        $user->setEmail('admin@localhost');
        $user->setPlainPassword('admin');
        $user->setEnabled(true);
        $user->setSuperAdmin(true);
        $user->setLocked(false);

        $manager->updateUser($user);

        // Create some random users
        foreach (self::$names as $name) {
            $user = $manager->createUser();
            list($firstName, $lastName) = explode(' ', $name);
            $user->setUsername(strtolower($firstName));
            $user->setEmail($firstName . '@localhost');
            $user->setPlainPassword($firstName);
            $user->setFirstName($firstName);
            $user->setLastName($lastName);
            $user->setEnabled(true);
            $user->setLocked(false);

            $manager->updateUser($user);
        }
    }

    public function getOrder()
    {
        return 1;
    }
}
