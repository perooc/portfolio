export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary to-primary-light overflow-hidden"
    >
      {" "}
      {/* Efecto de fondo con gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary-light/20" />
      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="space-y-8">
          {/* Badge o etiqueta */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
            </span>
            <span className="text-sm font-medium text-secondary">
              Soluciones SaaS de última generación
            </span>
          </div>

          {/* Título principal */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Impulsa tu negocio con{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary-light">
              PEROOC
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-accent max-w-3xl mx-auto leading-relaxed">
            Desarrollamos soluciones tecnológicas personalizadas que transforman
            la manera en que tu empresa opera y crece en el mundo digital.
          </p>

          {/* Botones CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a
              href="#contacto"
              className="group px-8 py-4 bg-primary-light hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-light/50"
            >
              Solicitar Demo
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>

            <a
              href="#servicios"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 backdrop-blur-sm transition-all duration-300"
            >
              Ver Servicios
            </a>
          </div>
        </div>
      </div>
      {/* Elemento decorativo inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
