import {usePage} from "@inertiajs/react";
import {useEffect, useState} from "react";
import PencilSquareIcon from "@heroicons/react/16/solid/PencilSquareIcon";
import TextInput from "@/Components/TextInput";
import ConversationBlock from "@/Components/App/ConversationBlock";

const ChatLayout = ({children}) => {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;
    const [onlineUsers, setOnlineUsers] = useState({});
    const [localConversations, setLocalConversations] = useState([]);
    const [sortedConversations, setSortedConversations] = useState([]);

    const isUserOnline = (userId) => {
        return onlineUsers[userId]
    };

   // console.log('conversations', conversations);
   // console.log('selectedConversation', selectedConversation);

    const onSearch = (e) => {
        const search = e.target.value.toLowerCase();
        setLocalConversations(
            conversations.filter((conversation) => {
                return conversation.name.toLowerCase.includes(search)
            })
        )
    }

    useEffect(() => {
        setSortedConversations(
            localConversations.sort((a, b) => {
                //set blocked conversation on bottom of list a = -1 =>first
                if (a.blocked_at && b.blocked_at) {
                    return a.blocked_at > b.blocked_at ? 1 : -1
                } else if (a.blocked_at) {
                    return 1;
                } else if (b.blocked_at) {
                    return -1;
                }

                if (a.last_message_date && b.last_message_date) {
                    return b.last_message_date.localeCompare(
                        a.last_message_date
                    )
                } else if (a.last_message_date) {
                    return -1;
                } else if (b.last_message_date) {
                    return 1;
                } else {
                    return 0;
                }
            })
        )
    }, [localConversations]);

    useEffect(() => {
        setLocalConversations(conversations)
    }, [conversations]);

    useEffect(() => {
        //listen channel with name - online
        Echo.join('online')
            .here((users) => {
                //console.log('here', users);
                const onlineUserObj = Object.fromEntries(
                    users.map((user) => {
                        return [user.id, user]
                    })
                )

                setOnlineUsers((prevOnlineUsers) => {
                    return {...prevOnlineUsers, ...onlineUserObj}
                })
            })
            .joining((user) => {
                //console.log('joining', user);
                setOnlineUsers((prevOnlineUsers) => {
                    const updatedUsers = {...prevOnlineUsers};
                    updatedUsers[user.id] = user;
                    return updatedUsers;
                })
            })
            .leaving((user) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updatedUsers = {...prevOnlineUsers};
                    delete updatedUsers[user.id];
                    return updatedUsers;
                })
            })
            .error((error) => {
                console.log('error', error);
            })

        return () => {
            Echo.leave('online')
        }
    }, [])

    return (
        <>
            <div className="flex-1 w-full flex overflow-hidden">
                <div className={`transition-all w-full sm:w-[220] md:w-[300px] bg-slate-800
                                flex flex-col overflow-hidden ${selectedConversation ? "-ml-100 sm:ml-0" : ''}` }
                >
                    <div className="flex items-center justify-between py-2 px-3 text-xl font-medium">
                        <span className="text-gray-400">My Conversations</span>
                        <div className="tooltip tooltip-left"
                            data-tip="Create new Group"
                        >
                            <button className="text-gray-400 hover:text-gray-200">
                                <PencilSquareIcon className="w-4 h-4 inline-block ml-2" />
                            </button>
                        </div>
                    </div>

                    <div className="p-3">
                        <TextInput
                            onKeyUp={onSearch}
                            placeholder="Filter Users & Groups"
                            className="w-full"
                        />
                    </div>

                    <div className="flex-1 overflow-auto">
                        {sortedConversations &&
                        sortedConversations.map((conversation) => {
                           return (
                               <ConversationBlock
                                   key={`${
                                       conversation.is_group
                                           ? 'group_'
                                           : 'user_'}
                                    ${conversation.id}`}
                                   conversation={conversation}
                                   online={!!isUserOnline(conversation.id)}
                                   selectedConversation={selectedConversation}
                               />
                           )
                        })

                        }
                    </div>

                </div>

                <div className="flex-1 flex flex-col overflow-hidden">
                    {children}
                </div>
            </div>
        </>
    )
}

export default ChatLayout;
