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
    bookName: 'PR1ME Mathematics 5 (Scholastic) - Método Singapur & Review G1',
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
        summary: 'Lectura y escritura de números hasta 1.000.000, valor posicional, comparación/orden (> o <), redondeo a centenas y miles, operaciones con números pares e impares, factores de un número y ángulos.',
        summaryEn: 'Reading and writing numbers up to 1,000,000, place value, comparing/ordering (> or <), rounding, operations with odd & even numbers, finding factors, and angle geometry.',
        topics: [
          {
            id: 'm-l1-t1',
            title: '1. Reading & Writing Numbers, Place Value & Digits Value',
            titleEn: '1. Reading & Writing Numbers, Place Value & Digits Value',
            badge: 'Semana 2 - Review',
            badgeEn: 'Week 2 - Review',
            bookPages: 'Review G1 • Pts 1, 2, 3 • CB Págs. 1-16',
            bilingualBlocks: [
              {
                en: 'Reading and Writing Numbers up to 1,000,000:\n• In numerals: twenty-three thousand, seven hundred and four ➡️ 23 704\n• In words: 50 901 ➡️ fifty thousand, nine hundred and one\n• In words: 659 547 ➡️ six hundred and fifty-nine thousand, five hundred and forty-seven',
                es: 'Lectura y Escritura de Números hasta 1.000.000:\n• En cifras: veintitrés mil setecientos cuatro ➡️ 23.704\n• En palabras: 50.901 ➡️ fifty thousand, nine hundred and one (cincuenta mil novecientos uno)\n• En palabras: 659.547 ➡️ six hundred and fifty-nine thousand, five hundred and forty-seven'
              },
              {
                en: 'Place Value & Value of Digits:\n• In 423 546: digit 2 is in the TEN THOUSANDS place (value: 20 000).\n• In 634 543: digit 6 is in the HUNDRED THOUSANDS place (value: 600 000).\n• In 547 893: digit 7 is in the THOUSANDS place (value: 7 000).\n• In 906 428: digit 0 is in the TEN THOUSANDS place (value: 0).',
                es: 'Valor Posicional y Valor de los Dígitos:\n• En 423.546: el dígito 2 está en las Decenas de Mil (Ten Thousands) y vale 20.000.\n• En 634.543: el dígito 6 está en las Centenas de Mil (Hundred Thousands) y vale 600.000.\n• En 547.893: el dígito 7 está en las Unidades de Mil (Thousands) y vale 7.000.\n• En 906.428: el dígito 0 está en las Decenas de Mil y vale 0.'
              }
            ],
            flashcards: [
              { q: 'What is the value of digit 6 in 634 543?', qEs: '¿Cuál es el valor del dígito 6 en 634 543?', a: '600 000 (Hundred thousands / Centenas de mil).' },
              { q: 'How do you write 23 704 in words in English?', qEs: '¿Cómo se escribe 23 704 en palabras en inglés?', a: 'Twenty-three thousand, seven hundred and four.' }
            ]
          },
          {
            id: 'm-l1-t2',
            title: '2. Comparing, Ordering & Rounding Numbers',
            titleEn: '2. Comparing, Ordering & Rounding Numbers',
            badge: 'Semana 3 - Review',
            badgeEn: 'Week 3 - Review',
            bookPages: 'Review G1 • Pts 4, 6, 7, 8 • CB Págs. 18-33',
            bilingualBlocks: [
              {
                en: 'Comparing & Ordering Numbers:\n• Write > or <: 455 678 > 94 675 (6 digits is always greater than 5 digits).\n• Order from greatest to least: 94 797, 944 700, 904 779 ➡️ 944 700, 904 779, 94 797.',
                es: 'Comparar y Ordenar Números:\n• Comparar con > o <: 455.678 > 94.675 (un número de 6 cifras siempre es mayor que uno de 5 cifras).\n• Ordenar de mayor a menor: 94.797, 944.700, 904.779 ➡️ 944.700, 904.779, 94.797.'
              },
              {
                en: 'Rounding Rules (Nearest Hundred and Nearest Thousand):\n• Rounding to nearest hundred: Look at the tens digit.\n  - $56 506 ➡️ tens digit is 0 (< 5) ➡️ rounds to $56 500.\n  - $37 091 ➡️ tens digit is 9 (>= 5) ➡️ rounds to $37 100.\n• Rounding to nearest thousand: Look at the hundreds digit.\n  - $73 231 ➡️ hundreds digit is 2 (< 5) ➡️ rounds to $73 000.\n  - $96 602 ➡️ hundreds digit is 6 (>= 5) ➡️ rounds to $97 000.',
                es: 'Reglas de Redondeo (A la Centena y al Millar más cercano):\n• Redondeo a la centena más cercana: Se mira el dígito de las decenas.\n  - $56.506 ➡️ decenas es 0 (< 5) ➡️ redondea a $56.500.\n  - $37.091 ➡️ decenas es 9 (≥ 5) ➡️ redondea a $37.100.\n• Redondeo al millar más cercano: Se mira el dígito de las centenas.\n  - $73.231 ➡️ centenas es 2 (< 5) ➡️ redondea a $73.000.\n  - $96.602 ➡️ centenas es 6 (≥ 5) ➡️ redondea a $97.000.'
              }
            ],
            flashcards: [
              { q: 'Round $96 602 to the nearest thousand:', qEs: 'Redondea $96 602 al millar más cercano:', a: '$97 000 (Because 6 >= 5 in hundreds).' },
              { q: 'Which is greater: 455 678 or 94 675?', qEs: '¿Cuál es mayor: 455 678 o 94 675?', a: '455 678 > 94 675.' }
            ]
          },
          {
            id: 'm-l1-t3',
            title: '3. Odd & Even Numbers Rules, Finding Factors & Angles',
            titleEn: '3. Odd & Even Numbers Rules, Finding Factors & Angles',
            badge: 'Semana 4 - Review',
            badgeEn: 'Week 4 - Review',
            bookPages: 'Review G1 • Pts 9, 10, 11, 12 • CB Págs. 89-102',
            bilingualBlocks: [
              {
                en: 'Rules for Adding and Subtracting Odd & Even Numbers:\n• even + even = even (142 + 324 = 466)\n• odd + odd = even (537 + 63 = 600, 35 + 25 = 60)\n• odd + even = odd (e.g. 5 + 4 = 9)',
                es: 'Reglas de Suma y Resta con Números Pares e Impares:\n• par + par = par (even + even = even) (142 + 324 = 466)\n• impar + impar = par (odd + odd = even) (537 + 63 = 600, 35 + 25 = 60)\n• impar + par = impar (odd + even = odd) (5 + 4 = 9)'
              },
              {
                en: 'Rules for Multiplying Odd & Even Numbers:\n• odd x odd = odd (3 x 7 = 21)\n• odd x even = even (33 x 2 = 66, 6 x 5 = 30)\n• even x even = even (4 x 6 = 24)',
                es: 'Reglas de Multiplicación con Pares e Impares:\n• impar x impar = impar (odd x odd = odd) (3 x 7 = 21)\n• impar x par = par (odd x even = even) (33 x 2 = 66, 6 x 5 = 30)\n• par x par = par (even x even = even) (4 x 6 = 24)'
              },
              {
                en: 'Finding Factors of a Number:\n• Factors of 20: {1, 2, 4, 5, 10, 20}\n• Factors of 45: {1, 3, 5, 9, 15, 45}\n• Factors of 63: {1, 3, 7, 9, 21, 63}',
                es: 'Cálculo de Factores o Divisores de un Número:\n• Factores de 20: {1, 2, 4, 5, 10, 20}\n• Factores de 45: {1, 3, 5, 9, 15, 45}\n• Factores de 63: {1, 3, 7, 9, 21, 63}'
              }
            ],
            flashcards: [
              { q: 'What are all the factors of 20?', qEs: '¿Cuáles son todos los factores de 20?', a: '1, 2, 4, 5, 10, 20.' },
              { q: 'odd number x odd number = ?', qEs: 'número impar x número impar = ?', a: 'odd number (número impar).' }
            ]
          }
        ],
        quiz: [
          // TEMA 1: Valor Posicional, Lectura y Escritura (Review Oficial)
          {
            id: 'q-m-1',
            question: 'How do you write the numeral for: "five hundred and forty-three thousand, three hundred and nineteen"?',
            questionEs: '¿Cómo se escribe en cifras: "five hundred and forty-three thousand, three hundred and nineteen"?',
            options: ['543 319', '543 390', '534 319', '543 019'],
            optionsEs: ['543 319', '543 390', '534 319', '543 019'],
            correctIndex: 0,
            explanation: 'Five hundred and forty-three thousand = 543 000 + three hundred and nineteen = 319 ➡️ 543 319.',
            explanationEs: '543.000 más 319 da exactamente 543.319.'
          },
          {
            id: 'q-m-2',
            question: 'In 634 543, what is the place and the value of digit 6?',
            questionEs: 'En 634 543, ¿cuál es la posición y el valor del dígito 6?',
            options: [
              'Ten thousands place, value = 60 000',
              'Hundred thousands place, value = 600 000',
              'Thousands place, value = 6 000',
              'Millions place, value = 6 000 000'
            ],
            optionsEs: [
              'Decenas de mil, valor = 60.000',
              'Centenas de mil (Hundred thousands), valor = 600.000',
              'Unidades de mil, valor = 6.000',
              'Unidades de millón, valor = 6.000.000'
            ],
            correctIndex: 1,
            explanation: 'Digit 6 occupies the 6th position from right (Hundred thousands), so its value is 6 x 100,000 = 600,000.',
            explanationEs: 'El 6 está en las Centenas de Mil y su valor es 6 x 100.000 = 600.000.'
          },
          {
            id: 'q-m-3',
            question: 'In 547 893, which digit is in the THOUSANDS place and what is its value?',
            questionEs: 'En 547 893, ¿qué dígito está en las UNIDADES DE MIL y cuál es su valor?',
            options: [
              'Digit 4, value = 40 000',
              'Digit 7, value = 7 000',
              'Digit 8, value = 800',
              'Digit 5, value = 500 000'
            ],
            optionsEs: [
              'Dígito 4, valor = 40.000',
              'Dígito 7, valor = 7.000',
              'Dígito 8, valor = 800',
              'Dígito 5, valor = 500.000'
            ],
            correctIndex: 1,
            explanation: 'Digit 7 is in the thousands place (4th position from right), value = 7,000.',
            explanationEs: 'El 7 está en la posición de las unidades de mil y su valor es 7.000.'
          },

          // TEMA 2: Comparación, Ordenación y Redondeo (Review Oficial)
          {
            id: 'q-m-4',
            question: 'Which of the following correctly arranges the numbers from GREATEST to LEAST?',
            questionEs: '¿Cuál de las siguientes opciones ordena correctamente los números de MAYOR a MENOR?',
            options: [
              '94 797, 904 779, 944 700',
              '944 700, 904 779, 94 797',
              '904 779, 944 700, 94 797',
              '944 700, 94 797, 904 779'
            ],
            optionsEs: [
              '94 797, 904 779, 944 700',
              '944 700, 904 779, 94 797',
              '904 779, 944 700, 94 797',
              '944 700, 94 797, 904 779'
            ],
            correctIndex: 1,
            explanation: '944 700 > 904 779 > 94 797 (94 797 only has 5 digits).',
            explanationEs: '944.700 es el mayor, luego 904.779 y el menor es 94.797 (5 dígitos).'
          },
          {
            id: 'q-m-5',
            question: 'Round $96 602 to the nearest THOUSAND dollars:',
            questionEs: 'Redondea $96 602 al MILLAR DE DÓLARES más cercano:',
            options: ['$96 000', '$97 000', '$96 600', '$100 000'],
            optionsEs: ['$96 000', '$97 000', '$96 600', '$100 000'],
            correctIndex: 1,
            explanation: 'The digit to the right of thousands is 6 in the hundreds place (>= 5), so we round up: $97,000.',
            explanationEs: 'El dígito a la derecha de los miles es 6 (≥ 5), por lo que se suma 1 a los miles dando $97.000.'
          },
          {
            id: 'q-m-6',
            question: 'Round $37 091 to the nearest HUNDRED dollars:',
            questionEs: 'Redondea $37 091 a la CENTENA DE DÓLARES más cercana:',
            options: ['$37 000', '$37 100', '$37 090', '$38 000'],
            optionsEs: ['$37 000', '$37 100', '$37 090', '$38 000'],
            correctIndex: 1,
            explanation: 'In the hundreds place is 0. The digit to the right (tens) is 9 (>= 5), so we add 1 to the hundreds place: $37,100.',
            explanationEs: 'El dígito de las decenas es 9 (≥ 5), por lo que sumamos 1 a la centena: $37.100.'
          },

          // TEMA 3: Operaciones con Pares/Impares y Factores (Review Oficial)
          {
            id: 'q-m-7',
            question: 'Complete the rule: "odd number x odd number = ______ number"',
            questionEs: 'Completa la regla: "número impar x número impar = número ______"',
            options: ['even (par)', 'odd (impar)', 'zero (cero)', 'negative (negativo)'],
            optionsEs: ['par (even)', 'impar (odd)', 'cero', 'negativo'],
            correctIndex: 1,
            explanation: 'Multiplying two odd numbers always produces an odd number (e.g. 3 x 7 = 21).',
            explanationEs: 'El producto de dos números impares siempre da impar (ej. 3 x 7 = 21).'
          },
          {
            id: 'q-m-8',
            question: 'Is the sum of 537 + 63 odd or even, and what is the rule?',
            questionEs: '¿La suma de 537 + 63 es par o impar, y cuál es la regla?',
            options: [
              '600 (even) ➡️ odd + odd = even',
              '600 (odd) ➡️ odd + odd = odd',
              '590 (even) ➡️ even + even = even',
              '601 (odd) ➡️ even + odd = odd'
            ],
            optionsEs: [
              '600 (par) ➡️ impar + impar = par',
              '600 (impar) ➡️ impar + impar = impar',
              '590 (par) ➡️ par + par = par',
              '601 (impar) ➡️ par + impar = impar'
            ],
            correctIndex: 0,
            explanation: '537 (odd) + 63 (odd) = 600 (even). Rule: odd + odd = even.',
            explanationEs: '537 (impar) + 63 (impar) = 600 (par). Regla: impar + impar = par.'
          },
          {
            id: 'q-m-9',
            question: 'Which of the following lists ALL the factors of 63 in order?',
            questionEs: '¿Cuál de las siguientes opciones enumera TODOS los factores de 63 en orden?',
            options: [
              '1, 3, 7, 9, 21, 63',
              '1, 3, 6, 9, 63',
              '1, 7, 9, 63',
              '1, 2, 3, 7, 21, 63'
            ],
            optionsEs: [
              '1, 3, 7, 9, 21, 63',
              '1, 3, 6, 9, 63',
              '1, 7, 9, 63',
              '1, 2, 3, 7, 21, 63'
            ],
            correctIndex: 0,
            explanation: 'Factor pairs of 63: 1x63=63, 3x21=63, 7x9=63. All factors: 1, 3, 7, 9, 21, 63.',
            explanationEs: 'Pares de factores: 1x63, 3x21, 7x9. Factores ordenados: 1, 3, 7, 9, 21, 63.'
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
    grade: 'Cuarto de Primaria',
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
          }
        ],
        quiz: [
          {
            id: 'q-soc-1',
            question: '¿Con cuál de sus países vecinos tiene Colombia su frontera terrestre MÁS LARGA (2.219 km)?',
            questionEn: 'With which neighboring country does Colombia share its LONGEST land border (2,219 km)?',
            options: ['Ecuador', 'Panamá', 'Venezuela (2.219 km)', 'Brasil'],
            optionsEs: ['Ecuador', 'Panama', 'Venezuela (2,219 km)', 'Brazil'],
            correctIndex: 2,
            explanation: 'La frontera con Venezuela es la más extensa con 2.219 km de longitud.',
            explanationEn: 'The border with Venezuela is the longest with 2,219 km.'
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
        summary: 'Características de la poesía lírica (versos, estrofas, rimas consonantes y asonantes, odas y elegías) y estructuras oracionales.',
        summaryEn: 'Features of lyric poetry (verses, stanzas, consonant/assonant rhymes, odes and elegies) and sentence structures.',
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
          }
        ],
        quiz: [
          {
            id: 'q-len-1',
            question: 'En los versos: "El viento soplaba en la colina / y la luna brillante se ilumina", ¿qué tipo de rima se presenta entre "colina" e "ilumina"?',
            questionEn: 'In "colina" and "ilumina", what type of rhyme is present?',
            options: ['Rima Asonante', 'Rima Consonante (Perfecta)', 'Rima Libre', 'Sin rima'],
            optionsEs: ['Assonant Rhyme', 'Consonant (Perfect) Rhyme', 'Free Verse', 'No rhyme'],
            correctIndex: 1,
            explanation: 'Coinciden todas las vocales y consonantes a partir de la vocal acentuada (-ina / -ina), por lo que es rima consonante.',
            explanationEn: 'All vowels and consonants match from the stressed vowel (-ina / -ina).'
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
    grade: 'Cuarto de Primaria',
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
        summary: 'Comprender y usar comandos de clase, vocabulario de lugares y personal del colegio, y estructuras modales para expresar habilidades/permisos y obligaciones.',
        summaryEn: 'Perform and respond to basic classroom commands, school places, school staff, expressing abilities/permission (can/can\'t), and obligations (have to / has to).',
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
          }
        ],
        quiz: [
          {
            id: 'q-eng-1',
            question: 'What is the polite classroom command for asking permission before speaking in class?',
            questionEs: '¿Cuál es el comando escolar para pedir la palabra antes de hablar en clase?',
            options: ['Sit down', 'Raise your hand before speaking', 'Close your book', 'Run in the hallway'],
            optionsEs: ['Siéntate', 'Levanta la mano antes de hablar', 'Cierra tu libro', 'Corre en el pasillo'],
            correctIndex: 1,
            explanation: '"Raise your hand" is the rule for asking permission respectfully before speaking.',
            explanationEs: '"Raise your hand" es la norma para pedir la palabra respetuosamente.'
          }
        ]
      }
    ]
  },
  {
    id: 'pli-camelot',
    name: 'Plan Lector Inglés (PLI) - Tales of Camelot',
    nameEn: 'English Reading Plan (PLI) - Tales of Camelot',
    icon: 'Crown',
    color: '#3b82f6',
    bgColor: '#eff6ff',
    bookName: 'Tales of Camelot (Richmond Platform - 8 Chapters)',
    teacher: 'Angela Rodríguez',
    grade: 'Cuarto de Primaria',
    gradeEn: 'Grade 4 (Primary)',
    units: [
      {
        id: 'pli-bloque-a',
        logroNumber: 1,
        title: 'Cuentos de Camelot (El Rey Arturo y los Caballeros de la Mesa Redonda)',
        titleEn: 'Tales of Camelot (King Arthur & The Knights of the Round Table)',
        evaluationWeek: 5,
        evaluationDate: 'Semana 4 (Assessment 1), Semana 6 (Assessment 2)',
        evaluationDateEn: 'Week 4 (Assessment 1), Week 6 (Assessment 2)',
        weeks: ['Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'],
        summary: 'Comprensión lectora de leyendas medievales: el Rey Arturo, Merlín el mago, la espada Excalibur, los Caballeros de la Mesa Redonda y los votos de honor, lealtad y justicia.',
        summaryEn: 'Reading comprehension of medieval legends: King Arthur, Merlin the wizard, Excalibur, the Knights of the Round Table, and values of honor, courage, and loyalty.',
        topics: [
          {
            id: 'pli-t3',
            title: '3. 🚨 Capítulos 3 y 4: Los Caballeros y la Mesa Redonda (Semana 5)',
            titleEn: '3. 🚨 Chapters 3 & 4: The Knights & The Round Table (Week 5)',
            badge: 'Semana 5',
            badgeEn: 'Week 5',
            bookPages: 'Tales of Camelot Chapters 3 & 4',
            bilingualBlocks: [
              {
                en: 'Chapters 3 & 4 Summary (Current Week Reading):\nKing Arthur builds the glorious kingdom of Camelot. Together with Queen Guinevere and the counsel of Merlin, they establish the Round Table.\nBrave knights such as Sir Lancelot and Sir Gawain join the fellowship. They swear a sacred oath:\n1. Never to do murder or treason.\n2. Always to give mercy to those who ask.\n3. To protect the weak and uphold justice.',
                es: 'Resumen Capítulos 3 y 4 (Lectura de la Semana Actual):\nEl Rey Arturo construye el glorioso reino de Camelot. Junto a la Reina Ginebra y el sabio consejo de Merlín, establecen la Mesa Redonda.\nValientes caballeros como Sir Lancelot y Sir Gawain se unen a la hermandad. Hacen un juramento sagrado:\n1. Nunca cometer traición ni maldad.\n2. Siempre otorgar misericordia a quien la pida.\n3. Proteger a los indefensos y defender la justicia.'
              }
            ],
            flashcards: [
              { q: 'Why is the table of the knights ROUND?', qEs: '¿Por qué la mesa de los caballeros es REDONDA?', a: 'Because all knights are equal with honor (Porque todos los caballeros son iguales en honor).' }
            ]
          }
        ],
        quiz: [
          {
            id: 'q-pli-1',
            question: 'What is the main value represented by the ROUND TABLE in Camelot?',
            questionEs: '¿Cuál es el valor principal que representa la MESA REDONDA en Camelot?',
            options: [
              'Equality, justice, and brotherhood among all knights.',
              'That only the king has power.',
              'That magic is forbidden.',
              'That only rich people can enter.'
            ],
            optionsEs: [
              'Igualdad, justicia y hermandad entre todos los caballeros.',
              'Que solo el rey tiene poder.',
              'Que la magia está prohibida.',
              'Que solo los ricos pueden entrar.'
            ],
            correctIndex: 0,
            explanation: 'The round table symbolizes that every knight sits as an equal in honor and justice.',
            explanationEs: 'La mesa redonda simboliza que todos los caballeros son iguales en honor y justicia.'
          }
        ]
      }
    ]
  },
  {
    id: 'ajedrez',
    name: 'Ajedrez',
    nameEn: 'Chess in the Classroom',
    icon: 'Crown',
    color: '#64748b',
    bgColor: '#f8fafc',
    bookName: 'Ajedrez en el Aula Nivel 6 (Tekman)',
    teacher: 'Ajedrez 4to',
    grade: 'Cuarto de Primaria',
    gradeEn: 'Grade 4 (Primary)',
    units: [
      {
        id: 'aj-logro-01',
        logroNumber: 1,
        title: 'Logro 01: Aperturas Clásicas y Tácticas de Ataque Doble',
        titleEn: 'Logro 01: Classical Openings & Double Attack Tactics',
        evaluationWeek: 5,
        evaluationDate: '31 de agosto al 6 de septiembre',
        evaluationDateEn: 'August 31 to September 6',
        weeks: ['Semana 2', 'Semana 3', 'Semana 4'],
        summary: 'Principios de apertura, control del centro, enroque rápido y táctica del ataque doble (la horquilla del caballo).',
        summaryEn: 'Opening principles, center control, quick castling, and the double attack tactic (knight fork).',
        topics: [
          {
            id: 'aj-l1-t1',
            title: '1. Los 3 Mandamientos de la Apertura',
            titleEn: '1. The 3 Commandments of the Opening',
            badge: 'Semana 2-4',
            badgeEn: 'Weeks 2-4',
            bookPages: 'Tekman Nivel 6',
            bilingualBlocks: [
              {
                es: '1. Dominar el centro (d4, d5, e4, e5).\n2. Desarrollar piezas menores (caballos y alfiles).\n3. Seguridad del Rey (Enroque rápido).',
                en: '1. Control the center (d4, d5, e4, e5).\n2. Develop minor pieces (knights and bishops).\n3. King safety (Quick castling).'
              }
            ],
            flashcards: [
              { q: '¿Cuáles son las 4 casillas centrales del tablero?', qEn: 'What are the 4 central squares of the board?', a: 'd4, d5, e4 y e5.' }
            ]
          }
        ],
        quiz: [
          {
            id: 'q-aj-1',
            question: '¿Cuál es el objetivo principal del Enroque en la apertura?',
            questionEs: 'What is the main purpose of Castling in the opening?',
            options: [
              'Poner al Rey en un lugar seguro y activar la Torre.',
              'Comerse a la dama contraria.',
              'Coronar un peón.',
              'Mover el caballo dos veces.'
            ],
            optionsEs: [
              'Protect the King and activate the Rook.',
              'Capture the enemy queen.',
              'Promote a pawn.',
              'Move the knight twice.'
            ],
            correctIndex: 0,
            explanation: 'El enroque protege al rey en la esquina y pone en juego la torre.',
            explanationEs: 'Castling protects the king in the corner and activates the rook.'
          }
        ]
      }
    ]
  }
];
