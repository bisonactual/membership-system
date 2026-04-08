<?php

namespace BB\Policies;

use BB\Models\Equipment;
use BB\Models\User;
use BB\Models\induction;
use BB\Repo\InductionRepository;
use Illuminate\Auth\Access\HandlesAuthorization;

class InductionPolicy
{
    use HandlesAuthorization;

    protected $inductionRepository;

    public function __construct(InductionRepository $inductionRepository)
    {
        $this->inductionRepository = $inductionRepository;
    }

    public function before($user, $ability)
    {
        if ($user->isAdmin()) {
            return true;
        }

        // fall through to policy methods
        return null;
    }

    /**
     * Determine whether the user can view the induction.
     *
     * @param  \BB\Models\User  $user
     * @param  \BB\Models\Induction  $induction
     * @return mixed
     */
    public function view(User $user, Induction $induction)
    {
        return $this->inductionRepository->isTrainerForEquipment($user, $induction->key);
    }

    /**
     * Determine whether the user can create induction.
     *
     * @param  \BB\Models\User  $user
     * @param  \BB\Models\Equipment  $Equipment
     * @param  \BB\Models\User|null  $userAwaitingTraining
     * @return mixed
     */
    public function create(User $user, Equipment $equipment, $userAwaitingTraining = null)
    {
        // Requesting for self
        if ($userAwaitingTraining === null) {
            return true;
        }

        // Requesting for others
        return $this->inductionRepository->isTrainerForEquipment($user, $equipment->induction_category);
    }

    /**
     * Determine whether the user can mark the inductee as trained.
     *
     * @param  \BB\Models\User  $user
     * @param  \BB\Models\induction  $induction
     * @return mixed
     */
    public function train(User $user, Induction $induction)
    {
        // Use course-based authorization if course_id is set, otherwise fall back to equipment-based
        if ($induction->course_id) {
            return $this->inductionRepository->isTrainerForCourse($user, $induction->course_id);
        }
        
        return $this->inductionRepository->isTrainerForEquipment($user, $induction->key);
    }

    /**
     * Determine whether the user can remove the trained flag from the inductee
     *
     * @param  \BB\Models\User  $user
     * @param  \BB\Models\induction  $induction
     * @return mixed
     */
    public function untrain(User $user, Induction $induction)
    {
        // Use course-based authorization if course_id is set, otherwise fall back to equipment-based
        if ($induction->course_id) {
            return $this->inductionRepository->isTrainerForCourse($user, $induction->course_id);
        }
        
        return $this->inductionRepository->isTrainerForEquipment($user, $induction->key);
    }

    /**
     * Determine whether the user can promote the inductee as a trainer
     *
     * @param  \BB\Models\User  $user
     * @param  \BB\Models\induction  $induction
     * @return mixed
     */
    public function promote(User $user, Induction $induction)
    {
        // Use course-based authorization if course_id is set, otherwise fall back to equipment-based
        if ($induction->course_id) {
            return $this->inductionRepository->isTrainerForCourse($user, $induction->course_id);
        }
        
        return $this->inductionRepository->isTrainerForEquipment($user, $induction->key);
    }

    /**
     * Determine whether the user can demote the inductee from being a trainer
     *
     * @param  \BB\Models\User  $user
     * @param  \BB\Models\induction  $induction
     * @return mixed
     */
    public function demote(User $user, Induction $induction)
    {
        // Use course-based authorization if course_id is set, otherwise fall back to equipment-based
        if ($induction->course_id) {
            return $this->inductionRepository->isTrainerForCourse($user, $induction->course_id);
        }
        
        return $this->inductionRepository->isTrainerForEquipment($user, $induction->key);
    }

    /**
     * Determine whether the user can delete the induction.
     *
     * @param  \BB\Models\User  $user
     * @param  \BB\Models\induction  $induction
     * @return mixed
     */
    public function delete(User $user, Induction $induction)
    {
        return $this->inductionRepository->isTrainerForEquipment($user, $induction->key);
    }
}
