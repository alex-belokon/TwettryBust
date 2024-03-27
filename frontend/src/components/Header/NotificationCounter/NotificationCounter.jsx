import { useEffect, useState } from "react";

export default function NotificationCounter({counter, audioSelector, signal}) {
    const [firstPlaying, setFirstPlaying] = useState(false);
    useEffect(()=>{
        if(firstPlaying) {
          if(counter !== 0 ) {
            const audioElement = document.getElementById(`${audioSelector}`);
            if (audioElement) {
              audioElement.play();
            }
          } 
        } else {
          setFirstPlaying(true);
        }
    
      }, [counter])
    return <>
              <span
                className={
                  counter > 99
                    ? "newMessage__header newMessage__header--little"
                    : "newMessage__header"
                }
              >
                {counter > 99 ? "99+" : counter}
              </span>
              <audio id={audioSelector} src={signal}></audio>
              </>
}

 