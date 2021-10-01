import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:4000')

function Temp() {
    const [value, setValue] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket.on('message', (x) => {
            setMessages([...messages, x.value])
        })
    }, [messages])

    const send = () => {
        socket.emit('message', {value})
        setValue('')
    }

    const textCh = (e) => {
        setValue(e.target.value)
    }

    const renderChat = () => {
        return messages.map((value, i) => (
            <div key={i}>
                <text>{value}</text>
            </div>
        ))
    }

    return (
        <div>
            <input onChange={textCh} value={value} />
            <button onClick={send}>send</button>
            <br/>
            chat log
            <div>
                {renderChat()}
            </div>
        </div>
    )
}

export default Temp
