import React, { useEffect, useRef, useState, useLayoutEffect, useMemo } from 'react';
import Lenis from 'lenis';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Menu, X, Scissors, Heart, MapPin,
    Sparkles, Clock, Phone, Instagram,
    Facebook, ArrowRight, Camera, Star, Calendar, ChevronDown, Mail,
    ArrowLeft, Play
} from 'lucide-react';
import logo from './assets/logo.png';
import heroImg from './assets/HERO.webp';

// Import Ambienti Images
import amb1 from './assets/AMBIENTI HAIR STUDIO-20260227T212318Z-1-001/AMBIENTI HAIR STUDIO/WhatsApp Image 2026-03-02 at 18.35.22.webp';
import amb2 from './assets/AMBIENTI HAIR STUDIO-20260227T212318Z-1-001/AMBIENTI HAIR STUDIO/06 - I BARBERINI-07000.webp';
import amb3 from './assets/AMBIENTI HAIR STUDIO-20260227T212318Z-1-001/AMBIENTI HAIR STUDIO/06 - I BARBERINI-07024.webp';
import amb4 from './assets/AMBIENTI HAIR STUDIO-20260227T212318Z-1-001/AMBIENTI HAIR STUDIO/DSCN0600.webp';

// Import Beauty Images
import beautyHero from './assets/BEAUTY CENTER/AMBIENTE BEAUTY CENTER/centro-benessere-i-barberini-beauty-relax-estetica-roma-via-federico-ozanam-45.webp';
import beautyBed from './assets/BEAUTY CENTER/AMBIENTE BEAUTY CENTER/i-barberini-beauty-relax-estetica-roma-via-federico-ozanam-45-lettino-massaggi.webp';
import beautySauna from './assets/BEAUTY CENTER/AMBIENTE BEAUTY CENTER/i-barberiniBeautySauna1.webp';
import beautyTreat1 from './assets/BEAUTY CENTER/TRATTAMENTI CORPO/IBARBERINIBEAUTY(1).webp';
import beautyTreat2 from './assets/BEAUTY CENTER/TRATTAMENTI CORPO/IBARBERINIBEAUTY3.webp';

// Import Specific Treatment Images
import treatDermaplaning from './assets/BEAUTY CENTER/DERMAPLANING/I BARBERINI DERMAPLANING.webp';
import treatLaminazione from './assets/BEAUTY CENTER/LAMINAZIONE CIGLIA/I BARBERINI Laminazione.webp';
import treatLaser from './assets/BEAUTY CENTER/LASER  DIODO/epilazione-laser.webp';
import treatMakeUp from './assets/BEAUTY CENTER/MAKE-UP/VISO I BARBERINI 7.JPG.webp';
import treatMicroblading from './assets/BEAUTY CENTER/MICROBLADING/MICROBLADING I BARBERINI 1.JPG..webp';
import treatNails from './assets/BEAUTY CENTER/NAILS/I BARBERINI NAILS 10.webp';
import treatPermanentMakeup from './assets/BEAUTY CENTER/PERMANENT MAKE UP/permanent-makeup.webp';
import treatPressoterapia from './assets/BEAUTY CENTER/PRESSOTERAPIA/pressoterapia1.webp';
import treatRadiofrequenza from './assets/BEAUTY CENTER/TRATTAMENTO VISO/Radiofrequenza-viso.webp';
import treatXtremeLashes from './assets/BEAUTY CENTER/XTREME LASHES/x-treme-lashes02.webp';

// Import Nails Section Images
import nailsImg1 from './assets/BEAUTY CENTER/NAILS/I BARBERINI NAILS 3.webp';
import nailsImg2 from './assets/BEAUTY CENTER/NAILS/I BARBERINI NAILS 15.webp';
import nailsImg3 from './assets/BEAUTY CENTER/NAILS/I BARBERINI NAILS 18.webp';

// Chi Siamo Image
import doriano1985 from './assets/Collezioni/Anni 90/Doriano 1985.webp';

// Keratin Section
import keratinaPdf from './assets/KERATINA.pdf';
import keratinaImg from './assets/Collezioni/Anni 2020/I BARBERINI 35 2022.webp';
import consigliHair from './assets/I Nostri Consigli/FOTO APERTURA RICOSTRUZIONE kAPILLARE.jpg';
import consigliBlond from './assets/I Nostri Consigli/Foto x il Testo bionde.jpg';

import { treatmentsContent } from './data/treatmentsContent';

gsap.registerPlugin(ScrollTrigger);

// --- Utilities & Components ---

const ScrollBackground = () => {
    const bgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(bgRef.current, {
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                },
                backgroundPosition: "0% 100%",
                ease: "none"
            });
        }, bgRef);
        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={bgRef}
            className="fixed inset-0 z-[-1] pointer-events-none opacity-40"
            style={{
                background: "radial-gradient(circle at 10% 20%, rgba(199, 161, 74, 0.05) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(90, 62, 54, 0.05) 0%, transparent 40%)",
                backgroundSize: "100% 200%"
            }}
        />
    );
};

// --- Dynamic Image Imports for Collections ---
// Vite import.meta.glob gives us a record of all matching files
const importAllImages = (globResult) => {
    return Object.values(globResult).map((module) => module.default);
};

const images90s = importAllImages(import.meta.glob('./assets/Collezioni/Anni 90/*.{png,jpg,jpeg,JPG,JPEG,webp}', { eager: true }));
const images00s = importAllImages(import.meta.glob('./assets/Collezioni/Anni 2000/*.{png,jpg,jpeg,JPG,JPEG,webp}', { eager: true }));
const images10s = importAllImages(import.meta.glob('./assets/Collezioni/Anni 2010/*.{png,jpg,jpeg,JPG,JPEG,webp}', { eager: true }));
const images20s = importAllImages(import.meta.glob('./assets/Collezioni/Anni 2020/*.{png,jpg,jpeg,JPG,JPEG,webp,mp4}', { eager: true }));
const imagesSpose = importAllImages(import.meta.glob('./assets/Collezioni/LE SPOSE/*.{png,jpg,jpeg,JPG,JPEG,webp}', { eager: true }));

// Dynamic Imports for Beauty Treatments
const treatDermaplaningImgs = importAllImages(import.meta.glob('./assets/BEAUTY CENTER/DERMAPLANING/*.{png,jpg,jpeg,JPG,JPEG,webp}', { eager: true }));
const treatLaminazioneImgs = importAllImages(import.meta.glob('./assets/BEAUTY CENTER/LAMINAZIONE CIGLIA/*.{png,jpg,jpeg,JPG,JPEG,webp}', { eager: true }));
const treatLaserImgs = importAllImages(import.meta.glob('./assets/BEAUTY CENTER/LASER  DIODO/*.{png,jpg,jpeg,JPG,JPEG,webp}', { eager: true }));
const treatMakeUpImgs = importAllImages(import.meta.glob('./assets/BEAUTY CENTER/MAKE-UP/*.{png,jpg,jpeg,JPG,JPEG,webp}', { eager: true }));
const treatMicrobladingImgs = importAllImages(import.meta.glob('./assets/BEAUTY CENTER/MICROBLADING/*.{png,jpg,jpeg,JPG,JPEG,webp}', { eager: true }));
const treatNailsImgs = importAllImages(import.meta.glob('./assets/BEAUTY CENTER/NAILS/*.{png,jpg,jpeg,JPG,JPEG,webp}', { eager: true }));
const treatPermanentMakeupImgs = importAllImages(import.meta.glob('./assets/BEAUTY CENTER/PERMANENT MAKE UP/*.{png,jpg,jpeg,JPG,JPEG,webp}', { eager: true }));
const treatPressoterapiaImgs = importAllImages(import.meta.glob('./assets/BEAUTY CENTER/PRESSOTERAPIA/*.{png,jpg,jpeg,JPG,JPEG,webp}', { eager: true }));
const treatRadiofrequenzaImgs = importAllImages(import.meta.glob('./assets/BEAUTY CENTER/RADIOFREQUENZA/*.{png,jpg,jpeg,JPG,JPEG,webp}', { eager: true }));
const treatVisoImgs = importAllImages(import.meta.glob('./assets/BEAUTY CENTER/TRATTAMENTO VISO/*.{png,jpg,jpeg,JPG,JPEG,webp}', { eager: true }));
const treatXtremeLashesImgs = importAllImages(import.meta.glob('./assets/BEAUTY CENTER/XTREME LASHES/*.{png,jpg,jpeg,JPG,JPEG,webp}', { eager: true }));
const treatSolariumImgs = importAllImages(import.meta.glob('./assets/BEAUTY CENTER/SOLARIUM/*.{png,jpg,jpeg,JPG,JPEG,webp}', { eager: true }));
const treatPedicureImgs = importAllImages(import.meta.glob('./assets/BEAUTY CENTER/PEDICURE/*.{png,jpg,jpeg,JPG,JPEG,webp}', { eager: true }));


