<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddCourseIdToInductionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('inductions', function (Blueprint $table) {
            $table->unsignedBigInteger('course_id')->nullable()->after('key');
            $table->timestamp('sign_off_requested_at')->nullable()->after('trainer_user_id');
            $table->foreign('course_id')->references('id')->on('courses')->onDelete('restrict');
            $table->index('course_id');
            $table->index('sign_off_requested_at');
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
            // Recreate the table without those columns using a dynamic table-swap.
            $drop = ['course_id', 'sign_off_requested_at'];
            $columns = collect(DB::select('PRAGMA table_info(inductions)'))
                ->pluck('name')
                ->filter(fn ($col) => ! in_array($col, $drop))
                ->implode(', ');
            DB::statement("CREATE TABLE inductions_backup AS SELECT {$columns} FROM inductions");
            Schema::drop('inductions');
            DB::statement('ALTER TABLE inductions_backup RENAME TO inductions');
            return;
        }

        Schema::table('inductions', function (Blueprint $table) {
            $table->dropForeign(['course_id']);
            $table->dropIndex(['course_id']);
            $table->dropIndex(['sign_off_requested_at']);
            $table->dropColumn(['course_id', 'sign_off_requested_at']);
        });
    }
}
