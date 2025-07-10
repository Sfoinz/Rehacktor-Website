import { Link } from "react-router";

export default function ServicesPage() {
    const services = [
        {
            title: "Acquista giochi digitali",
            description:
                "Scopri migliaia di titoli per PC e console, disponibili subito con download digitale.",
        },
        {
            title: "Demo & beta esclusive",
            description:
                "Prova i giochi prima dell’uscita con versioni demo o beta selezionate.",
        },
        {
            title: "Achievements & community",
            description:
                "Partecipa alla community, sblocca obiettivi e mostra i tuoi successi.",
        },
        {
            title: "Abbonamenti premium",
            description:
                "Accedi a giochi esclusivi, sconti e contenuti speciali con il nostro piano premium.",
        },
        {
            title: "Supporto agli sviluppatori",
            description:
                "Pubblica il tuo gioco, accedi a tool avanzati e monitora le performance di vendita.",
        },
        {
            title: "Rimborsi & assistenza",
            description:
                "Politica di reso semplice e team di supporto sempre disponibile.",
        },
    ];

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-10 text-center text-white">
                I nostri servizi
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, idx) => (
                    <div
                        key={idx}
                        className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-xl hover:scale-[1.02] transition"
                    >
                        <h2 className="text-xl font-semibold mb-2 text-pink-500">
                            {service.title}
                        </h2>
                        <p className="text-gray-300 text-sm mb-4">{service.description}</p>
                        <Link
                            to="#"
                            className="inline-block mt-auto text-pink-400 hover:text-pink-300 text-sm"
                        >
                            Scopri di più →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
