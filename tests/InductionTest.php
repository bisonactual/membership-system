<?php

namespace Tests;

use BB\Models\Equipment;
use BB\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class InductionTest extends TestCase
{
    use DatabaseMigrations;

    public function test_can_request_own_induction()
    {
        $user = factory(User::class)->create();
        $equipment = factory(Equipment::class)->state('requiresInduction')->create();

        $this->actingAs($user);

        $response = $this->post(route('equipment_training.create', $equipment));
        $response->assertRedirect(route('equipment.show', $equipment));

        $this->assertDatabaseHas('inductions', [
            'user_id' => $user->id,
            'key' => $equipment->induction_category,
        ]);
    }
}
