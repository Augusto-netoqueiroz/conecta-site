"use client";

import Image from "next/image";
import { useState } from "react";
import TrackedLink from "./TrackedLink";
import { plans } from "./planData";
import styles from "./PlanCustomizer.module.css";

const phone="5561982254730";
const alaCarteBase="/img/CANAIS%20A%20LA%20CARTE";

type OptionalConfig={id:string;name:string;promoPrice:number;regularPrice:number;image:string;detail?:string};

const optionals=[
  {id:"telecine",name:"Telecine",promoPrice:29.9,regularPrice:29.9,image:"logo-telecine-ALA.webp"},
  {id:"hbo",name:"HBO HD",promoPrice:39.9,regularPrice:39.9,image:"logo-hbo-ALA.webp"},
  {id:"disney",name:"Disney+",promoPrice:19.9,regularPrice:46.9,image:"logo-disney-plus-ALA.webp"},
  {id:"paramount",name:"Paramount+",promoPrice:27.9,regularPrice:27.9,image:"logo-paramount-plus-ALA.webp"},
  {id:"ufc",name:"UFC Fight Pass",promoPrice:29.9,regularPrice:29.9,image:"logo-ufc-ALA.webp"},
  {id:"premiere",name:"Premiere HD",promoPrice:59.9,regularPrice:59.9,image:"logo-premiere-ALA.webp"},
  {id:"combate",name:"Combate",promoPrice:34.9,regularPrice:34.9,image:"logo-combate-ALA.webp"},
  {id:"sportynet",name:"SportyNet+",promoPrice:29.9,regularPrice:29.9,image:"logo-sportynet-ALA.webp"},
  {id:"esr",name:"ESR HD",promoPrice:7.9,regularPrice:7.9,image:"logo-esr-ALA.webp"},
  {id:"espn6",name:"ESPN 6",promoPrice:11.9,regularPrice:11.9,image:"logo-espn6-ALA.webp"},
  {id:"dogtv",name:"DOG TV HD",promoPrice:19.9,regularPrice:19.9,image:"logo-dogtv-ALA.webp"},
  {id:"internacionais",name:"Canais Internacionais",promoPrice:16.9,regularPrice:16.9,image:"logo-dw-ALA.webp",detail:"DW, RAI, TV5, TVE, RTP e NHK"},
  {id:"nhk",name:"NHK World Premium",promoPrice:25.9,regularPrice:25.9,image:"logo-nhk-world-premium-ALA.webp"},
  {id:"mundo",name:"Pacote Mundo",promoPrice:39.9,regularPrice:39.9,image:"logo-26-ALA.webp",detail:"DW, RAI, RTPi, TV5 Monde, TV Espanha e Canal 26"}
] as const satisfies readonly OptionalConfig[];

type OptionalId=(typeof optionals)[number]["id"];

type CustomPlan={
  name:string;
  highlight:string;
  summary:string[];
  logos:readonly (readonly [string,string])[];
  mainChannels:readonly (readonly [string,string])[];
  channelKey:"super"|"top"|"connect";
  promoBase:number;
  regularBase:number;
  fixedPoints?:number;
  includedOptionals?:readonly OptionalId[];
  previewOptionals?:readonly OptionalId[];
};

const sourcePlans=new Map(plans.map(plan=>[plan.name,plan]));

const customPlans:CustomPlan[]=[
  {
    name:"SUPER HD",highlight:"+100 CANAIS",summary:["Filmes • Séries • Esportes"],
    logos:sourcePlans.get("SUPER HD")?.logos??[],mainChannels:sourcePlans.get("SUPER HD")?.mainChannels??[],
    channelKey:"super",promoBase:59.9,regularBase:89.9,
    previewOptionals:["premiere","hbo","telecine","paramount"]
  },
  {
    name:"TOP HD",highlight:"+170 CANAIS",summary:["Filmes • Séries • Esportes"],
    logos:sourcePlans.get("TOP HD")?.logos??[],mainChannels:sourcePlans.get("TOP HD")?.mainChannels??[],
    channelKey:"top",promoBase:99.9,regularBase:129.9,
    previewOptionals:["premiere","hbo","telecine","disney"]
  },
  {
    name:"SKY CONNECT",highlight:"PACOTE COMPLETO",summary:["TV • Streaming • Esportes"],
    logos:sourcePlans.get("SKY CONNECT")?.logos??[],mainChannels:sourcePlans.get("SKY CONNECT")?.mainChannels??[],
    channelKey:"connect",promoBase:369.9,regularBase:399.9,fixedPoints:4,
    includedOptionals:["premiere","hbo","telecine","paramount","disney"]
  }
];

