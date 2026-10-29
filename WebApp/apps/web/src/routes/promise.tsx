import type { Route } from './+types/promise';
import { seo } from '@/lib/seo';
import { promises } from '@/data/politten';
import { PromiseDetail } from '@/components/promises/promise-detail';
export function loader({params}:Route.LoaderArgs){const promise=promises.find(p=>p.id===params.promiseId);if(!promise)throw new Response('Pažadas nerastas',{status:404});return {promise};}
export function meta({matches,location,loaderData}:Route.MetaArgs){return seo({matches,location},{title:loaderData?`${loaderData.promise.summary} – Politten`:'Pažadas nerastas – Politten',description:'Pažado tekstas, įgyvendinimo būsena, pažanga ir vertinimo pagrindimas.',image:'/social.svg'});}
export default function PromisePage({loaderData:{promise}}:Route.ComponentProps){return <PromiseDetail promise={promise}/>;}