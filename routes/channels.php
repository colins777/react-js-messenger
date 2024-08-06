<?php

use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Broadcast;

//return user for connecting to the channel on frontend part
Broadcast::channel('online', function ($user) {
    //return $user;
    return $user ? new UserResource($user) : null;
});
