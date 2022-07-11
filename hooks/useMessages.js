import { useCallback, useEffect, useState } from "react";

import { httpGetMessages, httpDeleteMessage, httpPostMessage } from '../services/messagesServices'

export default () => {
    const [messages, setMessages] = useState([]);

    const getMessages = useCallback(async () => {
        const fetchedMessages = await httpGetMessages();
        setMessages(fetchedMessages);
    }, []);

    const postMessage = useCallback(async (message) => {
        try {
            await httpPostMessage(message)
            getMessages()
        } catch (error) {
            throw new Error(error)
        }
    }, [getMessages])

    const deleteMessage = useCallback(async (id) => {
        try {
            await httpDeleteMessage(id)
            getMessages()
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
        deleteMessage
    }
}