<?php

namespace Tests;

use PHPUnit\Framework\Attributes\Test;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class SignupTest extends TestCase
{
    use DatabaseMigrations;

    #[Test]
    public function i_can_visit_the_signup_page()
    {
        $response = $this->get('/register');
        $response->assertStatus(200);
    }
}
