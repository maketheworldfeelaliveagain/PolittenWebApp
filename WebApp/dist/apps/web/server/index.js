import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Link, Links, Meta, NavLink, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, data, isRouteErrorResponse } from "react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, FileText, Heart, Search } from "lucide-react";
import ipaddr from "ipaddr.js";
import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";
// \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
// src/entry.server.tsx
var entry_server_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function appendComponentStack(error, errorInfo) {
	const componentStack = errorInfo?.componentStack;
	if (!(error instanceof Error) || !componentStack || error.stack?.includes(componentStack)) return;
	const separator = componentStack.startsWith("\n") ? "" : "\n";
	try {
		error.stack = `${error.stack ?? `${error.name}: ${error.message}`}${separator}${componentStack}`;
	} catch {}
}
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		const userAgent = request.headers.get("user-agent");
		const readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), 6e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error, errorInfo) {
				appendComponentStack(error, errorInfo);
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
// src/index.css?url
var src_default = "/assets/index-DXOgzSBD.css";
// src/lib/site-origin.server.ts
var LOCAL_HOSTNAMES = /* @__PURE__ */ new Set([
	"localhost",
	"127.0.0.1",
	"0.0.0.0",
	"[::1]"
]);
/**
* The public origin of this site, e.g. `https://example.com`. Use it for
* absolute URLs that leave the app — sitemap `<loc>`, canonical links, `og:url`.
*
* The scheme comes from the hostname because the request cannot report it: TLS
* terminates at the proxy, so `request.url` and `X-Forwarded-Proto` both say
* `http` even for a visitor who arrived over HTTPS. Trusting either publishes
* `http://` URLs that only redirect, which search engines index as a second,
* duplicate site. Every host this app is reachable on serves HTTPS except a
* local `npm run start`, which is where the `curl` checks in the SEO skill run.
*
* `Host` carries the public domain, and only the origin is read, so the `.data`
* suffix React Router adds to `request.url` on client navigations does not
* matter.
*/
var siteOrigin = (request) => {
	const { host, hostname } = new URL(request.url);
	return `${LOCAL_HOSTNAMES.has(hostname) ? "http" : "https"}://${host}`;
};
function HorizonsPreviewScripts() {
	useEffect(() => {
		window.__horizonsHydrated = true;
		window.dispatchEvent(new Event("horizons:hydrated"));
		import("./assets/_virtual_horizons-runtime-DhO5t91P.js");
	}, []);
	return null;
}
// src/components/site-header.tsx
function SiteHeader() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("header", {
		className: "site-header",
		children: [/* @__PURE__ */ jsxs(Link, {
			to: "/",
			className: "wordmark",
			"aria-label": "Politten pradžia",
			children: ["politten", /* @__PURE__ */ jsx("span", { children: "." })]
		}), /* @__PURE__ */ jsxs("nav", {
			"aria-label": "Pagrindinė navigacija",
			children: [
				/* @__PURE__ */ jsx("a", {
					href: "/#partijos",
					children: "Partijos"
				}),
				/* @__PURE__ */ jsxs(NavLink, {
					to: "/pazadai",
					children: ["Visi pažadai ", /* @__PURE__ */ jsx(ArrowUpRight, { size: 15 })]
				}),
				/* @__PURE__ */ jsxs(NavLink, {
					to: "/sekami-pazadai",
					children: [/* @__PURE__ */ jsx(Heart, { size: 15 }), " Sekami pažadai"]
				})
			]
		})]
	}), /* @__PURE__ */ jsxs("div", {
		className: "demo-strip",
		children: [
			/* @__PURE__ */ jsx("span", { className: "signal-dot" }),
			" Išgalvotų duomenų demonstracija ",
			/* @__PURE__ */ jsx("span", {
				className: "strip-extra",
				children: "Ne faktinis politinių partijų vertinimas"
			})
		]
	})] });
}
// src/lib/cookie-consent.ts
var CONSENT_COOKIE = "cc_cookie";
var CONSENT_MAX_AGE_SECONDS = 15724800;
var CONSENT_EVENT = "cc:onConsent";
var CONSENT_CHANGE_EVENT = "cc:onChange";
var PREFERENCES_REQUESTED_EVENT = "horizons:cookie-preferences-requested";
/**
* Cookie categories the visitor chooses between. `Necessary` is always granted.
* The store's Google Analytics stores cookies only with `Analytics`, its Meta Pixel
* loads only with `Marketing`, and checkout lets Hostinger's own analytics
* (Amplitude) use cookies only with `PlatformAnalytics`. Gate any script you add
* the same way.
*/
var CookieConsentCategory = {
	Necessary: "necessary",
	Analytics: "analytics",
	Marketing: "marketing",
	PlatformAnalytics: "platformAnalytics"
};
/** The categories the visitor accepted, or `null` before they have chosen. Browser only. */
function getConsentCategories() {
	if (typeof document === "undefined") return null;
	const prefix = `${CONSENT_COOKIE}=`;
	const cookie = document.cookie.split("; ").find((entry) => entry.startsWith(prefix));
	try {
		const categories = cookie ? JSON.parse(decodeURIComponent(cookie.slice(prefix.length))).categories : null;
		return Array.isArray(categories) ? categories : null;
	} catch {
		return null;
	}
}
function hasConsentDecision() {
	return getConsentCategories() !== null;
}
function isConsentGranted(category) {
	return !!getConsentCategories()?.includes(category);
}
/** Stores the visitor's choice and tells the platform's tracking about it. */
function saveConsent({ analytics, marketing, platformAnalytics }) {
	const isFirstDecision = !hasConsentDecision();
	const categories = [
		CookieConsentCategory.Necessary,
		...analytics ? [CookieConsentCategory.Analytics] : [],
		...marketing ? [CookieConsentCategory.Marketing] : [],
		...platformAnalytics ? [CookieConsentCategory.PlatformAnalytics] : []
	];
	const value = encodeURIComponent(JSON.stringify({
		categories,
		consentTimestamp: (/* @__PURE__ */ new Date()).toISOString()
	}));
	document.cookie = `${CONSENT_COOKIE}=${value}; max-age=${CONSENT_MAX_AGE_SECONDS}; path=/; SameSite=Lax`;
	window.dispatchEvent(new CustomEvent(isFirstDecision ? CONSENT_EVENT : CONSENT_CHANGE_EVENT, { detail: { categories } }));
}
function acceptAllCookies() {
	saveConsent({
		analytics: true,
		marketing: true,
		platformAnalytics: true
	});
}
function rejectOptionalCookies() {
	saveConsent({
		analytics: false,
		marketing: false,
		platformAnalytics: false
	});
}
/** Reopens the preferences for a "Cookie settings" link, typically in the footer. */
function openCookiePreferences() {
	window.dispatchEvent(new Event(PREFERENCES_REQUESTED_EVENT));
}
/** Lets the banner react to `openCookiePreferences`. Returns the unsubscribe function. */
function onCookiePreferencesRequested(callback) {
	window.addEventListener(PREFERENCES_REQUESTED_EVENT, callback);
	return () => window.removeEventListener(PREFERENCES_REQUESTED_EVENT, callback);
}
// src/components/site-footer.tsx
function SiteFooter() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "site-footer",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("a", {
			href: "/",
			className: "footer-brand",
			children: "politten."
		}), /* @__PURE__ */ jsx("p", { children: "Pažadai. Kontekstas. Aiškumas." })] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("button", {
			onClick: openCookiePreferences,
			children: "Slapukų nustatymai"
		}), /* @__PURE__ */ jsx("p", { children: "© 2026 Politten" })] })]
	});
}
// src/hooks/use-cookie-banner.ts
var NO_OPTIONAL_COOKIES = {
	analytics: false,
	marketing: false,
	platformAnalytics: false
};
var grantedChoices = () => ({
	analytics: isConsentGranted(CookieConsentCategory.Analytics),
	marketing: isConsentGranted(CookieConsentCategory.Marketing),
	platformAnalytics: isConsentGranted(CookieConsentCategory.PlatformAnalytics)
});
/**
* Everything the site's cookie banner does, and nothing about how it looks:
* render whatever markup fits the site from these values.
*
* - `isOpen` is false on the server and during hydration, then true until the
*   visitor decides, so the banner never flashes for someone who already chose.
* - A footer "Cookie settings" link calling `openCookiePreferences()` from
*   `@/lib/cookie-consent` reopens it with `isCustomizing` true and the toggles
*   pre-filled from what the visitor granted before.
* - Toggles start unticked: never pre-tick an optional category.
*
*   const banner = useCookieBanner();
*   if (!banner.isOpen) return null;
*   // banner.acceptAll, banner.rejectOptional, banner.customize,
*   // banner.choices + banner.setChoice('analytics', checked), banner.saveChoices
*/
function useCookieBanner() {
	const [isOpen, setIsOpen] = useState(false);
	const [isCustomizing, setIsCustomizing] = useState(false);
	const [choices, setChoices] = useState(NO_OPTIONAL_COOKIES);
	useEffect(() => {
		setIsOpen(!hasConsentDecision());
		return onCookiePreferencesRequested(() => {
			setChoices(grantedChoices());
			setIsCustomizing(true);
			setIsOpen(true);
		});
	}, []);
	const finish = useCallback((save) => {
		save();
		setIsCustomizing(false);
		setIsOpen(false);
	}, []);
	return {
		isOpen,
		isCustomizing,
		choices,
		setChoice: useCallback((category, isGranted) => {
			setChoices((current) => ({
				...current,
				[category]: isGranted
			}));
		}, []),
		customize: useCallback(() => {
			setChoices(grantedChoices());
			setIsCustomizing(true);
		}, []),
		acceptAll: useCallback(() => finish(acceptAllCookies), [finish]),
		rejectOptional: useCallback(() => finish(rejectOptionalCookies), [finish]),
		saveChoices: useCallback(() => finish(() => saveConsent(choices)), [finish, choices])
	};
}
// src/components/cookie-banner.tsx
function CookieBanner() {
	const b = useCookieBanner();
	if (!b.isOpen) return null;
	return /* @__PURE__ */ jsxs("section", {
		className: "cookie-banner",
		role: "dialog",
		"aria-label": "Slapukų pasirinkimai",
		children: [
			/* @__PURE__ */ jsx("strong", { children: "Jūsų privatumas svarbus." }),
			/* @__PURE__ */ jsx("p", { children: "Būtinieji slapukai užtikrina svetainės veikimą. Pasirenkami naudojami tik su jūsų sutikimu." }),
			b.isCustomizing && /* @__PURE__ */ jsxs("fieldset", { children: [/* @__PURE__ */ jsx("legend", { children: "Pasirenkami slapukai" }), [
				["analytics", "Svetainės analitika – lankomumo statistika."],
				["marketing", "Rinkodara – reklamos matavimas ir pritaikymas."],
				["platformAnalytics", "Platformos analitika – Hostinger paslaugų tobulinimas tiesiogiai jūsų neidentifikuojant."]
			].map(([key, label]) => /* @__PURE__ */ jsxs("label", { children: [/* @__PURE__ */ jsx("input", {
				type: "checkbox",
				checked: b.choices[key],
				onChange: (e) => b.setChoice(key, e.target.checked)
			}), label] }, key))] }),
			/* @__PURE__ */ jsxs("div", {
				className: "cookie-actions",
				children: [
					/* @__PURE__ */ jsx("button", {
						onClick: b.rejectOptional,
						children: "Tik būtinieji"
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: b.isCustomizing ? b.saveChoices : b.customize,
						children: b.isCustomizing ? "Išsaugoti pasirinkimą" : "Pasirinkti"
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: b.acceptAll,
						children: "Priimti visus"
					})
				]
			})
		]
	});
}
// src/data/politten.ts
var parties = [
	{
		id: "lsdp",
		name: "Lietuvos socialdemokratų partija",
		short: "LSDP",
		monogram: "SD",
		color: "#c0392b"
	},
	{
		id: "ts-lkd",
		name: "Tėvynės sąjunga-Lietuvos krikščionys demokratai",
		short: "TS-LKD",
		monogram: "TS",
		color: "#1f6f8b"
	},
	{
		id: "nemuno-ausra",
		name: "„Nemuno aušra“",
		short: "NA",
		monogram: "NA",
		color: "#9c5000"
	},
	{
		id: "vardan-lietuvos",
		name: "Demokratų sąjunga „Vardan Lietuvos“",
		short: "VL",
		monogram: "VL",
		color: "#2f5fa8"
	},
	{
		id: "liberalu-sajudis",
		name: "Liberalų sąjūdis",
		short: "LS",
		monogram: "LS",
		color: "#ff9421"
	},
	{
		id: "lvzs",
		name: "Lietuvos valstiečių ir žaliųjų sąjunga",
		short: "LVŽS",
		monogram: "VŽ",
		color: "#4f7a3a"
	},
	{
		id: "llra-kss",
		name: "Lietuvos lenkų rinkimų akcija-Krikščioniškų šeimų sąjunga",
		short: "LLRA-KŠS",
		monogram: "LL",
		color: "#2e8b6f"
	},
	{
		id: "nacionalinis-susivienijimas",
		name: "Nacionalinis susivienijimas",
		short: "NS",
		monogram: "NS",
		color: "#6e0700"
	},
	{
		id: "laisve-ir-teisingumas",
		name: "Laisvė ir teisingumas",
		short: "LT",
		monogram: "LT",
		color: "#7a3b9c"
	}
];
var statuses = [
	{
		label: "Įvykdyta",
		percent: 100
	},
	{
		label: "Iš dalies įvykdyta",
		percent: 50
	},
	{
		label: "Vykdoma",
		percent: 25
	},
	{
		label: "Neįvykdyta",
		percent: 0
	},
	{
		label: "Nepakanka duomenų",
		percent: 0
	}
];
var examples = [
	[
		"Socialinė politika",
		"Plėsti dienos centrų paslaugas senjorams",
		"Įsteigti po vieną papildomą senjorų dienos centrą dešimtyje savivaldybių ir užtikrinti nemokamą konsultavimą."
	],
	[
		"Sveikatos apsauga",
		"Trumpinti laukimą šeimos gydytojo konsultacijai",
		"Penkiose bandomosiose poliklinikose įdiegti bendrą registracijos sistemą ir papildomas vakarines konsultacijas."
	],
	[
		"Švietimas",
		"Suteikti mokykloms daugiau pagalbos specialistų",
		"Dvidešimtyje mokyklų finansuoti papildomą specialiojo pedagogo ir psichologo etatą."
	],
	[
		"Transportas",
		"Atnaujinti regioninių autobusų stoteles",
		"Atnaujinti trisdešimt regioninių stotelių, įrengiant pastoges ir aiškius tvarkaraščius."
	],
	[
		"Krašto apsauga",
		"Atverti civilinės saugos mokymus gyventojams",
		"Surengti nemokamus civilinės saugos mokymus dvylikoje savivaldybių ir parengti prieinamą mokymosi medžiagą."
	],
	[
		"Energetika",
		"Gerinti viešųjų pastatų energinį efektyvumą",
		"Apšiltinti dešimt viešųjų bibliotekų ir įrengti jų energijos sąnaudų stebėseną."
	],
	[
		"Skaitmenizacija",
		"Sujungti savivaldybių paslaugas viename portale",
		"Sukurti bendrą bandomąjį portalą penkių savivaldybių pažymoms ir prašymams teikti."
	],
	[
		"Ekonomika",
		"Padėti mažoms įmonėms eksportuoti",
		"Įsteigti konsultacijų programą penkiasdešimčiai mažų įmonių, rengiančių pirmąjį eksporto planą."
	],
	[
		"Regionai",
		"Išlaikyti mobiliąsias bibliotekas kaimuose",
		"Finansuoti keturis mobiliųjų bibliotekų maršrutus vietovėse, kuriose nėra nuolatinės bibliotekos."
	],
	[
		"Viešasis valdymas",
		"Viešinti savivaldybių projektų eigą",
		"Įdiegti viešą projektų eigą ir išlaidas rodančią lentelę šešiose bandomosiose savivaldybėse."
	],
	[
		"Transportas",
		"Kurti saugesnes perėjas prie mokyklų",
		"Dvidešimtyje perėjų prie mokyklų atnaujinti apšvietimą ir įrengti greičio mažinimo priemones."
	],
	[
		"Sveikatos apsauga",
		"Plėsti mobiliųjų sveikatos komandų darbą",
		"Suburti tris mobiliąsias komandas profilaktiniams patikrinimams atokesnėse gyvenvietėse."
	],
	[
		"Aplinkosauga",
		"Atkurti miestų žaliąsias erdves",
		"Atkurti penkis apleistus miesto parkus, sodinant vietinių rūšių medžius ir įrengiant lietaus sodus."
	],
	[
		"Socialinė politika",
		"Gerinti pagalbą artimuosius slaugantiems žmonėms",
		"Pasiūlyti laikino atokvėpio paslaugas šimtui šeimų trijose bandomosiose savivaldybėse."
	],
	[
		"Energetika",
		"Remti bendruomenių saulės elektrines",
		"Parengti paramos konkursą penkioms bendruomenėms, norinčioms įsirengti bendrą saulės elektrinę."
	],
	[
		"Švietimas",
		"Atverti mokyklų laboratorijas po pamokų",
		"Dešimtyje mokyklų pradėti nemokamus popamokinius gamtos mokslų užsiėmimus."
	],
	[
		"Ekonomika",
		"Supaprastinti leidimus smulkiajam verslui",
		"Sukurti vieną prašymo formą trims dažniausiai smulkiojo verslo naudojamiems savivaldybės leidimams."
	],
	[
		"Žmogaus teisės",
		"Padaryti viešąsias paslaugas prieinamesnes",
		"Pritaikyti aštuonių viešųjų įstaigų informacijos teikimą žmonėms su regos ir klausos negalia."
	],
	[
		"Skaitmenizacija",
		"Mokyti gyventojus saugiai naudotis internetu",
		"Surengti keturiasdešimt nemokamų skaitmeninio saugumo užsiėmimų bibliotekose."
	],
	[
		"Viešasis valdymas",
		"Išbandyti dalyvaujamąjį biudžetą",
		"Trijose savivaldybėse skirti atskirą biudžeto dalį gyventojų siūlomiems ir renkamiems projektams."
	],
	[
		"Žemės ūkis",
		"Padėti ūkiams saugoti dirvožemį",
		"Penkiasdešimtyje ūkių finansuoti dirvožemio tyrimus ir individualius tvaraus ūkininkavimo planus."
	],
	[
		"Aplinkosauga",
		"Įrengti vandens kokybės stebėsenos taškus",
		"Įrengti dvylika naujų vandens kokybės stebėsenos taškų prie mažųjų upių."
	],
	[
		"Regionai",
		"Plėsti vietos bendruomenių erdves",
		"Atnaujinti šešias bendruomenių erdves ir jose sudaryti sąlygas nemokamoms veikloms."
	],
	[
		"Energetika",
		"Mažinti energijos nuostolius kaimo mokyklose",
		"Atlikti penkiolikos kaimo mokyklų energinį auditą ir pakeisti neefektyvų apšvietimą."
	],
	[
		"Švietimas",
		"Kurti papildomas kalbų mokymosi priemones",
		"Parengti nemokamus papildomus lietuvių kalbos mokymosi modulius dešimčiai mokyklų."
	],
	[
		"Socialinė politika",
		"Plėsti popamokinę vaikų priežiūrą",
		"Penkiose savivaldybėse išbandyti pailgintos dienos grupes su subsidijuojama vaikų priežiūra."
	],
	[
		"Transportas",
		"Gerinti priemiesčių susisiekimą",
		"Pridėti po du darbo dienų autobusų reisus keturiuose bandomuosiuose priemiesčių maršrutuose."
	],
	[
		"Žmogaus teisės",
		"Teikti informaciją lengvai suprantama kalba",
		"Parengti dešimt svarbiausių savivaldybės paslaugų aprašų lengvai suprantama kalba."
	],
	[
		"Krašto apsauga",
		"Atnaujinti gyventojų perspėjimo priemones",
		"Penkiose savivaldybėse išbandyti papildomas perspėjimo priemones ir surengti viešą patikrinimą."
	],
	[
		"Viešasis valdymas",
		"Padaryti viešąsias konsultacijas aiškesnes",
		"Parengti vienodą konsultacijų su gyventojais tvarką ir skelbti gautų pasiūlymų atsakymus."
	],
	[
		"Regionai",
		"Skaitmeninti vietos kultūros paveldą",
		"Skaitmeninti trijų regioninių muziejų rinkinius ir paskelbti laisvai prieinamus jų aprašus."
	],
	[
		"Žemės ūkis",
		"Plėsti vietinės produkcijos turgavietes",
		"Atnaujinti keturias turgavietes, įrengiant vietos ūkininkams skirtas prekybos vietas."
	],
	[
		"Ekonomika",
		"Kurti pameistrystės vietas jauniems žmonėms",
		"Finansuoti trisdešimt apmokamų pameistrystės vietų mažose regionų įmonėse."
	],
	[
		"Sveikatos apsauga",
		"Didinti prevencinių patikrų prieinamumą",
		"Penkiose įstaigose pradėti šeštadienines profilaktinių patikrų konsultacijas."
	],
	[
		"Skaitmenizacija",
		"Atverti miestų duomenis gyventojams",
		"Paskelbti dešimt anonimizuotų transporto ir viešųjų erdvių duomenų rinkinių atviru formatu."
	],
	[
		"Aplinkosauga",
		"Išbandyti daugkartinių pakuočių sistemą",
		"Trijose viešosiose įstaigose pradėti daugkartinių maisto pakuočių grąžinimo bandomąją programą."
	]
];
var explanations = [
	"Visos numatytos priemonės baigtos. Vertinimas apima pažado apimtį, o ne jo politinę naudą.",
	"Įgyvendinta pusė numatytos apimties. Likusi dalis dar nebaigta, todėl pažanga vertinama 50 %.",
	"Patvirtintas veiksmų planas ir pradėtas bandomasis etapas. Pažanga vertinama 25 %.",
	"Numatytas laikotarpis baigėsi, tačiau priemonė nepradėta. Pažadas vertinamas kaip neįvykdytas.",
	"Turimų duomenų nepakanka išvadai. 0 % žymi nežinomybę ir nėra pažado neįvykdymo įrodymas."
];
var promises = examples.map(([category, summary, text], i) => ({
	id: `p${String(i + 1).padStart(2, "0")}`,
	partyId: parties[Math.floor(i / 4)].id,
	category,
	summary,
	text,
	status: statuses[i % 5],
	statusUpdatedAt: new Date(Date.UTC(2026, 9, 29 - i % 30)).toISOString().slice(0, 10),
	explanation: explanations[i % 5],
	fictional: true,
	evidence: [`Programos veiksmų planas: bandomosios programos veiksmai ir numatyti terminai.`, `Stebėsenos pastaba: pažado būsena – ${statuses[i % 5].label.toLowerCase()}.`]
}));
var categories = [...new Set(promises.map((p) => p.category))].sort((a, b) => a.localeCompare(b, "lt"));
// src/hooks/use-followed-promises.tsx
var storageKey = "politten:followed-promises";
var promiseIds = new Set(promises.map((promise) => promise.id));
var FollowedPromisesContext = createContext(null);
function FollowedPromisesProvider({ children }) {
	const [followedIds, setFollowedIds] = useState([]);
	const [isReady, setIsReady] = useState(false);
	useEffect(() => {
		try {
			const stored = window.localStorage.getItem(storageKey);
			if (stored) {
				const parsed = JSON.parse(stored);
				if (Array.isArray(parsed)) setFollowedIds([...new Set(parsed.filter((id) => typeof id === "string" && promiseIds.has(id)))]);
			}
		} catch {
			setFollowedIds([]);
		}
		setIsReady(true);
		const syncFromStorage = (event) => {
			if (event.key !== storageKey) return;
			try {
				const parsed = event.newValue ? JSON.parse(event.newValue) : [];
				setFollowedIds(Array.isArray(parsed) ? [...new Set(parsed.filter((id) => typeof id === "string" && promiseIds.has(id)))] : []);
			} catch {
				setFollowedIds([]);
			}
		};
		window.addEventListener("storage", syncFromStorage);
		return () => window.removeEventListener("storage", syncFromStorage);
	}, []);
	const toggleFollow = useCallback((promiseId) => {
		if (!promiseIds.has(promiseId)) return;
		setFollowedIds((current) => {
			const next = current.includes(promiseId) ? current.filter((id) => id !== promiseId) : [...current, promiseId];
			try {
				window.localStorage.setItem(storageKey, JSON.stringify(next));
			} catch {}
			return next;
		});
	}, []);
	const value = useMemo(() => ({
		followedIds,
		isReady,
		toggleFollow
	}), [
		followedIds,
		isReady,
		toggleFollow
	]);
	return /* @__PURE__ */ jsx(FollowedPromisesContext.Provider, {
		value,
		children
	});
}
function useFollowedPromises() {
	const context = useContext(FollowedPromisesContext);
	if (!context) throw new Error("useFollowedPromises must be used within FollowedPromisesProvider");
	return context;
}
// src/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	Layout: () => Layout,
	default: () => root_default,
	headers: () => headers,
	links: () => links,
	loader: () => loader$7
});
var links = () => [
	{
		rel: "stylesheet",
		href: src_default
	},
	{
		rel: "icon",
		href: "/favicon.svg",
		type: "image/svg+xml"
	},
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com"
	},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous"
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
	}
];
/**
* Publishes the site's public origin, which `seo()` reads to build canonical and
* `og:url` tags, and advertises the sitemap to crawlers that read response
* headers rather than HTML.
*
* A `meta` export can only reach server data through `matches`, and the `headers`
* export cannot see loader data at all, so both have to travel this way.
*/
function loader$7({ request }) {
	const origin = siteOrigin(request);
	return data({ origin }, { headers: { Link: `<${origin}/sitemap.xml>; rel="sitemap"; type="application/xml", <${origin}/llms.txt>; rel="describedby"; type="text/plain"` } });
}
/**
* A page route that exports `headers` replaces this one, so merge `parentHeaders`
* there rather than returning only that route's own headers.
*/
function headers({ loaderHeaders }) {
	return loaderHeaders;
}
function Layout({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "lt",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {}),
			/* @__PURE__ */ jsx(HorizonsPreviewScripts, {})
		] }), /* @__PURE__ */ jsxs("body", {
			suppressHydrationWarning: true,
			children: [
				/* @__PURE__ */ jsx("div", {
					id: "root",
					children
				}),
				/* @__PURE__ */ jsx(ScrollRestoration, {}),
				/* @__PURE__ */ jsx(Scripts, {})
			]
		})]
	});
}
var root_default = UNSAFE_withComponentProps(function App() {
	return /* @__PURE__ */ jsxs(FollowedPromisesProvider, { children: [
		/* @__PURE__ */ jsx(SiteHeader, {}),
		/* @__PURE__ */ jsx(Outlet, {}),
		/* @__PURE__ */ jsx(SiteFooter, {}),
		/* @__PURE__ */ jsx(CookieBanner, {})
	] });
});
var ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({ error }) {
	let message = "Įvyko klaida";
	let details = "Įvyko netikėta klaida. Pabandykite dar kartą.";
	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Klaida";
		details = error.status === 404 ? "Prašomas puslapis nerastas." : error.statusText || details;
	}
	return /* @__PURE__ */ jsxs("main", { children: [
		/* @__PURE__ */ jsx("h1", { children: message }),
		/* @__PURE__ */ jsx("p", { children: details }),
		null
	] });
});
// src/lib/seo.ts
var ROOT_ROUTE_ID = "root";
/** The site's public origin, as published by the root loader. */
var siteOriginFrom = (matches) => {
	return (matches.find((match) => match?.id === ROOT_ROUTE_ID)?.loaderData)?.origin ?? "";
};
var absoluteUrl = (origin, target) => {
	if (/^https?:\/\//.test(target)) return target;
	return `${origin}${target.startsWith("/") ? target : `/${target}`}`;
};
function seo({ matches, location }, input) {
	const origin = siteOriginFrom(matches);
	const canonical = absoluteUrl(origin, input.path ?? location.pathname);
	const imageUrl = input.image ? absoluteUrl(origin, input.image) : "";
	const tags = [
		{ title: input.title },
		{
			name: "description",
			content: input.description
		},
		{
			property: "og:title",
			content: input.title
		},
		{
			property: "og:description",
			content: input.description
		},
		{
			property: "og:type",
			content: input.type ?? "website"
		},
		{
			name: "twitter:card",
			content: imageUrl ? "summary_large_image" : "summary"
		},
		{
			name: "twitter:title",
			content: input.title
		},
		{
			name: "twitter:description",
			content: input.description
		}
	];
	if (origin) tags.push({
		tagName: "link",
		rel: "canonical",
		href: canonical
	}, {
		property: "og:url",
		content: canonical
	});
	if (imageUrl) tags.push({
		property: "og:image",
		content: imageUrl
	}, {
		name: "twitter:image",
		content: imageUrl
	});
	if (input.noindex) tags.push({
		name: "robots",
		content: "noindex"
	});
	for (const block of [input.jsonLd ?? []].flat()) tags.push({ "script:ld+json": block });
	return tags;
}
// src/components/home/hero.tsx
function Hero() {
	return /* @__PURE__ */ jsxs("section", {
		className: "hero",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "eyebrow",
				children: [/* @__PURE__ */ jsx("span", { className: "short-line" }), " POLITIKA BE INFORMACINIO TRIUKŠMO"]
			}),
			/* @__PURE__ */ jsxs("h1", { children: [
				"Pažadai turi",
				/* @__PURE__ */ jsx("br", {}),
				/* @__PURE__ */ jsx("span", { children: "atmintį." })
			] }),
			/* @__PURE__ */ jsx("p", {
				className: "hero-copy",
				children: "Politten padeda aiškiai ir vienoje vietoje sekti politinių partijų pažadus, jų įgyvendinimo būseną ir vertinimo pagrindimą."
			}),
			/* @__PURE__ */ jsxs(Link, {
				className: "primary-button",
				to: "/pazadai",
				children: ["Peržiūrėti visus pažadus ", /* @__PURE__ */ jsx(ArrowRight, { size: 19 })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "hero-bottom",
				children: [
					/* @__PURE__ */ jsx("span", { children: "Pažadai. Kontekstas. Aiškumas." }),
					/* @__PURE__ */ jsx("a", {
						href: "#partijos",
						"aria-label": "Pereiti prie partijų",
						children: /* @__PURE__ */ jsx(ArrowDown, { size: 20 })
					}),
					/* @__PURE__ */ jsx("span", { children: "9 partijos · 36 pažadai" })
				]
			})
		]
	});
}
// src/components/party-logo.tsx
/**
* Stylized monogram badge — a distinctive, copyright-safe mark built from each
* party's accent color and abbreviation. Not the official party logo.
*/
function PartyLogo({ party, size = 44 }) {
	return /* @__PURE__ */ jsxs("span", {
		className: "party-logo",
		style: {
			width: size,
			height: size,
			background: party.color,
			"--logo-size": `${Math.round(size * .34)}px`
		},
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("span", {
			className: "party-logo-mark",
			children: party.monogram
		}), /* @__PURE__ */ jsx("span", { className: "party-logo-dot" })]
	});
}
// src/components/home/parties.tsx
function Parties() {
	return /* @__PURE__ */ jsxs("section", {
		id: "partijos",
		className: "parties-section",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "section-heading",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
				className: "eyebrow",
				children: "01 / PARTIJOS"
			}), /* @__PURE__ */ jsx("h2", { children: "Nuo pažado iki pagrindimo." })] }), /* @__PURE__ */ jsxs("p", { children: [
				"Pasirinkite partiją ir susipažinkite su jos",
				/* @__PURE__ */ jsx("br", { className: "desktop" }),
				" pažadais. Vienodas požiūris visiems."
			] })]
		}), /* @__PURE__ */ jsx("div", {
			className: "party-grid",
			children: parties.map((p, i) => /* @__PURE__ */ jsxs(Link, {
				to: `/partijos/${p.id}`,
				className: "party-card",
				style: { "--party-color": p.color },
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "party-accent",
						style: { background: p.color }
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "party-card-top",
						children: [/* @__PURE__ */ jsx(PartyLogo, { party: p }), /* @__PURE__ */ jsx("span", {
							className: "party-number",
							children: String(i + 1).padStart(2, "0")
						})]
					}),
					/* @__PURE__ */ jsxs("h3", { children: [p.name, [
						"lsdp",
						"ts-lkd",
						"liberalu-sajudis",
						"lvzs",
						"llra-kss"
					].includes(p.id) && /* @__PURE__ */ jsxs("small", { children: [
						" (",
						p.short,
						")"
					] })] }),
					/* @__PURE__ */ jsxs("div", {
						className: "party-card-bottom",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "small-label",
							children: ["IŠ VISO PAŽADŲ – ", promises.filter((pr) => pr.partyId === p.id).length]
						}), /* @__PURE__ */ jsxs("span", {
							className: "party-card-cta",
							children: ["Peržiūrėti pažadus ", /* @__PURE__ */ jsx(ArrowUpRight, { size: 20 })]
						})]
					})
				]
			}, p.id))
		})]
	});
}
// src/routes/home.tsx
var home_exports = /* @__PURE__ */ __exportAll({
	default: () => home_default,
	meta: () => meta$5
});
function meta$5({ matches, location }) {
	return seo({
		matches,
		location
	}, {
		title: "Politten – pažadai turi atmintį",
		description: "Susipažinkite su 9 Lietuvos partijomis ir 36 pažadais. Sekite jų įgyvendinimo būseną ir vertinimo pagrindimą.",
		image: "/social.svg",
		jsonLd: [{
			"@context": "https://schema.org",
			"@type": "WebSite",
			name: "Politten",
			description: "Politten padeda aiškiai sekti politinių partijų pažadus ir jų įgyvendinimo būseną."
		}, {
			"@context": "https://schema.org",
			"@type": "Organization",
			name: "Politten"
		}]
	});
}
var home_default = UNSAFE_withComponentProps(function HomePage() {
	return /* @__PURE__ */ jsxs("main", { children: [/* @__PURE__ */ jsx(Hero, {}), /* @__PURE__ */ jsx(Parties, {})] });
});
// src/components/status-indicator.tsx
function StatusIndicator({ status }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `status-indicator status-${status.percent}`,
		children: [
			/* @__PURE__ */ jsx("span", { className: "status-dot" }),
			/* @__PURE__ */ jsx("span", { children: status.label }),
			/* @__PURE__ */ jsxs("b", { children: [status.percent, "%"] })
		]
	});
}
// src/components/promises/promise-list.tsx
function PromiseList({ items }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "promise-list",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "list-labels",
			children: [
				/* @__PURE__ */ jsx("span", { children: "PAŽADAS / PARTIJA" }),
				/* @__PURE__ */ jsx("span", { children: "SRITIS" }),
				/* @__PURE__ */ jsx("span", { children: "DEMONSTRACINĖ BŪSENA" })
			]
		}), items.length === 0 ? /* @__PURE__ */ jsx("p", {
			className: "empty-state",
			children: "Pažadų pagal pasirinktus filtrus nerasta. Pabandykite kitus kriterijus."
		}) : items.map((p) => /* @__PURE__ */ jsxs(Link, {
			className: "promise-row",
			to: `/pazadai/${p.id}`,
			children: [
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("span", {
						className: "fiction-label",
						children: ["PAŽADAS · ", p.id.toUpperCase()]
					}),
					/* @__PURE__ */ jsx("h2", { children: p.summary }),
					/* @__PURE__ */ jsx("p", { children: parties.find((x) => x.id === p.partyId)?.name })
				] }),
				/* @__PURE__ */ jsx("span", {
					className: "category-label",
					children: p.category
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(StatusIndicator, { status: p.status }), /* @__PURE__ */ jsx("span", {
					className: "row-arrow",
					children: /* @__PURE__ */ jsx(ArrowUpRight, { size: 19 })
				})] })
			]
		}, p.id))]
	});
}
// src/components/party/party-stats.tsx
function PartyStats({ items }) {
	const total = items.length;
	const completed = items.filter((p) => p.status.percent === 100 || p.status.percent === 50).length;
	const avg = total === 0 ? 0 : Math.round(items.reduce((s, p) => s + p.status.percent, 0) / total);
	return /* @__PURE__ */ jsxs("section", {
		className: "party-stats",
		"aria-label": "Partijos pažadų statistika",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "party-stat",
				children: [/* @__PURE__ */ jsx("span", {
					className: "party-stat-label",
					children: "Viso pažadų"
				}), /* @__PURE__ */ jsx("span", {
					className: "party-stat-value",
					children: total
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "party-stat party-stat-accent",
				children: [/* @__PURE__ */ jsx("span", {
					className: "party-stat-label",
					children: "Įvykdyti"
				}), /* @__PURE__ */ jsx("span", {
					className: "party-stat-value",
					children: completed
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "party-stat party-stat-progress",
				children: [/* @__PURE__ */ jsx("span", {
					className: "party-stat-label",
					children: "Vidutinė pažanga"
				}), /* @__PURE__ */ jsxs("div", {
					className: "party-stat-bar",
					children: [/* @__PURE__ */ jsx("div", {
						className: "party-stat-bar-track",
						children: /* @__PURE__ */ jsx("div", { style: { width: `${avg}%` } })
					}), /* @__PURE__ */ jsxs("span", {
						className: "party-stat-value",
						children: [avg, "%"]
					})]
				})]
			})
		]
	});
}
// src/routes/party.tsx
var party_exports = /* @__PURE__ */ __exportAll({
	default: () => party_default,
	loader: () => loader$6,
	meta: () => meta$4
});
function loader$6({ params }) {
	const party = parties.find((p) => p.id === params.partyId);
	if (!party) throw new Response("Partija nerasta", { status: 404 });
	return {
		party,
		items: promises.filter((p) => p.partyId === party.id)
	};
}
function meta$4({ matches, location, loaderData }) {
	return seo({
		matches,
		location
	}, {
		title: loaderData ? `${loaderData.party.short}: pažadai – Politten` : "Partija nerasta – Politten",
		description: "Peržiūrėkite šios partijos pažadus, jų įgyvendinimo būsenas ir vertinimo pagrindimą.",
		image: "/social.svg",
		jsonLd: {
			"@context": "https://schema.org",
			"@type": "CollectionPage",
			name: "Partijos pažadai"
		}
	});
}
var party_default = UNSAFE_withComponentProps(function PartyPage({ loaderData: { party, items } }) {
	return /* @__PURE__ */ jsxs("main", {
		className: "page-shell party-shell",
		style: { "--party-color": party.color },
		children: [
			/* @__PURE__ */ jsx(Link, {
				className: "back-link",
				to: "/#partijos",
				children: "← Visos partijos"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "page-intro party-intro",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "party-intro-head",
					children: [/* @__PURE__ */ jsx(PartyLogo, {
						party,
						size: 64
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "eyebrow",
						children: "PARTIJOS PROFILIS"
					}), /* @__PURE__ */ jsx("h1", {
						className: "party-title",
						children: party.name
					})] })]
				}), /* @__PURE__ */ jsxs("p", { children: [
					"Iš viso pažadų – ",
					items.length,
					"."
				] })]
			}),
			/* @__PURE__ */ jsx(PartyStats, { items }),
			/* @__PURE__ */ jsx(PromiseList, { items })
		]
	});
});
// src/components/promises/promise-explorer.tsx
function PromiseExplorer() {
	const [q, setQ] = useState("");
	const [party, setParty] = useState("all");
	const [category, setCategory] = useState("all");
	const [status, setStatus] = useState("all");
	const items = promises.filter((p) => (party === "all" || p.partyId === party) && (category === "all" || p.category === category) && (status === "all" || p.status.label === status) && `${p.summary} ${p.text} ${parties.find((x) => x.id === p.partyId)?.name}`.toLocaleLowerCase("lt").includes(q.toLocaleLowerCase("lt")));
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "filters",
			children: [
				/* @__PURE__ */ jsxs("label", { children: ["Paieška", /* @__PURE__ */ jsxs("div", {
					className: "search-field",
					children: [/* @__PURE__ */ jsx(Search, { size: 18 }), /* @__PURE__ */ jsx("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Ieškoti pažado…"
					})]
				})] }),
				/* @__PURE__ */ jsxs("label", { children: ["Partija", /* @__PURE__ */ jsxs("select", {
					value: party,
					onChange: (e) => setParty(e.target.value),
					children: [/* @__PURE__ */ jsx("option", {
						value: "all",
						children: "Visos partijos"
					}), parties.map((p) => /* @__PURE__ */ jsx("option", {
						value: p.id,
						children: p.name
					}, p.id))]
				})] }),
				/* @__PURE__ */ jsxs("label", { children: ["Sritis", /* @__PURE__ */ jsxs("select", {
					value: category,
					onChange: (e) => setCategory(e.target.value),
					children: [/* @__PURE__ */ jsx("option", {
						value: "all",
						children: "Visos sritys"
					}), categories.map((c) => /* @__PURE__ */ jsx("option", { children: c }, c))]
				})] }),
				/* @__PURE__ */ jsxs("label", { children: ["Būsena", /* @__PURE__ */ jsxs("select", {
					value: status,
					onChange: (e) => setStatus(e.target.value),
					children: [/* @__PURE__ */ jsx("option", {
						value: "all",
						children: "Visos būsenos"
					}), statuses.map((s) => /* @__PURE__ */ jsx("option", { children: s.label }, s.label))]
				})] })
			]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "results-heading",
			children: [/* @__PURE__ */ jsxs("span", { children: [
				"Rodoma ",
				items.length,
				" iš 36 pažadų"
			] }), /* @__PURE__ */ jsx("button", {
				onClick: () => {
					setQ("");
					setParty("all");
					setCategory("all");
					setStatus("all");
				},
				children: "Išvalyti filtrus"
			})]
		}),
		/* @__PURE__ */ jsx(PromiseList, { items })
	] });
}
// src/routes/promises.tsx
var promises_exports = /* @__PURE__ */ __exportAll({
	default: () => promises_default,
	meta: () => meta$3
});
function meta$3({ matches, location }) {
	return seo({
		matches,
		location
	}, {
		title: "Visi pažadai – Politten",
		description: "Naršykite 36 pažadus pagal partiją, sritį ir būseną. Peržiūrėkite įgyvendinimo pažangą ir vertinimo pagrindimą.",
		image: "/social.svg",
		jsonLd: {
			"@context": "https://schema.org",
			"@type": "CollectionPage",
			name: "Pažadų rinkinys"
		}
	});
}
var promises_default = UNSAFE_withComponentProps(function PromisesPage() {
	return /* @__PURE__ */ jsxs("main", {
		className: "page-shell",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "page-intro",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "eyebrow",
					children: "PAŽADŲ ŽEMĖLAPIS"
				}),
				/* @__PURE__ */ jsx("h1", { children: "Visi pažadai." }),
				/* @__PURE__ */ jsxs("p", { children: [
					"36 pažadai. 9 partijos. Viena vieta suprasti kontekstą.",
					/* @__PURE__ */ jsx("br", {}),
					"Peržiūrėkite būsenas ir vertinimus."
				] })
			]
		}), /* @__PURE__ */ jsx(PromiseExplorer, {})]
	});
});
// src/routes/followed-promises.tsx
var followed_promises_exports = /* @__PURE__ */ __exportAll({
	default: () => followed_promises_default,
	meta: () => meta$2
});
function meta$2({ matches, location }) {
	return seo({
		matches,
		location
	}, {
		title: "Sekami pažadai – Politten",
		description: "Jūsų sekamų pažadų sąrašas.",
		image: "/social.svg"
	});
}
var followed_promises_default = UNSAFE_withComponentProps(function FollowedPromisesPage() {
	const { followedIds, isReady } = useFollowedPromises();
	const followedPromises = promises.filter((promise) => followedIds.includes(promise.id));
	return /* @__PURE__ */ jsxs("main", {
		className: "page-shell",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "page-intro",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "eyebrow",
					children: "JŪSŲ SĄRAŠAS"
				}),
				/* @__PURE__ */ jsx("h1", { children: "Sekami pažadai." }),
				/* @__PURE__ */ jsx("p", { children: "Čia rasite pažadus, kuriuos pasirinkote sekti šiame įrenginyje." })
			]
		}), !isReady ? /* @__PURE__ */ jsx("p", {
			className: "empty-state",
			"aria-live": "polite",
			children: "Įkeliami sekami pažadai…"
		}) : followedPromises.length ? /* @__PURE__ */ jsx(PromiseList, { items: followedPromises }) : /* @__PURE__ */ jsxs("div", {
			className: "followed-empty",
			children: [/* @__PURE__ */ jsx("p", {
				className: "empty-state",
				children: "Kol kas nesekate jokių pažadų."
			}), /* @__PURE__ */ jsx(Link, {
				className: "primary-button",
				to: "/pazadai",
				children: "Naršyti pažadus"
			})]
		})]
	});
});
// src/components/promises/follow-promise-button.tsx
function FollowPromiseButton({ promiseId }) {
	const { followedIds, isReady, toggleFollow } = useFollowedPromises();
	const isFollowing = followedIds.includes(promiseId);
	return /* @__PURE__ */ jsxs("button", {
		className: `follow-button${isFollowing ? " is-following" : ""}`,
		type: "button",
		"aria-pressed": isFollowing,
		"aria-label": isFollowing ? "Nebesekti pažado" : "Sekti pažadą",
		disabled: !isReady,
		onClick: () => toggleFollow(promiseId),
		children: [/* @__PURE__ */ jsx(Heart, {
			size: 16,
			fill: isFollowing ? "currentColor" : "none"
		}), isFollowing ? "Sekamas" : "Sekti pažadą"]
	});
}
// src/components/promises/promise-detail.tsx
function PromiseDetail({ promise: p }) {
	const party = parties.find((x) => x.id === p.partyId);
	const statusUpdatedDate = new Intl.DateTimeFormat("lt-LT", {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "UTC"
	}).format(/* @__PURE__ */ new Date(`${p.statusUpdatedAt}T00:00:00Z`));
	return /* @__PURE__ */ jsxs("main", {
		className: "page-shell detail-shell",
		children: [
			/* @__PURE__ */ jsxs(Link, {
				to: `/partijos/${party.id}`,
				className: "back-link",
				children: [/* @__PURE__ */ jsx(ArrowLeft, { size: 16 }), " Visi partijos pažadai"]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "page-intro",
				children: [
					/* @__PURE__ */ jsxs("p", {
						className: "eyebrow",
						children: ["PAŽADAS · ", p.id.toUpperCase()]
					}),
					/* @__PURE__ */ jsx("h1", { children: p.summary }),
					/* @__PURE__ */ jsx("p", { children: "Pažado įgyvendinimo būsena ir vertinimo pagrindimas." }),
					/* @__PURE__ */ jsx(FollowPromiseButton, { promiseId: p.id })
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "detail-grid",
				children: [/* @__PURE__ */ jsxs("article", { children: [
					/* @__PURE__ */ jsxs("section", {
						className: "detail-section",
						children: [/* @__PURE__ */ jsx("h2", { children: "Kas buvo pažadėta?" }), /* @__PURE__ */ jsx("p", {
							className: "promise-full",
							children: p.text
						})]
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "detail-section",
						children: [/* @__PURE__ */ jsx("h2", { children: "Kuo grindžiama būsena?" }), /* @__PURE__ */ jsx("p", { children: p.explanation })]
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "detail-section",
						children: [/* @__PURE__ */ jsx("h2", { children: "Įrodymai" }), p.evidence.map((e, i) => /* @__PURE__ */ jsxs("div", {
							className: "evidence",
							children: [/* @__PURE__ */ jsx(FileText, { size: 20 }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("strong", { children: ["Įrodymas ", i + 1] }), /* @__PURE__ */ jsx("p", { children: e })] })]
						}, e))]
					})
				] }), /* @__PURE__ */ jsxs("aside", {
					className: "detail-aside",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "eyebrow",
							children: "BŪSENA"
						}),
						/* @__PURE__ */ jsx(StatusIndicator, { status: p.status }),
						/* @__PURE__ */ jsx("div", {
							className: "progress-track",
							children: /* @__PURE__ */ jsx("div", { style: { width: `${p.status.percent}%` } })
						}),
						/* @__PURE__ */ jsx("p", {
							className: "muted",
							children: "Įgyvendinimo pažanga"
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "muted",
							children: ["Būsena atnaujinta: ", /* @__PURE__ */ jsx("time", {
								dateTime: p.statusUpdatedAt,
								children: statusUpdatedDate
							})]
						}),
						/* @__PURE__ */ jsx("hr", {}),
						/* @__PURE__ */ jsx("p", {
							className: "eyebrow",
							children: "PARTIJA"
						}),
						/* @__PURE__ */ jsxs(Link, {
							to: `/partijos/${party.id}`,
							className: "aside-party-link",
							children: [/* @__PURE__ */ jsx(PartyLogo, {
								party,
								size: 36
							}), /* @__PURE__ */ jsx("span", { children: party.name })]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "eyebrow aside-label",
							children: "SRITIS"
						}),
						/* @__PURE__ */ jsx("p", { children: p.category }),
						/* @__PURE__ */ jsx("hr", {})
					]
				})]
			})
		]
	});
}
// src/routes/promise.tsx
var promise_exports = /* @__PURE__ */ __exportAll({
	default: () => promise_default,
	loader: () => loader$5,
	meta: () => meta$1
});
function loader$5({ params }) {
	const promise = promises.find((p) => p.id === params.promiseId);
	if (!promise) throw new Response("Pažadas nerastas", { status: 404 });
	return { promise };
}
function meta$1({ matches, location, loaderData }) {
	return seo({
		matches,
		location
	}, {
		title: loaderData ? `${loaderData.promise.summary} – Politten` : "Pažadas nerastas – Politten",
		description: "Pažado tekstas, įgyvendinimo būsena, pažanga ir vertinimo pagrindimas.",
		image: "/social.svg"
	});
}
var promise_default = UNSAFE_withComponentProps(function PromisePage({ loaderData: { promise } }) {
	return /* @__PURE__ */ jsx(PromiseDetail, { promise });
});
// src/routes/llms.txt.ts
var llms_txt_exports = /* @__PURE__ */ __exportAll({ loader: () => loader$4 });
function loader$4({ request }) {
	const origin = siteOrigin(request);
	return new Response(`# Politten\n\n> Politinių pažadų katalogas su įgyvendinimo būsenomis, procentais, paaiškinimais ir vertinimo medžiaga.\n\n## Puslapiai\n- [Visi pažadai](${origin}/pazadai)\n${parties.map((p) => `- [${p.name}](${origin}/partijos/${p.id}): 4 pažadai.`).join("\n")}\n${promises.map((p) => `- [${p.summary}](${origin}/pazadai/${p.id})`).join("\n")}`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
// src/routes/not-found.tsx
var not_found_exports = /* @__PURE__ */ __exportAll({
	default: () => not_found_default,
	meta: () => meta
});
function meta({ matches, location }) {
	return seo({
		matches,
		location
	}, {
		title: "Puslapis nerastas – Politten",
		description: "Šio puslapio nėra. Grįžkite į Politten pradžią ir peržiūrėkite pažadus.",
		noindex: true
	});
}
var not_found_default = UNSAFE_withComponentProps(function NotFound() {
	return /* @__PURE__ */ jsxs("main", {
		className: "page-shell page-intro",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "eyebrow",
				children: "404"
			}),
			/* @__PURE__ */ jsx("h1", { children: "Puslapis nerastas." }),
			/* @__PURE__ */ jsx("p", { children: "Patikrinkite adresą arba grįžkite į pradžią." }),
			/* @__PURE__ */ jsx(Link, {
				className: "primary-button",
				to: "/",
				children: "Grįžti į pradžią"
			})
		]
	});
});
// src/routes/sitemap.xml.ts
var sitemap_xml_exports = /* @__PURE__ */ __exportAll({ loader: () => loader$3 });
var STATIC_PATHS = ["/", "/pazadai"];
function escapeXml(value) {
	return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&apos;");
}
function toLoc(origin, path) {
	return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}
