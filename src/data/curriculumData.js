// Base de datos Curricular Bilingüe Completa - 4to Primaria
// Banco de Evaluación Ampliado: 3 preguntas por cada tema (9 preguntas por logro)

export const CURRICULUM_SUBJECTS = [
  {
    id: 'matematicas',
    name: 'Matemáticas y Geometría',
    nameEn: 'Mathematics & Geometry',
    icon: 'Calculator',
    color: '#3b82f6',
    bgColor: '#eff6ff',
    bookName: 'PR1ME Mathematics 5 (Scholastic) - Método Singapur',
    teacher: 'Lennin David López Castañeda',
    grade: 'Cuarto de Primaria',
    gradeEn: 'Grade 4 (Primary)',
    units: [
      {
        id: 'math-logro-01',
        logroNumber: 1,
        title: 'Logro 01: Números Naturales, Múltiplos, Divisores y Ángulos',
        titleEn: 'Logro 01: Natural Numbers, Multiples, Divisors & Angles',
        evaluationWeek: 5,
        evaluationDate: '31 de agosto al 6 de septiembre',
        evaluationDateEn: 'August 31 to September 6',
        weeks: ['Semana 2', 'Semana 3', 'Semana 4'],
        summary: 'Comprende el valor posicional hasta 1.000.000, estimación/redondeo, múltiplos, factores, criterios de divisibilidad, números primos/compuestos/cuadrados y reconocimiento de ángulos y sus propiedades.',
        summaryEn: 'Understands place value up to 1,000,000, estimation/rounding, multiples, factors, divisibility rules, prime/composite/square numbers, and angle geometry and properties.',
        topics: [
          {
            id: 'm-l1-t1',
            title: '1. Valor Posicional hasta 1.000.000 y Redondeo (Semana 2)',
            titleEn: '1. Place Value up to 1,000,000 & Rounding (Week 2)',
            badge: 'Semana 2',
            badgeEn: 'Week 2',
            bookPages: 'CB Págs. 1-16',
            bilingualBlocks: [
              {
                es: 'En nuestro sistema decimal, el valor de cada dígito depende de la posición que ocupa en la tabla de valor posicional.',
                en: 'In our decimal system, the value of each digit depends on the place it holds on the place value chart.'
              },
              {
                es: '• Unidades (U), Decenas (D), Centenas (C)\n• Unidades de Mil (UM), Decenas de Mil (DM), Centenas de Mil (CM)\n• Unidades de Millón (UMi)',
                en: '• Ones (Units), Tens, Hundreds\n• Thousands, Ten Thousands, Hundred Thousands\n• Millions'
              },
              {
                es: 'Regla de Redondeo (Estimación):\n1. Ubica el dígito al que deseas redondear.\n2. Si el número a su derecha es 0, 1, 2, 3 o 4 ➡️ Se queda IGUAL.\n3. Si es 5, 6, 7, 8 o 9 ➡️ Se le SUMA 1.',
                en: 'Rounding Rule (Estimation):\n1. Find the place value digit to round.\n2. If the digit to the right is 0, 1, 2, 3, or 4 ➡️ Keep it the SAME.\n3. If it is 5, 6, 7, 8, or 9 ➡️ ADD 1 to the digit.'
              }
            ],
            flashcards: [
              { q: '¿Qué valor tiene el dígito 7 en 472.315?', qEn: 'What is the value of 7 in 472,315?', a: '70.000 (Decenas de Mil).' }
            ]
          },
          {
            id: 'm-l1-t2',
            title: '2. Múltiplos, Factores, Criterios de Divisibilidad y Primos (Semana 3)',
            titleEn: '2. Multiples, Factors, Divisibility Rules & Primes (Week 3)',
            badge: 'Semana 3',
            badgeEn: 'Week 3',
            bookPages: 'CB Págs. 18-33',
            bilingualBlocks: [
              {
                es: '• Múltiplos: Resultados de multiplicar un número por los naturales.\n• Factores / Divisores: Números que dividen exactamente a otro (residuo = 0).\n• Número Primo: Tiene exactamente 2 divisores: el 1 y él mismo (2, 3, 5, 7, 11...). El 2 es el único primo par.\n• Número Compuesto: Tiene más de 2 divisores (4, 6, 8, 9, 10...).',
                en: '• Multiples: Products of multiplying by whole numbers.\n• Factors / Divisors: Numbers that divide another exactly with no remainder.\n• Prime Number: Has exactly 2 factors: 1 and itself (2, 3, 5, 7, 11...). Number 2 is the only even prime.\n• Composite Number: Has more than 2 factors (4, 6, 8, 9, 10...).'
              }
            ],
            flashcards: [
              { q: '¿Cuál es el único número primo par?', qEn: 'What is the only even prime number?', a: 'El número 2.' }
            ]
          },
          {
            id: 'm-l1-t3',
            title: '3. Geometría: Ángulos, Amplitud y Opuestos por el Vértice (Semana 4)',
            titleEn: '3. Geometry: Angles, Measure & Vertically Opposite Angles (Week 4)',
            badge: 'Semana 4',
            badgeEn: 'Week 4',
            bookPages: 'CB Págs. 89-102',
            bilingualBlocks: [
              {
                es: 'Clasificación de Ángulos:\n• Agudo: Menos de 90°.\n• Recto: Exactamente 90°.\n• Obtuso: Más de 90° y menos de 180°.\n• Llano: Exactamente 180°.\n• Opuestos por el Vértice: Cuando dos rectas se cruzan en "X", los ángulos opuestos son IGUALES.',
                en: 'Angle Classification:\n• Acute: Less than 90°.\n• Right: Exactly 90°.\n• Obtuse: More than 90° and less than 180°.\n• Straight: Exactly 180°.\n• Vertically Opposite: When two lines cross in an "X", opposite angles are EQUAL.'
              }
            ],
            flashcards: [
              { q: '¿Cuánto mide un ángulo recto?', qEn: 'How many degrees is a right angle?', a: 'Exactamente 90°.' }
            ]
          }
        ],
        quiz: [
          // TEMA 1: Valor Posicional y Redondeo (3 Preguntas)
          {
            id: 'q-m-1',
            question: '¿Cuál es el valor posicional del número 5 en la cifra 358.420?',
            questionEn: 'What is the place value of digit 5 in 358,420?',
            options: ['500 (Centenas / Hundreds)', '5.000 (Unidades de Mil / Thousands)', '50.000 (Decenas de Mil / Ten Thousands)', '500.000 (Centenas de Mil / Hundred Thousands)'],
            optionsEn: ['500 (Hundreds)', '5,000 (Thousands)', '50,000 (Ten Thousands)', '500,000 (Hundred Thousands)'],
            correctIndex: 2,
            explanation: 'El 5 está en la posición de las Decenas de Mil, por lo que su valor es 5 x 10.000 = 50.000.',
            explanationEn: 'The 5 is in the Ten Thousands place, so its value is 5 x 10,000 = 50,000.'
          },
          {
            id: 'q-m-2',
            question: 'Al redondear 486.230 a la CENTENA DE MIL más cercana obtenemos:',
            questionEn: 'Rounding 486,230 to the nearest HUNDRED THOUSAND gives:',
            options: ['400.000', '500.000', '480.000', '490.000'],
            optionsEn: ['400,000', '500,000', '480,000', '490,000'],
            correctIndex: 1,
            explanation: 'El dígito a la derecha de la centena de mil es 8 (mayor o igual a 5), por lo que sumamos 1 al 4, dando 500.000.',
            explanationEn: 'The digit to the right is 8 (>= 5), so we add 1 to 4, giving 500,000.'
          },
          {
            id: 'q-m-3',
            question: '¿Cuál de los siguientes números es PAR y tiene un 7 en las Unidades de Mil?',
            questionEn: 'Which of the following numbers is EVEN and has a 7 in the Thousands place?',
            options: ['127.431', '347.812', '745.210', '527.915'],
            optionsEn: ['127,431', '347,812', '745,210', '527,915'],
            correctIndex: 1,
            explanation: '347.812 termina en 2 (número par) y tiene el 7 en la posición de las Unidades de Mil.',
            explanationEn: '347,812 ends in 2 (even number) and has 7 in the Thousands place.'
          },

          // TEMA 2: Múltiplos, Divisores, Criterios y Primos (3 Preguntas)
          {
            id: 'q-m-4',
            question: '¿Por qué el número 147 es divisible por 3?',
            questionEn: 'Why is the number 147 divisible by 3?',
            options: [
              'Porque termina en 7.',
              'Porque la suma de sus cifras (1 + 4 + 7 = 12) es un múltiplo de 3.',
              'Porque es un número par.',
              'Porque termina en cero.'
            ],
            optionsEn: [
              'Because it ends in 7.',
              'Because the sum of its digits (1 + 4 + 7 = 12) is a multiple of 3.',
              'Because it is an even number.',
              'Because it ends in zero.'
            ],
            correctIndex: 1,
            explanation: 'El criterio de divisibilidad del 3 indica que si la suma de los dígitos es múltiplo de 3, el número es divisible por 3.',
            explanationEn: 'The divisibility rule for 3 states that if the sum of digits is a multiple of 3, the number is divisible by 3.'
          },
          {
            id: 'q-m-5',
            question: '¿Cuál es el ÚNICO número primo que es PAR?',
            questionEn: 'What is the ONLY prime number that is EVEN?',
            options: ['El número 0', 'El número 1', 'El número 2', 'El número 4'],
            optionsEn: ['Number 0', 'Number 1', 'Number 2', 'Number 4'],
            correctIndex: 2,
            explanation: 'El número 2 es el único número primo par, ya que solo tiene dos divisores: el 1 y el 2.',
            explanationEn: 'The number 2 is the only even prime number, having only two factors: 1 and 2.'
          },
          {
            id: 'q-m-6',
            question: '¿Cuál de los siguientes es un NÚMERO CUADRADO (resultado de multiplicar un número por sí mismo)?',
            options: ['24', '36 (6 x 6)', '42', '50'],
            optionsEn: ['24', '36 (6 x 6)', '42', '50'],
            correctIndex: 1,
            explanation: '36 es un número cuadrado perfecto porque 6 x 6 = 36.',
            explanationEn: '36 is a square number because 6 x 6 = 36.'
          },

          // TEMA 3: Ángulos y Opuestos por el Vértice (3 Preguntas)
          {
            id: 'q-m-7',
            question: 'Un ángulo cuya amplitud mide 135° se clasifica como:',
            questionEn: 'An angle measuring 135° is classified as:',
            options: ['Ángulo Agudo (Acute)', 'Ángulo Recto (Right)', 'Ángulo Obtuso (Obtuse)', 'Ángulo Llano (Straight)'],
            optionsEn: ['Acute Angle', 'Right Angle', 'Obtuse Angle', 'Straight Angle'],
            correctIndex: 2,
            explanation: 'Los ángulos que miden más de 90° y menos de 180° son ángulos obtusos.',
            explanationEn: 'Angles measuring more than 90° and less than 180° are obtuse angles.'
          },
          {
            id: 'q-m-8',
            question: 'Dos rectas se cruzan en forma de "X". Si uno de los ángulos mide 65°, ¿cuánto mide su ángulo opuesto por el vértice?',
            questionEn: 'Two lines intersect in an "X". If one angle measures 65°, how much is the vertically opposite angle?',
            options: ['25°', '65° (Miden exactamente lo mismo)', '115°', '180°'],
            optionsEn: ['25°', '65° (They measure exactly the same)', '115°', '180°'],
            correctIndex: 1,
            explanation: 'Los ángulos opuestos por el vértice son siempre congruentes (exactamente iguales).',
            explanationEn: 'Vertically opposite angles are always congruent (exactly equal).'
          },
          {
            id: 'q-m-9',
            question: '¿Qué tipo de ángulo forman las manecillas del reloj cuando marca exactamente las 3:00 en punto?',
            questionEn: 'What type of angle is formed by the clock hands at exactly 3:00 o\'clock?',
            options: ['Ángulo Agudo (45°)', 'Ángulo Recto (90° en forma de L)', 'Ángulo Obtuso (120°)', 'Ángulo Llano (180°)'],
            optionsEn: ['Acute Angle (45°)', 'Right Angle (90° L-shape)', 'Obtuse Angle (120°)', 'Straight Angle (180°)'],
            correctIndex: 1,
            explanation: 'A las 3:00 las manecillas forman una perfecta esquina en "L" perpendicular de 90° (ángulo recto).',
            explanationEn: 'At 3:00 the hands form a perfect perpendicular 90° "L" corner (right angle).'
          }
        ]
      }
    ]
  },
  {
    id: 'science',
    name: 'Natural Sciences / Science',
    nameEn: 'Natural Sciences / Science',
    icon: 'Microscope',
    color: '#10b981',
    bgColor: '#ecfdf5',
    bookName: 'Pathway to Science 5 (Richmond) & Guide Book',
    teacher: 'Patricia Verdugo',
    grade: '4th Grade (Cuarto)',
    gradeEn: 'Grade 4 (Primary)',
    units: [
      {
        id: 'sci-logro-01',
        logroNumber: 1,
        title: 'Logro 01: Niveles de Organización Biológica (Células, Tejidos, Órganos, Sistemas y Organismos)',
        titleEn: 'Logro 01: Levels of Biological Organization (Cells, Tissues, Organs, Systems & Organisms)',
        evaluationWeek: 5,
        evaluationDate: '31 de agosto al 6 de septiembre',
        evaluationDateEn: 'August 31 to September 6',
        weeks: ['Semana 2', 'Semana 3', 'Semana 4'],
        summary: 'Sintetizar los niveles de organización biológica para explicar cómo interactúan las células, tejidos, órganos y sistemas en los seres vivos. Diferenciar organismos unicelulares y pluricelulares, y comprender el arco reflejo.',
        summaryEn: 'Synthesize the levels of biological organization to explain how cells, tissues, organs, and systems interact to form functioning living organisms. Differentiate unicellular vs multicellular and reflex arc.',
        topics: [
          {
            id: 'sci-l1-t1',
            title: '1. La Célula y Organismos Unicelulares vs. Pluricelulares (Semana 2)',
            titleEn: '1. The Cell & Unicellular vs. Multicellular Organisms (Week 2)',
            badge: 'Semana 2',
            badgeEn: 'Week 2',
            bookPages: 'Guide Book Unit 1 pgs. 10-17',
            bilingualBlocks: [
              {
                en: 'The Cell: The smallest living unit. Unicellular: made of 1 cell (bacteria, amoeba). Multicellular: made of millions of specialized cells (humans, trees).',
                es: 'La Célula: La unidad viva más pequeña. Unicelulares: formados por 1 célula (bacterias, amebas). Pluricelulares: formados por millones de células especializadas (humanos, árboles).'
              }
            ],
            flashcards: [{ q: 'What is the basic unit of life?', qEs: '¿Cuál es la unidad básica de la vida?', a: 'The Cell.' }]
          },
          {
            id: 'sci-l1-t2',
            title: '2. De Células a Tejidos y Órganos Especializados (Semana 3)',
            titleEn: '2. From Cells to Specialized Tissues and Organs (Week 3)',
            badge: 'Semana 3',
            badgeEn: 'Week 3',
            bookPages: 'Guide Book Unit 1 pgs. 15-17',
            bilingualBlocks: [
              {
                en: 'Tissues: Groups of similar cells working together. Organs: Combinations of different tissues performing a complex job.',
                es: 'Tejidos: Grupos de células similares que trabajan juntas. Órganos: Combinaciones de diferentes tejidos que cumplen una función compleja.'
              }
            ],
            flashcards: [{ q: 'What is the largest organ in human body?', qEs: '¿Cuál es el órgano más grande del cuerpo?', a: 'The Skin.' }]
          },
          {
            id: 'sci-l1-t3',
            title: '3. Sistemas de Órganos y Arco Reflejo (Semana 4)',
            titleEn: '3. Organ Systems to Organisms & Reflex Arc (Week 4)',
            badge: 'Semana 4',
            badgeEn: 'Week 4',
            bookPages: 'Guide Book Unit 1 pgs. 18-33',
            bilingualBlocks: [
              {
                en: 'Hierarchy: Cell ➡️ Tissue ➡️ Organ ➡️ System ➡️ Organism. Reflex Arc: Fast automatic reaction coordinated by the spinal cord.',
                es: 'Jerarquía: Célula ➡️ Tejido ➡️ Órgano ➡️ Sistema ➡️ Organismo. Arco Reflejo: Reacción automática rápida coordinada por la médula espinal.'
              }
            ],
            flashcards: [{ q: 'What coordinates a reflex arc?', qEs: '¿Qué coordina un arco reflejo?', a: 'The Spinal Cord.' }]
          }
        ],
        quiz: [
          // TOPIC 1: The Cell & Unicellular vs Multicellular (3 Questions)
          {
            id: 'q-sci-1',
            question: 'What is the basic, smallest unit of life capable of carrying out all vital functions in all living organisms?',
            questionEs: '¿Cuál es la unidad básica y más pequeña de la vida capaz de realizar todas las funciones vitales en los seres vivos?',
            options: ['The Tissue (El Tejido)', 'The Cell (La Célula)', 'The Organ (El Órgano)', 'The Bone (El Hueso)'],
            optionsEs: ['El Tejido', 'La Célula', 'El Órgano', 'El Hueso'],
            correctIndex: 1,
            explanation: 'The cell is the smallest structural and functional unit of all living things.',
            explanationEs: 'La célula es la unidad estructural y funcional más pequeña de todos los seres vivos.'
          },
          {
            id: 'q-sci-2',
            question: 'Which of the following organisms is UNICELLULAR (made of only ONE single cell)?',
            questionEs: '¿Cuál de los siguientes organismos es UNICELULAR (formado por UNA sola célula)?',
            options: ['A dog (Un perro)', 'An Amoeba (Una ameba)', 'An oak tree (Un roble)', 'An eagle (Un águila)'],
            optionsEs: ['Un perro', 'Una ameba', 'Un roble', 'Un águila'],
            correctIndex: 1,
            explanation: 'Amoebas and bacteria are microscopic single-celled (unicellular) organisms.',
            explanationEs: 'Las amebas y las bacterias son organismos microscópicos de una sola célula (unicelulares).'
          },
          {
            id: 'q-sci-3',
            question: 'How do sweat glands in your skin help maintain homeostasis on a hot day?',
            questionEs: '¿Cómo ayudan las glándulas sudoríparas de la piel a mantener el equilibrio en un día caluroso?',
            options: [
              'By increasing body temperature.',
              'By releasing sweat that evaporates and cools the body.',
              'By stopping blood circulation.',
              'By building more bones.'
            ],
            optionsEs: [
              'Aumentando la temperatura corporal.',
              'Liberando sudor que se evapora y enfría el cuerpo.',
              'Deteniendo la circulación de la sangre.',
              'Construyendo más huesos.'
            ],
            correctIndex: 1,
            explanation: 'Sweat evaporates from the skin surface, absorbing heat and cooling the organism.',
            explanationEs: 'El sudor se evapora de la piel absorbiendo calor y enfriando el organismo.'
          },

          // TOPIC 2: Tissues and Organs (3 Questions)
          {
            id: 'q-sci-4',
            question: 'What is a biological TISSUE?',
            questionEs: '¿Qué es un TEJIDO biológico?',
            options: [
              'A complete living organism.',
              'A group of similar specialized cells working together to perform a specific function.',
              'A type of food.',
              'A single microscopic atom.'
            ],
            optionsEs: [
              'Un ser vivo completo.',
              'Un grupo de células similares especializadas que trabajan juntas para cumplir una función.',
              'Un tipo de comida.',
              'Un átomo microscópico.'
            ],
            correctIndex: 1,
            explanation: 'Tissues are formed by groups of similar specialized cells (e.g. muscle tissue, epithelial tissue).',
            explanationEs: 'Los tejidos están formados por grupos de células especializadas similares (ej. tejido muscular).'
          },
          {
            id: 'q-sci-5',
            question: 'Why is the STOMACH classified as an ORGAN and not just a tissue?',
            questionEs: '¿Por qué el ESTÓMAGO se clasifica como un ÓRGANO y no solo como un tejido?',
            options: [
              'Because it is inside the body.',
              'Because it is made of multiple different tissues (muscle, epithelial, nervous) working together.',
              'Because it is made of only one single cell.',
              'Because it doesn\'t need blood.'
            ],
            optionsEs: [
              'Porque está dentro del cuerpo.',
              'Porque está formado por múltiples tejidos diferentes (muscular, epitelial, nervioso) trabajando juntos.',
              'Porque está hecho de una sola célula.',
              'Porque no necesita sangre.'
            ],
            correctIndex: 1,
            explanation: 'An organ is an anatomical structure made of different tissues combined to perform a complex function.',
            explanationEs: 'Un órgano está compuesto por diferentes tejidos combinados para realizar una función compleja.'
          },
          {
            id: 'q-sci-6',
            question: 'What is the LARGEST organ of the human body that protects us from germs and water loss?',
            questionEs: '¿Cuál es el órgano MÁS GRANDE del cuerpo humano que nos protege de gérmenes y pérdida de agua?',
            options: ['The Heart (Corazón)', 'The Liver (Hígado)', 'The Skin (La Piel)', 'The Brain (Cerebro)'],
            optionsEs: ['El Corazón', 'El Hígado', 'La Piel', 'El Cerebro'],
            correctIndex: 2,
            explanation: 'The skin is the largest organ in the human body, serving as an impermeable barrier.',
            explanationEs: 'La piel es el órgano más grande del cuerpo humano y actúa como barrera impermeable.'
          },

          // TOPIC 3: Organ Systems & Reflex Arc (3 Questions)
          {
            id: 'q-sci-7',
            question: 'What is the CORRECT hierarchical order of biological organization from simplest to most complex?',
            questionEs: '¿Cuál es el orden jerárquico CORRECTO de la organización biológica de menor a mayor complejidad?',
            options: [
              'Organ ➡️ Tissue ➡️ Cell ➡️ System ➡️ Organism',
              'Cell ➡️ Tissue ➡️ Organ ➡️ System ➡️ Organism',
              'System ➡️ Organ ➡️ Tissue ➡️ Cell ➡️ Organism',
              'Cell ➡️ Organ ➡️ Tissue ➡️ Organism ➡️ System'
            ],
            optionsEs: [
              'Órgano ➡️ Tejido ➡️ Célula ➡️ Sistema ➡️ Organismo',
              'Célula ➡️ Tejido ➡️ Órgano ➡️ Sistema ➡️ Organismo',
              'Sistema ➡️ Órgano ➡️ Tejido ➡️ Célula ➡️ Organismo',
              'Célula ➡️ Órgano ➡️ Tejido ➡️ Organismo ➡️ Sistema'
            ],
            correctIndex: 1,
            explanation: 'Cells form tissues, tissues form organs, organs form systems, and systems form the organism.',
            explanationEs: 'Las células forman tejidos, los tejidos forman órganos, los órganos sistemas, y los sistemas el organismo.'
          },
          {
            id: 'q-sci-8',
            question: 'When you accidentally touch a hot stove and pull your hand away in milliseconds before feeling pain, what neural pathway is responsible?',
            questionEs: 'Cuando tocas accidentalmente una estufa caliente y retiras la mano en milisegundos antes de sentir dolor, ¿qué circuito es responsable?',
            options: [
              'The Digestive system',
              'The Reflex Arc coordinated by the Spinal Cord',
              'The Circulatory pulse',
              'The Respiratory lungs'
            ],
            optionsEs: [
              'El sistema digestivo',
              'El Arco Reflejo coordinado por la Médula Espinal',
              'El pulso circulatorio',
              'Los pulmones respiratorios'
            ],
            correctIndex: 1,
            explanation: 'The reflex arc sends electrical signals to the spinal cord which commands muscles to contract instantly for protection.',
            explanationEs: 'El arco reflejo envía señales a la médula espinal para contraer los músculos de inmediato como protección.'
          },
          {
            id: 'q-sci-9',
            question: 'Which organ system is responsible for gas exchange, taking in Oxygen (O2) and releasing Carbon Dioxide (CO2)?',
            questionEs: '¿Qué sistema de órganos es responsable del intercambio de gases, absorbiendo Oxígeno y liberando Dióxido de Carbono?',
            options: ['Circulatory System', 'Respiratory System (Trachea, Lungs & Alveoli)', 'Digestive System', 'Skeletal System'],
            optionsEs: ['Sistema Circulatorio', 'Sistema Respiratorio (Tráquea, Pulmones y Alvéolos)', 'Sistema Digestivo', 'Sistema Óseo'],
            correctIndex: 1,
            explanation: 'The respiratory system uses lungs and microscopic alveoli for vital gas exchange.',
            explanationEs: 'El sistema respiratorio utiliza los pulmones y alvéolos microscópicos para el intercambio de gases.'
          }
        ]
      }
    ]
  },
  {
    id: 'sociales',
    name: 'Ciencias Sociales y Constitución',
    nameEn: 'Social Studies & Constitution',
    icon: 'Globe',
    color: '#f59e0b',
    bgColor: '#fffbeb',
    bookName: 'Diario Personal Sociales 5 - Vol. 1 (Santillana)',
    teacher: 'Alejandro Zapata',
    grade: 'Cuarto de Primaria (401 - 402)',
    gradeEn: 'Grade 4 (Primary)',
    units: [
      {
        id: 'soc-logro-01',
        logroNumber: 1,
        title: 'Logro 01: Territorio Colombiano, Fronteras, Relieve, Hidrografía y Biodiversidad',
        titleEn: 'Logro 01: Colombian Territory, Borders, Relief, Hydrography & Biodiversity',
        evaluationWeek: 5,
        evaluationDate: '31 de agosto al 6 de septiembre',
        evaluationDateEn: 'August 31 to September 6',
        weeks: ['Semana 2', 'Semana 3', 'Semana 4'],
        summary: 'Analizar el territorio colombiano, las fronteras terrestres y marítimas, las 5 vertientes hidrográficas, la biodiversidad y la cultura de paz.',
        summaryEn: 'Analyze Colombian territory, land and maritime borders, the 5 hydrographic basins, biodiversity, and peace education.',
        topics: [
          {
            id: 'soc-l1-t1',
            title: '1. El Territorio Colombiano y Fronteras (Semana 2)',
            titleEn: '1. Colombian Territory and Borders (Week 2)',
            badge: 'Semana 2',
            badgeEn: 'Week 2',
            bookPages: 'Págs. 22-25',
            bilingualBlocks: [
              {
                es: 'Colombia limita con 5 países: Venezuela (2.219 km), Brasil, Perú, Ecuador y Panamá. Tiene costas en 2 océanos.',
                en: 'Colombia borders 5 countries: Venezuela (2,219 km), Brazil, Peru, Ecuador, and Panama. Coastlines on 2 oceans.'
              }
            ],
            flashcards: [{ q: '¿Con qué país tiene Colombia la frontera más larga?', qEn: 'Longest border country?', a: 'Venezuela (2.219 km).' }]
          },
          {
            id: 'soc-l1-t2',
            title: '2. Hidrografía y las 5 Vertientes (Semana 3)',
            titleEn: '2. Hydrography and 5 River Basins (Week 3)',
            badge: 'Semana 3',
            badgeEn: 'Week 3',
            bookPages: 'Págs. 26-36',
            bilingualBlocks: [
              {
                es: '5 Vertientes: Caribe (ríos Magdalena/Cauca), Pacífico (Patía/San Juan), Orinoco (Meta), Amazonas (Caquetá) y Catatumbo.',
                en: '5 Basins: Caribbean (Magdalena/Cauca), Pacific (Patía/San Juan), Orinoco (Meta), Amazon (Caquetá), and Catatumbo.'
              }
            ],
            flashcards: [{ q: '¿A cuál vertiente pertenecen el Magdalena y Cauca?', qEn: 'Magdalena/Cauca watershed?', a: 'Vertiente del Caribe.' }]
          },
          {
            id: 'soc-l1-t3',
            title: '3. Relieve, Biodiversidad y Cultura de Paz (Semana 4)',
            titleEn: '3. Relief, Biodiversity & Culture of Peace (Week 4)',
            badge: 'Semana 4',
            badgeEn: 'Week 4',
            bookPages: 'Págs. 37-50',
            bilingualBlocks: [
              {
                es: 'Las 3 cordilleras andinas (Occidental, Central, Oriental) generan variedad de pisos térmicos y biodiversidad única.',
                en: 'The 3 Andean mountain ranges create diverse thermal floors and unique biodiversity.'
              }
            ],
            flashcards: [{ q: '¿Cuántas cordilleras cruzan a Colombia?', qEn: 'How many Andean ranges cross Colombia?', a: 'Tres (Occidental, Central, Oriental).' }]
          }
        ],
        quiz: [
          // TEMA 1: Territorio y Fronteras (3 Preguntas)
          {
            id: 'q-soc-1',
            question: '¿Con cuál de sus países vecinos tiene Colombia su frontera terrestre MÁS LARGA (2.219 km)?',
            questionEn: 'With which neighboring country does Colombia share its LONGEST land border (2,219 km)?',
            options: ['Ecuador', 'Panamá', 'Venezuela (2.219 km)', 'Brasil'],
            optionsEn: ['Ecuador', 'Panama', 'Venezuela (2,219 km)', 'Brazil'],
            correctIndex: 2,
            explanation: 'La frontera con Venezuela es la más extensa con 2.219 km de longitud.',
            explanationEn: 'The border with Venezuela is the longest with 2,219 km.'
          },
          {
            id: 'q-soc-2',
            question: '¿Por qué la posición geográfica de Colombia es privilegiada en el continente americano?',
            questionEn: 'Why is Colombia\'s geographical location privileged in the Americas?',
            options: [
              'Porque está en el polo sur.',
              'Porque es el único país de América del Sur con costas en dos océanos (Pacífico y Atlántico).',
              'Porque no tiene montañas.',
              'Porque es una isla solitaria.'
            ],
            optionsEn: [
              'Because it is in the south pole.',
              'Because it is the only South American country with coastlines on two oceans (Pacific and Atlantic).',
              'Because it has no mountains.',
              'Because it is an isolated island.'
            ],
            correctIndex: 1,
            explanation: 'Colombia tiene costas sobre el Mar Caribe (Atlántico) y el Océano Pacífico, facilitando el comercio mundial.',
            explanationEn: 'Colombia borders both the Caribbean Sea (Atlantic) and the Pacific Ocean.'
          },
          {
            id: 'q-soc-3',
            question: '¿Qué país centroamericano limita al noroeste con Colombia y sirve de puente territorial?',
            questionEn: 'Which Central American country borders Colombia to the northwest acting as a land bridge?',
            options: ['Costa Rica', 'México', 'Panamá', 'Perú'],
            optionsEn: ['Costa Rica', 'Mexico', 'Panama', 'Peru'],
            correctIndex: 2,
            explanation: 'Panamá limita al noroeste con Colombia en la región del Tapón del Darién.',
            explanationEn: 'Panama borders Colombia to the northwest in the Darien region.'
          },

          // TEMA 2: Hidrografía y Vertientes (3 Preguntas)
          {
            id: 'q-soc-4',
            question: '¿A cuál vertiente hidrográfica pertenecen los ríos Magdalena y Cauca, los más transitados e importantes económicamente?',
            questionEn: 'To which watershed do the Magdalena and Cauca rivers belong?',
            options: ['Vertiente del Pacífico', 'Vertiente del Caribe', 'Vertiente del Amazonas', 'Vertiente del Catatumbo'],
            optionsEn: ['Pacific Watershed', 'Caribbean Watershed', 'Amazon Watershed', 'Catatumbo Watershed'],
            correctIndex: 1,
            explanation: 'Los ríos Magdalena y Cauca desembocan en el Mar Caribe y forman la arteria fluvial principal de Colombia.',
            explanationEn: 'The Magdalena and Cauca rivers flow into the Caribbean Sea.'
          },
          {
            id: 'q-soc-5',
            question: '¿Qué caracteriza a los ríos de la Vertiente del Pacífico (como el San Juan y el Patía)?',
            questionEn: 'What characterizes the rivers of the Pacific Watershed (such as San Juan and Patía)?',
            options: [
              'Son ríos secos sin agua.',
              'Son ríos cortos pero extremadamente caudalosos debido a las altas lluvias de la región.',
              'Desembocan en lagos congelados.',
              'No tienen peces.'
            ],
            optionsEn: [
              'They are dry rivers with no water.',
              'They are short but extremely high-volume rivers due to heavy rainfall in the region.',
              'They flow into frozen lakes.',
              'They have no fish.'
            ],
            correctIndex: 1,
            explanation: 'La región pacífica es una de las más lluviosas del planeta, por lo que sus ríos llevan un caudal inmenso.',
            explanationEn: 'The Pacific region has high rainfall, making its rivers short and high-volume.'
          },
          {
            id: 'q-soc-6',
            question: '¿Cuál es la vertiente hidrográfica MÁS PEQUEÑA de Colombia, cuyas aguas desembocan en el Lago de Maracaibo en Venezuela?',
            questionEn: 'What is the SMALLEST watershed in Colombia, flowing into Lake Maracaibo in Venezuela?',
            options: ['Vertiente del Amazonas', 'Vertiente del Orinoco', 'Vertiente del Catatumbo', 'Vertiente del Caribe'],
            optionsEn: ['Amazon Watershed', 'Orinoco Watershed', 'Catatumbo Watershed', 'Caribbean Watershed'],
            correctIndex: 2,
            explanation: 'La vertiente del Catatumbo es la más pequeña y sus ríos fluyen hacia el Lago de Maracaibo.',
            explanationEn: 'The Catatumbo watershed is the smallest and drains into Lake Maracaibo.'
          },

          // TEMA 3: Relieve y Biodiversidad (3 Preguntas)
          {
            id: 'q-soc-7',
            question: '¿En cuántas cordilleras se ramifica la cordillera de los Andes al entrar a Colombia?',
            questionEn: 'Into how many mountain ranges do the Andes branch when entering Colombia?',
            options: ['En 2 cordilleras', 'En 3 cordilleras (Occidental, Central y Oriental)', 'En 5 cordilleras', 'No se ramifica'],
            optionsEn: ['In 2 ranges', 'In 3 ranges (Western, Central, and Eastern)', 'In 5 ranges', 'It doesn\'t branch'],
            correctIndex: 1,
            explanation: 'En el Macizo Colombiano los Andes se dividen en las cordilleras Occidental, Central y Oriental.',
            explanationEn: 'The Andes split in Colombia into the Western, Central, and Eastern ranges.'
          },
          {
            id: 'q-soc-8',
            question: '¿Qué ventaja natural proporcionan los diferentes pisos térmicos (cálido, templado, frío, páramo y nieves perpetuas) a Colombia?',
            questionEn: 'What natural advantage do different thermal floors provide to Colombia?',
            options: [
              'Permiten cultivar una inmensa variedad de alimentos y albergar una biodiversidad de flora y fauna única.',
              'Que siempre hace el mismo clima en todo el país.',
              'Que no hay animales en el campo.',
              'Que solo se puede cultivar arroz.'
            ],
            optionsEn: [
              'They allow farming a huge variety of crops and hosting unique biodiversity.',
              'The weather is always the same everywhere.',
              'There are no animals in the wild.',
              'Only rice can be grown.'
            ],
            correctIndex: 0,
            explanation: 'La altitud genera pisos térmicos que posibilitan diversidad de ecosistemas y cosechas agrícolas todo el año.',
            explanationEn: 'Altitude creates thermal floors that allow diverse ecosystems and farming year-round.'
          },
          {
            id: 'q-soc-9',
            question: 'En los proyectos escolares de convivencia y debates estudiantiles de paz, ¿cuál es la mejor forma de resolver un desacuerdo?',
            questionEn: 'In school coexistence and student peace debates, what is the best way to resolve a conflict?',
            options: [
              'Con violencia y gritos.',
              'A través del diálogo respetuoso, la escucha activa y la búsqueda de acuerdos de paz.',
              'Ignorando a los demás.',
              'Imponiendo la fuerza.'
            ],
            optionsEn: [
              'With violence and shouting.',
              'Through respectful dialogue, active listening, and seeking peaceful agreements.',
              'Ignoring everyone.',
              'Using force.'
            ],
            correctIndex: 1,
            explanation: 'La cultura de paz y la diplomacia escolar se fundamentan en el diálogo constructivo y el respeto mutuo.',
            explanationEn: 'A culture of peace and diplomacy is based on respectful dialogue and mutual understanding.'
          }
        ]
      }
    ]
  },
  {
    id: 'lenguaje',
    name: 'Castellano y Literatura',
    nameEn: 'Spanish & Literature',
    icon: 'BookOpen',
    color: '#ec4899',
    bgColor: '#fdf2f8',
    bookName: 'UNOi Diario Personal Lenguaje 5 - Módulo 1 (Santillana)',
    teacher: 'Tatiana Nope S.',
    grade: 'Cuarto de Primaria (4.°)',
    gradeEn: 'Grade 4 (Primary)',
    units: [
      {
        id: 'len-logro-01',
        logroNumber: 1,
        title: 'Logro 01: El Poema, Rima Asonante/Consonante, Odas, Elegías y Estructuras Oracionales',
        titleEn: 'Logro 01: The Poem, Consonant/Assonant Rhyme, Odes, Elegies & Sentence Structures',
        evaluationWeek: 5,
        evaluationDate: '31 de agosto al 6 de septiembre',
        evaluationDateEn: 'August 31 to September 6',
        weeks: ['Semana 2', 'Semana 3', 'Semana 4'],
        summary: 'Características de la poesía lírica (versos, estrofas, rimas consonantes y asonantes, odas y elegías) y estructuras oracionales (sintagmas nominal, verbal, adjetival y oraciones compuestas).',
        summaryEn: 'Features of lyric poetry (verses, stanzas, consonant/assonant rhymes, odes and elegies) and sentence structures (nominal, verbal, adjectival phrases, and compound sentences).',
        topics: [
          {
            id: 'len-l1-t1',
            title: '1. El Poema y Clases de Rima: Consonante y Asonante (Semana 2)',
            titleEn: '1. The Poem & Rhyme Types: Consonant and Assonant (Week 2)',
            badge: 'Semana 2',
            badgeEn: 'Week 2',
            bookPages: 'Págs. 22, 26-29',
            bilingualBlocks: [
              {
                es: 'Verso: Cada línea del poema. Rima Consonante: coinciden vocales y consonantes. Rima Asonante: solo coinciden vocales.',
                en: 'Verse: Each poetic line. Consonant Rhyme: vowels and consonants match. Assonant Rhyme: only vowels match.'
              }
            ],
            flashcards: [{ q: '¿Qué es rima consonante?', qEn: 'Consonant rhyme?', a: 'Coinciden vocales y consonantes.' }]
          },
          {
            id: 'len-l1-t2',
            title: '2. Clases de Poemas: Odas y Elegías (Semana 3)',
            titleEn: '2. Types of Poems: Odes and Elegies (Week 3)',
            badge: 'Semana 3',
            badgeEn: 'Week 3',
            bookPages: 'Págs. 24-25',
            bilingualBlocks: [
              {
                es: 'Oda: Poema de alabanza y alegría. Elegía: Poema melancólico de tristeza o duelo por una pérdida.',
                en: 'Ode: Poem of praise and joy. Elegy: Melancholic poem expressing sorrow or grief for a loss.'
              }
            ],
            flashcards: [{ q: '¿Qué es una Oda?', qEn: 'What is an Ode?', a: 'Un poema de alabanza y celebración.' }]
          },
          {
            id: 'len-l1-t3',
            title: '3. Sintagmas y Oraciones Compuestas (Semana 4)',
            titleEn: '3. Phrases and Compound Sentences (Week 4)',
            badge: 'Semana 4',
            badgeEn: 'Week 4',
            bookPages: 'Págs. 41-42',
            bilingualBlocks: [
              {
                es: 'Sintagma Nominal (núcleo: sustantivo). Sintagma Verbal (núcleo: verbo). Oración Compuesta: tiene dos o más verbos conjugados.',
                en: 'Noun Phrase (core: noun). Verb Phrase (core: verb). Compound Sentence: has two or more conjugated verbs.'
              }
            ],
            flashcards: [{ q: '¿Qué define a una oración compuesta?', qEn: 'What defines a compound sentence?', a: 'Tiene 2 o más verbos conjugados.' }]
          }
        ],
        quiz: [
          // TEMA 1: Rimas y Poema (3 Preguntas)
          {
            id: 'q-len-1',
            question: 'En los versos: "El viento soplaba en la colina / y la luna brillante se ilumina", ¿qué tipo de rima se presenta entre "colina" e "ilumina"?',
            questionEn: 'In "colina" and "ilumina", what type of rhyme is present?',
            options: ['Rima Asonante', 'Rima Consonante (Perfecta)', 'Rima Libre', 'Sin rima'],
            optionsEn: ['Assonant Rhyme', 'Consonant (Perfect) Rhyme', 'Free Verse', 'No rhyme'],
            correctIndex: 1,
            explanation: 'Coinciden todas las vocales y consonantes a partir de la vocal acentuada (-ina / -ina), por lo que es rima consonante.',
            explanationEn: 'All vowels and consonants match from the stressed vowel (-ina / -ina).'
          },
          {
            id: 'q-len-2',
            question: 'En las palabras "sombrero" y "viento", ¿por qué se dice que tienen RIMA ASONANTE?',
            questionEn: 'In "sombrero" and "viento", why is there ASSONANT RHYME?',
            options: [
              'Porque coinciden todas las letras.',
              'Porque coinciden únicamente las vocales (e - o) y las consonantes son diferentes.',
              'Porque riman con queso.',
              'Porque no tienen acento.'
            ],
            optionsEn: [
              'Because all letters match.',
              'Because only the vowels (e - o) match while consonants differ.',
              'Because they rhyme with cheese.',
              'Because they have no stress.'
            ],
            correctIndex: 1,
            explanation: 'En la rima asonante solo coinciden las vocales (e-o) al final de la palabra.',
            explanationEn: 'In assonant rhyme only the vowels match at the end.'
          },
          {
            id: 'q-len-3',
            question: '¿Cómo se le llama a cada una de las líneas que componen un poema?',
            questionEn: 'What is each single line of a poem called?',
            options: ['Estrofa (Stanza)', 'Párrafo (Paragraph)', 'Verso (Verse / Line)', 'Oración (Sentence)'],
            optionsEn: ['Stanza', 'Paragraph', 'Verse / Line', 'Sentence'],
            correctIndex: 2,
            explanation: 'Cada línea de un poema se denomina verso; el conjunto de versos forma una estrofa.',
            explanationEn: 'Each line in a poem is a verse; a group of verses forms a stanza.'
          },

          // TEMA 2: Odas y Elegías (3 Preguntas)
          {
            id: 'q-len-4',
            question: '¿Qué tipo de poema lírico es la famosa "Oda a los calcetines" escrita por Pablo Neruda?',
            questionEn: 'What type of lyric poem is "Ode to Socks" by Pablo Neruda?',
            options: [
              'Una elegía triste por la pérdida de ropa.',
              'Una oda que exalta, alaba y celebra con alegría un objeto cotidiano.',
              'Una noticia periodística.',
              'Un guion teatral de miedo.'
            ],
            optionsEn: [
              'A sad elegy for lost clothes.',
              'An ode praising and celebrating an everyday object with joy.',
              'A newspaper report.',
              'A scary play script.'
            ],
            correctIndex: 1,
            explanation: 'La oda es una composición poética creada para elogiar y rendir homenaje con admiración.',
            explanationEn: 'An ode is a poetic work celebrating and praising a subject with admiration.'
          },
          {
            id: 'q-len-5',
            question: 'Si un poeta escribe un poema expresando su profunda tristeza y dolor por la partida de su abuelito, está componiendo:',
            questionEn: 'If a poet writes expressing deep grief and sorrow for the loss of a grandfather, he is writing:',
            options: ['Una Oda cómica', 'Una Elegía (Canto melancólico de duelo)', 'Una fábula con animales', 'Un chiste rimado'],
            optionsEn: ['A funny Ode', 'An Elegy (Melancholic poem of grief)', 'A fable with animals', 'A rhymed joke'],
            correctIndex: 1,
            explanation: 'La elegía es el subgénero lírico que expresa el dolor, duelo o melancolía por una pérdida.',
            explanationEn: 'An elegy is a lyric poem expressing grief and mourning for a loss.'
          },
          {
            id: 'q-len-6',
            question: '¿Cuál es la diferencia emocional principal entre una ODA y una ELEGÍA?',
            questionEn: 'What is the main emotional difference between an ODE and an ELEGY?',
            options: [
              'La oda expresa admiración/alegría y la elegía expresa dolor/tristeza.',
              'La oda es en inglés y la elegía en francés.',
              'La elegía no tiene rima.',
              'Son exactamente iguales.'
            ],
            optionsEn: [
              'The ode expresses admiration/joy and the elegy expresses grief/sorrow.',
              'The ode is in English and the elegy in French.',
              'The elegy has no rhyme.',
              'They are exactly the same.'
            ],
            correctIndex: 0,
            explanation: 'La oda transmite entusiasmo y alabanza; la elegía transmite duelo y nostalgia.',
            explanationEn: 'The ode conveys praise; the elegy conveys sorrow.'
          },

          // TEMA 3: Sintagmas y Oraciones Compuestas (3 Preguntas)
          {
            id: 'q-len-7',
            question: 'En la oración "El gato negro duerme plácidamente en el tejado", ¿cuál es el Sintagma Nominal (Sujeto) y su núcleo?',
            questionEn: 'In "The black cat sleeps peacefully", what is the Noun Phrase and its core noun?',
            options: [
              'Sintagma Nominal: "El gato negro" (Núcleo: gato)',
              'Sintagma Nominal: "duerme plácidamente" (Núcleo: duerme)',
              'Sintagma Nominal: "en el tejado" (Núcleo: tejado)',
              'Sintagma Nominal: "negro" (Núcleo: negro)'
            ],
            optionsEn: [
              'Noun Phrase: "The black cat" (Core: cat)',
              'Noun Phrase: "sleeps peacefully" (Core: sleeps)',
              'Noun Phrase: "on the roof" (Core: roof)',
              'Noun Phrase: "black" (Core: black)'
            ],
            correctIndex: 0,
            explanation: '"El gato negro" es el Sintagma Nominal y su palabra principal (núcleo sustantivo) es "gato".',
            explanationEn: '"The black cat" is the noun phrase and its core is "cat".'
          },
          {
            id: 'q-len-8',
            question: '¿Cuál de las siguientes es una ORACIÓN COMPUESTA (posee dos o más verbos conjugados)?',
            questionEn: 'Which of the following is a COMPOUND SENTENCE (has two or more conjugated verbs)?',
            options: [
              'Lucas lee un cuento de aventuras.',
              'María juega en el patio con sus amigas.',
              'Lucas escribe una oda y Valeria dibuja la portada del libro.',
              'El sol brilla en la mañana.'
            ],
            optionsEn: [
              'Lucas reads an adventure story.',
              'Maria plays in the yard with friends.',
              'Lucas writes an ode and Valeria draws the book cover.',
              'The sun shines in the morning.'
            ],
            correctIndex: 2,
            explanation: 'Tiene dos verbos conjugados ("escribe" y "dibuja") unidos por la conjunción "y".',
            explanationEn: 'It has two conjugated verbs ("writes" and "draws") linked by "and".'
          },
          {
            id: 'q-len-9',
            question: '¿Cuál es el núcleo principal de un Sintagma Verbal (SV) en una oración?',
            questionEn: 'What is the main core of a Verb Phrase (SV) in a sentence?',
            options: ['Un Sustantivo', 'Un Adjetivo', 'Un Verbo conjugado', 'Un Signo de puntuación'],
            optionsEn: ['A Noun', 'An Adjective', 'A conjugated Verb', 'A punctuation mark'],
            correctIndex: 2,
            explanation: 'El núcleo de todo sintagma verbal es el verbo, que expresa la acción o estado del sujeto.',
            explanationEn: 'The core of every verb phrase is the verb expressing the action.'
          }
        ]
      }
    ]
  },
  {
    id: 'ingles',
    name: 'English (Fly High 4)',
    nameEn: 'English (Fly High 4)',
    icon: 'Languages',
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    bookName: "Fly High 4. Student's Book & Workbook (Richmond)",
    teacher: 'Angela Rodríguez',
    grade: 'Cuarto de Primaria (401 / 402)',
    gradeEn: 'Grade 4 (Primary)',
    units: [
      {
        id: 'eng-logro-01',
        logroNumber: 1,
        title: 'Logro 01: Lugares del Colegio, Personal Escolar y Modales (Can, Can\'t, Have to, Has to)',
        titleEn: 'Logro 01: School Places, School Staff & Modals (Can, Can\'t, Have to, Has to)',
        evaluationWeek: 5,
        evaluationDate: '31 de agosto al 6 de septiembre',
        evaluationDateEn: 'August 31 to September 6',
        weeks: ['Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'],
        summary: 'Comprender y usar comandos de clase, vocabulario de lugares y personal del colegio, y estructuras modales para expresar habilidades/permisos (can/can\'t) y obligaciones (have to / has to).',
        summaryEn: 'Perform and respond to basic classroom commands, school places, school staff, expressing abilities/permission (can/can\'t), obligations (have to / has to), and absence of obligation (don\'t have to).',
        topics: [
          {
            id: 'eng-l1-t1',
            title: '1. Comandos de Clase y Presentación Personal (Semana 2)',
            titleEn: '1. Classroom Commands & Introductions (Week 2)',
            badge: 'Semana 2',
            badgeEn: 'Week 2',
            bookPages: 'Fly High 4 Intro',
            bilingualBlocks: [
              {
                en: 'Commands: Stand up, sit down, raise your hand, open your notebook, listen carefully.',
                es: 'Comandos: Ponerse de pie, sentarse, levantar la mano, abrir el cuaderno, escuchar con atención.'
              }
            ],
            flashcards: [{ q: 'What does "Raise your hand" mean?', qEs: '¿Qué significa "Raise your hand"?', a: 'Levanta la mano.' }]
          },
          {
            id: 'eng-l1-t2',
            title: '2. Lugares y Personal del Colegio (Semana 3)',
            titleEn: '2. School Places & Staff Vocabulary (Week 3)',
            badge: 'Semana 3',
            badgeEn: 'Week 3',
            bookPages: 'Workbook Págs. 6-9',
            bilingualBlocks: [
              {
                en: 'Places: Classroom, Library, Science Lab, Cafeteria. Staff: Principal, Teacher, Librarian, Nurse, Cook.',
                es: 'Lugares: Salón, Biblioteca, Laboratorio, Cafetería. Personal: Rector, Profesor, Bibliotecario, Enfermero, Cocinero.'
              }
            ],
            flashcards: [{ q: 'Where do you read books in silence?', qEs: '¿Dónde lees libros en silencio?', a: 'In the Library.' }]
          },
          {
            id: 'eng-l1-t3',
            title: '3. Verbos Modales: Can, Can\'t, Have to y Has to (Semanas 4 y 5)',
            titleEn: '3. Modals: Can, Can\'t, Have to & Has to (Weeks 4-5)',
            badge: 'Semanas 4-5',
            badgeEn: 'Weeks 4-5',
            bookPages: 'Workbook Págs. 10-19',
            bilingualBlocks: [
              {
                en: 'Can: ability/permission. Can\'t: prohibition. Have to / Has to: obligation.',
                es: 'Can: habilidad/permiso. Can\'t: prohibición. Have to / Has to: obligación.'
              }
            ],
            flashcards: [{ q: 'Which modal expresses obligation for "He"?', qEs: '¿Qué modal expresa obligación para "He"?', a: 'Has to.' }]
          }
        ],
        quiz: [
          // TOPIC 1: Classroom Commands & Introductions (3 Questions)
          {
            id: 'q-eng-1',
            question: 'What is the polite classroom command for asking permission before speaking in class?',
            questionEs: '¿Cuál es el comando escolar para pedir la palabra antes de hablar en clase?',
            options: ['Sit down', 'Raise your hand before speaking', 'Close your book', 'Run in the hallway'],
            optionsEs: ['Siéntate', 'Levanta la mano antes de hablar', 'Cierra tu libro', 'Corre en el pasillo'],
            correctIndex: 1,
            explanation: '"Raise your hand" is the rule for asking permission respectfully before speaking.',
            explanationEs: '"Raise your hand" es la norma para pedir la palabra respetuosamente.'
          },
          {
            id: 'q-eng-2',
            question: 'Which sentence correctly introduces a student named Lucas who likes football?',
            questionEs: '¿Qué oración presenta correctamente a un estudiante llamado Lucas al que le gusta el fútbol?',
            options: [
              'My name is Lucas and my favorite hobby is playing football.',
              'I are Lucas and I hate football.',
              'Lucas is he and football play.',
              'Name Lucas football no.'
            ],
            optionsEs: [
              'Mi nombre es Lucas y mi pasatiempo favorito es jugar fútbol.',
              'Yo son Lucas y odio el fútbol.',
              'Lucas es él y fútbol jugar.',
              'Nombre Lucas fútbol no.'
            ],
            correctIndex: 0,
            explanation: '"My name is... and my favorite hobby is..." is the standard correct English introduction.',
            explanationEs: '"My name is... and my favorite hobby is..." es la estructura correcta en inglés.'
          },
          {
            id: 'q-eng-3',
            question: 'What does the teacher mean when she says: "Open your notebooks and write the date"?',
            questionEs: '¿Qué quiere decir la profesora cuando dice: "Open your notebooks and write the date"?',
            options: [
              'Cierren sus cuadernos y guarden los lápices.',
              'Abran sus cuadernos y escriban la fecha.',
              'Salgan a jugar al patio de recreo.',
              'Guarden silencio y duerman.'
            ],
            optionsEs: [
              'Cierren sus cuadernos y guarden los lápices.',
              'Abran sus cuadernos y escriban la fecha.',
              'Salgan a jugar al patio de recreo.',
              'Guarden silencio y duerman.'
            ],
            correctIndex: 1,
            explanation: '"Open your notebooks" means abrir sus cuadernos, and "write the date" means escribir la fecha.',
            explanationEs: '"Open your notebooks" significa abrir los cuadernos y "write the date" escribir la fecha.'
          },

          // TOPIC 2: School Places & School Staff (3 Questions)
          {
            id: 'q-eng-4',
            question: 'Where do students go when they feel sick at school to receive first aid care?',
            questionEs: '¿A dónde van los estudiantes cuando se sienten enfermos en el colegio para recibir atención médica?',
            options: ['To the Playground', 'To the Nurse\'s Office', 'To the Science Lab', 'To the Cafeteria'],
            optionsEs: ['Al patio de recreo', 'A la Enfermería', 'Al Laboratorio de Ciencias', 'A la Cafetería'],
            correctIndex: 1,
            explanation: 'The Nurse\'s Office is where the school nurse cares for sick or injured students.',
            explanationEs: 'La Enfermería es donde la enfermera atiende a los estudiantes que se sienten mal.'
          },
          {
            id: 'q-eng-5',
            question: 'Who is the member of the school staff responsible for organizing books and helping students find stories?',
            questionEs: '¿Quién es el miembro del personal escolar responsable de organizar libros y ayudar a encontrar historias?',
            options: ['The Janitor / Cleaner', 'The Librarian', 'The Cook', 'The Bus driver'],
            optionsEs: ['El personal de aseo', 'El Bibliotecario', 'El Cocinero', 'El conductor'],
            correctIndex: 1,
            explanation: 'The librarian manages the library books and assists young readers.',
            explanationEs: 'El bibliotecario organiza los libros y orienta a los estudiantes.'
          },
          {
            id: 'q-eng-6',
            question: 'Where do students conduct experiments using safety goggles and lab coats?',
            questionEs: '¿Dónde realizan experimentos los estudiantes usando gafas de protección y batas?',
            options: ['In the Science Lab', 'In the Cafeteria', 'In the Playground', 'In the Principal\'s Office'],
            optionsEs: ['En el Laboratorio de Ciencias', 'En la Cafetería', 'En el Patio de recreo', 'En la Rectoría'],
            correctIndex: 0,
            explanation: 'The Science Lab is the designated room equipped for scientific experiments.',
            explanationEs: 'El Laboratorio de Ciencias es el espacio equipado para realizar experimentos científicos.'
          },

          // TOPIC 3: Modals Can/Can't, Have to/Has to (3 Questions)
          {
            id: 'q-eng-7',
            question: 'Complete the sentence with the correct obligation modal: "Lucas (He) ________ wear his school uniform every day."',
            questionEs: 'Completa la oración con el modal de obligación correcto: "Lucas (He) ________ wear his school uniform every day."',
            options: ['have to', 'has to (3rd person singular)', 'can\'t', 'don\'t have to'],
            optionsEs: ['have to', 'has to (3ra persona singular)', 'can\'t', 'don\'t have to'],
            correctIndex: 1,
            explanation: 'For 3rd person singular (Lucas = He/She/It), obligation is expressed with "has to".',
            explanationEs: 'Para tercera persona singular (he, she, it) la obligación se expresa con "has to".'
          },
          {
            id: 'q-eng-8',
            question: 'Choose the correct rule of PROHIBITION for the school library:',
            questionEs: 'Elige la regla correcta de PROHIBICIÓN en la biblioteca escolar:',
            options: [
              'You can shout loudly in the library.',
              'You can\'t eat or drink food inside the library.',
              'You have to play football inside the library.',
              'You don\'t have to read books.'
            ],
            optionsEs: [
              'Puedes gritar fuerte en la biblioteca.',
              'No puedes comer ni beber alimentos dentro de la biblioteca.',
              'Tienes que jugar fútbol dentro de la biblioteca.',
              'No tienes que leer libros.'
            ],
            correctIndex: 1,
            explanation: '"You can\'t eat or drink" indicates a clear rule of prohibition in the library.',
            explanationEs: '"You can\'t eat or drink" expresa prohibición en la biblioteca.'
          },
          {
            id: 'q-eng-9',
            question: 'Which of the following sentences expresses an ABILITY correctly in English?',
            questionEs: '¿Cuál de las siguientes oraciones expresa una HABILIDAD correctamente en inglés?',
            options: [
              'Eagles can fly high in the sky.',
              'Eagles has to fly in the sky.',
              'Eagles can\'t wings.',
              'Eagles don\'t have to feathers.'
            ],
            optionsEs: [
              'Las águilas pueden volar alto en el cielo.',
              'Las águilas tiene que volar en el cielo.',
              'Las águilas no puede alas.',
              'Las águilas no tiene plumas.'
            ],
            correctIndex: 0,
            explanation: '"Can fly" expresses physical capability or skill (ability).',
            explanationEs: '"Can fly" expresa la habilidad física de volar.'
          }
        ]
      }
    ]
  }
];
