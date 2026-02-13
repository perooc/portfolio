const steps = [
  {
    number: "01",
    title: "Descubrimiento",
    description:
      "Entendemos tu negocio, objetivos y desafíos. Analizamos tus necesidades específicas para diseñar la solución perfecta.",
    icon: "🔍",
  },
  {
    number: "02",
    title: "Diseño & Planificación",
    description:
      "Creamos un plan detallado y diseños que reflejan tu visión. Definimos arquitectura, tecnologías y cronograma del proyecto.",
    icon: "📐",
  },
  {
    number: "03",
    title: "Desarrollo",
    description:
      "Construimos tu solución con metodologías ágiles. Entregas continuas y comunicación constante para asegurar calidad.",
    icon: "⚙️",
  },
  {
    number: "04",
    title: "Lanzamiento & Soporte",
    description:
      "Implementamos tu producto y garantizamos una transición suave. Te acompañamos con soporte continuo y mejoras.",
    icon: "🚀",
  },
];

export default function Process() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            ¿Cómo trabajamos?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un proceso probado que garantiza resultados excepcionales en cada
            proyecto
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Línea conectora (solo en desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-secondary to-transparent -z-10" />
              )}

              {/* Card */}
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-secondary h-full">
                {/* Número */}
                <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-secondary to-primary-light rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">
                    {step.number}
                  </span>
                </div>

                {/* Icono */}
                <div className="text-5xl mb-6 mt-4 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>

                {/* Contenido */}
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA al final */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            ¿Listo para comenzar tu proyecto?
          </p>

          <a
            href="#contacto"
            className="inline-block px-8 py-4 bg-primary-light hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-light/50"
          >
            Hablemos de tu proyecto →
          </a>
        </div>
      </div>
    </section>
  );
}
