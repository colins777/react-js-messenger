import {useEffect, useRef, useState} from "react";
const NewMessageInput = function ({value, onChange, onSend}) {

    const input = useRef();

    const onInputKeyDown = (ev) => {
        //if Shift + Enter go to new line
        if (ev.key === 'Enter' && !ev.shiftKey) {
            ev.preventDefault()
            onSend();
        }
    }

    const onChangeEvent = (event) => {
        setTimeout(() => {
            adjustHeight();
        }, 10)
        onChange(event)
    }

    //set input height
    const adjustHeight = () => {
        setTimeout(() => {
            input.current.style.height = 'auto';
            input.current.style.height = input.current.scrollHeight + 1 + 'px';
        }, 100)
    };

    useEffect(() => {
        adjustHeight();
    }, [value])


    return (
        <textarea
            ref={input}
            value={value}
            rows='1'
            placeholder='Type a message...'
            onKeyDown={onInputKeyDown}
            onChange={(event) => onChangeEvent(event)}
            className='input input-bordered w-full rounded w-full rounded-r-none resize-none overflow-y-auto max-h-40 focus:outline-none'
        >

        </textarea>
    );
}

export default NewMessageInput;
