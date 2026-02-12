export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Columna 1: Sobre PEROOC */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary-light">
              PEROOC
            </h3>
            <p className="text-accent leading-relaxed">
              Desarrollamos soluciones tecnológicas que impulsan el crecimiento de tu negocio en el mundo digital.
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#servicios" className="text-accent hover:text-secondary transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-accent hover:text-secondary transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-accent">
              <li>peroocsa@gmail.com</li>
              <li>+57 3016113151</li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-accent text-sm">
              © {currentYear} PEROOC. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-accent hover:text-secondary transition-colors text-sm">
                Política de Privacidad
              </a>
              <a href="#" className="text-accent hover:text-secondary transition-colors text-sm">
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}