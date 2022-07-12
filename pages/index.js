import { useState, useRef, useEffect } from "react";
import { browserName } from "react-device-detect";
import Image from 'next/image'
import images from "../public/images"

import {Button, Input, Form , Tooltip} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { motion } from "framer-motion"
import style from "../style/index.module.scss"
import 'antd/dist/antd.css';

import Intro from '../components/Intro.js'

import useMessages from '../hooks/useMessages'

export default function Index () {
    const { messages, postMessage, deleteMessage } = useMessages();

    const input = useRef(null)
    const [inputValue, setInputValue] = useState("")
    
    const handleSaveMessage = function () {
        postMessage({
            message : inputValue,
            browserInfo : browserName
        })
        setInputValue("")
        location.href = `#${messages.length - 1}`;
        input.current.focus();
    }

    const handleDeleteMessage = (id) => {
        deleteMessage(id)
    }
    
    // const [isModalVisible, setIsModalVisible] = useState(false);
    // const handleOk = () => {
    //     setIsModalVisible(false);
    // };
    // const handleCancel = () => {
    //     setIsModalVisible(false);
    // };
    // const showModal = () => {
    //     setIsModalVisible(true);
    // };
    // useEffect(() => {
    //     setTimeout(showModal , 10000)
    // }, [])

    return (
        <div className={style.chatRoom}>
            <motion.path
                animate={{pathLength: 1}}
                transition={{duration: 2, type: "tween"}}
                className={style.messages}
            >      
                {messages.length <= 0 ?
                    <Intro />
                    :
                    messages.map((message, i) => (
                        <span 
                            id={i + 1}
                            key={i}
                        >
                            {message.message ? message.message : message.toString()}
                            <div className={style.deleteIcon}>
                                <span onClick={()=>{handleDeleteMessage(message.id)}}>
                                    <CloseOutlined />
                                </span>
                            </div>
                        </span>
                    ))
                }
            </motion.path>

            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
                onFinish={handleSaveMessage}
                autoComplete="off"
                className={style.form}
            >
                <Tooltip title={"Donate"}>
                <a href={"https://zarinp.al/437264"} target={"_blank"}><Image src={images.donateIcon} /> </a>
                </Tooltip>
                <Input 
                    ref={input} 
                    required={true} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    value={inputValue}
                />
                <Button htmlType="submit" type="primary">ارسال</Button>
            </Form>

        </div>
    )
}


