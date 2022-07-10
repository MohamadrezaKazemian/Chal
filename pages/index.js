import { useState, useRef, useEffect } from "react";
import { browserName } from "react-device-detect";

import { Button, Input, Form, Modal } from 'antd';
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
                <Input 
                    ref={input} 
                    required={true} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    value={inputValue}
                />
                <Button htmlType="submit" type="primary">ارسال</Button>
            </Form>

            {/* <Modal 
                title="Support!" 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel} 
                footer={null}
                forceRender={false}
            >
                <section className={style.modal}>
                    <h1>Support us!</h1>
                    <div>
                        <a href="google.com">
                            <img 
                                width={100} 
                                src={"https://rmhccnaz.org/wp-content/uploads/Donate-Icon-01.png"}
                            />
                        </a>
                    </div>
                </section>
            </Modal> */}
        </div>
    )
}


