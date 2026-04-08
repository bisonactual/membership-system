<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddMaintainerGroupIdToEquipment extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('equipment', function (Blueprint $table) {
            
            $table->unsignedBigInteger('maintainer_group_id')->nullable();
            $table->foreign('maintainer_group_id')->references('id')->on('maintainer_groups');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (config('database.default') === 'sqlite') {
            // SQLite's native DROP COLUMN cannot remove columns referenced by FK definitions.
            $columns = collect(DB::select('PRAGMA table_info(equipment)'))
                ->pluck('name')
                ->filter(fn ($col) => $col !== 'maintainer_group_id')
                ->implode(', ');
            DB::statement("CREATE TABLE equipment_backup AS SELECT {$columns} FROM equipment");
            Schema::drop('equipment');
            DB::statement('ALTER TABLE equipment_backup RENAME TO equipment');
            return;
        }

        Schema::table('equipment', function (Blueprint $table) {
            $table->dropColumn('maintainer_group_id');
        });
    }
}
