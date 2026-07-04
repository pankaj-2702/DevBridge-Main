import { useState , useEffect } from "react";
import MessageBubble from "../../components/contract/MessageBubble";
import ChatHeader from "../../components/contract/ChatHeader";
import MessageInput from '../../components/contract/ChatInput';
import ContractSummary from "../../components/contract/ContractSummary";
import UniversalPageSkeleton from "../../components/Skeleton/UniversalPageSkeleton";
import { useParams } from "react-router-dom";
import { getContractById } from "../../services/contractService";
import { getMessages ,sendMessage } from "../../services/messageService";
import styles from "./ContractChat.module.css";
const ContractChat =()=>{

const { id } = useParams();

const [contract, setContract] = useState(null);

const [messages, setMessages] = useState([]);

const [loading, setLoading] = useState(true);

const [message, setMessage] = useState("");

const [nextCursor, setNextCursor] = useState(null);

const [hasMore, setHasMore] = useState(false);


useEffect(() => {

    const loadData = async () => {

        try {

            const contractData = await getContractById(id);

            setContract(contractData.contract);

            const messageData = await getMessages(id);

            setMessages(messageData.messages);

            setNextCursor(messageData.nextCursor);

            setHasMore(messageData.hasMore);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    loadData();

}, [id]);

  if (loading) return <UniversalPageSkeleton />;

const handleSend = async () => {

    if (!message.trim()) return;

    try {

        const data = await sendMessage(id, message);

        setMessages(prev => [

            ...prev,

            data.message

        ]);

        setMessage("");

    } catch (err) {

        console.log(err);

    }

};

    return (
       <div className={styles.layout}>

    <div className={styles.chatSection}>

        <ChatHeader contract={contract} />

        {messages.map(message => (

            <MessageBubble
                key={message._id}
                message={message}
            />

        ))}

        <MessageInput
            value={message}
            setValue={setMessage}
            onSend={handleSend}
        />

    </div>

    <ContractSummary contract={contract} />

</div>
    )
}

export default ContractChat