import {usePage} from "@inertiajs/react";
import {useEffect, useState} from "react";

const ChatLayout = ({children}) => {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;
    const [onlineUsers, setOnlineUsers] = useState({})

    console.log('conversations', conversations);
    console.log('selectedConversation', selectedConversation);

    useEffect(() => {
        //listen channel with name - online
        Echo.join('online')
            .here((users) => {
                console.log('here', users);
            })
            .joining((user) => {
                console.log('joining', user);
            })
            .leaving((user) => {
                console.log('leaving', user);
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
            ChatLayout
            <div>{children}</div>
        </>
    )
}

export default ChatLayout;
