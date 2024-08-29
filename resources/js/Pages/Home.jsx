//inertia.js Docs https://inertiajs.com/pages
//reset users passwords in DB - https://devdojo.com/bobbyiliev/how-to-quickly-change-the-password-for-a-user-in-laravel

import ChatLayout from "@/Layouts/ChatLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {useState, useEffect, useRef} from "react";
import ChatBubbleLeftRightIcon from "@heroicons/react/16/solid/ChatBubbleLeftRightIcon";
import ConversationHeader from "@/Components/App/ConversationHeader";
import MessageItem from "@/Components/App/MessageItem";
import MessageInput from "@/Components/App/MessageInput";

function Home({ messages }) {

    const [localMessages, setlocalMessages] = useState([]);
    const messagesCtrRef = useRef(null);
    const selectedConversation = 0;

    useEffect(() => {
        setlocalMessages(messages)
    }, [messages])


    return (<>
        {!messages && (
            <div className='flex flex-col gap-8 justify-center items-center text-center h-full opacity-35'>
                <div className='text-2xl md:text-4xl p-16 text-slate-200'>
                    Select conversation to see messages.
                </div>
                <ChatBubbleLeftRightIcon className='w-32 h-32 inline-block' />
            </div>
        )}

        {messages && (
            <>
                <ConversationHeader
                    selectedConversation={selectedConversation}
                />

                {/*Main scrollable area*/}
                <div
                    ref={messagesCtrRef}
                    className='flex-1 overflow-y-auto p-5'
                >
                    {localMessages?.length === 0 && (
                        <div className='flex justify-center items-center h-full'>
                            <div className='text-lg text-slate-200'>
                                No messages found
                            </div>
                        </div>
                    )}

                    {localMessages?.length > 0 && (
                        <div className='flex flex-1 flex-col'>
                            {localMessages.map((message) =>
                                (<MessageItem
                                        key={message.id}
                                        message={message}
                                    />

                                )
                            )}
                        </div>
                    )}

                </div>

                <MessageInput conversation={selectedConversation} />
            </>
        )

        }
    </>)
}

Home.layout = (page) => {
    return (
        <AuthenticatedLayout
            user={page.props.auth.user}
        >
            <ChatLayout children={page} />
        </AuthenticatedLayout>
    )
}

export default Home;
