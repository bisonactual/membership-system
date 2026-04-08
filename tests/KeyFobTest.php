<?php

namespace Tests;

use BB\Models\KeyFob;
use BB\Models\Role;
use BB\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class KeyFobTest extends TestCase
{
    use DatabaseMigrations;

    public function test_must_complete_general_induction_before_accessing_keyfobs()
    {
        $user = factory(User::class)->create();

        $this->actingAs($user);

        $response = $this->get("/account/{$user->id}/keyfobs");
        $response->assertStatus(200);
    }

    public function test_can_view_own_keyfobs()
    {
        $user = factory(User::class)->create(['induction_completed' => true]);
        factory(KeyFob::class)->times(3)->create(['user_id' => $user->id]);

        $this->actingAs($user);

        $response = $this->get("/account/{$user->id}/keyfobs");
        $response->assertStatus(200);
    }

    public function test_cannot_view_other_peoples_keyfobs()
    {
        $user = factory(User::class)->create();
        $otherUser = factory(User::class)->create();

        $this->actingAs($user);

        $response = $this->get("/account/{$otherUser->id}/keyfobs");
        $response->assertStatus(403);
    }

    public function test_admins_can_view_other_peoples_keyfobs()
    {
        $adminUser = factory(User::class)->create();
        $adminUser->assignRole(Role::findByName('admin'));

        $otherUser = factory(User::class)->create();
        factory(KeyFob::class)->times(3)->create(['user_id' => $otherUser->id]);

        $this->actingAs($adminUser);

        $response = $this->get("/account/{$otherUser->id}/keyfobs");
        $response->assertStatus(200);
    }

    public function test_can_add_keyfob_to_self()
    {
        $user = factory(User::class)->create(['induction_completed' => true]);

        $this->actingAs($user);

        $response = $this->post("/account/{$user->id}/keyfobs", [
            'type' => 'keyfob',
            'key_id' => sprintf('%08X', mt_rand(0, 0xFFFFFFFF)),
        ]);
        $response->assertRedirect("/account/{$user->id}/keyfobs");
    }

    public function test_cannot_add_keyfob_to_others()
    {
        $user = factory(User::class)->create();
        $otherUser = factory(User::class)->create(['induction_completed' => true]);

        $this->actingAs($user);

        $response = $this->post("/account/{$otherUser->id}/keyfobs", [
            'key_id' => sprintf('%08X', mt_rand(0, 0xFFFFFFFF)),
        ]);
        $response->assertStatus(403);
    }

    public function test_admins_can_add_keyfob_to_others()
    {
        $adminUser = factory(User::class)->create();
        $adminUser->assignRole(Role::findByName('admin'));

        $otherUser = factory(User::class)->create(['induction_completed' => true]);

        $this->actingAs($adminUser);

        $response = $this->post("/account/{$otherUser->id}/keyfobs", [
            'type' => 'keyfob',
            'key_id' => sprintf('%08X', mt_rand(0, 0xFFFFFFFF)),
        ]);
        $response->assertRedirect("/account/{$otherUser->id}/keyfobs");
    }

    public function test_can_mark_own_keyfobs_as_lost()
    {
        $user = factory(User::class)->create(['induction_completed' => true]);
        $keyfob = factory(KeyFob::class)->create(['user_id' => $user->id]);

        $this->actingAs($user);

        $response = $this->delete("/account/{$user->id}/keyfobs/{$keyfob->id}");
        $response->assertRedirect("/account/{$user->id}/keyfobs");
    }

    public function test_cannot_mark_others_keyfobs_as_lost()
    {
        $user = factory(User::class)->create();
        $otherUser = factory(User::class)->create(['induction_completed' => true]);
        $keyfob = factory(KeyFob::class)->create(['user_id' => $otherUser->id]);

        $this->actingAs($user);

        $response = $this->delete("/account/{$otherUser->id}/keyfobs/{$keyfob->id}");
        $response->assertStatus(403);
    }

    public function test_admins_can_mark_others_keyfobs_as_lost()
    {
        $adminUser = factory(User::class)->create();
        $adminUser->assignRole(Role::findByName('admin'));

        $otherUser = factory(User::class)->create(['induction_completed' => true]);
        $keyfob = factory(KeyFob::class)->create(['user_id' => $otherUser->id]);

        $this->actingAs($adminUser);

        $response = $this->delete("/account/{$otherUser->id}/keyfobs/{$keyfob->id}");
        $response->assertRedirect("/account/{$otherUser->id}/keyfobs");
    }
}
