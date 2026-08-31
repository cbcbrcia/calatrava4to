// Cronograma Escolar Bilingüe 2026-2027 - 4to Primaria Calendario B

export const ACADEMIC_SCHEDULE = [
  {
    block: 'Bloque A',
    blockEn: 'Block A',
    color: '#8b5cf6', // Violeta
    weeks: [
      {
        weekNumber: 1,
        dates: '3 al 9 de agosto',
        datesEn: 'August 3 to 9',
        title: 'Planeación Institucional',
        titleEn: 'Institutional Planning',
        type: 'planning',
        description: 'Semana de planeación institucional y preparación de docentes.',
        descriptionEn: 'Institutional planning week and teacher preparation.',
        evaluations: []
      },
      {
        weekNumber: 2,
        dates: '10 al 16 de agosto',
        datesEn: 'August 10 to 16',
        title: 'Inicio de Clases / Teoría Logro 01',
        titleEn: 'First Week of School / Logro 01 Theory',
        type: 'theory',
        logro: 'Logro 01',
        description: 'Inicio de clases. Valor posicional hasta 1.000.000, estimación, redondeo y números pares/impares.',
        descriptionEn: 'First week of classes. Place value up to 1,000,000, estimation, rounding, and even/odd numbers.',
        evaluations: []
      },
      {
        weekNumber: 3,
        dates: '17 al 23 de agosto',
        datesEn: 'August 17 to 23',
        title: 'Desarrollo Teórico-Práctico L01',
        titleEn: 'Theoretical-Practical Work L01',
        type: 'practice',
        logro: 'Logro 01',
        description: 'Múltiplos, divisores, factores, criterios de divisibilidad, números primos, compuestos y cuadrados.',
        descriptionEn: 'Multiples, divisors, factors, divisibility rules, prime, composite, and square numbers.',
        evaluations: []
      },
      {
        weekNumber: 4,
        dates: '24 al 30 de agosto',
        datesEn: 'August 24 to 30',
        title: 'Desarrollo Teórico-Práctico L01 (Geometría) & 1er Control PLL',
        titleEn: 'Theoretical-Practical Work L01 (Geometry) & 1st PLL Control',
        type: 'control',
        logro: 'Logro 01',
        description: 'Geometría: Ángulos (partes, amplitud, clasificación, opuestos por el vértice). Primer control PLL.',
        descriptionEn: 'Geometry: Angles (parts, measure, classification, vertically opposite). First PLL reading check.',
        evaluations: [
          { name: 'Primer Control PLL (Plan Lector)', nameEn: '1st PLL Reading Check (Spanish)', subject: 'Lenguaje' }
        ]
      },
      {
        weekNumber: 5,
        dates: '31 de agosto al 6 de septiembre',
        datesEn: 'August 31 to September 6',
        title: '🚨 SEMANA DE EVALUACIÓN LOGRO 01',
        titleEn: '🚨 LOGRO 01 EVALUATION WEEK',
        type: 'evaluation',
        logro: 'Logro 01',
        isCurrent: true,
        description: 'Evaluación oficial del Logro 01 en todas las asignaturas (Matemáticas, Science, Sociales, Lenguaje, Inglés).',
        descriptionEn: 'Official evaluation of Logro 01 in all subjects (Math, Science, Social Studies, Spanish, English).',
        evaluations: [
          { name: 'Evaluación Logro 01 - Matemáticas (PR1ME)', nameEn: 'Logro 01 Math Assessment (PR1ME)', subject: 'Matemáticas' },
          { name: 'Evaluación Logro 01 - Science (Pathway to Science)', nameEn: 'Logro 01 Science Assessment (Richmond)', subject: 'Science' },
          { name: 'Evaluación Logro 01 - Ciencias Sociales', nameEn: 'Logro 01 Social Studies Assessment', subject: 'Sociales' },
          { name: 'Evaluación Logro 01 - Castellano y Literatura', nameEn: 'Logro 01 Spanish & Literature Assessment', subject: 'Lenguaje' },
          { name: 'Evaluación Logro 01 - Inglés (Fly High 4)', nameEn: 'Logro 01 English Assessment (Fly High 4)', subject: 'Inglés' }
        ],
        extraEvents: ['31 ago - 6 sep: Elección de Gobierno Escolar (School Government Elections)', '5 sep: Asamblea General de Padres (General Parents Assembly)']
      },
      {
        weekNumber: 6,
        dates: '7 al 13 de septiembre',
        datesEn: 'September 7 to 13',
        title: 'Teoría Logro 02',
        titleEn: 'Logro 02 Theory',
        type: 'theory',
        logro: 'Logro 02',
        description: 'Multiplicación por 1 y 2 cifras, potencias de 10, introducción a fracciones y números mixtos.',
        descriptionEn: 'Multiplication by 1 and 2 digits, powers of 10, introduction to fractions and mixed numbers.',
        evaluations: []
      },
      {
        weekNumber: 7,
        dates: '14 al 20 de septiembre',
        datesEn: 'September 14 to 20',
        title: 'Desarrollo Teórico-Práctico L02 & Recuperación L01',
        titleEn: 'Theoretical-Practical Work L02 & L01 Remediation',
        type: 'practice',
        logro: 'Logro 02',
        description: 'División de 1 y 2 cifras, operaciones con fracciones, jerarquía de operaciones. Jornada de recuperación L01.',
        descriptionEn: 'Division by 1 and 2 digits, fractions operations, order of operations. Logro 01 recovery session.',
        evaluations: [
          { name: 'Recuperación Logro 01', nameEn: 'Logro 01 Remediation & Retake', subject: 'Todas las asignaturas' }
        ],
        extraEvents: ['10 al 20 sep: Primera jornada de salidas educativas (First field trips session)']
      },
      {
        weekNumber: 8,
        dates: '21 al 27 de septiembre',
        datesEn: 'September 21 to 27',
        title: 'Desarrollo Teórico-Práctico L02 & 2do Control PLL',
        titleEn: 'Theoretical-Practical Work L02 & 2nd PLL Control',
        type: 'control',
        logro: 'Logro 02',
        description: 'Superpoderes numéricos: Potenciación, Radicación, Logaritmación inicial y Diagramas estadísticos. Segundo control PLL.',
        descriptionEn: 'Powers, roots, basic logarithms, and statistical charts. Second PLL reading check.',
        evaluations: [
          { name: 'Segundo Control PLL (Plan Lector)', nameEn: '2nd PLL Reading Check (Spanish)', subject: 'Lenguaje' }
        ]
      },
      {
        weekNumber: 9,
        dates: '28 de septiembre al 4 de octubre',
        datesEn: 'September 28 to October 4',
        title: '🚨 EVALUACIÓN LOGRO 02',
        titleEn: '🚨 LOGRO 02 EVALUATION WEEK',
        type: 'evaluation',
        logro: 'Logro 02',
        description: 'Evaluación oficial del Logro 02 en todas las áreas.',
        descriptionEn: 'Official evaluation of Logro 02 in all subjects.',
        evaluations: [
          { name: 'Evaluación Logro 02', nameEn: 'Logro 02 General Assessments', subject: 'Todas las áreas' }
        ]
      },
      {
        weekNumber: 10,
        dates: '5 al 11 de octubre',
        datesEn: 'October 5 to 11',
        title: 'Semana de Receso Escolar',
        titleEn: 'School Break Week (Recess)',
        type: 'break',
        description: 'Semana de receso estudiantil y descanso pedagógico.',
        descriptionEn: 'Student recess and pedagogical break week.',
        evaluations: []
      }
    ]
  },
  {
    block: 'Bloque B',
    blockEn: 'Block B',
    color: '#06b6d4', // Cyan
    weeks: [
      {
        weekNumber: 11,
        dates: '12 al 18 de octubre',
        datesEn: 'October 12 to 18',
        title: 'Inicio Bloque B / Teoría Logro 03',
        titleEn: 'Start of Block B / Logro 03 Theory',
        type: 'theory',
        logro: 'Logro 03',
        description: 'Fracciones impropias, conversión a números mixtos y fracciones equivalentes.',
        descriptionEn: 'Improper fractions, converting to mixed numbers, and equivalent fractions.',
        evaluations: []
      },
      {
        weekNumber: 12,
        dates: '19 al 25 de octubre',
        datesEn: 'October 19 to 25',
        title: 'Práctica Fracciones & 3er Control PLL',
        titleEn: 'Fractions Practice & 3rd PLL Control',
        type: 'control',
        logro: 'Logro 03',
        description: 'Suma y resta de fracciones homogéneas y heterogéneas. Tercer control PLL.',
        descriptionEn: 'Adding and subtracting like and unlike fractions. Third PLL reading check.',
        evaluations: [
          { name: 'Tercer Control PLL', nameEn: '3rd PLL Reading Check', subject: 'Lenguaje' }
        ]
      },
      {
        weekNumber: 13,
        dates: '26 de octubre al 1 de noviembre',
        datesEn: 'October 26 to November 1',
        title: 'Geometría y Medición (Perímetro y Área)',
        titleEn: 'Geometry & Measurement (Perimeter & Area)',
        type: 'practice',
        logro: 'Logro 03',
        description: 'Cálculo de perímetros y áreas en polígonos regulares e irregulares.',
        descriptionEn: 'Calculating perimeters and areas of regular and irregular polygons.',
        evaluations: []
      },
      {
        weekNumber: 14,
        dates: '2 al 8 de noviembre',
        datesEn: 'November 2 to 8',
        title: '🚨 EVALUACIÓN LOGRO 03',
        titleEn: '🚨 LOGRO 03 EVALUATION WEEK',
        type: 'evaluation',
        logro: 'Logro 03',
        description: 'Evaluación oficial del Logro 03 en todas las asignaturas.',
        descriptionEn: 'Official evaluation of Logro 03 across all subjects.',
        evaluations: [
          { name: 'Evaluación Logro 03', nameEn: 'Logro 03 Assessments', subject: 'Todas las áreas' }
        ]
      },
      {
        weekNumber: 15,
        dates: '9 al 15 de noviembre',
        datesEn: 'November 9 to 15',
        title: 'Teoría Logro 04 (Decimales)',
        titleEn: 'Logro 04 Theory (Decimals)',
        type: 'theory',
        logro: 'Logro 04',
        description: 'Introducción a números decimales: décimas, centésimas y milésimas.',
        descriptionEn: 'Introduction to decimal numbers: tenths, hundredths, and thousandths.',
        evaluations: []
      },
      {
        weekNumber: 16,
        dates: '16 al 22 de noviembre',
        datesEn: 'November 16 to 22',
        title: 'Operaciones con Decimales',
        titleEn: 'Operations with Decimals',
        type: 'practice',
        logro: 'Logro 04',
        description: 'Suma, resta y multiplicación de números decimales.',
        descriptionEn: 'Addition, subtraction, and multiplication of decimals.',
        evaluations: []
      },
      {
        weekNumber: 17,
        dates: '23 al 29 de noviembre',
        datesEn: 'November 23 to 29',
        title: 'Semana de Cierre de Año 2026',
        titleEn: 'Year-End Closing Week 2026',
        type: 'practice',
        logro: 'Logro 04',
        description: 'Repaso integral y actividades de integración antes del receso navideño.',
        descriptionEn: 'Comprehensive review and integration activities before winter holidays.',
        evaluations: []
      },
      {
        weekNumber: 18,
        dates: '30 de noviembre al 6 de diciembre',
        datesEn: 'November 30 to December 6',
        title: 'Receso Navideño e Institucional',
        titleEn: 'Winter Break & Christmas Holidays',
        type: 'break',
        description: 'Vacaciones de fin de año.',
        descriptionEn: 'Year-end holidays.',
        evaluations: []
      }
    ]
  },
  {
    block: 'Bloque C',
    blockEn: 'Block C',
    color: '#10b981', // Verde
    weeks: [
      {
        weekNumber: 19,
        dates: '11 al 17 de enero de 2027',
        datesEn: 'January 11 to 17, 2027',
        title: 'Reinicio de Clases 2027 / Práctica Logro 04',
        titleEn: 'Back to School 2027 / Logro 04 Practice',
        type: 'practice',
        logro: 'Logro 04',
        description: 'Reinicio de actividades académicas del segundo semestre.',
        descriptionEn: 'Resuming second semester academic activities.',
        evaluations: []
      },
      {
        weekNumber: 20,
        dates: '18 al 24 de enero',
        datesEn: 'January 18 to 24',
        title: 'Estadística y Probabilidad',
        titleEn: 'Statistics & Probability',
        type: 'practice',
        logro: 'Logro 04',
        description: 'Tablas de frecuencias, diagramas de barras, líneas y experimentos aleatorios.',
        descriptionEn: 'Frequency tables, bar charts, line plots, and probability.',
        evaluations: []
      },
      {
        weekNumber: 21,
        dates: '25 al 31 de enero',
        datesEn: 'January 25 to 31',
        title: '🚨 EVALUACIÓN LOGRO 04',
        titleEn: '🚨 LOGRO 04 EVALUATION WEEK',
        type: 'evaluation',
        logro: 'Logro 04',
        description: 'Evaluación oficial del Logro 04.',
        descriptionEn: 'Official evaluation of Logro 04.',
        evaluations: [
          { name: 'Evaluación Logro 04', nameEn: 'Logro 04 Assessments', subject: 'Todas las áreas' }
        ]
      },
      {
        weekNumber: 22,
        dates: '1 al 7 de febrero',
        datesEn: 'February 1 to 7',
        title: 'Teoría Logro 05 (Medidas y Conversiones)',
        titleEn: 'Logro 05 Theory (Measurement & Conversions)',
        type: 'theory',
        logro: 'Logro 05',
        description: 'Unidades de longitud (m, cm, mm, km) y masa (g, kg, ton).',
        descriptionEn: 'Units of length (m, cm, mm, km) and mass (g, kg, ton).',
        evaluations: []
      },
      {
        weekNumber: 26,
        dates: '1 al 7 de marzo',
        datesEn: 'March 1 to 7',
        title: '🚨 EVALUACIÓN LOGRO 05',
        titleEn: '🚨 LOGRO 05 EVALUATION WEEK',
        type: 'evaluation',
        logro: 'Logro 05',
        description: 'Evaluación oficial del Logro 05.',
        descriptionEn: 'Official evaluation of Logro 05.',
        evaluations: [
          { name: 'Evaluación Logro 05', nameEn: 'Logro 05 Assessments', subject: 'Todas las áreas' }
        ]
      }
    ]
  },
  {
    block: 'Bloque D',
    blockEn: 'Block D',
    color: '#f59e0b', // Ámbar
    weeks: [
      {
        weekNumber: 27,
        dates: '8 al 14 de marzo',
        datesEn: 'March 8 to 14',
        title: 'Inicio Bloque D / Teoría Logro 06',
        titleEn: 'Start of Block D / Logro 06 Theory',
        type: 'theory',
        logro: 'Logro 06',
        description: 'Razonamiento proporcional, porcentajes y regla de tres.',
        descriptionEn: 'Proportional reasoning, percentages, and simple proportion.',
        evaluations: []
      },
      {
        weekNumber: 30,
        dates: '29 de marzo al 4 de abril',
        datesEn: 'March 29 to April 4',
        title: '🚨 EVALUACIÓN LOGRO 06',
        titleEn: '🚨 LOGRO 06 EVALUATION WEEK',
        type: 'evaluation',
        logro: 'Logro 06',
        description: 'Evaluación oficial del Logro 06.',
        descriptionEn: 'Official evaluation of Logro 06.',
        evaluations: [
          { name: 'Evaluación Logro 06', nameEn: 'Logro 06 Assessments', subject: 'Todas las áreas' }
        ]
      },
      {
        weekNumber: 35,
        dates: '3 al 9 de mayo',
        datesEn: 'May 3 to 9',
        title: '🚨 EVALUACIÓN LOGRO 07',
        titleEn: '🚨 LOGRO 07 EVALUATION WEEK',
        type: 'evaluation',
        logro: 'Logro 07',
        description: 'Evaluación oficial del Logro 07.',
        descriptionEn: 'Official evaluation of Logro 07.',
        evaluations: [
          { name: 'Evaluación Logro 07', nameEn: 'Logro 07 Assessments', subject: 'Todas las áreas' }
        ]
      },
      {
        weekNumber: 38,
        dates: '24 al 30 de mayo',
        datesEn: 'May 24 to 30',
        title: '🌟 FERIA STEM CALAEXPO & LOGRO 08',
        titleEn: '🌟 STEM CALAEXPO FAIR & LOGRO 08',
        type: 'evaluation',
        logro: 'Logro 08',
        description: 'Presentación de proyectos científicos CalaExpo y evaluación final.',
        descriptionEn: 'CalaExpo scientific projects exhibition and final evaluation.',
        evaluations: [
          { name: 'Evaluación Logro 08 / CalaExpo', nameEn: 'Logro 08 / CalaExpo Final Projects', subject: 'Todas las áreas' }
        ]
      },
      {
        weekNumber: 40,
        dates: '7 al 13 de junio de 2027',
        datesEn: 'June 7 to 13, 2027',
        title: '🎉 CLAUSURA DEL AÑO ESCOLAR',
        titleEn: '🎉 END OF SCHOOL YEAR CEREMONY',
        type: 'break',
        description: 'Graduación y entrega final de reportes de 4to de primaria.',
        descriptionEn: 'Graduation and final Grade 4 report card delivery.',
        evaluations: []
      }
    ]
  }
];
