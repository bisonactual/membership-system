<?php

namespace Tests;

use PHPUnit\Framework\Attributes\Test;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class HomepageTest extends TestCase
{
    use DatabaseMigrations;

    #[Test]
    public function i_can_visit_home_page()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }
}