const COLLECTIONS = [
    {
        id: 'anni-90',
        title: "Anni '90",
        desc: "L'origine della nostra storia a Monteverde.",
        image: images90s[0] || "https://images.unsplash.com/photo-1522336572468-97b06e8ef143?q=80&w=1000",
        images: images90s
    },
    {
        id: 'anni-2000',
        title: "Anni 2000",
        desc: "Sperimentazione e nuovi volumi.",
        image: images00s[0] || "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000",
        images: images00s
    },
    {
        id: 'anni-2010',
        title: "Anni 2010",
        desc: "Il minimalismo incontra la tradizione.",
        image: images10s[0] || "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1000",
        images: images10s
    },
    {
        id: 'anni-2020',
        title: "Anni 2020",
        desc: "Tecnica contemporanea e sostenibilità.",
        image: images20s[0] || "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000",
        images: images20s
    },
    {
        id: 'spose',
        title: "Spose",
        desc: "Il giorno più bello, affidato alle nostre mani.",
        image: imagesSpose[0] || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000",
        images: imagesSpose,
        special: true
    },
];

// --- Components ---

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed top-6 left-0 right-0 mx-auto z-[100] w-[95%] max-w-5xl transition-all duration-700 ${isScrolled ? 'top-4' : 'top-8'
                }`}>
                <div className={`relative w-full rounded-full transition-all duration-500 border px-8 py-3 flex justify-between items-center ${isScrolled
                    ? 'bg-white/10 backdrop-blur-2xl py-3 border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'
                    : 'bg-cream/40 backdrop-blur-md py-5 border-charcoal/5 shadow-2xl'
                    }`}>
                    <Link to="/" className="hover:scale-105 transition-transform duration-300 flex items-center">
                        <img src={logo} alt="I Barberini" className="h-12 w-auto object-contain" />
                    </Link>

                    <div className="hidden md:flex items-center gap-10">
                        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'text-charcoal after:w-full' : ''}`}>Home</Link>
                        <Link to="/collezioni" className={`nav-link ${location.pathname.startsWith('/collezioni') ? 'text-charcoal after:w-full' : ''}`}>Collezioni</Link>
                        <Link to="/beauty-center" className={`nav-link ${location.pathname === '/beauty-center' ? 'text-charcoal after:w-full' : ''}`}>Beauty Center</Link>
                        <Link to="/consigli" className={`nav-link ${location.pathname === '/consigli' ? 'text-charcoal after:w-full' : ''}`}>I nostri consigli</Link>
                        <Link to="/sedi" className={`nav-link ${location.pathname === '/sedi' ? 'text-charcoal after:w-full' : ''}`}>Sedi</Link>
                        <Link to="/sedi" className="btn-primary py-2 px-6 text-xs tracking-[0.2em] font-bold text-center">PRENOTA ORA</Link>
                    </div>

                    <button className="md:hidden text-charcoal p-2 hover:bg-charcoal/5 rounded-full transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-cream/95 backdrop-blur-2xl z-[110] flex flex-col items-center justify-center gap-8 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-10'
                }`}>
                <Link to="/" className="font-script text-5xl mb-8" onClick={() => setIsMenuOpen(false)}>I Barberini</Link>
                <Link to="/" className={`text-2xl font-serif relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-gold after:transition-all after:duration-300 ${location.pathname === '/' ? 'text-gold after:w-full' : 'text-charcoal hover:text-gold after:w-0 hover:after:w-full'}`} onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/collezioni" className={`text-2xl font-serif relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-gold after:transition-all after:duration-300 ${location.pathname.startsWith('/collezioni') ? 'text-gold after:w-full' : 'text-charcoal hover:text-gold after:w-0 hover:after:w-full'}`} onClick={() => setIsMenuOpen(false)}>Collezioni</Link>
                <Link to="/sedi" className={`text-2xl font-serif relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-gold after:transition-all after:duration-300 ${location.pathname === '/sedi' ? 'text-gold after:w-full' : 'text-charcoal hover:text-gold after:w-0 hover:after:w-full'}`} onClick={() => setIsMenuOpen(false)}>Sedi</Link>
                <Link to="/beauty-center" className={`text-2xl font-serif relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-gold after:transition-all after:duration-300 ${location.pathname === '/beauty-center' ? 'text-gold after:w-full' : 'text-charcoal hover:text-gold after:w-0 hover:after:w-full'}`} onClick={() => setIsMenuOpen(false)}>Beauty Center</Link>
                <Link to="/consigli" className={`text-2xl font-serif relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-gold after:transition-all after:duration-300 ${location.pathname === '/consigli' ? 'text-gold after:w-full' : 'text-charcoal hover:text-gold after:w-0 hover:after:w-full'}`} onClick={() => setIsMenuOpen(false)}>I nostri consigli</Link>
                <Link to="/sedi" className="btn-primary mt-8 scale-125 text-center" onClick={() => setIsMenuOpen(false)}>PRENOTA ORA</Link>
                <button className="absolute top-10 right-10 p-3 hover:bg-charcoal/5 rounded-full" onClick={() => setIsMenuOpen(false)}><X size={32} /></button>
            </div>
        </>
    );
};

const Hero = () => {
    const heroRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-content > *", {
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "power2.out"
            });

            gsap.to(bgRef.current, {
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                },
                y: 100,
                scale: 1.1,
                ease: "none"
            });
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden pt-36 pb-12 md:p-0">
            <div className="absolute inset-0 z-0">
                <img
                    ref={bgRef}
                    src={heroImg}
                    alt="I Barberini Salon"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-cream" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center hero-content mt-12 md:mt-0">
                <h1 className="font-script text-7xl md:text-[10rem] text-white mb-6 tracking-normal drop-shadow-2xl">
                    I Barberini
                </h1>
                <p className="font-sans text-xl md:text-2xl text-white/95 mb-10 max-w-2xl mx-auto italic drop-shadow-lg">
                    L' arte e l'eleganza dell'immagine a Roma, nel cuore di Roma, dal 1987.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
                    <Link to="/collezioni" className="btn-primary">SCOPRI LE COLLEZIONI</Link>
                    <Link to="/sedi" className="btn-secondary bg-white/10 backdrop-blur-sm text-white border-white/30 text-center flex items-center justify-center">PRENOTA ORA</Link>
                </div>
                
                {/* Value Section integrata nella Hero */}
                {/* Value Section integrata nella Hero */}
                <div className="grid md:grid-cols-3 gap-6 text-left border border-white/10 mt-12 bg-charcoal/70 p-6 md:p-8 rounded-[2rem] backdrop-blur-xl shadow-2xl relative z-20">
                    <div className="flex flex-col gap-2">
                        <h3 className="font-serif text-xl md:text-2xl uppercase text-gold flex items-center gap-3"><Clock size={24}/> Esperienza</h3>
                        <p className="text-white/95 font-sans text-sm md:text-base leading-relaxed font-light">Dal 1987 il punto di riferimento a Roma.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-serif text-xl md:text-2xl uppercase text-gold flex items-center gap-3"><Scissors size={24}/> Talento</h3>
                        <p className="text-white/95 font-sans text-sm md:text-base leading-relaxed font-light">Progetti stilistici che valorizzano la tua personalità.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-serif text-xl md:text-2xl uppercase text-gold flex items-center gap-3"><Heart size={24}/> Spose</h3>
                        <p className="text-white/95 font-sans text-sm md:text-base leading-relaxed font-light">Creazioni uniche per il giorno più importante.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ValueSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".glass-card", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-cream relative">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="flex flex-col gap-4 p-8 glass-card">
                        <Clock className="text-gold" size={40} />
                        <h3 className="font-serif text-2xl uppercase">Esperienza</h3>
                        <p className="text-charcoal/70 leading-relaxed font-sans">
                            Oltre quarant'anni di storia dedicati alla bellezza. Dal 1987 siamo il punto di riferimento per chi cerca stile e professionalità a Roma.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 p-8 glass-card">
                        <Scissors className="text-gold" size={40} />
                        <h3 className="font-serif text-2xl uppercase">Talento</h3>
                        <p className="text-charcoal/70 leading-relaxed font-sans">
                            I nostri parrucchieri sono maestri nell'ascolto e nella progettazione di un look che valorizzi la tua personalità in ogni dettaglio.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 p-8 glass-card">
                        <Heart className="text-gold" size={40} />
                        <h3 className="font-serif text-2xl uppercase">Spose</h3>
                        <p className="text-charcoal/70 leading-relaxed font-sans">
                            Uno dei nostri più grandi orgogli. Accompagniamo le spose nel giorno più importante con creazioni uniche.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Philosophy = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".reveal-text span", {
                scrollTrigger: {
                    trigger: ".reveal-text",
                    start: "top 80%",
                },
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.05,
                ease: "power2.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const text = "La maggior parte dei saloni punta sulla quantità. Noi ricerchiamo qualità, relazione e continuità.";

    return (
        <section ref={sectionRef} className="py-32 bg-charcoal text-white overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <p className="font-sans uppercase tracking-widest text-gold mb-8">La nostra filosofia</p>
                <h2 className="reveal-text font-serif text-4xl md:text-7xl leading-tight max-w-5xl mx-auto">
                    {text.split(" ").map((word, i) => (
                        <span key={i} className="inline-block mr-4">
                            {word === "qualità," || word === "relazione" || word === "continuità." ? (
                                <em className="text-gold not-italic">{word}</em>
                            ) : word}
                        </span>
                    ))}
                </h2>
            </div>
        </section>
    );
};

const Method = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".method-item", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                x: -30,
                opacity: 0,
                duration: 1,
                stagger: 0.3,
                ease: "power2.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-cream">
            <div className="container mx-auto px-6">
                <h2 className="section-title text-center mb-16">Il Nostro Metodo</h2>
                <div className="space-y-12 max-w-4xl mx-auto">
                    {[
                        { step: "01", title: "Ascolto", desc: "Ogni servizio inizia con una conversazione. Capire i tuoi desideri è la chiave di un risultato perfetto." },
                        { step: "02", title: "Progettazione", desc: "Traduciamo le tue idee in un progetto stilistico su misura, considerando lineamenti, stile di vita e salute del capello." },
                        { step: "03", title: "Cura Continua", desc: "Non finisce in salone. Ti forniamo i consigli e i prodotti giusti per mantenere il tuo look radioso ogni giorno." }
                    ].map((item, idx) => (
                        <div key={idx} className="method-item flex gap-8 items-start border-l-2 border-gold/30 pl-8 relative">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gold" />
                            <div>
                                <span className="text-gold font-sans font-bold text-sm tracking-tighter uppercase mb-2 block">{item.step}</span>
                                <h3 className="font-serif text-3xl mb-4 uppercase">{item.title}</h3>
                                <p className="text-charcoal/70 text-lg leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};



const AmbientiSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".ambienti-img", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                y: 80,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power3.out"
            });
            gsap.from(".ambienti-text", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-16 items-center mb-20 ambienti-text">
                    <div className="md:w-1/2">
                        <h2 className="section-title mb-6">Un Ambiente<br /><span className="italic text-charcoal/60">Esclusivo</span></h2>
                    </div>
                    <div className="md:w-1/2">
                        <p className="text-xl text-charcoal/80 font-sans leading-relaxed">
                            Abbiamo curato ogni dettaglio dei nostri saloni per offrirti un'esperienza di puro relax e lusso sartoriale. Entra nel mondo de I Barberini.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 aspect-[16/9] lg:aspect-auto h-64 lg:h-[32rem] rounded-[2rem] overflow-hidden ambienti-img">
                        <img src={amb3} alt="Interni del Salone" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-square lg:aspect-auto lg:h-[32rem] rounded-[2rem] overflow-hidden ambienti-img">
                        <img src={amb2} alt="Dettagli Salone" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-square lg:aspect-auto lg:h-[24rem] rounded-[2rem] overflow-hidden ambienti-img">
                        <img src={amb1} alt="Stazione Taglio" className="w-full h-full object-cover" />
                    </div>
                    <div className="lg:col-span-2 aspect-[16/9] lg:aspect-auto h-64 lg:h-[24rem] rounded-[2rem] overflow-hidden ambienti-img">
                        <img src={amb4} alt="Design del Salone" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </section>
    );
};

const ChiSiamoSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".chi-siamo-text", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
            gsap.from(".chi-siamo-img", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                x: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 bg-cream overflow-hidden border-t border-charcoal/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2 chi-siamo-text">
                        <span className="text-gold font-sans tracking-[0.2em] uppercase mb-4 block text-sm">Dal 1987</span>
                        <h2 className="section-title mb-8">La Nostra Storia</h2>
                        <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-6 italic">Consulenti di Bellezza da oltre 39 anni</h3>
                        <div className="space-y-6 text-charcoal/80 font-sans leading-relaxed text-lg">
                            <p>
                                Doriano e Nadia dal 1987 giovanissimi e carichi di energia, incominciammo a diffondere le nostre idee, il nostro modo di concepire la cura e la bellezza.
                            </p>
                            <p>
                                Con l'aiuto di Angelo e Sabrina e uno staff di circa 25 collaboratori, in pochi anni apriamo a Roma i nostri saloni di bellezza, costantemente aggiornati, attenti alle ultime tendenze moda e ai prodotti innovativi.
                            </p>
                            <p>
                                Offriamo ai nostri clienti il meglio per un <span className="font-bold text-charcoal">Total Look</span> all'avanguardia. Nei nostri saloni offriamo un servizio completo per la cura dei capelli e del corpo: parrucchieri, barbieri, estetiste, onicotecniche, make-up artist, solarium e tutto ciò che riguarda la cura della persona.
                            </p>
                        </div>
                    </div>
                    <div className="lg:w-1/2 w-full aspect-[4/5] object-contain md:h-[700px] rounded-[2rem] overflow-hidden chi-siamo-img relative shadow-2xl bg-cream">
                        <img 
                            src={doriano1985} 
                            alt="Doriano 1985 - La Storia de I Barberini" 
                            className="w-full h-full object-cover grayscale sepia-[0.3]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent mix-blend-multiply"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const BrandsSection = () => {
    const brands = [
        "Schwarzkopf", "Bioline", "AlfaParf", "Parlux", 
        "Scellac", "Morgan Taylor", "Gelish", 
        "Keratin Complex", "Xtreme Lashes", "Biotek", "Phibrows"
    ];

    // Split brands for two rows
    const topBrands = brands.slice(0, 6);
    const bottomBrands = brands.slice(6);

    const sectionRef = useRef(null);

    return (
        <section ref={sectionRef} className="py-32 bg-charcoal text-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none z-0">
                <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2000" className="w-full h-full object-cover grayscale opacity-10" alt="Background Texture" />
            </div>
            <div className="container mx-auto px-6 text-center relative z-10 mb-16">
                <span className="text-gold font-sans tracking-[0.3em] uppercase mb-4 block text-sm">Partner d'Eccellenza</span>
                <h2 className="font-serif text-5xl md:text-6xl relative">I Nostri Brand</h2>
            </div>
            
            <div className="w-full relative z-20 flex flex-col gap-8 md:gap-12 rotate-[-2deg] scale-105">
                {/* Top Row Marquee */}
                <div className="flex overflow-hidden group">
                    <div className="animate-marquee flex gap-8 md:gap-12 px-4">
                        {[...topBrands, ...topBrands, ...topBrands].map((brand, idx) => (
                            <div key={`top-${idx}`} className="flex-shrink-0 px-8 py-4 md:px-12 md:py-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-gold/20 hover:border-gold/50 transition-all duration-500 cursor-pointer shadow-2xl flex items-center justify-center">
                                <span className="font-serif italic text-2xl md:text-4xl tracking-wider text-white/90 group-hover:text-white transition-colors">{brand}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Row Marquee (Reverse) */}
                <div className="flex overflow-hidden group">
                    <div className="animate-marquee-reverse flex gap-8 md:gap-12 px-4">
                        {[...bottomBrands, ...bottomBrands, ...bottomBrands].map((brand, idx) => (
                            <div key={`bot-${idx}`} className="flex-shrink-0 px-8 py-4 md:px-12 md:py-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-gold/20 hover:border-gold/50 transition-all duration-500 cursor-pointer shadow-2xl flex items-center justify-center">
                                <span className="font-serif italic text-2xl md:text-4xl tracking-wider text-white/90 group-hover:text-white transition-colors">{brand}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Pages ---

const KeratinSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".keratin-text", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
            gsap.from(".keratin-img", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                x: -50,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
                    <div className="lg:w-1/2 keratin-text">
                        <span className="text-gold font-sans tracking-[0.2em] uppercase mb-4 block text-sm">Innovazione & Cura</span>
                        <h2 className="section-title mb-8">Trattamenti alla Keratina</h2>
                        <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-6 italic">Per capelli sani, forti e luminosi</h3>
                        <div className="space-y-6 text-charcoal/80 font-sans leading-relaxed text-lg mb-10">
                            <p>
                                Il nostro speciale trattamento alla keratina ricostruisce la fibra capillare dall'interno, restituendo corpo e lucentezza anche ai capelli più indisciplinati o crespi. 
                            </p>
                            <p>
                                Un rituale di rigenerazione che unisce la tecnica a prodotti di altissima qualità, per garantirti un liscio perfetto, naturale e un capello protetto nel tempo.
                            </p>
                        </div>
                        <a 
                            href={keratinaPdf} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            SCOPRI DI PIÙ
                        </a>
                    </div>
                    <div className="lg:w-1/2 w-full aspect-[4/5] object-contain md:h-[600px] rounded-[2rem] overflow-hidden keratin-img relative shadow-2xl">
                        <img 
                            loading="lazy"
                            src={keratinaImg} 
                            alt="Trattamento alla Keratina" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-charcoal/10 mix-blend-multiply"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const HomePage = () => {
    const mainRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".reveal-up", {
                scrollTrigger: {
                    trigger: ".reveal-up",
                    start: "top 85%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });
        }, mainRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={mainRef}>
            <Helmet>
                <title>I Barberini | L'arte dell'immagine a Roma</title>
                <meta name="description" content="I Barberini: Maison di Bellezza a Roma dal 1987. Saloni multisede, Beauty Center d'eccellenza, cura dell'immagine per capelli e corpo, specializzati in spose." />
            </Helmet>
            <Hero />
            
            <ChiSiamoSection />
            <Philosophy />
            <KeratinSection />
            <section className="py-24 bg-cream reveal-up">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="section-title mb-8">Quarant'anni di Stile</h2>
                    <p className="text-charcoal/70 mb-12 max-w-xl mx-auto">
                        Dagli anni 90 ad oggi, abbiamo attraversato ere e tendenze, mantenendo sempre fede alla nostra visione di eleganza.
                    </p>
                    <Link to="/collezioni" className="btn-secondary">VEDI TUTTE LE COLLEZIONI</Link>
                </div>
            </section>
            <Method />
            <BrandsSection />
            <AmbientiSection />
            <section className="py-48 bg-gold text-charcoal text-center overflow-hidden">
                <div className="container mx-auto px-6 reveal-up">
                    <h2 className="section-title mb-8">Vivi l'esperienza.</h2>
                    <p className="mb-10 text-xl max-w-2xl mx-auto italic">
                        Prenota oggi il tuo appuntamento e scopri il piacere di vedersi splendere.
                    </p>
                    <Link to="/sedi" className="btn-primary bg-charcoal text-white hover:bg-midnight shadow-2xl mx-auto inline-flex items-center justify-center gap-2">
                        PRENOTA ORA <Calendar size={18} />
                    </Link>
                </div>
            </section>
        </main>
    );
};

const CollectionsPage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".collection-card", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="pt-48 pb-24 bg-cream min-h-screen">
            <Helmet>
                <title>Collezioni e Look | I Barberini</title>
                <meta name="description" content="Esplora le collezioni e i look creati dagli hair stylist de I Barberini. Lasciati ispirare dalle nostre creazioni esclusive per tagli, colori e acconciature sposa." />
            </Helmet>
            <div className="container mx-auto px-6">
                <h1 className="section-title mb-16 animate-fade-in">Le Nostre Collezioni</h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {COLLECTIONS.map((col, i) => (
                        <Link
                            to={`/collezioni/${col.id}`}
                            key={i}
                            className={`relative rounded-[2rem] overflow-hidden group cursor-pointer block h-full w-full ${col.special ? 'md:col-span-2 lg:col-span-2 aspect-[21/9] md:aspect-[2/1] lg:aspect-auto' : 'aspect-square lg:aspect-[4/5]'
                                }`}
                        >
                            <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/40 transition-colors duration-500 z-10" />
                            <img
                                src={col.image}
                                alt={col.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 collection-image"
                            />
                            <div className="absolute inset-0 z-20 p-8 md:p-12 flex flex-col justify-end">
                                <h3 className="font-serif text-2xl uppercase mb-2 text-white">{col.title}</h3>
                                <div className="overflow-hidden">
                                    <p className="text-white/80 font-sans transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">{col.desc}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
};

// Import specific Tuscolana image requested by user
import ambTuscolana from './assets/AMBIENTI HAIR STUDIO-20260227T212318Z-1-001/AMBIENTI HAIR STUDIO/DSCN0591.webp';

const SEDI_DATA = [
    {
        id: "monteverde-hair",
        title: "Monteverde Hair Studio",
        image: amb3,
        address: "Via F. Ozanam, 33 - 00152 Roma",
        hours: "08:00 - 19:30 (Chiuso Domenica)",
        phones: ["06 58200120", "06 58200558"],
        whatsapp: "366 4353196",
        email: "dorianocese@ibarberini.it",
        instagram: "ibarberinihairstudio",
        facebook: "https://www.facebook.com/profile.php?id=100046379395958",
        mapIframe: "https://maps.google.com/maps?q=I%20Barberini%20Hair%20Studio&ll=41.8761165,12.4478398&z=17&output=embed"
    },
    {
        id: "monteverde-beauty",
        title: "Beauty Center",
        image: beautyBed,
        address: "Via F. Ozanam, 45 - 00152 Roma",
        hours: "09:00 - 19:30 (Chiuso Domenica)",
        phones: ["06 58233871"],
        whatsapp: "334 2452083",
        email: "sabrinaangelilli@ibarberini.it",
        instagram: "ibarberini_beautyerelax",
        facebook: "https://www.facebook.com/www.ibarberini.it",
        mapIframe: "https://maps.google.com/maps?q=I%20Barberini%20Beauty%20%26%20Relax&ll=41.8763005,12.4481053&z=17&output=embed"
    },
    {
        id: "tuscolano-hair",
        title: "Tuscolano Hair & Beauty",
        image: ambTuscolana,
        address: "V.le F. Camillo 52b - 00181 Roma",
        hours: "08:30 - 19:00 (Chiuso Domenica e Lunedì)",
        phones: ["06 7803519"],
        whatsapp: null,
        email: "nadiamancini@ibarberini.it",
        instagram: "ibarberinidinadiamancini",
        facebook: "https://www.facebook.com/profile.php?id=100063465013436",
        mapIframe: "https://maps.google.com/maps?q=I%20Barberini&ll=41.8755609,12.5246743&z=17&output=embed"
    }
];

const LocationsPage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".location-block", {
                scrollTrigger: {
                    trigger: ".locations-container",
                    start: "top 80%",
                },
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.3,
                ease: "power3.out"
            });

            gsap.from(".header-reveal", {
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="pt-48 pb-32 bg-cream min-h-screen">
            <Helmet>
                <title>Sedi e Contatti | I Barberini Roma</title>
                <meta name="description" content="Trova i saloni I Barberini a Roma. Scopri orari, indirizzi e contatti delle nostre tre sedi: Monteverde Hair Studio, Monteverde Beauty Center e Tuscolana." />
            </Helmet>
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-24 max-w-3xl mx-auto header-reveal">
                    <h1 className="font-serif text-5xl md:text-7xl text-charcoal mb-6 leading-tight">Le Nostre Sedi</h1>
                    <p className="font-sans text-xl text-charcoal/70 leading-relaxed">
                        Tre saloni esclusivi nel cuore di Roma, progettati per offrirti un'esperienza di bellezza assoluta in un ambiente caldo e raffinato.
                    </p>
                </div>

                <div className="locations-container flex flex-col gap-32">
                    {SEDI_DATA.map((sede, index) => (
                        <div key={sede.id} className={`location-block flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center`}>

                            {/* Image Side */}
                            <div className="w-full lg:w-1/2">
                                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden group">
                                    <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
                                    <img src={sede.image} alt={sede.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full lg:w-1/2 flex flex-col justify-center">
                                <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-10 leading-tight">{sede.title}</h2>

                                <div className="space-y-8 font-sans text-charcoal/80 text-lg">
                                    <div className="flex items-start gap-4">
                                        <MapPin className="text-gold shrink-0 mt-1" size={24} />
                                        <div className="w-full">
                                            <p className="mb-4">{sede.address}</p>
                                            <div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden shadow-inner bg-charcoal/5">
                                                <iframe
                                                    src={sede.mapIframe}
                                                    width="100%"
                                                    height="100%"
                                                    style={{ border: 0 }}
                                                    allowFullScreen=""
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                    title={`Map for ${sede.title}`}
                                                ></iframe>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Clock className="text-gold shrink-0 mt-1" size={24} />
                                        <p>{sede.hours}</p>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Phone className="text-gold shrink-0 mt-1" size={24} />
                                        <div className="flex flex-col gap-1">
                                            {sede.phones.map((phone, i) => (
                                                <a key={i} href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-gold transition-colors">{phone}</a>
                                            ))}
                                            {sede.whatsapp && (
                                                <a href={`https://wa.me/39${sede.whatsapp.replace(/\s/g, '')}`} target="_blank" rel="noreferrer" className="text-green-600 hover:text-green-500 transition-colors flex items-center gap-2 mt-2">
                                                    WhatsApp: {sede.whatsapp}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Mail className="text-gold shrink-0 mt-1" size={24} />
                                        <a href={`mailto:${sede.email}`} className="hover:text-gold transition-colors break-all">{sede.email}</a>
                                    </div>

                                    <div className="h-px w-24 bg-charcoal/10 my-8"></div>

                                    <div className="flex flex-col gap-3 text-base">
                                        <a href={`https://instagram.com/${sede.instagram}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 hover:text-gold transition-colors">
                                            <Instagram size={20} className="text-charcoal" /> <span>@{sede.instagram}</span>
                                        </a>
                                        <a href={`${sede.facebook}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 hover:text-gold transition-colors">
                                            <Facebook size={20} className="text-charcoal" /> <span>{sede.facebook}</span>
                                        </a>
                                    </div>
                                </div>

                                <a href={`tel:${sede.phones[0].replace(/\s/g, '')}`} className="mt-12 btn-secondary w-fit px-10 py-4 text-sm tracking-widest uppercase inline-block text-center">
                                    Richiedi Appuntamento
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

const BEAUTY_TREATMENTS = [
    {
        id: "dermaplaning",
        title: "Dermaplaning",
        intro: "Esfoliazione profonda per una pelle luminosa e tonica.",
        desc: "E’ un’esfoliazione meccanica della pelle del viso praticata attraverso uno speciale bisturi che rimuove lo strato corneo superficiale (dove si depositano cellule morte, smog e impurità). I benefici sono tanti: la pelle non è mai stata così morbida e liscia, contrastando l'invecchiamento e stimolando la produzione di collagene. Ideale da ripetere una volta al mese.",
        image: treatDermaplaning,
        images: treatDermaplaningImgs,
        extendedText: treatmentsContent["DERMAPLANING"]
    },
    {
        id: "laminazione",
        title: "Laminazione Ciglia",
        intro: "Ciglia robuste, nutrite e curve effetto cerbiatta.",
        desc: "Il trattamento alla cheratina restituisce corpo e spessore alle ciglia. Attraverso componenti naturali, dona una curvatura permanente e un aspetto straordinario che dura 5-6 settimane. Per un risultato eccellente, rinforza, protegge dai raggi solari e rigenera la vitalità dello sguardo.",
        image: treatLaminazione,
        images: treatLaminazioneImgs,
        extendedText: treatmentsContent["LAMINAZIONE CIGLIA"]
    },
    {
        id: "laser",
        title: "Laser Diodo 810nm",
        intro: "L'evoluzione dell'epilazione progressivamente definitiva.",
        desc: "Il Laser a Diodo a Fibra ottica emette un fascio di luce a 810nm il cui bersaglio è la melanina del pelo, contenuta nel bulbo pilifero. La trasmissione tramite fibra ottica assicura maggiore efficacia. Adatto a tutti i fototipi, riduce progressivamente la crescita dei peli per risultati duraturi nel tempo.",
        image: treatLaser,
        images: treatLaserImgs,
        extendedText: treatmentsContent["LASER  DIODO"]
    },
    {
        id: "makeup",
        title: "Make-Up",
        intro: "Consigli ed esecuzioni perfette per risaltare il tuo viso.",
        desc: "Il nostro make-up è studiato in base alle tue caratteristiche e all'età. Scegliamo texture leggere per le basi, esaltiamo la naturale luce degli zigomi e lavoriamo con il chiaro-scuro per creare le giuste illusioni ottiche, valorizzandoti con eleganza ed evitando gli eccessi.",
        image: treatMakeUp,
        images: treatMakeUpImgs,
        extendedText: treatmentsContent["MAKE-UP"]
    },
    {
        id: "microblading",
        title: "Microblading",
        intro: "Effetto pelo ultra-realistico per l'arcata sopraccigliare.",
        desc: "Una tecnica manuale di trucco semipermanente che traccia microincisioni introducendo pigmenti bioriassorbibili sotto la cute. Ideale per correggere diradamenti o ridisegnare la forma, il risultato finale è estremamente naturale, tanto da dimenticarsi del trattamento.",
        image: treatMicroblading,
        images: treatMicrobladingImgs,
        extendedText: treatmentsContent["MICROBLADING"]
    },
    {
        id: "nails",
        title: "Nail Care & Ricostruzione",
        intro: "Mani e unghie sempre perfette e curate.",
        desc: "Offriamo Smalto Semipermanente per un finish curato e radioso fino a 3 settimane, oppure Ricostruzione Gel per unghie resistenti ed elegantemente modellate. Eseguiti da personale esperto nel totale rispetto dell'unghia naturale e delle condizioni igieniche.",
        image: treatNails,
        images: treatNailsImgs,
        extendedText: treatmentsContent["NAILS"]
    },
    {
        id: "permanent",
        title: "Trucco Permanente (Dermopigmentazione)",
        intro: "Make up sempre impeccabile, in ogni situazione.",
        desc: "Perfetto per chi ama lo sport, porta lenti a contatto o desidera correggere asimmetrie su labbra, occhi o sopracciglia. Utilizziamo pigmenti naturali e certificati per un effetto duraturo (1-2 anni), ripristinando armonia e freschezza al viso in modo sicuro e professionale.",
        image: treatPermanentMakeup,
        images: treatPermanentMakeupImgs,
        extendedText: treatmentsContent["PERMANENT MAKE UP"]
    },
    {
        id: "pressoterapia",
        title: "Pressoterapia",
        intro: "Drenaggio profondo contro ritenzione e inestetismi.",
        desc: "Trattamento efficace per ripristinare la corretta circolazione venosa e linfatica. La stimolazione tramite le guaine gonfiabili drena i liquidi ristagnanti, rassoda i tessuti di gambe, glutei e addome, ed aiuta a ridurre visibilmente cellulite e gonfiore.",
        image: treatPressoterapia,
        images: treatPressoterapiaImgs,
        extendedText: treatmentsContent["PRESSOTERAPIA"]
    },
        {
        id: "radiofrequenza",
        title: "Radiofrequenza",
        intro: "Lifting non chirurgico che stimola nuovo collagene.",
        desc: "Una tecnica innovativa che sfrutta onde radio per sviluppare calore controllato nel derma profondo. Ottimo per trattare le rughe d'espressione, la lassità cutanea e le smagliature, rendendo la pelle notevolmente più elastica, liscia, luminosa e compatta.",
        image: treatRadiofrequenza,
        images: treatRadiofrequenzaImgs,
        extendedText: treatmentsContent["RADIOFREQUENZA"]
    },
    {
        id: "xtreme",
        title: "Xtreme Lashes®",
        intro: "L'eccellenza globale nell'estensione ciglia.",
        desc: "Allunga e infoltisce le tue ciglia in modo estremamente naturale con fibre sintetiche leggerissime, applicate una ad una. Resistenti all'acqua e al sudore, permettono di dire addio al mascara restando impeccabili per mesi (con ricariche periodiche mensili).",
        image: treatXtremeLashes,
        images: treatXtremeLashesImgs,
        extendedText: treatmentsContent["XTREME LASHES"]
    },
    {
        id: "ossigenoterapia",
        title: "Ossigenoterapia",
        intro: "Ossigeno puro e principi attivi per il derma.",
        desc: "Un trattamento non invasivo che veicola ossigeno puro e principi attivi (acido ialuronico, vitamine) nel derma. Stimola la produzione di Collagene ed Elastina, migliorando la luminosità, idratando in profondità e riducendo rughe, macchie e acne.",
        image: treatDermaplaning,
        extendedText: treatmentsContent["OSSIGENOTERAPIA"]
    },
    {
        id: "solarium",
        title: "Solarium",
        intro: "Per un'abbronzatura sana e controllata.",
        desc: "Un'abbronzatura perfetta e duratura con macchinari all'avanguardia. Scopri i nostri consigli per mantenere la pelle protetta ed evitare segni del tempo.",
        image: treatDermaplaning,
        extendedText: treatmentsContent["SOLARIUM"]
    },
    {
        id: "trattamenti-viso",
        title: "Trattamenti Viso",
        intro: "Cura specifica e mirata per l'idratazione e ringiovanimento testuale.",
        desc: "Detersione accurata e rituali studiati ad hoc per ravvivare e dare luce al viso.",
        image: treatVisoImgs[0] || treatDermaplaning,
        images: treatVisoImgs,
        extendedText: treatmentsContent["TRATTAMENTI VISO"]
    },
    {
        id: "trattamenti-corpo",
        title: "Trattamenti Corpo",
        intro: "Percorsi benessere per rigenerare completamente la pelle e i tessuti.",
        desc: "Sinergia di tecniche estetiche per massimizzare il drenaggio, l'elasticità e l'idratazione corporea.",
        image: treatDermaplaning,
        extendedText: treatmentsContent["TRATTAMENTI CORPO"]
    },
    {
        id: "xtreme",
        title: "Xtreme Lashes®",
        intro: "L'eccellenza globale nell'estensione ciglia.",
        desc: "Allunga e infoltisce le tue ciglia in modo estremamente naturale con fibre sintetiche leggerissime, applicate una ad una. Resistenti all'acqua e al sudore, permettono di dire addio al mascara restando impeccabili per mesi (con ricariche periodiche mensili).",
        image: treatXtremeLashes,
        images: treatXtremeLashesImgs,
        extendedText: treatmentsContent["XTREME LASHES"]
    }
];

// --- Nails Section Component ---
const NailsSection = ({ onOpenGallery }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".nails-reveal", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-charcoal text-white relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16 nails-reveal">
                    <span className="text-gold font-sans tracking-[0.3em] uppercase mb-4 block text-sm">La Cura delle Tue Mani</span>
                    <h2 className="font-serif text-4xl md:text-6xl mb-6">Nails & Manicure</h2>
                    <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-sans font-light mb-8">
                        Mani e unghie ben curate sono un ottimo biglietto da visita. Scopri la differenza tra i nostri trattamenti e impara a prendertene cura, anche da casa.
                    </p>
                    {onOpenGallery && (
                        <button 
                            onClick={onOpenGallery}
                            className="inline-flex items-center gap-3 px-8 py-4 border border-gold/50 text-gold hover:bg-gold hover:text-charcoal rounded-xl transition-all duration-300 font-sans tracking-widest text-sm"
                        >
                            <Camera size={18} /> VEDI GALLERIA
                        </button>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-16 items-start mt-20">
                    {/* Left Column: Text Content */}
                    <div className="lg:w-1/2 space-y-12">
                        <div className="nails-reveal">
                            <h3 className="text-3xl font-serif text-gold mb-4">Smalto Semipermanente vs Gel</h3>
                            <p className="text-white/80 leading-relaxed font-sans text-lg space-y-4">
                                Lo <strong className="text-white">Smalto Semipermanente</strong> è una copertura estetica che assicura un aspetto curato e radioso per 2-3 settimane. Aumenta leggermente lo spessore dell'unghia ed è di rapida applicazione, ma offre meno resistenza rispetto al gel.
                                <br /><br />
                                La <strong className="text-white">Ricostruzione con Gel</strong>, invece, garantisce un effetto bombato, permette di ricostruire unghie spezzate e offre una resistenza nettamente superiore. Permette inoltre allungamenti con cartina o tip, proteggendo l'unghia naturale se eseguita da operatori qualificati.
                            </p>
                        </div>
                        
                        <div className="nails-reveal pl-6 border-l-2 border-gold/30">
                            <h4 className="text-2xl font-serif italic mb-4">I Nostri Consigli per Unghie Sane</h4>
                            <ul className="space-y-3 text-white/70 font-sans">
                                <li>• Utilizza sempre <strong>guanti protettivi</strong> per i lavori domestici: l'umidità facilita germi e batteri.</li>
                                <li>• Evita lunghi ammolli in saune, bagni turchi o piscine se hai applicato gel o semipermanente.</li>
                                <li>• <strong>Non "mangiarti le unghie"</strong> e non usarle come attrezzi (es. per togliere le graffette).</li>
                                <li>• Applica crema idratante più volte al giorno per mantenerle morbide.</li>
                                <li>• Cura l'alimentazione: cibi proteici o verdure sulfuree aiutano la formazione di cheratina.</li>
                                <li className="text-gold/90 pt-2 break-normal"><em>E soprattutto: mai togliere il gel con metodi "fai-da-te" limando l'unghia, potresti danneggiare il letto ungueale!</em></li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Image Composition */}
                    <div className="lg:w-1/2 relative w-full h-[600px] sm:h-[700px] mt-12 lg:mt-0">
                        <div className="absolute top-0 right-0 w-3/4 h-[70%] rounded-[2rem] overflow-hidden shadow-2xl nails-reveal z-10 border border-white/10">
                            <img src={nailsImg2} alt="Lavorazione Nails" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute bottom-0 left-0 w-2/3 h-[55%] rounded-[2rem] overflow-hidden shadow-2xl nails-reveal z-20 border-4 border-charcoal">
                            <img src={nailsImg1} alt="Dettaglio Smalto" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/4 w-1/3 aspect-square rounded-full overflow-hidden shadow-2xl nails-reveal z-30 border-2 border-gold/30">
                            <img src={nailsImg3} alt="Risultato Manicure" className="w-full h-full object-cover" />
                        </div>
                        {/* Abstract glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold/5 blur-[100px] rounded-full pointer-events-none -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
};

const TreatmentDetailsOverlay = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <div 
                className="absolute inset-0 bg-charcoal/40 backdrop-blur-md"
                onClick={onClose}
            />
            <div className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[85dvh] overflow-hidden relative shadow-2xl flex flex-col">
                <div className="p-8 border-b border-gold/10 flex justify-between items-start bg-white shrink-0 z-10">
                    <div>
                        <span className="text-gold font-sans tracking-widest uppercase text-xs mb-2 block">Dettagli Trattamento</span>
                        <h2 className="text-3xl font-serif text-charcoal">{title}</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-3 hover:bg-gold/10 rounded-full transition-colors group"
                    >
                        <X className="w-8 h-8 text-charcoal group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>
                <div className="p-8 md:p-12 overflow-y-auto font-sans leading-relaxed text-charcoal/80 space-y-6 flex-1">
                    {content.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="text-lg">
                            {paragraph.split('\n').map((line, lIdx) => (
                                <React.Fragment key={lIdx}>
                                    {line}
                                    {lIdx < paragraph.split('\n').length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </p>
                    ))}
                </div>
                <div className="p-8 border-t border-gold/10 text-center bg-cream/30 shrink-0">
                    <p className="font-serif italic text-charcoal/60">I Barberini — Eccellenza e Cura dal 1987</p>
                </div>
            </div>
        </div>
    );
};

const Lightbox = ({ images, currentIndex, isOpen, onClose, onPrev, onNext }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-xl flex flex-col">
            <div className="absolute top-8 right-8 z-[110]">
                <button 
                    onClick={onClose}
                    className="p-3 hover:bg-white/10 rounded-full transition-colors group"
                >
                    <X className="w-8 h-8 text-white group-hover:rotate-90 transition-transform duration-300" />
                </button>
            </div>

            <div className="flex-1 flex items-center justify-center relative px-4">
                {images.length > 1 && (
                    <>
                        <button 
                            onClick={onPrev}
                            className="absolute left-4 md:left-8 p-4 hover:bg-white/10 rounded-full text-white transition-all transform hover:scale-110 z-[110]"
                        >
                            <ArrowLeft className="w-8 h-8" />
                        </button>
                        <button 
                            onClick={onNext}
                            className="absolute right-4 md:right-8 p-4 hover:bg-white/10 rounded-full text-white transition-all transform hover:scale-110 z-[110]"
                        >
                            <ArrowRight className="w-8 h-8" />
                        </button>
                    </>
                )}

                <div className="w-full max-w-5xl aspect-video flex items-center justify-center">
                    {images[currentIndex].toLowerCase().endsWith('.mp4') ? (
                        <video
                            src={images[currentIndex]}
                            className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                            controls autoPlay playsInline
                        />
                    ) : (
                        <img 
                            src={images[currentIndex]} 
                            alt={`Gallery item ${currentIndex + 1}`}
                            className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                        />
                    )}
                </div>
            </div>

            <div className="h-32 bg-charcoal/50 flex items-center justify-center gap-4 px-6 overflow-x-auto">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => onNext(idx)}
                        className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                            idx === currentIndex ? 'ring-2 ring-gold scale-110' : 'opacity-40 hover:opacity-100'
                        }`}
                    >
                        {img.toLowerCase().endsWith('.mp4') ? (
                             <video src={img} className="w-full h-full object-cover" />
                        ) : (
                             <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

const BeautyCenterPage = () => {
    const mainRef = useRef(null);
    const [openTreatmentId, setOpenTreatmentId] = useState("dermaplaning");
    const [activeGallery, setActiveGallery] = useState(null);
    const [activeTextOverlay, setActiveTextOverlay] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animation
            gsap.from(".beauty-hero-text > *", {
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "power2.out",
                delay: 0.2
            });

            // Section Reveals
            gsap.utils.toArray('.beauty-reveal').forEach(section => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                    },
                    y: 60,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power3.out"
                });
            });

            // Image Parallax
            gsap.utils.toArray('.beauty-parallax').forEach(img => {
                gsap.to(img, {
                    scrollTrigger: {
                        trigger: img.closest('section'),
                        start: "top top",
                        end: "bottom top",
                        scrub: true
                    },
                    y: 100,
                    scale: 1.1,
                    ease: "none"
                });
            });
        }, mainRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={mainRef} className="bg-cream min-h-screen">
            <Helmet>
                <title>Beauty Center & SPA Monteverde | I Barberini</title>
                <meta name="description" content="Scopri il Beauty Center I Barberini a Roma Monteverde. Trattamenti viso e corpo, massaggi, nail art, laminazione ciglia e molto altro in un'oasi di puro benessere." />
            </Helmet>

            {/* HERO SECTION */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={beautyHero}
                        alt="Beauty Center & Relax"
                        className="w-full h-full object-cover beauty-parallax origin-top"
                    />
                    <div className="absolute inset-0 bg-charcoal/40" />
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center beauty-hero-text">
                    <span className="text-gold font-sans tracking-[0.3em] uppercase mb-4 block text-sm">
                        I Barberini
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 drop-shadow-xl">
                        Beauty & Relax
                    </h1>
                    <p className="font-sans text-xl text-white/90 max-w-2xl mx-auto italic drop-shadow-md">
                        Un’oasi di puro benessere nel cuore di Monteverde. Un luogo che abbraccia i tuoi sensi e rigenera la mente.
                    </p>
                </div>
            </section>

            {/* AMBIENTE SECTION (Masonry Layout) */}
            <section className="py-24 md:py-32 container mx-auto px-6 beauty-reveal">
                <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
                    <div className="md:w-1/2">
                        <h2 className="section-title mb-6">Un Tempio per<br /><span className="italic text-charcoal/60">il tuo Benessere</span></h2>
                    </div>
                    <div className="md:w-1/2">
                        <p className="text-xl text-charcoal/80 font-sans leading-relaxed">
                            Maison di Bellezza da tre generazioni, non si ferma all'Hair, oggi Beauty Center d'Eccellenza in Monteverde. L'eccellenza che unisce salute e bellezza.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="aspect-[4/3] rounded-3xl overflow-hidden relative group">
                        <img src={beautyBed} alt="Lettino Massaggi" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-charcoal/80 to-transparent">
                            <h3 className="text-white font-serif text-2xl">Trattamenti Viso & Corpo</h3>
                        </div>
                    </div>
                    <div className="aspect-[4/3] rounded-3xl overflow-hidden relative group md:translate-y-12">
                        <img src={beautySauna} alt="Sauna" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-charcoal/80 to-transparent">
                            <h3 className="text-white font-serif text-2xl">Rituali Relax</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRATTAMENTI DETTAGLIO */}
            <section className="py-24 bg-white beauty-reveal">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2 order-2 lg:order-1 relative">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="aspect-square rounded-[2rem] overflow-hidden mt-8">
                                    <img src={beautyTreat1} alt="Trattamento" className="w-full h-full object-cover" />
                                </div>
                                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden">
                                    <img src={beautyTreat2} alt="Estetica" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            {/* Decorative element */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gold/10 rounded-full blur-2xl -z-10" />
                        </div>

                        <div className="lg:w-1/2 order-1 lg:order-2">
                            <span className="text-gold font-sans font-bold tracking-widest uppercase mb-4 block">Personalizzazione</span>
                            <h2 className="section-title mb-8">Il Nostro Approccio Estetico</h2>
                            <p className="text-lg text-charcoal/70 leading-relaxed mb-10">
                                Diagnosi previe gratuite per analizzare lo stato cutaneo ed il benessere generale, garantendo la scelta dei trattamenti manuali o apparecchiati più performanti per esaltare la tua unicità.
                            </p>
                            <button className="btn-primary">RICHIEDI UNA DIAGNOSI OMAGGIO</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* TREATMENTS ACCORDION SECTION */}
            <section className="py-24 bg-cream beauty-reveal">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <span className="text-gold font-sans tracking-widest uppercase mb-4 block text-sm">
                            Menù dei Servizi
                        </span>
                        <h2 className="section-title">I Nostri Trattamenti</h2>
                        <p className="text-xl text-charcoal/70 mt-6 max-w-2xl mx-auto">
                            Esplora l'eccellenza delle nostre proposte. Metodologie avanzate e cura del dettaglio per risultati concreti e duraturi.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {BEAUTY_TREATMENTS.map((treatment) => {
                            const isOpen = openTreatmentId === treatment.id;
                            return (
                                <div
                                    key={treatment.id}
                                    className={`bg-white rounded-2xl overflow-hidden transition-all duration-500 shadow-sm border ${isOpen ? 'border-gold/30 shadow-xl' : 'border-black/5 hover:border-gold/20'}`}
                                >
                                    <button
                                        className="w-full text-left px-8 py-6 flex items-center justify-between group"
                                        onClick={() => setOpenTreatmentId(isOpen ? null : treatment.id)}
                                    >
                                        <div>
                                            <h3 className={`font-serif text-2xl transition-colors duration-300 ${isOpen ? 'text-gold' : 'text-charcoal group-hover:text-gold'}`}>
                                                {treatment.title}
                                            </h3>
                                            <p className="text-charcoal/60 mt-2 font-sans">{treatment.intro}</p>
                                        </div>
                                        <div className={`transform transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isOpen ? 'rotate-180 text-gold' : 'text-charcoal/40 group-hover:text-gold'}`}>
                                            <ChevronDown size={28} />
                                        </div>
                                    </button>

                                    <div
                                        className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                                        style={{ maxHeight: isOpen ? '1000px' : '0px', opacity: isOpen ? 1 : 0 }}
                                    >
                                        <div className="p-8 pt-0 border-t border-black/5 flex flex-col md:flex-row gap-8 items-start mt-6">
                                            <div className="md:w-2/3">
                                                <p className="text-charcoal/80 leading-relaxed font-sans text-lg mb-8">
                                                    {treatment.desc}
                                                </p>
                                                <div className="flex flex-col sm:flex-row gap-4">
                                                    {treatment.extendedText && (
                                                        <button 
                                                            onClick={() => setActiveTextOverlay({
                                                                title: treatment.title,
                                                                content: treatment.extendedText
                                                            })}
                                                            className="px-8 py-4 border border-gold/30 rounded-xl text-gold font-sans tracking-widest text-sm hover:bg-gold hover:text-white transition-all duration-300"
                                                        >
                                                            COS'È E COME FUNZIONA
                                                        </button>
                                                    )}
                                                    
                                                    {treatment.images && treatment.images.length > 1 && (
                                                        <button 
                                                            onClick={() => setActiveGallery({
                                                                images: treatment.images,
                                                                index: 0
                                                            })}
                                                            className="px-8 py-4 bg-charcoal text-white rounded-xl font-sans tracking-widest text-sm hover:bg-gold transition-all duration-300"
                                                        >
                                                            VEDI GALLERY ({treatment.images.length})
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="md:w-1/3 w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg cursor-pointer group/img"
                                                 onClick={() => treatment.images && treatment.images.length > 1 && setActiveGallery({ images: treatment.images, index: 0 })}>
                                                <img src={treatment.image} alt={treatment.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </section>

            {/* NAILS SECTION */}
            <NailsSection onOpenGallery={() => setActiveGallery({ images: treatNailsImgs, index: 0 })} />

            {/* Overlays */}
            <Lightbox 
                isOpen={!!activeGallery}
                images={activeGallery?.images || []}
                currentIndex={activeGallery?.index || 0}
                onClose={() => setActiveGallery(null)}
                onNext={(idx) => setActiveGallery({ ...activeGallery, index: typeof idx === 'number' ? idx : (activeGallery.index + 1) % activeGallery.images.length })}
                onPrev={() => setActiveGallery({ ...activeGallery, index: (activeGallery.index - 1 + activeGallery.images.length) % activeGallery.images.length })}
            />

            <TreatmentDetailsOverlay 
                isOpen={!!activeTextOverlay}
                onClose={() => setActiveTextOverlay(null)}
                title={activeTextOverlay?.title}
                content={activeTextOverlay?.content}
            />
        </main>
    );
};

const Footer = () => {
    const footerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from("footer > *", {
                scrollTrigger: {
                    trigger: "footer",
                    start: "top 90%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power2.out"
            });
        }, footerRef);
        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="bg-charcoal text-white pt-24 pb-12 overflow-hidden rounded-t-[3rem] mt-24">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-12 mb-20">
                    
                    {/* Brand & Social Column */}
                    <div>
                        <Link to="/" className="mb-8 block hover:opacity-80 transition-opacity">
                            <img src={logo} alt="I Barberini" className="h-16 w-auto object-contain brightness-0 invert" />
                        </Link>
                        <p className="text-white/50 max-w-sm mb-8 leading-relaxed">
                            Dal 1987, custodi della bellezza a Roma. Tradizione, innovazione e passione per l'immagine.
                        </p>
                        <Link to="/sedi" className="inline-block px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-charcoal transition-colors duration-300 font-sans tracking-widest text-xs uppercase mb-8">
                            Scopri la sede più vicina
                        </Link>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h4 className="font-serif text-xl mb-6 uppercase tracking-widest text-gold text-sm">Resta in contatto</h4>
                        <p className="text-white/70 mb-6 text-sm">
                            Iscriviti alla nostra newsletter per ricevere aggiornamenti su eventi, nuove collezioni e promozioni esclusive.
                        </p>
                        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="La tua email" 
                                className="bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors text-white placeholder:text-white/30"
                                required
                            />
                            <button 
                                type="submit"
                                className="bg-gold text-charcoal px-4 py-3 text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors"
                            >
                                Iscriviti
                            </button>
                        </form>
                    </div>

                    {/* Sitemap Column */}
                    <div>
                        <h4 className="font-serif text-xl mb-6 uppercase tracking-widest text-gold text-sm">Sitemap</h4>
                        <ul className="space-y-4 text-white/70">
                            <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
                            <li><Link to="/sedi" className="hover:text-gold transition-colors">Le Nostre Sedi</Link></li>
                            <li><Link to="/beauty-center" className="hover:text-gold transition-colors">Beauty Center</Link></li>
                            <li><Link to="/collezioni" className="hover:text-gold transition-colors">Collezioni</Link></li>
                        </ul>
                    </div>

                </div>

                <div className="flex flex-col justify-center items-center pt-12 border-t border-white/10 text-white/30 text-sm gap-4">
                    <p>© {new Date().getFullYear()} I Barberini. Tutti i diritti riservati.</p>
                    <a href="https://www.iubenda.com/privacy-policy/98656024" className="iubenda-white iubenda-noiframe iubenda-embed hover:text-white transition-colors" title="Privacy Policy">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const CollectionDetailPage = () => {
    const { id } = useParams();
    const collection = COLLECTIONS.find(c => c.id === id);
    const mainRef = useRef(null);
    const [lightboxImage, setLightboxImage] = useState(null);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        if (!collection) return;
        const ctx = gsap.context(() => {
            gsap.from(".collection-hero-text > *", {
                y: 50, opacity: 0, duration: 1, stagger: 0.1, ease: "power2.out"
            });
            gsap.from(".gallery-item", {
                y: 30, opacity: 0, duration: 0.8, stagger: 0.05, ease: "power2.out",
                scrollTrigger: {
                    trigger: ".gallery-grid",
                    start: "top 80%",
                }
            });
            gsap.to(".top-hero-img", {
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                },
                y: 100,
                scale: 1.1,
                ease: "none"
            });
        }, mainRef);
        return () => ctx.revert();
    }, [collection]);

    if (!collection) return <div className="min-h-screen flex items-center justify-center font-serif text-2xl">Collezione non trovata.</div>;

    return (
        <main ref={mainRef} className="bg-cream min-h-screen pt-48 pb-24">
            <Helmet>
                <title>{collection.title} - Collezioni | I Barberini</title>
                <meta name="description" content={`Scopri i dettagli della collezione fotografica: ${collection.title}. ${collection.desc}`} />
            </Helmet>

            {/* HERO DEL DECENNIO */}
            <section className="hero-section relative h-[60vh] md:h-[70vh] w-full mb-24 overflow-hidden rounded-b-[3rem] mx-auto max-w-[98%]">
                <div className="absolute inset-0 bg-charcoal/50 z-10" />
                <img
                    src={collection.image}
                    alt={collection.title}
                    className="top-hero-img absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="collection-hero-text absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 mt-16">
                    <span className="text-gold font-sans tracking-widest uppercase mb-4 text-sm md:text-base drop-shadow-md">
                        Le Nostre Collezioni
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-serif mb-6 drop-shadow-xl">
                        {collection.title}
                    </h1>
                    <p className="text-lg md:text-2xl text-white/90 font-sans max-w-2xl font-light drop-shadow-md">
                        {collection.desc}
                    </p>
                </div>
            </section>

            {/* GALLERIA IMMAGINI MASONRY */}
            <section className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-16 px-4">
                    <div>
                        <h2 className="section-title text-charcoal">Il Lookbook</h2>
                        <p className="font-sans text-charcoal/60 mt-4 max-w-xl">
                            Esplora tutte le creazioni originali de I Barberini per questa collezione.
                        </p>
                    </div>
                </div>

                <div className="gallery-grid columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    {collection.images && collection.images.map((imgSrc, idx) => {
                        const isVideo = imgSrc.toLowerCase().endsWith('.mp4');
                        return (
                            <div
                                key={idx}
                                className="gallery-item break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer"
                                onClick={() => setLightboxImage(imgSrc)}
                            >
                                {isVideo ? (
                                    <video
                                        src={imgSrc}
                                        className="w-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                                        autoPlay loop muted playsInline
                                    />
                                ) : (
                                    <img
                                        src={imgSrc}
                                        alt={`${collection.title} stile ${idx}`}
                                        className="w-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                                        loading="lazy"
                                    />
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                    {isVideo && <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* LIGHTBOX */}
            {lightboxImage && (
                <div className="fixed inset-0 z-[200] bg-charcoal/95 backdrop-blur-xl flex items-center justify-center p-4">
                    <button
                        className="absolute top-8 right-8 text-white/80 hover:text-white transition-colors"
                        onClick={() => setLightboxImage(null)}
                    >
                        <X size={40} />
                    </button>
                    {lightboxImage.toLowerCase().endsWith('.mp4') ? (
                        <video
                            src={lightboxImage}
                            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
                            controls autoPlay playsInline
                        />
                    ) : (
                        <img
                            src={lightboxImage}
                            alt="Zoomed"
                            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
                        />
                    )}
                </div>
            )}
        </main>
    );
};

// --- App ---


const ConsigliPage = () => {
    const mainRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const ctx = gsap.context(() => {
            gsap.from(".consigli-anim", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out"
            });
        }, mainRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={mainRef} className="pt-48 pb-32 bg-cream min-h-screen">
            <Helmet>
                <title>I Nostri Consigli | I Barberini</title>
                <meta name="description" content="Consigli su capelli, ricostruzione, colori e look. Da quarant'anni ci prendiamo cura dei tuoi capelli." />
            </Helmet>
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="text-center mb-24 consigli-anim">
                    <span className="text-gold font-sans tracking-[0.3em] uppercase mb-4 block text-sm">Esperienza e Cura</span>
                    <h1 className="font-serif text-5xl md:text-7xl text-charcoal mb-6 leading-tight">I Nostri Consigli</h1>
                    <p className="font-serif text-2xl text-charcoal/80 italic">da quarant'anni ci prendiamo cura dei tuoi capelli</p>
                </div>

                <div className="space-y-32">
                    {/* Ricostruzione Kapillare */}
                    <div className="flex flex-col md:flex-row gap-12 items-center consigli-anim">
                        <div className="w-full md:w-1/2 rounded-[2rem] overflow-hidden shadow-2xl">
                            <img src={consigliHair} alt="Riposizione Kapillare" className="w-full h-[500px] object-cover" />
                        </div>
                        <div className="w-full md:w-1/2 space-y-6">
                            <h2 className="font-serif text-4xl text-charcoal">Trattamento di Ricostruzione Kapillare</h2>
                            <p className="font-sans text-lg text-charcoal/70 leading-relaxed">
                                Il trattamento di Ricostruzione Capillare, a base di cheratina, è un trattamento innovativo per la Cura e la Bellezza dei Capelli. Non solo lascia i capelli Setosi, Lucidi e Dritti, ma offre anche sollievo dalla ingestibilità dei capelli crespi.
                            </p>
                            <h3 className="font-serif text-2xl text-gold mt-6">I Prodotti per la cura domiciliare</h3>
                            <ul className="space-y-4 font-sans text-charcoal/80">
                                <li><strong>Keratin Shampoo 400ml:</strong> A base di Cheratina, formulato per il lavaggio dei capelli trattati. Indispensabile per proteggere i capelli.</li>
                                <li><strong>Keratin Conditioner 400ml:</strong> Con nutrienti specifici, oli e proteine. Nutre i capelli e li protegge dal calore e agenti atmosferici.</li>
                                <li><strong>Vanilla Deep Ristrutturante 207ml:</strong> Crema rivitalizzante per lunghezze e punte. Altamente ristrutturante, dona brillantezza unica.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Blond Me */}
                    <div className="flex flex-col md:flex-row-reverse gap-12 items-center consigli-anim">
                        <div className="w-full md:w-1/2 rounded-[2rem] overflow-hidden shadow-2xl">
                            <img src={consigliBlond} alt="Le Bionde" className="w-full h-[500px] object-cover" />
                        </div>
                        <div className="w-full md:w-1/2 space-y-6">
                            <h2 className="font-serif text-4xl text-charcoal">Le Bionde - Blondme</h2>
                            <p className="font-sans text-lg text-charcoal/70 leading-relaxed">
                                Le bionde si aspettano un colore perfetto e personalizzato per un risultato unico. Troppo spesso le basi irregolari, la delicata struttura dei capelli e i danneggiamenti precedenti sono solo alcune delle sfide che si incontrano.
                            </p>
                            <p className="font-sans text-lg text-charcoal/80 font-medium">
                                BLONDME, ora arricchito con Advanced Bonding System, è l'unico brand colour & care, interamente dedicato alle bionde.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};


const App = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: true,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Connect Lenis to ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(gsap.ticker.add);
        };
    }, []);

    return (
        <Router>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col font-sans text-charcoal relative">
                <ScrollBackground />
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/collezioni" element={<CollectionsPage />} />
                    <Route path="/sedi" element={<LocationsPage />} />
                    <Route path="/beauty-center" element={<BeautyCenterPage />} />
                    <Route path="/consigli" element={<ConsigliPage />} />
                    <Route path="/collezioni/:id" element={<CollectionDetailPage />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
