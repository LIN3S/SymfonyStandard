<?php

namespace Application\Sonata\UserBundle\Admin;

use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\UserBundle\Admin\Entity\UserAdmin as BaseUserAdmin;

class UserAdmin extends BaseUserAdmin {

    protected function configureFormFields(FormMapper $formMapper) {
        parent::configureFormFields($formMapper);
    }

    protected function configureListFields(ListMapper $listMapper) {
        parent::configureListFields($listMapper);
    }

}
