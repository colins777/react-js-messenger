//import {useEffect, useState} from "react";
import { Head, Link, useForm } from '@inertiajs/react';
import ArrowLeftIcon from "@heroicons/react/16/solid/ArrowLeftIcon";
import UserAvatar from "@/Components/App/UserAvatar";
import React from "react";

export default function ConversationHeader({selectedConversation}) {

    return (
        <>
            {selectedConversation && (
                <div className='p-3 flex justify-between items-center border-b border-slate-700'>
                    <div className='flex items-center gap-3'>
                        <Link
                            href={route('dashboard')}
                            className='inline-block sm:hidden'
                        >
                            <ArrowLeftIcon className='w-6' />
                        </Link>

                        {selectedConversation.is_user && (
                            <UserAvatar user={selectedConversation} />
                        )}

                        <div>
                            <h3>{selectedConversation.name}</h3>
                            {selectedConversation.is_group && (
                                <p className='text-xs text-gray-500'>
                                    {selectedConversation.users.length} members
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}
