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
		h1_a: "The camera moves.",
		h1_b: "The property doesn't.",
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
		mail_subject: "Free sample request",
		mail_body: "Agency:\nListing photos (link or attached):\nNumber of photos:",
	},
	pt: {
		title: "Walk in Frame: as fotografias do seu imóvel, em visita",
		description:
			"A Walk in Frame transforma as fotografias do seu imóvel em vídeos curtos de visita. A câmara move-se, o imóvel não muda. Peça uma amostra gratuita.",
		skip: "Ir para o pedido de amostra",
		logo_aria: "Walk in Frame, voltar ao topo",
		lang_label: "Idioma",
		cta: "Pedir uma amostra",
		cta_short: "Amostra",
		h1_a: "A câmara move-se.",
		h1_b: "O imóvel não.",
		lede: "Envie-nos as fotografias do imóvel. Devolvemos um vídeo curto de visita, feito apenas com o que as fotografias mostram.",
		link_see: "Veja como uma foto se move",
		reel_aria: "Vídeo de exemplo: seis divisões, cada uma feita a partir de uma só fotografia do anúncio",
		reel_note: "Vídeo de exemplo, 27 s. Feito com fotografias de banco de imagens, não com trabalho de clientes.",
		pause: "Pausar",
		play: "Reproduzir",
		promise_h: "Nada no vídeo que não esteja na fotografia.",
		promise_p:
			"Sem mobília acrescentada, sem divisões maiores, sem espaços inventados. A câmara move-se pela sua fotografia e o imóvel fica como está anunciado.",
		hint_hover: "Passe o rato numa foto. Ela move-se.",
		hint_touch: "Toque numa foto. Ela move-se.",
		hint_click: "Clique numa foto para ver o clipe.",
		play_clip: "Reproduzir clipe:",
		tile_a: "Jardim e piscina",
		tile_b: "Hall de entrada",
		tile_c: "Sala open space",
		tile_d: "Sala de estar",
		tile_e: "Cozinha",
		tile_f: "Quarto",
		alt_a: "Casa de tijolo vista do outro lado de uma piscina e de um relvado",
		alt_b: "Hall de entrada com uma escada curva",
		alt_c: "Sala open space com cozinha e vista para a cidade",
		alt_d: "Sala com sofá escuro e cortinas laranja",
		alt_e: "Cozinha com bancada de mármore e dois bancos de arame",
		alt_f: "Quarto com cortinas azul-petróleo e parede de vidro",
		chip_photo: "Foto",
		chip_video: "Vídeo",
		chip_loading: "A carregar",
		chip_unavailable: "Indisponível",
		source_photo: "Foto original",
		steps_h: "Como funciona",
		step1_h: "Envie",
		step1_p: "As fotografias do imóvel que já tem.",
		step2_h: "Receba",
		step2_p: "Um vídeo curto de visita com os nomes das divisões, feito apenas com essas fotografias.",
		step3_h: "Publique",
		step3_p: "No seu site, nos portais imobiliários e nas redes sociais.",
		steps_note:
			"Cada vídeo dura cerca de 25 segundos em 16:9, com os nomes das divisões e um cartão final com a marca.",
		close_h: "Envie um anúncio. Receba uma amostra.",
		close_p:
			"Anexe ou envie a ligação das fotografias de um anúncio. A amostra é gratuita e é feita apenas com essas fotografias.",
		next_line: "Envie as fotografias e respondemos por e-mail com a sua amostra.",
		mail_pre: "Ou escreva para",
		copy: "Copiar endereço",
		copied: "Copiado",
		copy_fail: "Selecione o endereço acima para o copiar",
		foot1:
			"O vídeo de exemplo e os clipes usam fotografia de banco de imagens da Pexels. São demonstrações, não trabalho de clientes.",
		foot2: "Este site não define cookies nem carrega nada de terceiros.",
		mail_subject: "Pedido de amostra gratuita",
		mail_body: "Agência:\nFotografias do anúncio (ligação ou em anexo):\nNúmero de fotografias:",
	},
	it: {
		title: "Walk in Frame: le foto del tuo immobile, in visita",
		description:
			"Walk in Frame trasforma le foto del tuo immobile in brevi video di visita. La camera si muove, l'immobile non cambia. Richiedi un campione gratuito.",
		skip: "Vai alla richiesta di campione",
		logo_aria: "Walk in Frame, torna all'inizio",
		lang_label: "Lingua",
		cta: "Richiedi un campione",
		cta_short: "Campione",
		h1_a: "La camera si muove.",
		h1_b: "L'immobile no.",
		lede: "Inviaci le foto dell'immobile. Ti restituiamo un breve video di visita realizzato solo con ciò che le foto mostrano.",
		link_see: "Guarda come si muove una foto",
		reel_aria: "Video di esempio: sei stanze, ciascuna ricavata da una sola foto dell'annuncio",
		reel_note: "Video di esempio, 27 s. Realizzato con fotografie stock, non con lavori per clienti.",
		pause: "Pausa",
		play: "Riproduci",
		promise_h: "Niente nel video che non sia nella foto.",
		promise_p:
			"Niente mobili aggiunti, niente stanze più grandi, niente spazi inventati. La camera si muove dentro la tua foto e l'immobile resta com'è annunciato.",
		hint_hover: "Passa il mouse su una foto. Si muove.",
		hint_touch: "Tocca una foto. Si muove.",
		hint_click: "Fai clic su una foto per vedere il clip.",
		play_clip: "Riproduci clip:",
		tile_a: "Giardino e piscina",
		tile_b: "Ingresso",
		tile_c: "Living open space",
		tile_d: "Soggiorno",
		tile_e: "Cucina",
		tile_f: "Camera da letto",
		alt_a: "Casa in mattoni vista oltre una piscina e un prato",
		alt_b: "Ingresso con una scala curva",
		alt_c: "Soggiorno open space con cucina e vista sulla città",
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
		step2_p: "Un breve video di visita con le etichette delle stanze, realizzato solo con quelle foto.",
		step3_h: "Pubblica",
		step3_p: "Sul tuo sito, sui portali immobiliari e sui social.",
		steps_note:
			"Ogni video dura circa 25 secondi in 16:9, con le etichette delle stanze e una scheda finale con il marchio.",
		close_h: "Invia un annuncio. Ricevi un campione.",
		close_p: "Allega o linka le foto di un annuncio. Il campione è gratuito ed è realizzato solo con quelle foto.",
		next_line: "Invia le foto e ti rispondiamo via e-mail con il tuo campione.",
		mail_pre: "Oppure scrivi a",
		copy: "Copia indirizzo",
		copied: "Copiato",
		copy_fail: "Seleziona l'indirizzo qui sopra per copiarlo",
		foot1: "Il video di esempio e i clip usano fotografie stock di Pexels. Sono dimostrazioni, non lavori per clienti.",
		foot2: "Questo sito non imposta cookie e non carica nulla da terze parti.",
		mail_subject: "Richiesta di campione gratuito",
		mail_body: "Agenzia:\nFoto dell'annuncio (link o allegate):\nNumero di foto:",
	},
	es: {
		title: "Walk in Frame: las fotos de tu propiedad, en recorrido",
		description:
			"Walk in Frame convierte las fotos de tu propiedad en vídeos cortos de recorrido. La cámara se mueve, la propiedad no cambia. Pide una muestra gratuita.",
		skip: "Ir a la solicitud de muestra",
		logo_aria: "Walk in Frame, volver arriba",
		lang_label: "Idioma",
		cta: "Pedir una muestra",
		cta_short: "Muestra",
		h1_a: "La cámara se mueve.",
		h1_b: "La propiedad no.",
		lede: "Envíanos las fotos de la propiedad. Te devolvemos un vídeo corto de recorrido hecho solo con lo que muestran las fotos.",
		link_see: "Mira cómo se mueve una foto",
		reel_aria: "Vídeo de muestra: seis estancias, cada una hecha a partir de una sola foto del anuncio",
		reel_note: "Vídeo de muestra, 27 s. Hecho con fotografías de stock, no con trabajos de clientes.",
		pause: "Pausar",
		play: "Reproducir",
		promise_h: "Nada en el vídeo que no esté en la foto.",
		promise_p:
			"Sin muebles añadidos, sin habitaciones más grandes, sin espacios inventados. La cámara se mueve por tu foto y la propiedad queda tal como está anunciada.",
		hint_hover: "Pasa el ratón sobre una foto. Se mueve.",
		hint_touch: "Toca una foto. Se mueve.",
		hint_click: "Haz clic en una foto para ver su clip.",
		play_clip: "Reproducir clip:",
		tile_a: "Jardín y piscina",
		tile_b: "Recibidor",
		tile_c: "Salón de planta abierta",
		tile_d: "Salón",
		tile_e: "Cocina",
		tile_f: "Dormitorio",
		alt_a: "Casa de ladrillo vista al otro lado de una piscina y un césped",
		alt_b: "Recibidor con una escalera curva",
		alt_c: "Salón de planta abierta con cocina y vistas a la ciudad",
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
		step1_p: "Las fotos de la propiedad que ya tienes.",
		step2_h: "Recibe",
		step2_p: "Un vídeo corto de recorrido con el nombre de cada estancia, hecho solo con esas fotos.",
		step3_h: "Publica",
		step3_p: "En tu web, en los portales inmobiliarios y en redes sociales.",
		steps_note:
			"Cada vídeo dura unos 25 segundos en 16:9, con el nombre de cada estancia y una tarjeta final con la marca.",
		close_h: "Envía un anuncio. Recibe una muestra.",
		close_p: "Adjunta o enlaza las fotos de un anuncio. La muestra es gratuita y se hace solo con esas fotos.",
		next_line: "Envía las fotos y te respondemos por correo con tu muestra.",
		mail_pre: "O escribe a",
		copy: "Copiar dirección",
		copied: "Copiado",
		copy_fail: "Selecciona la dirección de arriba para copiarla",
		foot1:
			"El vídeo de muestra y los clips usan fotografía de stock de Pexels. Son demostraciones, no trabajos de clientes.",
		foot2: "Este sitio no usa cookies ni carga nada de terceros.",
		mail_subject: "Solicitud de muestra gratuita",
		mail_body: "Agencia:\nFotos del anuncio (enlace o adjuntas):\nNúmero de fotos:",
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

	const address = doc.getElementById("mail-addr")?.textContent?.trim() ?? "";
	const href = `mailto:${address}?subject=${encodeURIComponent(t("mail_subject"))}&body=${encodeURIComponent(t("mail_body"))}`;
	for (const link of doc.querySelectorAll('a[data-mail="request"]')) link.setAttribute("href", href);

	const select = /** @type {HTMLSelectElement | null} */ (doc.getElementById("lang"));
	if (select) select.value = current;
	doc.dispatchEvent(new Event("languagechange"));
}

/**
 * Chooses the starting language and wires the selector. The choice is kept in localStorage,
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

	doc.getElementById("lang")?.addEventListener("change", (event) => {
		const chosen = /** @type {HTMLSelectElement} */ (event.target).value;
		applyLanguage(doc, chosen);
		try {
			win.localStorage.setItem(STORAGE_KEY, chosen);
		} catch {
			/* Not saved; the choice still applies for this visit. */
		}
	});
	return language;
}