const currency=new Intl.NumberFormat("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2});
const formatPrice=(value:number)=>currency.format(value);

function buildWhatsAppMessage(plan:CustomPlan,points:number,selected:Set<OptionalId>,promo:number,regular:number){
  const names=optionals.filter(item=>selected.has(item.id)).map(item=>item.name);
  const lines=[
    `Olá, tenho interesse no plano SKY ${plan.name}.`,
    `Pontos: ${points}.`,
    names.length?`Opcionais: ${names.join(", ")}.`:"Sem opcionais adicionais."
  ];
  if(selected.has("premiere")&&selected.has("combate")) lines.push("Combo Premiere + Combate aplicado por R$ 79,90/mês.");
  lines.push(`Total do 1º ao 4º mês: R$ ${formatPrice(promo)}/mês.`);
  lines.push(`A partir do 5º mês: R$ ${formatPrice(regular)}/mês.`);
  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
}

type AlaCarteProps={
  preview:typeof optionals[number][];
  included:Set<OptionalId>;
  selected:Set<OptionalId>;
  open:boolean;
  toggle:(id:OptionalId)=>void;
  toggleOpen:()=>void;
};

function AlaCarte({preview,included,selected,open,toggle,toggleOpen}:AlaCarteProps){
  return <>
    <div className={styles.alaCarteIntro}>
      <strong>Quer incluir algum canal extra neste plano?</strong>
      <span>
  Selecione suas opções e veja o <b>valor final da sua mensalidade.</b>
</span>
    </div>
    <button
      type="button"
      className={`${styles.customizeButton} ${preview.length?styles.customizeButtonWithLogos:""}`}
      onClick={toggleOpen}
      aria-expanded={open}
    >
      <span className={styles.customizeContent}>
        <span className={styles.customizeText}>
          {open?"FECHAR OPCIONAIS":"ESCOLHER A LA CARTE"}
        </span>
        {preview.length>0&&(
          <span className={styles.previewLogos}>
            {preview.map(optional=>(
              <span className={styles.previewLogo} data-logo={optional.id} key={optional.id}>
                <img src={`${alaCarteBase}/${optional.image}`} alt={optional.name} width="82" height="42" loading="lazy" decoding="async"/>
              </span>
            ))}
          </span>
        )}
      </span>
      <b>{open?"−":"+"}</b>
    </button>

    {open&&(
      <div className={styles.optionalsBox}>
        <div className={styles.optionalsHeader}>
          <strong>Adicione seus opcionais</strong>
          <span>O valor atualiza automaticamente</span>
        </div>

        <div className={styles.optionalsList}>
          {optionals.map(optional=>{
            const isIncluded=included.has(optional.id);
            const isSelected=selected.has(optional.id);
            return(
              <button
                type="button"
                className={`${styles.optionalItem} ${isSelected?styles.selectedOptional:""} ${isIncluded?styles.includedOptional:""}`}
                key={optional.id}
                onClick={()=>toggle(optional.id)}
                disabled={isIncluded}
                aria-pressed={isSelected}
              >
                <span className={styles.optionalLogo}>
                  <img src={`${alaCarteBase}/${optional.image}`} alt="" width="92" height="48" loading="lazy" decoding="async"/>
                </span>

                <span className={styles.optionalText}>
                  <strong>{optional.name}</strong>
                  {"detail" in optional&&optional.detail&&<small>{optional.detail}</small>}
                  {optional.id==="disney"&&!isIncluded&&<small>R$ 46,90 a partir do 5º mês</small>}
                </span>

                <span className={styles.optionalPrice}>
                  {isIncluded?<b>INCLUSO</b>:<><small>+</small> R$ {formatPrice(optional.promoPrice)}</>}
                </span>
              </button>
            );
          })}
        </div>

        {selected.has("premiere")&&selected.has("combate")&&!included.has("premiere")&&(
          <div className={styles.comboNotice}>Premiere + Combate: combo aplicado por R$ 79,90/mês.</div>
        )}
      </div>
    )}
  </>;
}

function CustomPlanCard({plan}:{plan:CustomPlan}){
  const [points,setPoints]=useState(plan.fixedPoints??1);
  const [selected,setSelected]=useState<Set<OptionalId>>(new Set());
  const [open,setOpen]=useState(false);
  const included=new Set<OptionalId>(plan.includedOptionals??[]);
  const preview=optionals.filter(optional=>plan.previewOptionals?.includes(optional.id));
  const alaCarteBottom=plan.channelKey==="super"||plan.channelKey==="top";
  const extraPoints=plan.fixedPoints?0:points===2?20:0;

  let promoOptionals=0;
  let regularOptionals=0;

  optionals.forEach(optional=>{
    if(!selected.has(optional.id)||included.has(optional.id)) return;
    promoOptionals+=optional.promoPrice;
    regularOptionals+=optional.regularPrice;
  });

  if(selected.has("premiere")&&selected.has("combate")&&!included.has("premiere")&&!included.has("combate")){
    promoOptionals-=14.9;
    regularOptionals-=14.9;
  }

  const promo=plan.promoBase+extraPoints+promoOptionals;
  const regular=plan.regularBase+extraPoints+regularOptionals;

  const toggleOptional=(id:OptionalId)=>{
    if(included.has(id)) return;
    setSelected(current=>{
      const next=new Set(current);
      next.has(id)?next.delete(id):next.add(id);
      return next;
    });
  };

  const alaCarte=(
    <AlaCarte
      preview={preview}
      included={included}
      selected={selected}
      open={open}
      toggle={toggleOptional}
      toggleOpen={()=>setOpen(value=>!value)}
    />
  );

  const whatsapp=buildWhatsAppMessage(plan,points,selected,promo,regular);

  return(
    <article className={`reference-plan ${styles.customCard} ${plan.channelKey==="connect"?styles.connectCard:""}`}>
      <div className="plan-red-top">
        <div className="plan-name">
          <span>SKY PÓS-PAGO</span>
          <strong>{plan.name}</strong>
          <b className="plan-highlight">{plan.highlight}</b>
          {plan.summary.map(line=><p className="plan-summary" key={line}>{line}</p>)}
        </div>
        <span className="plan-top-badge">
          {plan.fixedPoints?`${plan.fixedPoints} PONTOS INCLUSOS`:`${points} ${points===1?"PONTO":"PONTOS"}`}
        </span>
      </div>

      <div className="plan-white-body">
        <div className="plan-logo-grid">
          {plan.logos.map(([src,alt])=>(
            <div className="plan-logo-item" key={src}>
              <Image src={`/img/campaign/${src}`} alt={alt} width={160} height={90} unoptimized/>
            </div>
          ))}
        </div>

        {!alaCarteBottom&&alaCarte}

        <div className={styles.pointsBox}>
          <div>
            <strong>Pontos de TV</strong>
            <span>{plan.fixedPoints?"O SKY CONNECT já inclui 4 pontos":"Escolha 1 ou 2 pontos"}</span>
          </div>

          {plan.fixedPoints?(
            <b className={styles.fixedPoints}>4 pontos</b>
          ):(
            <div className={styles.pointButtons}>
              <button type="button" className={points===1?styles.activePoint:""} onClick={()=>setPoints(1)}>1 ponto</button>
              <button type="button" className={points===2?styles.activePoint:""} onClick={()=>setPoints(2)}>
                2 pontos
                <small>+ R$ 20,00</small>
              </button>
            </div>
          )}
        </div>

        <div className="plan-channel-preview">
          <strong className="plan-channel-title">Principais canais</strong>

          <div className="plan-channel-icons">
            {plan.mainChannels.map(([src,alt])=>(
              <Image key={alt} src={src} alt={alt} width={90} height={50} unoptimized/>
            ))}
          </div>

          <button className="plan-more-channels" type="button" data-channel-key={plan.channelKey}>VER MAIS CANAIS</button>
        </div>

        <div className={styles.totalBox}>
          <div className={styles.mainTotal}>
            <span>1º ao 4º mês</span>
            <strong>R$ {formatPrice(promo)}<small>/mês</small></strong>
          </div>

          <div className={styles.regularTotal}>
            <span>A partir do 5º mês</span>
            <strong>R$ {formatPrice(regular)}<small>/mês</small></strong>
          </div>
        </div>

        {alaCarteBottom&&alaCarte}

        <TrackedLink
          className="plan-whatsapp"
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          eventName="click_plan"
          eventData={{plan:plan.name,placement:"custom_plan_whatsapp",points}}
        >
          <Image
  src="/img/whatsapp-icon.webp"
  alt=""
  width={18}
  height={18}
  unoptimized
/>
<span>ENVIAR MEU PLANO PELO WHATSAPP</span>
        </TrackedLink>
      </div>
    </article>
  );
}

export default function PlanCustomizer(){
  return(
    <div className={`reference-plan-grid ${styles.customGrid}`}>
      {customPlans.map(plan=><CustomPlanCard key={plan.name} plan={plan}/>)}
    </div>
  );
}