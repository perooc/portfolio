import { 
  RocketIcon, 
  LightningBoltIcon, 
  LockClosedIcon, 
  BarChartIcon,
  GlobeIcon,
  HeartIcon
} from '@radix-ui/react-icons';

const features = [
  {
    icon: RocketIcon,
    title: "Desarrollo Ágil",
    description: "Implementación rápida y eficiente con metodologías ágiles que aceleran el time-to-market de tu producto."
  },
  {
    icon: LightningBoltIcon,
    title: "Alto Rendimiento",
    description: "Aplicaciones optimizadas que garantizan velocidad y eficiencia, mejorando la experiencia de tus usuarios."
  },
  {
    icon: LockClosedIcon,
    title: "Seguridad Garantizada",
    description: "Implementamos las mejores prácticas de seguridad para proteger tus datos y los de tus clientes."
  },
  {
    icon: BarChartIcon,
    title: "Escalabilidad",
    description: "Soluciones diseñadas para crecer contigo, adaptándose a las necesidades cambiantes de tu negocio."
  },
  {
    icon: GlobeIcon,
    title: "Integración Total",
    description: "Conectamos tu sistema con las herramientas que ya usas para crear un ecosistema tecnológico unificado."
  },
  {
    icon: HeartIcon,
    title: "Soporte 24/7",
    description: "Equipo dedicado disponible en todo momento para resolver tus dudas y mantener tu operación funcionando."
  }
];

export default function Features() {
  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            ¿Por qué elegir PEROOC?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Combinamos experiencia técnica con visión de negocio para entregar 
            soluciones que realmente impulsan tu crecimiento.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-secondary hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}