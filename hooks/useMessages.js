import { useCallback, useEffect, useState } from "react";

import { httpGetMessages, httpDeleteMessage, httpPostMessage } from '../services/messagesServices'

export default () => {
    const [messages, setMessages] = useState([]);
    const [loading , setLoading] = useState(true)

    const getMessages = useCallback(async () => {
        const fetchedMessages = await httpGetMessages();
        setMessages(fetchedMessages);
        setLoading(false)
    }, []);

    const postMessage = useCallback(async (message) => {
        setLoading(true)
         try {
            await httpPostMessage(message)
            getMessages()
             setLoading(false)
        } catch (error) {
            throw new Error(error)
        }
    }, [getMessages])

    const deleteMessage = useCallback(async (id) => {
        setLoading(true)
        try {
            await httpDeleteMessage(id)
            getMessages()
            setLoading(false)
        } catch (error) {
            throw new Error(error)
        }
    }, [getMessages])

    useEffect(() => {
        getMessages();
    }, [getMessages]);

    return {
        messages,
        postMessage,
        deleteMessage,
        loading
    }
}