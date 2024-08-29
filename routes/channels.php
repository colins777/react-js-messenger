<?php

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

//return user for connecting to the channel on frontend part
Broadcast::channel('online', function (User $user) {
    //return $user;
    return $user ? new UserResource($user) : null;
});

//channel for users
Broadcast::channel('message.user.{userId1}-{userId2}', function (User $user, int $userId1, int $userId2) {

    return $user->id === $userId1 || $user->id === $userId2 ? $user : null;

});

//channel for group messages
Broadcast::channel('message.group.{groupId}', function (User $user, int $groupId) {

    return $user->groups->contains('id', $groupId) ? $user : null;

});
