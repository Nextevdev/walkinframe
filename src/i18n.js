export const LANGUAGES = ["pt", "it", "es", "en"];
const DEFAULT_LANGUAGE = "en";
const STORAGE_KEY = "wif-lang";

export const messages = {
	en: {
		title: "Walk in Frame: property photos, walked through",
		description:
			"Walk in Frame turns your property photos into short walk-through videos. The camera moves, the property doesn't change. Ask for a free sample.",
		skip: "Skip to the sample request",
		logo_aria: "Walk in Frame, back to top",
		lang_label: "Language",
		cta: "Request a sample",
		cta_short: "Sample",
		h1_a: "Your listing photos, as a walk-through.",
		h1_b: "Only what the photos show.",
		lede: "Send us your property photos. We return a short walk-through video built only from what the photos show.",
		link_see: "See how a photo walks",
		reel_aria: "Sample reel: six rooms, each built from a single listing photo",
		reel_note: "Sample reel, 27 s. Built from stock photographs, not client work.",
		pause: "Pause",
		play: "Play",
		promise_h: "Nothing in the video that isn't in the photo.",
		promise_p:
			"No added furniture, no bigger rooms, no invented spaces. The camera moves through your photograph, and the property stays as listed.",
		hint_hover: "Hover a photo. It walks.",
		hint_touch: "Tap a photo. It walks.",
		hint_click: "Click a photo to play its clip.",
		play_clip: "Play clip:",
		tile_a: "Garden and pool",
		tile_b: "Entrance hall",
		tile_c: "Open-plan living",
		tile_d: "Living room",
		tile_e: "Kitchen",
		tile_f: "Bedroom",
		alt_a: "Brick house seen across a pool and lawn",
		alt_b: "Entrance hall with a curved staircase",
		alt_c: "Open-plan living room with kitchen and a city view",
		alt_d: "Living room with a dark sofa and orange curtains",
		alt_e: "Kitchen with a marble counter and two wire stools",
		alt_f: "Bedroom with teal curtains and a glass wall",
		chip_photo: "Photo",
		chip_video: "Video",
		chip_loading: "Loading",
		chip_unavailable: "Unavailable",
		source_photo: "Source photo",
		steps_h: "How it works",
		step1_h: "Send",
		step1_p: "The property photos you already have.",
		step2_h: "Receive",
		step2_p: "A short walk-through video with room labels, made only from those photos.",
		step3_h: "Publish",
		step3_p: "On your site, the property portals and social.",
		steps_note: "Each video runs about 25 seconds in 16:9, with room labels and a closing brand card.",
		close_h: "Send one listing. Get a sample back.",
		close_p: "Attach or link the photos of one listing. The sample is free, and it is made only from those photos.",
		next_line: "Send the photos and we reply by email with your sample.",
		mail_pre: "Or write to",
		copy: "Copy address",
		copied: "Copied",
		copy_fail: "Select the address above to copy it",
		foot1: "Sample reel and clips use stock photography from Pexels. They are demonstrations, not client work.",
		foot2: "This site sets no cookies and loads nothing from third parties.",
	},
	pt: {
		title: "Walk in Frame: as fotos do seu imóvel, em visita virtual",
		description:
			"A Walk in Frame transforma as fotos do seu imóvel em vídeos curtos de visita virtual. O vídeo percorre as fotos e o imóvel não muda. Peça uma amostra gratuita.",
		skip: "Ir para o pedido de amostra",
		logo_aria: "Walk in Frame, voltar ao topo",
		lang_label: "Idioma",
		cta: "Pedir uma amostra",
		cta_short: "Amostra",
		h1_a: "As fotos do anúncio, em visita virtual.",
		h1_b: "Só o que as fotos mostram.",
		lede: "Envie-nos as fotos do imóvel. Devolvemos um vídeo curto de visita virtual, feito apenas com o que as fotos mostram.",
		link_see: "Veja uma foto ganhar movimento",
		reel_aria: "Vídeo de exemplo: seis divisões, cada uma feita a partir de uma só foto do anúncio",
		reel_note: "Vídeo de exemplo, 27 s. Feito com fotos de bancos de imagens, não com trabalhos de clientes.",
		pause: "Pausar",
		play: "Reproduzir",
		promise_h: "Nada no vídeo que não esteja na foto.",
		promise_p:
			"Sem mobília acrescentada, sem divisões ampliadas e sem espaços inventados. O vídeo percorre a sua foto, e o imóvel fica tal como foi anunciado.",
		hint_hover: "Passe o cursor sobre uma foto e veja-a ganhar movimento.",
		hint_touch: "Toque numa foto e veja-a ganhar movimento.",
		hint_click: "Clique numa foto para ver o vídeo dessa divisão.",
		play_clip: "Reproduzir vídeo:",
		tile_a: "Jardim e piscina",
		tile_b: "Hall de entrada",
		tile_c: "Sala de jantar e estar",
		tile_d: "Sala de estar",
		tile_e: "Cozinha",
		tile_f: "Quarto",
		alt_a: "Moradia de tijolo vista do outro lado da piscina e do relvado",
		alt_b: "Hall de entrada com escadaria curva",
		alt_c: "Sala de jantar e estar em open space, com cozinha e vista para a cidade",
		alt_d: "Sala de estar com sofá escuro e cortinas cor de laranja",
		alt_e: "Cozinha com bancada de mármore e dois bancos de arame",
		alt_f: "Quarto com cortinas azul-petróleo e parede de vidro",
		chip_photo: "Foto",
		chip_video: "Vídeo",
		chip_loading: "A carregar",
		chip_unavailable: "Indisponível",
		source_photo: "Foto original",
		steps_h: "Como funciona",
		step1_h: "Envie",
		step1_p: "As fotos do imóvel que já tem.",
		step2_h: "Receba",
		step2_p: "Um vídeo curto de visita virtual, com o nome de cada divisão, feito só com essas fotos.",
		step3_h: "Publique",
		step3_p: "No seu site, nos portais imobiliários e nas redes sociais.",
		steps_note:
			"Cada vídeo dura cerca de 25 segundos, em formato 16:9, com o nome de cada divisão e um ecrã final com a marca.",
		close_h: "Envie um anúncio. Receba uma amostra.",
		close_p:
			"Anexe as fotos de um anúncio ou envie-nos a ligação. A amostra é gratuita e feita apenas com essas fotos.",
		next_line: "Envie as fotos e respondemos por e-mail com a sua amostra.",
		mail_pre: "Ou escreva para",
		copy: "Copiar e-mail",
		copied: "Copiado",
		copy_fail: "Selecione o e-mail acima para o copiar",
		foot1:
			"O vídeo de exemplo e os vídeos das fotos usam imagens de banco de imagens da Pexels. São demonstrações, não trabalhos de clientes.",
		foot2: "Este site não usa cookies nem carrega nada de terceiros.",
	},
	it: {
		title: "Walk in Frame: le foto del tuo immobile, in video tour",
		description:
			"Walk in Frame trasforma le foto del tuo immobile in brevi video tour. La ripresa scorre sulle foto e l'immobile non cambia. Richiedi un campione gratuito.",
		skip: "Vai alla richiesta di campione",
		logo_aria: "Walk in Frame, torna all'inizio",
		lang_label: "Lingua",
		cta: "Richiedi un campione",
		cta_short: "Campione",
		h1_a: "Le foto dell'annuncio, in video tour.",
		h1_b: "Solo ciò che le foto mostrano.",
		lede: "Inviaci le foto dell'immobile. Ti restituiamo un breve video tour, realizzato solo con ciò che le foto mostrano.",
		link_see: "Guarda una foto prendere vita",
		reel_aria: "Video di esempio: sei stanze, ciascuna ricavata da una sola foto dell'annuncio",
		reel_note: "Video di esempio, 27 s. Realizzato con foto di archivio, non con lavori per clienti.",
		pause: "Pausa",
		play: "Riproduci",
		promise_h: "Niente nel video che non sia nella foto.",
		promise_p:
			"Niente mobili aggiunti, stanze ingrandite o spazi inventati. La ripresa scorre dentro la tua foto e l'immobile resta com'è nell'annuncio.",
		hint_hover: "Passa il cursore su una foto: prende vita.",
		hint_touch: "Tocca una foto: prende vita.",
		hint_click: "Fai clic su una foto per vedere il video di quella stanza.",
		play_clip: "Riproduci video:",
		tile_a: "Giardino e piscina",
		tile_b: "Ingresso",
		tile_c: "Zona giorno open space",
		tile_d: "Soggiorno",
		tile_e: "Cucina",
		tile_f: "Camera da letto",
		alt_a: "Villa in mattoni vista oltre la piscina e il prato",
		alt_b: "Ingresso con scala curva",
		alt_c: "Zona giorno open space con cucina e vista sulla città",
		alt_d: "Soggiorno con divano scuro e tende arancioni",
		alt_e: "Cucina con piano in marmo e due sgabelli in metallo",
		alt_f: "Camera da letto con tende verde petrolio e parete di vetro",
		chip_photo: "Foto",
		chip_video: "Video",
		chip_loading: "Caricamento",
		chip_unavailable: "Non disponibile",
		source_photo: "Foto originale",
		steps_h: "Come funziona",
		step1_h: "Invia",
		step1_p: "Le foto dell'immobile che hai già.",
		step2_h: "Ricevi",
		step2_p: "Un breve video tour con il nome di ogni stanza, realizzato solo con quelle foto.",
		step3_h: "Pubblica",
		step3_p: "Sul tuo sito, sui portali immobiliari e sui social.",
		steps_note:
			"Ogni video dura circa 25 secondi, in formato 16:9, con il nome di ogni stanza e una schermata finale con il marchio.",
		close_h: "Invia un annuncio. Ricevi un campione.",
		close_p:
			"Allega le foto di un annuncio o mandaci il link. Il campione è gratuito ed è realizzato solo con quelle foto.",
		next_line: "Invia le foto e ti rispondiamo via e-mail con il tuo campione.",
		mail_pre: "Oppure scrivi a",
		copy: "Copia l'e-mail",
		copied: "Copiato",
		copy_fail: "Seleziona l'e-mail qui sopra per copiarla",
		foot1:
			"Il video di esempio e i video delle foto usano immagini di archivio di Pexels. Sono dimostrazioni, non lavori per clienti.",
		foot2: "Questo sito non usa cookie e non carica nulla da terze parti.",
	},
	es: {
		title: "Walk in Frame: las fotos de tu inmueble, en recorrido virtual",
		description:
			"Walk in Frame convierte las fotos de tu inmueble en vídeos cortos de recorrido virtual. El vídeo recorre las fotos y el inmueble no cambia. Pide una muestra gratuita.",
		skip: "Ir a la solicitud de muestra",
		logo_aria: "Walk in Frame, volver arriba",
		lang_label: "Idioma",
		cta: "Pedir una muestra",
		cta_short: "Muestra",
		h1_a: "Las fotos del anuncio, en recorrido virtual.",
		h1_b: "Solo lo que muestran las fotos.",
		lede: "Envíanos las fotos de tu inmueble. Te devolvemos un vídeo corto de recorrido virtual, hecho solo con lo que muestran las fotos.",
		link_see: "Mira una foto cobrar vida",
		reel_aria: "Vídeo de muestra: seis estancias, cada una hecha a partir de una sola foto del anuncio",
		reel_note: "Vídeo de muestra, 27 s. Hecho con fotos de bancos de imágenes, no con trabajos de clientes.",
		pause: "Pausar",
		play: "Reproducir",
		promise_h: "Nada en el vídeo que no esté en la foto.",
		promise_p:
			"Sin muebles añadidos, sin estancias ampliadas y sin espacios inventados. El vídeo recorre tu foto, y el inmueble queda tal como se anunció.",
		hint_hover: "Pasa el cursor sobre una foto: cobra vida.",
		hint_touch: "Toca una foto: cobra vida.",
		hint_click: "Haz clic en una foto para ver el vídeo de esa estancia.",
		play_clip: "Reproducir vídeo:",
		tile_a: "Jardín y piscina",
		tile_b: "Recibidor",
		tile_c: "Salón abierto a la cocina",
		tile_d: "Salón",
		tile_e: "Cocina",
		tile_f: "Dormitorio",
		alt_a: "Casa de ladrillo visto al otro lado de la piscina y el césped",
		alt_b: "Recibidor con escalera curva",
		alt_c: "Salón abierto a la cocina, con vistas a la ciudad",
		alt_d: "Salón con sofá oscuro y cortinas naranjas",
		alt_e: "Cocina con encimera de mármol y dos taburetes de alambre",
		alt_f: "Dormitorio con cortinas verde azulado y pared de cristal",
		chip_photo: "Foto",
		chip_video: "Vídeo",
		chip_loading: "Cargando",
		chip_unavailable: "No disponible",
		source_photo: "Foto original",
		steps_h: "Cómo funciona",
		step1_h: "Envía",
		step1_p: "Las fotos del inmueble que ya tienes.",
		step2_h: "Recibe",
		step2_p: "Un vídeo corto de recorrido virtual, con el nombre de cada estancia, hecho solo con esas fotos.",
		step3_h: "Publica",
		step3_p: "En tu web, en los portales inmobiliarios y en redes sociales.",
		steps_note:
			"Cada vídeo dura unos 25 segundos, en formato 16:9, con el nombre de cada estancia y una pantalla final con la marca.",
		close_h: "Envía un anuncio. Recibe una muestra.",
		close_p:
			"Adjunta las fotos de un anuncio o envíanos el enlace. La muestra es gratuita y se hace solo con esas fotos.",
		next_line: "Envía las fotos y te respondemos por correo con tu muestra.",
		mail_pre: "O escribe a",
		copy: "Copiar correo",
		copied: "Copiado",
		copy_fail: "Selecciona el correo de arriba para copiarlo",
		foot1:
			"El vídeo de muestra y los vídeos de las fotos usan imágenes de banco de imágenes de Pexels. Son demostraciones, no trabajos de clientes.",
		foot2: "Este sitio no usa cookies ni carga nada de terceros.",
	},
};

