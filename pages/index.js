import {useState, useRef, useEffect} from "react";

import {Button, Input, Form, Modal} from 'antd';
import style from "../style/index.module.scss"
import 'antd/dist/antd.css';
import React from 'react'
import {motion} from "framer-motion"
import {PrismaClient} from '@prisma/client';
import {CloseOutlined} from '@ant-design/icons'; //close icon for the note
import {browserName} from "react-device-detect"; //this component will show us the user browser
const prisma = new PrismaClient();


//Getting messages from database
export async function getServerSideProps() {
    const userMessages = await prisma.user.findMany(); //getting data with prisma
    return {
        props: {
            initialMessages: userMessages
        }
    }
}
//this function would save the message in database with POST method
async function savedMessage(message) {
    const response = await fetch('/api/contacts', {
        method: "POST",
        body: JSON.stringify(message)
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}
//here we delete the message by Index
async function deleteMessage(messageContent , setContent , index , content) {
    try {
        await fetch('/api/delete', {
            method: "Delete",
            body: JSON.stringify(messageContent)
        })
        // get new message array
        // setContent(content.filter((x , y)=> y !== index))
    } catch (error) {
        throw new error
    }
}
//the page content function
export default function Index ({initialMessages}) {
    const [content, setContent] = useState(initialMessages)
    console.log(content)
    const input = useRef(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState("")
    // handlers
    const handleSubmitText = async function () {
        await savedMessage(
            {
                message : inputValue,
                browserInfo : browserName
            }
        )
        setContent([...content ,   {
            message : inputValue,
            browserInfo : browserName
        } ])
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
                        <h1 className={style.preTitle}>برنامه هات رو اینجا بنویس : )</h1>
                        <div className={style.arrow}>
                            <h2>از اینجا میتونی اولین برنامت رو بنویسی!</h2>
                            <img src={"http://assets.stickpng.com/images/58f8bcf70ed2bdaf7c128307.png"}/>
                        </div>
                    </div>
                    :
                    content.map((item, index) => {
                        return (
                            <span  id={index + 1}
                                  key={index}>{item.message ? item.message : item.toString()}
                                <div className={style.deleteIcon}>
                                    <span onClick={()=>{
                                        deleteMessage(item.message , setContent , index , content)
                                    }}><CloseOutlined /></span>
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


