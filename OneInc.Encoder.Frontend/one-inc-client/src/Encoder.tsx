import { useEffect, useState } from "react";
import * as signalR from '@microsoft/signalr';
import { HubConnection, ISubscription } from "@microsoft/signalr";
import { ActionIcon, Button, TextInput } from "@mantine/core";
import { X } from "tabler-icons-react";
import './Encoder.css'

export const Encoder = () => {
    const [encodedString, setEncodedString] = useState<string>("");
    const [inputString, setInputString] = useState<string>("")
    const [connection, setConnection] = useState<HubConnection>();
    const [stream, setStream] = useState<ISubscription<any>>();
    const [isEncoding, setIsEncoding] = useState<boolean>(false);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${import.meta.env.VITE_HUB_BASE_URL}/encoderHub`)
            .build();

        setConnection(newConnection);
    }, [])

    const handleClick = async () => {
        await connection?.start();

        setEncodedString("");
        setIsEncoding(true);

        const stream = connection?.stream("EncodeToBase64", inputString);

        const streamResult = stream?.subscribe(
            {
                next: (item) => {
                    console.log(encodedString);
                    setEncodedString(prevValue => prevValue + item);
                },
                complete: () => {
                    console.log("Completed!")
                    connection?.stop();
                    setIsEncoding(false);
                },
                error: (error) => {
                    console.error(error)
                    connection?.stop();
                    setIsEncoding(false);
                },
            });

        setStream(streamResult);
    }

    const handleCancel = async () => {
        stream?.dispose();
        connection?.stop();
        setIsEncoding(false);
    }


    return (
        <div className="container">
            <h1>Base64 Encoder</h1>            
            
            {/* <input type="text" value={inputString} disabled={isEncoding} onChange={e => setInputString(e.target.value)} /> <br /> */}
            {(encodedString || isEncoding) && <div>Encoded value: {encodedString}</div>}
            <div className="encode-input">
                <TextInput value={inputString} disabled={isEncoding} onChange={e => setInputString(e.target.value)} />
                {/* {isEncoding && <button onClick={handleCancel}>Cancel</button>} */}
                {isEncoding && <ActionIcon onClick={handleCancel} loading={isEncoding}><X/></ActionIcon>}
            </div>
            {!isEncoding && <Button onClick={handleClick} color="dark">Convert</Button>}
            {isEncoding && <Button onClick={handleCancel} variant="outline" color="dark">Cancel</Button>}
        </div>
    );
}