let current = DEFAULT_LANGUAGE;

/**
 * @param {string} key
 * @returns {string}
 */
export function t(key) {
	return messages[current][key] ?? messages[DEFAULT_LANGUAGE][key] ?? key;
}

/** @returns {string} the language the page is showing */
export function currentLanguage() {
	return current;
}

/**
 * Picks the language: explicit ?lang=, then a saved choice, then the browser's, then English.
 * @param {{ search?: string, stored?: string | null, languages?: readonly string[] }} input
 * @returns {string}
 */
export function pickLanguage({ search = "", stored = null, languages = [] }) {
	const asked = new URLSearchParams(search).get("lang")?.toLowerCase();
	if (asked && LANGUAGES.includes(asked)) return asked;
	if (stored && LANGUAGES.includes(stored)) return stored;
	for (const language of languages) {
		const base = language.toLowerCase().split("-")[0];
		if (LANGUAGES.includes(base)) return base;
	}
	return DEFAULT_LANGUAGE;
}

/**
 * Writes every translated string into the page and tells the other modules to refresh.
 * @param {Document} doc
 * @param {string} language
 */
export function applyLanguage(doc, language) {
	current = LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
	const root = doc.documentElement;
	root.lang = current;
	doc.title = t("title");
	doc.querySelector('meta[name="description"]')?.setAttribute("content", t("description"));

	for (const element of doc.querySelectorAll("[data-i18n]")) {
		element.textContent = t(element.dataset.i18n);
	}
	for (const element of doc.querySelectorAll("[data-i18n-attr]")) {
		for (const pair of element.dataset.i18nAttr.split(";")) {
			const [attribute, key] = pair.split(":");
			element.setAttribute(attribute, t(key));
		}
	}
	for (const button of doc.querySelectorAll("[data-i18n-clip]")) {
		button.setAttribute("aria-label", `${t("play_clip")} ${t(button.dataset.i18nClip)}`);
	}

	for (const radio of doc.querySelectorAll("#lang [data-lang]")) {
		const selected = radio.dataset.lang === current;
		radio.setAttribute("aria-checked", String(selected));
		radio.tabIndex = selected ? 0 : -1;
	}
	doc.dispatchEvent(new Event("languagechange"));
}

/**
 * Chooses the starting language and wires the switcher. The choice is kept in localStorage,
 * which is not a cookie and never leaves the browser.
 * @param {Document} doc
 * @param {Window} win
 * @returns {string} the language applied
 */
export function initI18n(doc, win) {
	let stored = null;
	try {
		stored = win.localStorage.getItem(STORAGE_KEY);
	} catch {
		/* Storage can be blocked; the page works without it. */
	}
	const language = pickLanguage({
		search: win.location.search,
		stored,
		languages: win.navigator.languages ?? [win.navigator.language],
	});
	applyLanguage(doc, language);

	doc.getElementById("lang")?.addEventListener("click", (event) => {
		const chosen = /** @type {HTMLElement} */ (event.target).closest("[data-lang]")?.dataset.lang;
		if (!chosen || chosen === current) return;
		applyLanguage(doc, chosen);
		try {
			win.localStorage.setItem(STORAGE_KEY, chosen);
		} catch {
			/* Not saved; the choice still applies for this visit. */
		}
	});
	return language;
}
