import {useEffect, useState} from "react";
import {
    PaperClipIcon,
    PhotoIcon,
    FaceSmileIcon,
    HandThumbUpIcon,
    PaperAirplaneIcon
} from "@heroicons/react/24/solid"
//import NewMessageInput from './NewMessageInput'

const NewMessageInput = function ({conversation = null}) {

    const [newMessage, setNewMessage] = useState();
    const [inputErrorMessage, setInputErrorMessage] = useState();
    const [messageSending, setMessageSending] = useState();

    return (
        <div className='flex flex-wrap items-start border-t border-slate-700 py-3'>
            NewMessageInput
        </div>
    );
}

export default NewMessageInput;
