"use client";

import { useEffect, useRef, useState } from "react";

type Channel=readonly [string,string];
type ChannelGroups=Readonly<Record<string,readonly Channel[]>>;
type ChannelKey="pop"|"super"|"top"|"connect";
type ModalContent={title:string;groups:ChannelGroups};

export default function ChannelsModal() {
  const dialogRef=useRef<HTMLDialogElement>(null);
  const [content,setContent]=useState<ModalContent|null>(null);

  useEffect(()=>{
    const open=async(event:MouseEvent)=>{
      if(!(event.target instanceof Element)) return;
      const button=event.target.closest<HTMLButtonElement>("[data-channel-key]");
      if(!button) return;

      const key=button.dataset.channelKey as ChannelKey;
      const data=await import("./channelData");
      const modal:Record<ChannelKey,ModalContent>={
        pop:{title:"Canais do POP HD",groups:data.popChannels},
        super:{title:"Canais do SUPER HD",groups:data.superChannels},
        top:{title:"Canais do TOP HD",groups:data.topChannels},
        connect:{title:"Canais do SKY CONNECT",groups:data.topChannels},
      };

      if(modal[key]) setContent(modal[key]);
    };

    document.addEventListener("click",open);
    return()=>document.removeEventListener("click",open);
  },[]);

  useEffect(()=>{
    if(content&&!dialogRef.current?.open) dialogRef.current?.showModal();
  },[content]);

  return (
    <dialog
      ref={dialogRef}
      className="channels-modal"
      onClose={()=>setContent(null)}
      onClick={(e)=>e.target===e.currentTarget&&e.currentTarget.close()}
    >
      {content&&(
        <div className="channels-modal-box">
          <div className="channels-modal-header">
            <h2>{content.title}</h2>
            <button type="button" aria-label="Fechar" onClick={()=>dialogRef.current?.close()}>×</button>
          </div>
          <div className="channels-modal-content">
            {Object.entries(content.groups).map(([category,channels])=>(
              <section className="channels-modal-section" key={category}>
                <h3>{category}</h3>
                <div className="channels-modal-grid">
                  {channels.map(([src,name])=>(
                    <div className="channels-modal-item" key={`${category}-${name}`}>
                      <div><img src={src} alt={name} width={90} height={60} loading="lazy" decoding="async" /></div>
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}
    </dialog>
  );
}
