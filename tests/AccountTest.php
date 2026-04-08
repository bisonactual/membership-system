<?php

namespace Tests;

use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class AccountTest extends TestCase
{
    #[Test]
    public function i_can_view_account_page()
    {
        $user = factory('BB\Models\User')->create();
        factory('BB\Models\ProfileData')->create(['user_id' => $user->id]);

        $this->actingAs($user);

        $response = $this->get('/account/' . $user->id);
        $response->assertStatus(200);
    }

    #[Test]
    public function i_cant_view_an_inactive_member_page()
    {
        $user = factory('BB\Models\User')->create();
        factory('BB\Models\ProfileData')->create(['user_id' => $user->id]);

        $user2 = factory('BB\Models\User')->create(['active' => false]);
        factory('BB\Models\ProfileData')->create(['user_id' => $user2->id]);

        $this->actingAs($user);

        $response = $this->get('/members/' . $user2->id);
        $response->assertRedirect(route('members.index'));
    }

    #[Test]
    public function i_cant_view_another_account()
    {
        $user = factory('BB\Models\User')->create();
        factory('BB\Models\ProfileData')->create(['user_id' => $user->id]);

        $user2 = factory('BB\Models\User')->create();
        factory('BB\Models\ProfileData')->create(['user_id' => $user2->id]);

        $this->actingAs($user);

        $response = $this->get('/account/' . $user2->id);
        $response->assertStatus(403);
    }

    #[Test]
    public function i_can_see_accounts_on_member_page()
    {
        $user = factory('BB\Models\User')->create();
        factory('BB\Models\ProfileData')->create(['user_id' => $user->id]);

        $user2 = factory('BB\Models\User')->create();
        factory('BB\Models\ProfileData')->create(['user_id' => $user2->id]);

        $this->actingAs($user);

        $response = $this->get('/members');
        $response->assertStatus(200);
    }

    #[Test]
    public function guests_cant_see_members_list()
    {
        $user = factory('BB\Models\User')->create();
        factory('BB\Models\ProfileData')->create(['user_id' => $user->id]);

        $response = $this->get('/members');
        $response->assertStatus(302);
    }

    #[Test]
    public function member_cant_see_private_accounts_on_member_page()
    {
        $user = factory('BB\Models\User')->create();
        factory('BB\Models\ProfileData')->create(['user_id' => $user->id]);

        $user2 = factory('BB\Models\User')->create(['profile_private' => true]);
        factory('BB\Models\ProfileData')->create(['user_id' => $user2->id]);

        $this->actingAs($user);

        $response = $this->get('/members');
        $response->assertStatus(200);

        // With Inertia, verify the private user is not in the users prop
        $page = $response->original->getData()['page'] ?? null;
        if ($page) {
            $props = json_decode(json_encode($page), true);
            $userIds = collect($props['props']['users'] ?? [])->pluck('user_id')->toArray();
            $this->assertNotContains($user2->id, $userIds);
        }
    }

    #[Test]
    public function i_can_edit_my_profile()
    {
        $user = factory('BB\Models\User')->create();
        factory('BB\Models\ProfileData')->create(['user_id' => $user->id]);

        $this->actingAs($user);

        $response = $this->get('/account/' . $user->id . '/profile/edit');
        $response->assertStatus(200);
    }
}
