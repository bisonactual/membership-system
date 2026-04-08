<?php

namespace BB\Http\Controllers;

use BB\Models\EquipmentArea;
use BB\Models\MaintainerGroup;
use BB\Http\Requests\StoreMaintainerGroupRequest;
use BB\Http\Requests\UpdateMaintainerGroupRequest;
use BB\Repo\UserRepository;
use FlashNotification;

class MaintainerGroupController extends Controller
{
    /** @var UserRepository */
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
        $this->authorizeResource(MaintainerGroup::class, 'maintainer_group');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $maintainerGroups = MaintainerGroup::with('maintainers')->orderBy('name', 'ASC')->get();
        return \Inertia\Inertia::render('MaintainerGroups/Index', compact('maintainerGroups'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $memberList = $this->userRepository->getAllAsDropdown();
        $equipmentAreaOptions = EquipmentArea::orderBy('name', 'ASC')->pluck('name', 'id');

        return \Inertia\Inertia::render('MaintainerGroups/Create', compact('memberList', 'equipmentAreaOptions'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreMaintainerGroupRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMaintainerGroupRequest $request)
    {
        $maintainerGroup = MaintainerGroup::create($request->all());
        $maintainerGroup->maintainers()->sync($request->input('maintainers'));

        return redirect()->route('maintainer_groups.show', $maintainerGroup);
    }

    /**
     * Display the specified resource.
     *
     * @param  \BB\Models\MaintainerGroup  $maintainerGroup
     * @return \Illuminate\Http\Response
     */
    public function show(MaintainerGroup $maintainerGroup)
    {
        return \Inertia\Inertia::render('MaintainerGroups/Show', compact('maintainerGroup'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \BB\Models\MaintainerGroup  $maintainerGroup
     * @return \Illuminate\Http\Response
     */
    public function edit(MaintainerGroup $maintainerGroup)
    {
        $memberList = $this->userRepository->getAllAsDropdown();
        $equipmentAreaOptions = EquipmentArea::orderBy('name', 'ASC')->pluck('name', 'id');

        return \Inertia\Inertia::render('MaintainerGroups/Edit', compact('maintainerGroup', 'memberList', 'equipmentAreaOptions'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateMaintainerGroupRequest  $request
     * @param  \BB\Models\MaintainerGroup  $maintainerGroup
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMaintainerGroupRequest $request, MaintainerGroup $maintainerGroup)
    {
        $maintainerGroup->update($request->all());
        $maintainerGroup->maintainers()->sync($request->input('maintainers'));

        return redirect()->route('maintainer_groups.show', $maintainerGroup);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \BB\Models\MaintainerGroup  $maintainerGroup
     * @return \Illuminate\Http\Response
     */
    public function destroy(MaintainerGroup $maintainerGroup)
    {
        $maintainerGroup->delete();
        FlashNotification::success("Equipment Area, {$maintainerGroup->name}, deleted successfully.");

        return redirect()->route('maintainer_groups.index');
    }
}
