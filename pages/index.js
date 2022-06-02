import {useState , useRef} from "react";
import {Button, Input} from 'antd';
import style from "../style/index.module.scss"
import 'antd/dist/antd.css';
import { motion } from "framer-motion"

const Index = () => {
    const ref = useRef()
    console.log(ref)
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
    console.log(inputValue)
    // handler
    const handleSubmitText = () =>{
        setMessages([...messages , {message: inputValue}])
        setInputValue("")
        location.href = `#${messages.length-1}`;
    }
    return(
        <div className={style.chatRoom}>
            <motion.path
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, type: "tween" }}
                className={style.messages}
            >         {new Date(items?.createdAt.replace(/[^:\d.-]/g, ' ')).toLocaleDateString('fa-IR')
                    messages.map((item , index)=>{
                        return(

                            <span id={index+1} ref={ref}>{item.message}</span>
                        )
                    })
                }
            </motion.path>
            <div className={style.form}>
                <Input onChange={(e)=>setInputValue(e.target.value)} value={inputValue}/>
                <Button type="primary" onClick={handleSubmitText}>ارسال</Button>
            </div>

        </div>

    )
}


export default Index