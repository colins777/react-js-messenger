import {useEffect, useState} from "react";
import {
    PaperClipIcon,
    PhotoIcon,
    FaceSmileIcon,
    HandThumbUpIcon,
    PaperAirplaneIcon
} from "@heroicons/react/24/solid"
import NewMessageInput from './NewMessageInput'

const MessageInput = function ({conversation = null}) {

    const [newMessage, setNewMessage] = useState('');
    const [inputErrorMessage, setInputErrorMessage] = useState('');
    const [messageSending, setMessageSending] = useState(false);
    //console.log('selectedConversation', conversation);

    const onSendMessageClick = () => {
        if (newMessage.trim() === '') {
            setInputErrorMessage('Message field is empty.');

            setTimeout(() => {
                setInputErrorMessage('');
            }, 3000)
            return;
        }

        const formData = new FormData();
        formData.append('message', newMessage);

        if (conversation.is_user) {
            formData.append('receiver_id', conversation.id)
        } else if (conversation.is_group) {
            formData.append('group_id', conversation.id)
        }

        console.log('conversation', conversation);
        //console.log('formData', formData);

        setMessageSending(true)


        axios.post(route('message.store'), formData, {
            onUploadProgress: (progressEvent) => {
                const progress = Math.round(progressEvent.loaded / progressEvent.total) * 100;
                console.log('progress', progress); // Optional for debugging
            }
        }).then((response) => {
            setNewMessage('');
            setMessageSending(false);
        }).catch((error) => {
            setMessageSending(false);
        })
    }

    return (
        <div className='flex flex-wrap items-start border-t border-slate-700 py-3'>
            <div className='order-2 flex-1 xs:flex-none xs:order-1 p-2'>
                <button className='p-1 text-gray-400 cursor-pointer hover:text-gray-300 relative'>
                    <PaperClipIcon className='w-6 ' />
                    <input
                        type="file"
                        multiple
                        className='absolute left-0 top-0 right-0 bottom-0 z-20 opacity-0'
                    />
                </button>

                <button className='p-1 text-gray-400 cursor-pointer hover:text-gray-300 relative'>
                    <PhotoIcon className='w-6 '/>
                    <input
                        type="file"
                        multiple
                        accept='image/*'
                        className='absolute left-0 top-0 right-0 bottom-0 z-20 opacity-0 cursor-pointer'
                    />
                </button>

            </div>
            <div className='order-1 px-3 xs:p-0 min-w-[220px] basis-full xs:basis-0 xs:order-2 flex-1 relative'>
                <div className='flex'>
                    <NewMessageInput
                        value={newMessage}
                        onSend={onSendMessageClick}
                         onChange={(event) => setNewMessage(event.target.value)}
                    />

                    <button className='btn btn-info rounded-l-none'
                            onClick={onSendMessageClick}
                    >
                        {messageSending && (
                            <span className='loading loading-spinner loading-xs'></span>
                        )}
                        <PaperAirplaneIcon className='w-6' />
                        <span className='hidden sm:inline'>Send</span>
                    </button>
                </div>

                {inputErrorMessage && (
                    <p className='text-xs text-red-400'>{inputErrorMessage}</p>
                )}

            </div>

            <div className='order-3 xs:order-3 p-2 flex'>
                <button className='p-1 text-gray-400 hover:text-gray-300'>
                   <FaceSmileIcon className='w-6 h-6' />
                </button>

                <button className='p-1 text-gray-400 hover:text-gray-300'>
                    <HandThumbUpIcon className='w-6 h-6' />
                </button>
            </div>
        </div>
    );
}

export default MessageInput;
