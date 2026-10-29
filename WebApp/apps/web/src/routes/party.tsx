import { Link } from 'react-router';
import type { Route } from './+types/party';
import { seo } from '@/lib/seo';
import { parties, promises } from '@/data/politten';
import { PromiseList } from '@/components/promises/promise-list';
import { PartyLogo } from '@/components/party-logo';
import { PartyStats } from '@/components/party/party-stats';
export function loader({params}:Route.LoaderArgs){const party=parties.find(p=>p.id===params.partyId);if(!party)throw new Response('Partija nerasta',{status:404});return {party,items:promises.filter(p=>p.partyId===party.id)};}
export function meta({matches,location,loaderData}:Route.MetaArgs){return seo({matches,location},{title:loaderData?`${loaderData.party.short}: pažadai – Politten`:'Partija nerasta – Politten',description:'Peržiūrėkite šios partijos pažadus, jų įgyvendinimo būsenas ir vertinimo pagrindimą.',image:'/social.svg',jsonLd:{'@context':'https://schema.org','@type':'CollectionPage',name:'Partijos pažadai'}});}
export default function PartyPage({loaderData:{party,items}}:Route.ComponentProps){return <main className="page-shell party-shell" style={{'--party-color':party.color} as React.CSSProperties}><Link className="back-link" to="/#partijos">← Visos partijos</Link><div className="page-intro party-intro"><div className="party-intro-head"><PartyLogo party={party} size={64}/><div><p className="eyebrow">PARTIJOS PROFILIS</p><h1 className="party-title">{party.name}</h1></div></div><p>Iš viso pažadų – {items.length}.</p></div><PartyStats items={items}/><PromiseList items={items}/></main>;}
