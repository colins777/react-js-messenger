import React from 'react';

export const EventsBusContext = React.createContext();

export const EventsBusProvider = ({children}) => {
    const [events, setEvents] = React.useState({});

    const emit = (name, data) => {
        if (events[name]) {
            for (let callback of events[name]) {
                callback(data)
            }
        }
    }

    const on = (name, callback) => {
        if (!events[name]) {
            events[name] = [];
        }

        events[name].push(callback);

        //stop listening to that event
        return () => {
            events[name] = events[name].filter((_callback) => {
                return _callback !== callback
            })
        }
    }

    return (
        <EventsBusContext.Provider
            value={{emit, on}}
        >
            {children}
        </EventsBusContext.Provider>
    )
}

export const useEventBus = () => {
    return React.useContext(EventsBusContext)
}
