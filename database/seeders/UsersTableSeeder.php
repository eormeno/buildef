<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UsersTableSeeder extends Seeder
{
	public function run(): void
	{
		if (User::count()) {
			return;
		}

		User::factory()->consecutiveId()->create([
			'name' => 'Admin',
			'email' => 'admin@example.com',
		]);

		User::factory(8)->consecutiveId()->create();
	}
}