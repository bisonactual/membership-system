<?php

namespace Tests;

use PHPUnit\Framework\Attributes\Test;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Support\Str;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use DatabaseMigrations;

    #[Test]
    public function i_can_login()
    {
        $password = Str::random(12);
        $user = factory('BB\Models\User')->create(['password' => $password]);
        factory('BB\Models\ProfileData')->create(['user_id' => $user->id]);

        $response = $this->post('/session', [
            'email' => $user->email,
            'password' => $password,
        ]);

        $response->assertRedirect('account/' . $user->id);
        $this->assertAuthenticatedAs($user);
    }

    #[Test]
    public function unknown_user_cant_login()
    {
        $response = $this->post('/session', [
            'email' => 'unknown@example.com',
            'password' => '123456789012',
        ]);

        $response->assertRedirect();
        $this->assertGuest();
    }
}
