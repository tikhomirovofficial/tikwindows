import React, {useEffect, useState} from 'react';
import Window from "./components/Window";
import {WindowPropsType} from './types/index'

function App() {
    const [activeWindow, setActiveWindow] = useState<number>(1)
    const [windows, setWindows] = useState<WindowPropsType[]>([
        {
            height: 300, id: 1, title: "sad", width: 500, x: 200, y: 100
        },
        {
            height: 300, id: 2, title: "sad1", width: 500, x: 300, y: 150
        }
    ])
    const handleActiveWindow = (window_id: number) => setActiveWindow(window_id)

    const handleMoveWindow = (window_id: number, new_x: number, new_y: number) => {
        setWindows(prev => [...prev.map(
            (item) => {
                if(item.id === window_id) {
                    return {
                        ...item,
                        x: new_x,
                        y: new_y
                    }
                }
                return item
            })
        ])
    }
    useEffect(() => {
        //handleMoveWindow(1, 100, 400)
    }, [])

    return (
        <div className="App">
            {
                windows.map((item) => (
                    <Window handleMoveWindow={handleMoveWindow} key={item.id} setActive={handleActiveWindow} isActive={item.id === activeWindow}
                            id={item.id} title={item.title} width={item.width} height={item.height} x={item.x}
                            y={item.y}/>
                ))
            }
        </div>
    );
}

export default App;
