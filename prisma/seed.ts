import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import bcrypt from 'bcryptjs'

const adapter = new PrismaLibSql({ url: 'file:./dev.db' })
const prisma = new PrismaClient({ adapter } as any)

async function main() {
  console.log('🌱 Iniciando seed...')

  // Admin user
  const hashedPassword = await bcrypt.hash('Zoovegetal2024!', 12)
  await prisma.admin.upsert({
    where: { email: 'admin@zoovegetal.com' },
    update: {},
    create: {
      email: 'admin@zoovegetal.com',
      password: hashedPassword,
      name: 'Administrador',
    },
  })
  console.log('✅ Admin creado: admin@zoovegetal.com / Zoovegetal2024!')

  // Products
  const products = [
    // Caninos
    { name: 'Galletas Naturales para Perros', category: 'canino', subcategory: 'Snacks y Galletas', description: 'Galletas artesanales elaboradas con harina de avena, zanahoria y manzana. Sin conservantes artificiales, perfectas para el bienestar dental.', featured: true, order: 1 },
    { name: 'Snacks de Pollo Deshidratado', category: 'canino', subcategory: 'Snacks y Galletas', description: 'Tiras de pechuga de pollo 100% natural, deshidratadas sin aditivos. Alta proteína y palatabilidad excepcional.', featured: true, order: 2 },
    { name: 'Concentrado Premium Canino', category: 'canino', subcategory: 'Concentrado Seco', description: 'Alimento balanceado completo con proteínas de pollo y res, vitaminas esenciales y minerales para perros adultos de todas las razas.', featured: true, order: 3 },
    { name: 'Comida Cocida Congelada Canina', category: 'canino', subcategory: 'Comida Cocida Congelada', description: 'Preparación de ingredientes frescos cocidos y congelados al vacío. Pollo, arroz, zanahoria y espinaca en proporciones balanceadas.', featured: false, order: 4 },
    { name: 'Suplemento Articular Canino', category: 'canino', subcategory: 'Suplementos Sólidos', description: 'Suplemento con glucosamina, condroitina y MSM para el soporte articular de perros adultos y senior. Presentación en tabletas.', featured: false, order: 5 },
    { name: 'Multivitamínico en Polvo Canino', category: 'canino', subcategory: 'Suplementos en Polvo', description: 'Mezcla de vitaminas y minerales esenciales en polvo para complementar la dieta diaria. Fácil de adicionar al alimento.', featured: false, order: 6 },
    // Felinos
    { name: 'Snacks Naturales para Gatos', category: 'felino', subcategory: 'Snacks y Galletas', description: 'Premios crujientes de atún y salmón para gatos. Sin granos, altos en proteína, ideales para el control del peso.', featured: true, order: 7 },
    { name: 'Concentrado Premium Felino', category: 'felino', subcategory: 'Concentrado Seco', description: 'Alimento completo para gatos adultos con proteína de salmón y pollo, taurina y aceites omega para pelaje brillante.', featured: true, order: 8 },
    { name: 'Comida Húmeda Cocida para Gatos', category: 'felino', subcategory: 'Comida Cocida Congelada', description: 'Preparación húmeda de atún, pollo y verduras, libre de subproductos y colorantes. Ideal para gatos de alta exigencia.', featured: false, order: 9 },
    { name: 'Suplemento Renal Felino', category: 'felino', subcategory: 'Suplementos en Polvo', description: 'Fórmula de soporte renal con potasio restringido y alta digestibilidad. Para gatos con condición renal.', featured: false, order: 10 },
    // Equinos
    { name: 'Concentrado Equino Premium', category: 'equino', subcategory: 'Concentrado Seco', description: 'Alimento energético de alto rendimiento para caballos deportivos y de trabajo. Granos extruidos con vitaminas y electrolitos.', featured: true, order: 11 },
    { name: 'Snacks de Avena y Miel para Caballos', category: 'equino', subcategory: 'Snacks y Galletas', description: 'Premios dulces a base de avena, miel y melaza para caballos. Sin ingredientes artificiales, ideal para entrenamiento.', featured: true, order: 12 },
    { name: 'Suplemento Pelletizado Equino', category: 'equino', subcategory: 'Pelletizados', description: 'Suplemento nutricional en pellets de alta digestibilidad. Con biotina, zinc y metionina para cascos y pelaje saludable.', featured: false, order: 13 },
    { name: 'Suplemento Muscular Equino', category: 'equino', subcategory: 'Suplementos en Polvo', description: 'Fórmula proteica con aminoácidos ramificados (BCAA) para el desarrollo muscular y recuperación post-ejercicio.', featured: false, order: 14 },
  ]

  for (const product of products) {
    const slug = product.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')

    await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        name: product.name,
        slug,
        description: product.description,
        category: product.category,
        subcategory: product.subcategory,
        featured: product.featured,
        active: true,
        order: product.order,
      },
    })
  }
  console.log(`✅ ${products.length} productos creados`)

  // Blog posts
  const posts = [
    {
      title: 'La importancia de la proteína en la dieta de tu perro',
      excerpt: 'Descubre por qué las proteínas de calidad son fundamentales para la salud, el desarrollo muscular y la longevidad de tu mascota.',
      content: `<h2>¿Por qué son importantes las proteínas?</h2>
<p>Las proteínas son macronutrientes esenciales que forman la base de todos los tejidos vivos. En el caso de los perros, una dieta rica en proteínas de alta calidad es fundamental para el desarrollo muscular, la reparación de tejidos, la producción de enzimas y hormonas, y el correcto funcionamiento del sistema inmune.</p>

<h2>Proteínas animales vs. vegetales</h2>
<p>En Zoovegetal trabajamos con ambas fuentes. Las proteínas animales (res, pollo, cerdo) son de alto valor biológico porque contienen todos los aminoácidos esenciales en proporciones ideales para los cánidos. Las proteínas vegetales (garbanzo, lenteja, soya) complementan el perfil nutricional y aportan fibra.</p>

<h2>¿Cuánta proteína necesita tu perro?</h2>
<p>La cantidad varía según la edad, tamaño y nivel de actividad. Un cachorro en crecimiento puede necesitar alimentos con 28-30% de proteína, mientras que un adulto moderadamente activo se beneficia de 22-26%. Perros de trabajo o muy activos pueden requerir hasta 35%.</p>

<h2>Señales de déficit proteico</h2>
<p>Pérdida de masa muscular, pelaje opaco, poca energía y cicatrización lenta son señales de que tu perro podría no estar recibiendo suficiente proteína de calidad. Consulta siempre con un veterinario.</p>`,
      published: true,
    },
    {
      title: 'Snacks funcionales: más que un premio',
      excerpt: 'Los snacks para mascotas pueden ser una poderosa herramienta de bienestar cuando están bien formulados. Conoce sus beneficios.',
      content: `<h2>Del premio al alimento funcional</h2>
<p>La industria de snacks para mascotas ha evolucionado enormemente. Hoy, los mejores snacks no solo saben bien, sino que aportan beneficios específicos: salud dental, soporte articular, calma emocional o mejora del pelaje.</p>

<h2>Snacks dentales</h2>
<p>La acción mecánica de masticar snacks de texturas específicas ayuda a remover el sarro y mantener las encías saludables. En Zoovegetal formulamos galletas con formas y texturas diseñadas para este propósito.</p>

<h2>Snacks para calma y bienestar</h2>
<p>Ingredientes como la manzanilla, el triptófano y la melatonina pueden formularse en snacks para apoyar el manejo del estrés en mascotas ansiosas. Una alternativa natural a los ansiolíticos farmacológicos.</p>

<h2>¿Qué debes buscar en un snack?</h2>
<p>Lista de ingredientes reconocibles, ausencia de conservantes artificiales, colores naturales, y preferiblemente registro ICA. Los snacks de Zoovegetal cumplen con todos estos criterios.</p>`,
      published: true,
    },
    {
      title: 'Maquila de alimentos para mascotas: cómo lanzar tu marca',
      excerpt: 'Guía completa para marcas y emprendedores que quieren ingresar al mercado de nutrición animal en Colombia.',
      content: `<h2>El mercado de mascotas en Colombia</h2>
<p>Colombia es uno de los mercados de mascotas de más rápido crecimiento en América Latina. Con más de 4 millones de hogares con mascotas y un gasto promedio creciente, las oportunidades para marcas de alimentos son enormes.</p>

<h2>¿Qué es la maquila?</h2>
<p>La maquila es el proceso de fabricar un producto bajo la marca del cliente. En nutrición animal, significa que Zoovegetal produce el alimento con tu marca, tu fórmula (o la nuestra) y tu empaque, lista para vender.</p>

<h2>El proceso de registro ICA</h2>
<p>Para comercializar alimentos para animales en Colombia es necesario el registro ICA. En Zoovegetal te acompañamos en todo este proceso: desde la formulación hasta los análisis requeridos y la presentación ante el ICA.</p>

<h2>Requisitos para empezar</h2>
<p>Solo necesitas tener clara tu idea de producto, el segmento al que te diriges (perros, gatos, caballos), y un volumen mínimo de producción. Contáctanos y te asesoramos desde el primer paso.</p>`,
      published: true,
    },
  ]

  for (const post of posts) {
    const slug = post.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')

    await prisma.blogPost.upsert({
      where: { slug },
      update: {},
      create: {
        title: post.title,
        slug,
        excerpt: post.excerpt,
        content: post.content,
        author: 'Equipo Zoovegetal',
        published: post.published,
        publishedAt: post.published ? new Date() : null,
      },
    })
  }
  console.log(`✅ ${posts.length} posts de blog creados`)

  console.log('\n🎉 Seed completado exitosamente!')
  console.log('📧 Admin: admin@zoovegetal.com')
  console.log('🔑 Contraseña: Zoovegetal2024!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