function serializeSitemap(origin, entries) {
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map((entry) => {
		return `\t<url>\n\t\t<loc>${escapeXml(toLoc(origin, entry.path))}</loc>${entry.lastmod ? `\n\t\t<lastmod>${escapeXml(entry.lastmod)}</lastmod>` : ""}\n\t</url>`;
	}).join("\n")}\n</urlset>\n`;
}
/**
* Public dynamic URLs (blog posts, PDPs, articles).
* Return `{ path, lastmod }` in the same change that adds a collection.
* Return `[]` only while the site has no public records; clear those URLs
* again in the same change that removes the collection.
*/
async function getDynamicEntries() {
	return [...parties.map((p) => ({ path: `/partijos/${p.id}` })), ...promises.map((p) => ({ path: `/pazadai/${p.id}` }))];
}
async function loader$3({ request }) {
	const origin = siteOrigin(request);
	const entries = [...STATIC_PATHS.map((path) => ({ path })), ...await getDynamicEntries()];
	return new Response(serializeSitemap(origin, entries), { headers: {
		"Content-Type": "application/xml; charset=utf-8",
		"Cache-Control": "public, max-age=3600",
		"Access-Control-Allow-Origin": "*"
	} });
}
// src/routes/robots.txt.ts
var robots_txt_exports = /* @__PURE__ */ __exportAll({ loader: () => loader$2 });
/**
* Hostinger-provided hosts: the editor sandbox preview, and the domain a site is
* published on before its owner connects one of their own. Neither should reach a
* search index — the site is not on its final URL yet.
*/
var UNPUBLISHED_HOST_SUFFIXES = [
	".app-preview.com",
	".app-preview.io",
	".hostingersite.com",
	".hostingersite.dev"
];
/**
* The assistants and answer engines that fetch a page to answer someone's
* question and cite the site back. They are listed by name, rather than left to
* the wildcard group, so the site's stance on AI access is explicit to anyone —
* or anything — reading the file.
*
* Each vendor splits the work the same way: one crawler builds the index the
* answers are drawn from, another fetches the single page a person just asked
* about. Meta and Amazon both document that second kind as free to skip
* robots.txt, since a human asked for the page — naming them records the site's
* answer, it does not enforce it.
*/
var AI_ANSWER_AGENTS = [
	"OAI-SearchBot",
	"ChatGPT-User",
	"Claude-SearchBot",
	"Claude-User",
	"PerplexityBot",
	"Perplexity-User",
	"DuckAssistBot",
	"MistralAI-User",
	"meta-webindexer",
	"meta-externalfetcher",
	"Amzn-SearchBot",
	"Amzn-User"
];
/**
* Tokens whose meaning is permission to train generative models on the content.
* `Google-Extended` and `Applebot-Extended` are not crawlers and never fetch
* anything — they read robots.txt as a usage licence, so `Disallow: /` is the
* only way to express `ai-train=no` to them. The rest are the crawlers that
* collect training corpora. Most have an answer-engine counterpart above that
* keeps the site citable in exchange; `Bytespider` is last because ByteDance
* runs no answer engine to trade the access for.
*
* Blocking `Google-Extended` also gives up grounding in the Gemini app. Google
* Search, and the AI Overviews built from its index, are unaffected, and
* `Applebot-Extended` works the same way for Siri and Spotlight. `Googlebot`
* and `Applebot` themselves keep their access through the wildcard group, which
* is why neither is named above.
*/
var AI_TRAINING_AGENTS = [
	"GPTBot",
	"ClaudeBot",
	"Google-Extended",
	"Applebot-Extended",
	"meta-externalagent",
	"Amazonbot",
	"Bytespider"
];
/**
* Content signals (contentsignals.org) state what crawlers may do with the
* content once fetched: appear in search results, ground an AI answer, or train
* a model. Search and AI answers are allowed because they bring readers back;
* training is not, which is the default every publisher starts from.
*
* A named group replaces the wildcard group for that agent rather than adding
* to it, so the signal is repeated inside each one — otherwise the agents it is
* aimed at are the only ones that never read it.
*/
var CONTENT_SIGNAL = "Content-Signal: search=yes, ai-input=yes, ai-train=no";
function publishedRules(origin) {
	return [
		"User-agent: *",
		CONTENT_SIGNAL,
		"Allow: /",
		"",
		...AI_ANSWER_AGENTS.flatMap((agent) => [
			`User-agent: ${agent}`,
			CONTENT_SIGNAL,
			"Allow: /",
			""
		]),
		...AI_TRAINING_AGENTS.flatMap((agent) => [
			`User-agent: ${agent}`,
			"Disallow: /",
			""
		]),
		`Sitemap: ${origin}/sitemap.xml`
	];
}
function loader$2({ request }) {
	const origin = siteOrigin(request);
	const { hostname } = new URL(origin);
	const lines = UNPUBLISHED_HOST_SUFFIXES.some((suffix) => hostname.endsWith(suffix)) ? ["User-agent: *", "Disallow: /"] : publishedRules(origin);
	return new Response(`${lines.join("\n")}\n`, { headers: {
		"Content-Type": "text/plain; charset=utf-8",
		"Cache-Control": "public, max-age=3600"
	} });
}
// src/lib/logger.server.ts
var logger = {
	error: (...args) => {
		console.log("[ERROR]", ...args);
	},
	fatal: (...args) => {
		console.error("[FATAL]", ...args);
	},
	info: (...args) => {
		console.log("[INFO]", ...args);
	},
	debug: (...args) => {
		console.log("[DEBUG]", ...args);
	},
	warn: (...args) => {
		console.log("[WARN]", ...args);
	}
};
// src/lib/rate-limit.server.ts
/**
* Fixed-window rate limiter for `/api/*` resource routes.
*
* Counters live in this server process only. Never apply this to page routes —
* a single page load fans out into many requests and would exhaust the window
* immediately.
*
* `rate-limiter-flexible` does the counting and `ipaddr.js` parses the address.
* What is left here is deciding which caller a request belongs to: the left-most
* `X-Forwarded-For` entry, with IPv6 grouped by /56 so a caller cannot rotate
* addresses for a fresh window.
*/
var MS_PER_SECOND = 1e3;
var WINDOW_SECONDS = 300;
var MAX_REQUESTS_PER_WINDOW = 100;
/** 7 bytes of a 16-byte address make up the /56 prefix. */
var IPV6_PREFIX_BYTES = 7;
/**
* The proxy in front of this server rewrites `X-Forwarded-For`, so the left-most
* entry is the real client. Direct requests (no proxy) share the `unknown` bucket.
*/
var clientIdentifier = (request) => {
	const [forwarded] = request.headers.get("x-forwarded-for")?.split(",") ?? [];
	const address = forwarded?.trim() || request.headers.get("x-real-ip")?.trim();
	if (!address) return "unknown";
	try {
		const parsed = ipaddr.parse(address);
		if (!(parsed instanceof ipaddr.IPv6)) return address;
		if (parsed.isIPv4MappedAddress()) return parsed.toIPv4Address().toString();
		return parsed.toByteArray().slice(0, IPV6_PREFIX_BYTES).join(".");
	} catch {
		return address;
	}
};
var sharedLimiter = new RateLimiterMemory({
	points: MAX_REQUESTS_PER_WINDOW,
	duration: WINDOW_SECONDS
});
/**
* Spending the budget rejects with the same result object a success resolves
* with; anything else is the store failing and must not pass as a verdict.
*/
var consume = async (limiter, identifier) => {
	try {
		return {
			result: await limiter.consume(identifier),
			isLimited: false
		};
	} catch (error) {
		if (error instanceof RateLimiterRes) return {
			result: error,
			isLimited: true
		};
		throw error;
	}
};
var consumeRateLimit = async (identifier) => {
	const { result, isLimited } = await consume(sharedLimiter, identifier);
	return {
		isLimited,
		limit: MAX_REQUESTS_PER_WINDOW,
		remaining: result.remainingPoints,
		resetSeconds: Math.max(0, Math.ceil(result.msBeforeNext / MS_PER_SECOND))
	};
};
/** IETF draft `RateLimit-*` headers. */
var rateLimitHeaders = (verdict) => {
	const headers = {
		"RateLimit-Policy": `${verdict.limit};w=${WINDOW_SECONDS}`,
		"RateLimit-Limit": String(verdict.limit),
		"RateLimit-Remaining": String(verdict.remaining),
		"RateLimit-Reset": String(verdict.resetSeconds)
	};
	if (verdict.isLimited) headers["Retry-After"] = String(verdict.resetSeconds);
	return headers;
};
// src/lib/api.server.ts
/**
* Helpers for `/api/*` resource routes: JSON responses, security headers,
* rate limiting, body-size limits, and a single error shape.
*
* Wrap every resource route handler in `withApi`: there is no global middleware
* in this app, so the wrapper is what applies these concerns to a route.
*/
/**
* Applied to API responses only. Page responses must stay untouched, because
* framing and CSP headers break embedding the site in a preview iframe.
* Transport security (HSTS) belongs to the proxy in front of this server.
*
* `Cache-Control: no-store` is defence in depth, not a guarantee: the platform
* edge cache rewrites this header on published domains and caches `/api/*` GET
* responses by URL for all visitors. Per-user or authenticated endpoints must
* therefore be actions (POST) — never GET. Handlers returning public,
* cache-friendly data may override by setting their own Cache-Control
* (existing headers are never overwritten here).
*/
var SECURITY_HEADERS = {
	"Cache-Control": "no-store",
	"Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
	"Cross-Origin-Resource-Policy": "same-origin",
	"Referrer-Policy": "no-referrer",
	"X-Content-Type-Options": "nosniff",
	"X-Frame-Options": "DENY",
	"X-Permitted-Cross-Domain-Policies": "none"
};
var withExtraHeaders = (response, extra) => {
	const headers = new Headers(response.headers);
	for (const [name, value] of Object.entries(extra)) if (!headers.has(name)) headers.set(name, value);
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
};
/** JSON response carrying the API security headers. */
var json = (value, init = {}) => withExtraHeaders(Response.json(value, init), SECURITY_HEADERS);
/** Client-error response — use for input validation, never for server failures. */
var apiError = (status, message) => json({ error: message }, { status });
var serverError = (error) => {
	const isProduction = process.env.NODE_ENV === "production";
	const cause = error instanceof Error ? error : new Error(String(error));
	return json({
		message: "Something went wrong!",
		...!isProduction && { error: {
			name: cause.name,
			message: cause.message,
			stack: cause.stack
		} }
	}, { status: 500 });
};
var runHandler = async (handler, args) => {
	const verdict = await consumeRateLimit(clientIdentifier(args.request));
	if (verdict.isLimited) return withExtraHeaders(apiError(429, "Too many requests, please try again later"), rateLimitHeaders(verdict));
	const extraHeaders = rateLimitHeaders(verdict);
	try {
		const result = await handler(args);
		return withExtraHeaders(result instanceof Response ? withExtraHeaders(result, SECURITY_HEADERS) : json(result ?? null), extraHeaders);
	} catch (error) {
		if (error instanceof Response) return withExtraHeaders(error, extraHeaders);
		logger.error(error instanceof Error ? error.message : error, error instanceof Error ? error.stack : void 0);
		return withExtraHeaders(serverError(error), extraHeaders);
	}
};
/**
* Wraps a resource route `loader` / `action`. Rate limits the caller, adds
* security headers, logs the request, and turns any thrown error into the shared
* 500 shape — so handlers can `throw new Error(...)` instead of building error
* responses.
*/
var withApi = (handler) => {
	return async (args) => {
		const startedAt = Date.now();
		const response = await runHandler(handler, args);
		const { pathname } = new URL(args.request.url);
		logger.info(`${args.request.method} ${pathname} ${response.status} ${Date.now() - startedAt}ms`);
		return response;
	};
};
// src/routes/api.health.ts
var api_health_exports = /* @__PURE__ */ __exportAll({ loader: () => loader$1 });
var loader$1 = withApi(async () => json({ ok: true }));
// src/routes/api.$.ts
var api_$_exports = /* @__PURE__ */ __exportAll({
	action: () => action,
	loader: () => loader
});
/**
* Unmatched `/api/*` paths answer with JSON instead of React Router's HTML
* error document. More specific `/api/...` routes always win over this one.
*/
var notFound = withApi(async () => apiError(404, "Route not found"));
var loader = notFound;
var action = notFound;
// \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-FdnSZSfJ.js",
		"imports": ["/assets/jsx-runtime-B3JqzSDr.js", "/assets/_virtual_horizons-runtime-BxAtCBaI.js"],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/root-BUYWmJoh.js",
			"imports": [
				"/assets/jsx-runtime-B3JqzSDr.js",
				"/assets/_virtual_horizons-runtime-BxAtCBaI.js",
				"/assets/lib-rnp-Rvgc.js",
				"/assets/arrow-up-right-Ck5Gf9n_.js",
				"/assets/heart-Dt9LKi5W.js",
				"/assets/use-followed-promises-BLejknse.js",
				"/assets/politten-CraW1oPn.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/home": {
			"id": "routes/home",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/home-COWzElHj.js",
			"imports": [
				"/assets/jsx-runtime-B3JqzSDr.js",
				"/assets/lib-rnp-Rvgc.js",
				"/assets/politten-CraW1oPn.js",
				"/assets/arrow-up-right-Ck5Gf9n_.js",
				"/assets/seo-Bjh2fhqD.js",
				"/assets/party-logo-jS0KlGpD.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/party": {
			"id": "routes/party",
			"parentId": "root",
			"path": "partijos/:partyId",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/party-DYK5bBCE.js",
			"imports": [
				"/assets/jsx-runtime-B3JqzSDr.js",
				"/assets/lib-rnp-Rvgc.js",
				"/assets/seo-Bjh2fhqD.js",
				"/assets/party-logo-jS0KlGpD.js",
				"/assets/promise-list-CpdYwPFU.js",
				"/assets/politten-CraW1oPn.js",
				"/assets/arrow-up-right-Ck5Gf9n_.js",
				"/assets/status-indicator-DdgIINgd.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/promises": {
			"id": "routes/promises",
			"parentId": "root",
			"path": "pazadai",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/promises-DO35j9BO.js",
			"imports": [
				"/assets/jsx-runtime-B3JqzSDr.js",
				"/assets/politten-CraW1oPn.js",
				"/assets/seo-Bjh2fhqD.js",
				"/assets/promise-list-CpdYwPFU.js",
				"/assets/lib-rnp-Rvgc.js",
				"/assets/arrow-up-right-Ck5Gf9n_.js",
				"/assets/status-indicator-DdgIINgd.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/followed-promises": {
			"id": "routes/followed-promises",
			"parentId": "root",
			"path": "sekami-pazadai",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/followed-promises-CMwKYjWx.js",
			"imports": [
				"/assets/jsx-runtime-B3JqzSDr.js",
				"/assets/lib-rnp-Rvgc.js",
				"/assets/politten-CraW1oPn.js",
				"/assets/use-followed-promises-BLejknse.js",
				"/assets/seo-Bjh2fhqD.js",
				"/assets/promise-list-CpdYwPFU.js",
				"/assets/arrow-up-right-Ck5Gf9n_.js",
				"/assets/status-indicator-DdgIINgd.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/promise": {
			"id": "routes/promise",
			"parentId": "root",
			"path": "pazadai/:promiseId",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/promise-Bn2mQ03G.js",
			"imports": [
				"/assets/jsx-runtime-B3JqzSDr.js",
				"/assets/lib-rnp-Rvgc.js",
				"/assets/politten-CraW1oPn.js",
				"/assets/heart-Dt9LKi5W.js",
				"/assets/use-followed-promises-BLejknse.js",
				"/assets/seo-Bjh2fhqD.js",
				"/assets/party-logo-jS0KlGpD.js",
				"/assets/status-indicator-DdgIINgd.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/llms.txt": {
			"id": "routes/llms.txt",
			"parentId": "root",
			"path": "llms.txt",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": false,
			"hasErrorBoundary": false,
			"module": "/assets/llms.txt-BvRk9kiK.js",
			"imports": [],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/not-found": {
			"id": "routes/not-found",
			"parentId": "root",
			"path": "*",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/not-found-BzjvNZtG.js",
			"imports": [
				"/assets/jsx-runtime-B3JqzSDr.js",
				"/assets/lib-rnp-Rvgc.js",
				"/assets/seo-Bjh2fhqD.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/sitemap.xml": {
			"id": "routes/sitemap.xml",
			"parentId": "root",
			"path": "sitemap.xml",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": false,
			"hasErrorBoundary": false,
			"module": "/assets/sitemap.xml-BvRk9kiK.js",
			"imports": [],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/robots.txt": {
			"id": "routes/robots.txt",
			"parentId": "root",
			"path": "robots.txt",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": false,
			"hasErrorBoundary": false,
			"module": "/assets/robots.txt-BvRk9kiK.js",
			"imports": [],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/api.health": {
			"id": "routes/api.health",
			"parentId": "root",
			"path": "api/health",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": false,
			"hasErrorBoundary": false,
			"module": "/assets/api.health-BvRk9kiK.js",
			"imports": [],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/api.$": {
			"id": "routes/api.$",
			"parentId": "root",
			"path": "api/*",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": true,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": false,
			"hasErrorBoundary": false,
			"module": "/assets/api._-BvRk9kiK.js",
			"imports": [],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/assets/manifest-48a91113.js",
	"version": "48a91113",
	"sri": void 0
};
// \0virtual:react-router/server-build
var assetsBuildDirectory = "..\\..\\dist\\apps\\web\\client";
var basename = "/";
var future = {
	"unstable_customRouteDiscovery": false,
	"unstable_enableNodeReadableStream": false,
	"unstable_optimizeDeps": false
};
var ssr = true;
var unstable_apiOnly = false;
var unstable_apiServerOrigin = void 0;
var isSpaMode = false;
var prerender = [];
var routeDiscovery = {
	"mode": "lazy",
	"manifestPath": "/__manifest"
};
var publicPath = "/";
var entry = { module: entry_server_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"routes/home": {
		id: "routes/home",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: home_exports
	},
	"routes/party": {
		id: "routes/party",
		parentId: "root",
		path: "partijos/:partyId",
		index: void 0,
		caseSensitive: void 0,
		module: party_exports
	},
	"routes/promises": {
		id: "routes/promises",
		parentId: "root",
		path: "pazadai",
		index: void 0,
		caseSensitive: void 0,
		module: promises_exports
	},
	"routes/followed-promises": {
		id: "routes/followed-promises",
		parentId: "root",
		path: "sekami-pazadai",
		index: void 0,
		caseSensitive: void 0,
		module: followed_promises_exports
	},
	"routes/promise": {
		id: "routes/promise",
		parentId: "root",
		path: "pazadai/:promiseId",
		index: void 0,
		caseSensitive: void 0,
		module: promise_exports
	},
	"routes/llms.txt": {
		id: "routes/llms.txt",
		parentId: "root",
		path: "llms.txt",
		index: void 0,
		caseSensitive: void 0,
		module: llms_txt_exports
	},
	"routes/not-found": {
		id: "routes/not-found",
		parentId: "root",
		path: "*",
		index: void 0,
		caseSensitive: void 0,
		module: not_found_exports
	},
	"routes/sitemap.xml": {
		id: "routes/sitemap.xml",
		parentId: "root",
		path: "sitemap.xml",
		index: void 0,
		caseSensitive: void 0,
		module: sitemap_xml_exports
	},
	"routes/robots.txt": {
		id: "routes/robots.txt",
		parentId: "root",
		path: "robots.txt",
		index: void 0,
		caseSensitive: void 0,
		module: robots_txt_exports
	},
	"routes/api.health": {
		id: "routes/api.health",
		parentId: "root",
		path: "api/health",
		index: void 0,
		caseSensitive: void 0,
		module: api_health_exports
	},
	"routes/api.$": {
		id: "routes/api.$",
		parentId: "root",
		path: "api/*",
		index: void 0,
		caseSensitive: void 0,
		module: api_$_exports
	}
};
var allowedActionOrigins = false;
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr, unstable_apiOnly, unstable_apiServerOrigin };
