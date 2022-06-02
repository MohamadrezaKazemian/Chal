import {useState, useRef, useEffect} from "react";
import {Button, Input , Form,Modal} from 'antd';
import style from "../style/index.module.scss"
import 'antd/dist/antd.css';
import { motion } from "framer-motion"

const Index = () => {
    const input = useRef(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [messages , setMessages] = useState([
        {
            message : "متن تستی 1"
        },
        {
            message: "متن تستی 2"
        },
        {
            message: "متن تستی 3"
        },

    ])
    const [inputValue , setInputValue] = useState("")
    // handler
    const handleSubmitText = () =>{
        setMessages([...messages , {message: inputValue}])
        setInputValue("")
        location.href = `#${messages.length-1}`;
        input.current.focus();    }
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(()=>{
        setTimeout(showModal , 10000)
    },[])
    return(
        <div className={style.chatRoom}>
            <motion.path
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, type: "tween" }}
                className={style.messages}
            >         {new Date(items?.createdAt.replace(/[^:\d.-]/g, ' ')).toLocaleDateString('fa-IR')
                    messages.map((item , index)=>{
                        return(

                            <span id={index+1}>{item.message}</span>
                        )
                    })
                }
            </motion.path>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={handleSubmitText}
                    autoComplete="off"
                    className={style.form}
                >
                <Input  ref={input} onChange={(e)=>setInputValue(e.target.value)} value={inputValue}/>
                <Button htmlType="submit" type="primary" >ارسال</Button>
                </Form>
            <Modal title="Support!" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}  footer={null}
                   forceRender={false}>
               <div className={style.modal}>
                   <h1>Support us!</h1>
                   <div>
                       <a href="google.com">
                       <img  width={100} src={"https://rmhccnaz.org/wp-content/uploads/Donate-Icon-01.png"}/>
                       </a>
                   </div>
               </div>
            </Modal>
        </div>

    )
}


export default Index