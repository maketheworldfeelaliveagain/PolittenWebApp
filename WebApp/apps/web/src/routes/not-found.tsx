import { Link } from 'react-router';
import type { Route } from './+types/not-found';
import { seo } from '@/lib/seo';
export function meta({matches,location}:Route.MetaArgs){return seo({matches,location},{title:'Puslapis nerastas – Politten',description:'Šio puslapio nėra. Grįžkite į Politten pradžią ir peržiūrėkite pažadus.',noindex:true});}
export default function NotFound(){return <main className="page-shell page-intro"><p className="eyebrow">404</p><h1>Puslapis nerastas.</h1><p>Patikrinkite adresą arba grįžkite į pradžią.</p><Link className="primary-button" to="/">Grįžti į pradžią</Link></main>;}