export const parties = [
 {id:'lsdp',name:'Lietuvos socialdemokratų partija',short:'LSDP',monogram:'SD',color:'#c0392b'},
 {id:'ts-lkd',name:'Tėvynės sąjunga-Lietuvos krikščionys demokratai',short:'TS-LKD',monogram:'TS',color:'#1f6f8b'},
 {id:'nemuno-ausra',name:'„Nemuno aušra“',short:'NA',monogram:'NA',color:'#9c5000'},
 {id:'vardan-lietuvos',name:'Demokratų sąjunga „Vardan Lietuvos“',short:'VL',monogram:'VL',color:'#2f5fa8'},
 {id:'liberalu-sajudis',name:'Liberalų sąjūdis',short:'LS',monogram:'LS',color:'#ff9421'},
 {id:'lvzs',name:'Lietuvos valstiečių ir žaliųjų sąjunga',short:'LVŽS',monogram:'VŽ',color:'#4f7a3a'},
 {id:'llra-kss',name:'Lietuvos lenkų rinkimų akcija-Krikščioniškų šeimų sąjunga',short:'LLRA-KŠS',monogram:'LL',color:'#2e8b6f'},
 {id:'nacionalinis-susivienijimas',name:'Nacionalinis susivienijimas',short:'NS',monogram:'NS',color:'#6e0700'},
 {id:'laisve-ir-teisingumas',name:'Laisvė ir teisingumas',short:'LT',monogram:'LT',color:'#7a3b9c'},
];
export const statuses = [
 {label:'Įvykdyta',percent:100}, {label:'Iš dalies įvykdyta',percent:50}, {label:'Vykdoma',percent:25}, {label:'Neįvykdyta',percent:0}, {label:'Nepakanka duomenų',percent:0},
];
const examples: [string,string,string][] = [
 ['Socialinė politika','Plėsti dienos centrų paslaugas senjorams','Įsteigti po vieną papildomą senjorų dienos centrą dešimtyje savivaldybių ir užtikrinti nemokamą konsultavimą.'],
 ['Sveikatos apsauga','Trumpinti laukimą šeimos gydytojo konsultacijai','Penkiose bandomosiose poliklinikose įdiegti bendrą registracijos sistemą ir papildomas vakarines konsultacijas.'],
 ['Švietimas','Suteikti mokykloms daugiau pagalbos specialistų','Dvidešimtyje mokyklų finansuoti papildomą specialiojo pedagogo ir psichologo etatą.'],
 ['Transportas','Atnaujinti regioninių autobusų stoteles','Atnaujinti trisdešimt regioninių stotelių, įrengiant pastoges ir aiškius tvarkaraščius.'],
 ['Krašto apsauga','Atverti civilinės saugos mokymus gyventojams','Surengti nemokamus civilinės saugos mokymus dvylikoje savivaldybių ir parengti prieinamą mokymosi medžiagą.'],
 ['Energetika','Gerinti viešųjų pastatų energinį efektyvumą','Apšiltinti dešimt viešųjų bibliotekų ir įrengti jų energijos sąnaudų stebėseną.'],
 ['Skaitmenizacija','Sujungti savivaldybių paslaugas viename portale','Sukurti bendrą bandomąjį portalą penkių savivaldybių pažymoms ir prašymams teikti.'],
 ['Ekonomika','Padėti mažoms įmonėms eksportuoti','Įsteigti konsultacijų programą penkiasdešimčiai mažų įmonių, rengiančių pirmąjį eksporto planą.'],
 ['Regionai','Išlaikyti mobiliąsias bibliotekas kaimuose','Finansuoti keturis mobiliųjų bibliotekų maršrutus vietovėse, kuriose nėra nuolatinės bibliotekos.'],
 ['Viešasis valdymas','Viešinti savivaldybių projektų eigą','Įdiegti viešą projektų eigą ir išlaidas rodančią lentelę šešiose bandomosiose savivaldybėse.'],
 ['Transportas','Kurti saugesnes perėjas prie mokyklų','Dvidešimtyje perėjų prie mokyklų atnaujinti apšvietimą ir įrengti greičio mažinimo priemones.'],
 ['Sveikatos apsauga','Plėsti mobiliųjų sveikatos komandų darbą','Suburti tris mobiliąsias komandas profilaktiniams patikrinimams atokesnėse gyvenvietėse.'],
 ['Aplinkosauga','Atkurti miestų žaliąsias erdves','Atkurti penkis apleistus miesto parkus, sodinant vietinių rūšių medžius ir įrengiant lietaus sodus.'],
 ['Socialinė politika','Gerinti pagalbą artimuosius slaugantiems žmonėms','Pasiūlyti laikino atokvėpio paslaugas šimtui šeimų trijose bandomosiose savivaldybėse.'],
 ['Energetika','Remti bendruomenių saulės elektrines','Parengti paramos konkursą penkioms bendruomenėms, norinčioms įsirengti bendrą saulės elektrinę.'],
 ['Švietimas','Atverti mokyklų laboratorijas po pamokų','Dešimtyje mokyklų pradėti nemokamus popamokinius gamtos mokslų užsiėmimus.'],
 ['Ekonomika','Supaprastinti leidimus smulkiajam verslui','Sukurti vieną prašymo formą trims dažniausiai smulkiojo verslo naudojamiems savivaldybės leidimams.'],
 ['Žmogaus teisės','Padaryti viešąsias paslaugas prieinamesnes','Pritaikyti aštuonių viešųjų įstaigų informacijos teikimą žmonėms su regos ir klausos negalia.'],
 ['Skaitmenizacija','Mokyti gyventojus saugiai naudotis internetu','Surengti keturiasdešimt nemokamų skaitmeninio saugumo užsiėmimų bibliotekose.'],
 ['Viešasis valdymas','Išbandyti dalyvaujamąjį biudžetą','Trijose savivaldybėse skirti atskirą biudžeto dalį gyventojų siūlomiems ir renkamiems projektams.'],
 ['Žemės ūkis','Padėti ūkiams saugoti dirvožemį','Penkiasdešimtyje ūkių finansuoti dirvožemio tyrimus ir individualius tvaraus ūkininkavimo planus.'],
 ['Aplinkosauga','Įrengti vandens kokybės stebėsenos taškus','Įrengti dvylika naujų vandens kokybės stebėsenos taškų prie mažųjų upių.'],
 ['Regionai','Plėsti vietos bendruomenių erdves','Atnaujinti šešias bendruomenių erdves ir jose sudaryti sąlygas nemokamoms veikloms.'],
 ['Energetika','Mažinti energijos nuostolius kaimo mokyklose','Atlikti penkiolikos kaimo mokyklų energinį auditą ir pakeisti neefektyvų apšvietimą.'],
 ['Švietimas','Kurti papildomas kalbų mokymosi priemones','Parengti nemokamus papildomus lietuvių kalbos mokymosi modulius dešimčiai mokyklų.'],
 ['Socialinė politika','Plėsti popamokinę vaikų priežiūrą','Penkiose savivaldybėse išbandyti pailgintos dienos grupes su subsidijuojama vaikų priežiūra.'],
 ['Transportas','Gerinti priemiesčių susisiekimą','Pridėti po du darbo dienų autobusų reisus keturiuose bandomuosiuose priemiesčių maršrutuose.'],
 ['Žmogaus teisės','Teikti informaciją lengvai suprantama kalba','Parengti dešimt svarbiausių savivaldybės paslaugų aprašų lengvai suprantama kalba.'],
 ['Krašto apsauga','Atnaujinti gyventojų perspėjimo priemones','Penkiose savivaldybėse išbandyti papildomas perspėjimo priemones ir surengti viešą patikrinimą.'],
 ['Viešasis valdymas','Padaryti viešąsias konsultacijas aiškesnes','Parengti vienodą konsultacijų su gyventojais tvarką ir skelbti gautų pasiūlymų atsakymus.'],
 ['Regionai','Skaitmeninti vietos kultūros paveldą','Skaitmeninti trijų regioninių muziejų rinkinius ir paskelbti laisvai prieinamus jų aprašus.'],
 ['Žemės ūkis','Plėsti vietinės produkcijos turgavietes','Atnaujinti keturias turgavietes, įrengiant vietos ūkininkams skirtas prekybos vietas.'],
 ['Ekonomika','Kurti pameistrystės vietas jauniems žmonėms','Finansuoti trisdešimt apmokamų pameistrystės vietų mažose regionų įmonėse.'],
 ['Sveikatos apsauga','Didinti prevencinių patikrų prieinamumą','Penkiose įstaigose pradėti šeštadienines profilaktinių patikrų konsultacijas.'],
 ['Skaitmenizacija','Atverti miestų duomenis gyventojams','Paskelbti dešimt anonimizuotų transporto ir viešųjų erdvių duomenų rinkinių atviru formatu.'],
 ['Aplinkosauga','Išbandyti daugkartinių pakuočių sistemą','Trijose viešosiose įstaigose pradėti daugkartinių maisto pakuočių grąžinimo bandomąją programą.'],
];
const explanations = [
 'Visos numatytos priemonės baigtos. Vertinimas apima pažado apimtį, o ne jo politinę naudą.',
 'Įgyvendinta pusė numatytos apimties. Likusi dalis dar nebaigta, todėl pažanga vertinama 50 %.',
 'Patvirtintas veiksmų planas ir pradėtas bandomasis etapas. Pažanga vertinama 25 %.',
 'Numatytas laikotarpis baigėsi, tačiau priemonė nepradėta. Pažadas vertinamas kaip neįvykdytas.',
 'Turimų duomenų nepakanka išvadai. 0 % žymi nežinomybę ir nėra pažado neįvykdymo įrodymas.'
];
export const promises = examples.map(([category,summary,text],i) => ({
 id:`p${String(i+1).padStart(2,'0')}`,partyId:parties[Math.floor(i/4)].id,category,summary,
 text,status:statuses[i%5],explanation:explanations[i%5],fictional:true,
 evidence:[`Programos veiksmų planas: bandomosios programos veiksmai ir numatyti terminai.`, `Stebėsenos pastaba: pažado būsena – ${statuses[i%5].label.toLowerCase()}.`],
}));
export const categories = [...new Set(promises.map(p=>p.category))].sort((a,b)=>a.localeCompare(b,'lt'));
export type PromiseItem = typeof promises[number];
