import React, {FC, useEffect, useState} from 'react';
import styles from './window.module.scss'
import {WindowPropsType} from "../../types";
import {start} from "repl";

type WindowProps = {
    isActive: boolean,
    setActive: (arg: any) => void
    handleMoveWindow: (window_id: number, new_x: number, new_y: number) => void
}
const Window: FC<WindowPropsType & WindowProps> = ({
                                                       handleMoveWindow,
                                                       setActive,
                                                       isActive,
                                                       id,
                                                       title,
                                                       x,
                                                       y,
                                                       width,
                                                       height
                                                   }) => {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [startedDraggingPosition, setStartedDraggingPosition] = useState({
        x: x,
        y: y
    })
    const handleStopMove = (e: any) => {
        console.log("exit", x, y)
        setIsDragging(false)
    }
    const handleStartMove = (e: any) => {
        setIsDragging(true)
        console.log(`${x}, ${y}`)
        setActive(id)
    }
    const handleMove = (e: {clientX: number, clientY: number }) => {
        if(isDragging) {
            const deltaX = e.clientX - startedDraggingPosition.x
            const deltaY = e.clientY - startedDraggingPosition.y
            handleMoveWindow(id, deltaX, deltaY)
        }
    }
    return (
        <div onMouseMove={handleMove}
             onMouseDown={handleStartMove}
             onMouseUp={handleStopMove} className={styles.window}
             style={{zIndex: isActive ? 999 : 1, width: width, height: height, position: "absolute", left: x, top: y}}>
            <div className={styles.topBar}>
                <div className={styles.windowTitle}>
                    {title}
                </div>
                <div className={styles.topBarBtns}>
                    <div className={styles.topBarItem}></div>
                    <div className={styles.topBarItem}></div>
                    <div className={styles.topBarItem}></div>
                </div>
            </div>
            <div className={styles.windowContent}>
                Content
            </div>
        </div>
    );
};

export default Window