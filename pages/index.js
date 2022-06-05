import {useState, useRef, useEffect} from "react";
import {Button, Input, Form, Modal} from 'antd';
import style from "../style/index.module.scss"
import 'antd/dist/antd.css';
import React from 'react'
import {motion} from "framer-motion"
// pages/index.tsx
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();


export async function getServerSideProps() {
    const userMessages = await prisma.user.findMany();
    console.log(userMessages);

    return {
        props: {
            messages: userMessages
        }
    }
}

async function savedMessage(message) {
    const response = await fetch('/api/contacts', {
        method: "POST",
        body: JSON.stringify(message)
    });
    return await response.json();
}

async function deleteMessage(messageContent) {
    const response = await fetch('/api/delete', {
        method: "Delete",
        body: JSON.stringify(messageContent)
    })
    if (response.ok) {
        location.reload()
    }
    return await response.json();
}


const Index = (userMessages) => {
    const [content, setContent] = useState(userMessages.messages)
    console.log(content)
    const input = useRef(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState("")

    // handler
    const handleSubmitText = async function () {
        await savedMessage(inputValue)
        setContent([...content, inputValue])
        setInputValue("")
        location.href = `#${content.length - 1}`;
        input.current.focus();
    }

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        // setTimeout(showModal , 10000)
    }, [])
    return (

        <div className={style.chatRoom}>
            <motion.path
                animate={{pathLength: 1}}
                transition={{duration: 2, type: "tween"}}
                className={style.messages}
            >         {
                content.length < 1 ?
                    <div className={style.firstTime}>
                        <h1 className={style.preTitle}>چال کن خو یکم : )</h1>
                        <div className={style.arrow}>
                            <h2>از اینجا میتونی اولین پیامتو بنویسی!</h2>
                            <img src={"http://assets.stickpng.com/images/58f8bcf70ed2bdaf7c128307.png"}/>
                        </div>
                    </div>
                    :
                    content.map((item, index) => {
                        return (
                            <span onClick={() => deleteMessage(item.message)} id={index + 1}
                                  key={index}>{item.message ? item.message : item.toString()}
                                <div>

                                </div>
                            </span>
                        )
                    })

            }
            </motion.path>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
                onFinish={handleSubmitText}
                autoComplete="off"
                className={style.form}
            >
                <Input ref={input} required={true} onChange={(e) => setInputValue(e.target.value)} value={inputValue}/>
                <Button htmlType="submit" type="primary">ارسال</Button>
            </Form>
            <Modal title="Support!" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}
                   forceRender={false}>
                <div className={style.modal}>
                    <h1>Support us!</h1>
                    <div>
                        <a href="google.com">
                            <img width={100} src={"https://rmhccnaz.org/wp-content/uploads/Donate-Icon-01.png"}/>
                        </a>
                    </div>
                </div>
            </Modal>
        </div>

    )
}


export default Index