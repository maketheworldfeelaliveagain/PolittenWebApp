import type { Route } from './+types/home';
import { seo } from '@/lib/seo';
import { Hero } from '@/components/home/hero';
import { Parties } from '@/components/home/parties';
export function meta({matches,location}:Route.MetaArgs){return seo({matches,location},{title:'Politten – pažadai turi atmintį',description:'Susipažinkite su 9 Lietuvos partijomis ir 36 pažadais. Sekite jų įgyvendinimo būseną ir vertinimo pagrindimą.',image:'/social.svg',jsonLd:[{'@context':'https://schema.org','@type':'WebSite',name:'Politten',description:'Politten padeda aiškiai sekti politinių partijų pažadus ir jų įgyvendinimo būseną.'},{'@context':'https://schema.org','@type':'Organization',name:'Politten'}]});}
export default function HomePage(){return <main><Hero/><Parties/></main>;}