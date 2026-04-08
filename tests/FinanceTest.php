<?php

namespace Tests;

use PHPUnit\Framework\Attributes\Test;

use BB\Models\Role;
use BB\Exceptions\AuthenticationException;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\BrowserKitTestCase;

class FinanceTest extends BrowserKitTestCase
{
    use DatabaseMigrations;

    #[Test]
    public function guest_cant_view_payments_page()
    {
        $this->get('/payments')
            ->assertRedirectedToRoute('login');
    }

    #[Test]
    public function member_cant_view_payments_page()
    {
        $user = factory('BB\Models\User')->create();
        factory('BB\Models\ProfileData')->create(['user_id' => $user->id]);

        $this->actingAs($user);

        $this->get('/payments')
            ->seeStatusCode(403);
    }

    #[Test]
    public function finance_member_can_view_payments_page()
    {
        $user = factory('BB\Models\User')->create();
        factory('BB\Models\ProfileData')->create(['user_id' => $user->id]);
        $role = Role::findByName('finance');
        $role->users()->attach($user);

        $this->actingAs($user);

        $this->get('/payments')
            ->assertResponseStatus(200);
    }

}