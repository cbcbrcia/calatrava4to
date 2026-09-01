import React, { useState } from 'react';
import {
  Calculator,
  Download,
  Printer,
  Play,
  CheckCircle2,
  HelpCircle,
  Video,
  FileText,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { sounds } from '../utils/audioEffects';
import { DualText } from './BilingualText';

// Ejercicios oficiales extraídos directamente del Review G1 401_402.pdf
export const OFFICIAL_REVIEW_EXERCISES = [
  {
    id: 'rev-1a',
    section: '1. Write the numerals.',
    title: '1.a) twenty-three thousand, seven hundred and four',
    titleEs: 'Veintitrés mil setecientos cuatro',
    correctAnswer: '23 704',
    acceptableAnswers: ['23704', '23.704', '23 704'],
    justification: 'Twenty-three thousand = 23.000; seven hundred = 700; four = 4. Sumando los valores: 23.000 + 700 + 4 = 23.704 (No tiene decenas, se coloca un 0).',
    justificationEn: 'Twenty-three thousand = 23,000; seven hundred = 700; four = 4. Adding place values: 23,000 + 700 + 4 = 23,704 (0 in the tens place).'
  },
  {
    id: 'rev-1b',
    section: '1. Write the numerals.',
    title: '1.b) five hundred and forty-three thousand, three hundred and nineteen',
    titleEs: 'Quinientos cuarenta y tres mil trescientos diecinueve',
    correctAnswer: '543 319',
    acceptableAnswers: ['543319', '543.319', '543 319'],
    justification: 'Five hundred and forty-three thousand = 543.000; three hundred and nineteen = 319. Cifra completa: 543.319.',
    justificationEn: 'Five hundred and forty-three thousand = 543,000; three hundred and nineteen = 319. Total numeral: 543,319.'
  },
  {
    id: 'rev-2a',
    section: '2. Write the numbers in words.',
    title: '2.a) 50 901 in words',
    titleEs: '50 901 en palabras en inglés',
    correctAnswer: 'fifty thousand, nine hundred and one',
    acceptableAnswers: ['fifty thousand, nine hundred and one', 'fifty thousand nine hundred and one', 'fifty thousand nine hundred one'],
    justification: 'El 50 en los miles se escribe "fifty thousand". El 900 se escribe "nine hundred" y el 1 "and one". ➡️ fifty thousand, nine hundred and one.',
    justificationEn: '50 in thousands period = "fifty thousand". 900 = "nine hundred", and 1 = "and one". ➡️ fifty thousand, nine hundred and one.'
  },
  {
    id: 'rev-2b',
    section: '2. Write the numbers in words.',
    title: '2.b) 659 547 in words',
    titleEs: '659 547 en palabras en inglés',
    correctAnswer: 'six hundred and fifty-nine thousand, five hundred and forty-seven',
    acceptableAnswers: [
      'six hundred and fifty-nine thousand, five hundred and forty-seven',
      'six hundred fifty-nine thousand five hundred forty-seven',
      'six hundred and fifty nine thousand, five hundred and forty seven'
    ],
    justification: '659 en el período de los miles se lee "six hundred and fifty-nine thousand", y 547 en las unidades se lee "five hundred and forty-seven".',
    justificationEn: '659 in thousands period is read "six hundred and fifty-nine thousand", and 547 is read "five hundred and forty-seven".'
  },
  {
    id: 'rev-3a',
    section: '3. Write the missing numbers or words (Place Value).',
    title: '3.a) In 423 546, the digit 2 is in the ______ place.',
    titleEs: 'En 423 546, el dígito 2 está en la posición de las ______.',
    correctAnswer: 'ten thousands',
    acceptableAnswers: ['ten thousands', 'ten thousand', 'decenas de mil'],
    justification: 'En la tabla posicional (U, D, C, UM, DM, CM), el 2 ocupa la quinta columna de derecha a izquierda: Decenas de Mil (Ten thousands).',
    justificationEn: 'Counting from right to left (ones, tens, hundreds, thousands, ten thousands), digit 2 is in the Ten Thousands place.'
  },
  {
    id: 'rev-3b',
    section: '3. Write the missing numbers or words.',
    title: '3.b) In 634 543, the digit 6 is in the ______ place and its value is ______.',
    titleEs: 'En 634 543, el 6 está en la posición de ______ y su valor es ______.',
    correctAnswer: 'hundred thousands, 600 000',
    acceptableAnswers: ['hundred thousands', 'hundred thousands, 600000', 'hundred thousands, 600 000'],
    justification: 'El 6 está en las Centenas de Mil (Hundred Thousands) y su valor equivale a 6 x 100.000 = 600.000.',
    justificationEn: 'Digit 6 is in the Hundred Thousands place. Value = 6 x 100,000 = 600,000.'
  },
  {
    id: 'rev-3c',
    section: '3. Write the missing numbers or words.',
    title: '3.c) In 547 893, the digit ______ is in the thousands place and its value is ______.',
    titleEs: 'En 547 893, el dígito ______ está en los miles y su valor es ______.',
    correctAnswer: '7, 7 000',
    acceptableAnswers: ['7', '7, 7000', '7, 7 000'],
    justification: 'El dígito en la posición de las unidades de mil (Thousands) es el 7, y su valor posicional es 7 x 1.000 = 7.000.',
    justificationEn: 'Digit 7 is in the thousands place, and its place value is 7 x 1,000 = 7,000.'
  },
  {
    id: 'rev-4a',
    section: '4. Write > or < (Comparing).',
    title: '4.a) 455 678 [  ] 94 675',
    titleEs: '455 678 es mayor o menor que 94 675',
    correctAnswer: '>',
    acceptableAnswers: ['>', 'mayor'],
    justification: '455.678 tiene 6 dígitos (Centena de mil) mientras que 94.675 solo tiene 5 dígitos (Decena de mil). Por tanto: 455.678 > 94.675.',
    justificationEn: '455,678 has 6 digits (hundred thousands) while 94,675 has only 5 digits. Therefore: 455,678 > 94,675.'
  },
  {
    id: 'rev-6a',
    section: '6. Arrange the numbers in order. Begin with the greatest.',
    title: '6.a) Order from greatest to least: 94 797,  944 700,  904 779',
    titleEs: 'Ordenar de mayor a menor: 94 797, 944 700, 904 779',
    correctAnswer: '944 700, 904 779, 94 797',
    acceptableAnswers: ['944 700, 904 779, 94 797', '944700, 904779, 94797'],
    justification: 'Comparamos las centenas de mil: 944.700 > 904.779. El menor es 94.797 porque solo tiene 5 cifras. Orden: 944.700 > 904.779 > 94.797.',
    justificationEn: '944,700 and 904,779 have 6 digits (944 > 904). 94,797 has only 5 digits. Order: 944,700, 904,779, 94,797.'
  },
  {
    id: 'rev-7c',
    section: '7. Round each amount to the nearest hundred dollars.',
    title: '7.c) Round $56 506 to the nearest hundred dollars',
    titleEs: 'Redondear $56 506 a la centena de dólares más cercana',
    correctAnswer: '$56 500',
    acceptableAnswers: ['$56 500', '$56500', '56500', '56 500'],
    justification: 'En las centenas está el 5 (500). El dígito a su derecha (decenas) es 0 (< 5), por lo que el 5 se queda igual: $56.500.',
    justificationEn: 'In hundreds place is 5. The digit to the right (tens) is 0 (< 5), so it rounds down to $56,500.'
  },
  {
    id: 'rev-7d',
    section: '7. Round each amount to the nearest hundred dollars.',
    title: '7.d) Round $37 091 to the nearest hundred dollars',
    titleEs: 'Redondear $37 091 a la centena de dólares más cercana',
    correctAnswer: '$37 100',
    acceptableAnswers: ['$37 100', '$37100', '37100', '37 100'],
    justification: 'En las centenas está el 0. El dígito a su derecha (decenas) es 9 (≥ 5), por lo que sumamos 1 al 0: $37.100.',
    justificationEn: 'In hundreds place is 0. The digit to the right (tens) is 9 (>= 5), so we add 1 to the hundreds digit: $37,100.'
  },
  {
    id: 'rev-8c',
    section: '8. Round each amount to the nearest thousand dollars.',
    title: '8.c) Round $73 231 to the nearest thousand dollars',
    titleEs: 'Redondear $73 231 a los mil dólares más cercanos',
    correctAnswer: '$73 000',
    acceptableAnswers: ['$73 000', '$73000', '73000', '73 000'],
    justification: 'En las unidades de mil está el 3. El dígito a la derecha (centenas) es 2 (< 5), por lo que el 3 queda igual: $73.000.',
    justificationEn: 'In thousands place is 3. The digit to the right (hundreds) is 2 (< 5), so it rounds down to $73,000.'
  },
  {
    id: 'rev-8d',
    section: '8. Round each amount to the nearest thousand dollars.',
    title: '8.d) Round $96 602 to the nearest thousand dollars',
    titleEs: 'Redondear $96 602 a los mil dólares más cercanos',
    correctAnswer: '$97 000',
    acceptableAnswers: ['$97 000', '$97000', '97000', '97 000'],
    justification: 'En las unidades de mil está el 6. El dígito a la derecha (centenas) es 6 (≥ 5), por lo que sumamos 1 al 6: $97.000.',
    justificationEn: 'In thousands place is 6. The digit to the right (hundreds) is 6 (>= 5), so we round up to $97,000.'
  },
  {
    id: 'rev-9c',
    section: '9. Add. Then, complete each rule (Odd & Even).',
    title: '9.c) 142 + 324 = ______  ➡️  ______ number + even number = ______ number',
    titleEs: '142 + 324 y completar regla de pares',
    correctAnswer: '466, even, even',
    acceptableAnswers: ['466, even, even', '466'],
    justification: '142 (par) + 324 (par) = 466 (par). Regla fundamental: even + even = even (par + par = par).',
    justificationEn: '142 (even) + 324 (even) = 466 (even). Core rule: even + even = even.'
  },
  {
    id: 'rev-9d',
    section: '9. Add. Then, complete each rule (Odd & Even).',
    title: '9.d) 537 + 63 = ______  ➡️  ______ number + odd number = ______ number',
    titleEs: '537 + 63 y completar regla de impares',
    correctAnswer: '600, odd, even',
    acceptableAnswers: ['600, odd, even', '600'],
    justification: '537 (impar) + 63 (impar) = 600 (par). Regla: odd + odd = even (impar + impar = par).',
    justificationEn: '537 (odd) + 63 (odd) = 600 (even). Core rule: odd + odd = even.'
  },
  {
    id: 'rev-11b',
    section: '11. Multiplying odd and even numbers.',
    title: '11.b) 3 x 7 = 21  ➡️  odd number x ______ number = ______ number',
    titleEs: '3 x 7 = 21 y regla de multiplicación',
    correctAnswer: 'odd, odd',
    acceptableAnswers: ['odd, odd', 'odd x odd = odd'],
    justification: '3 (impar) x 7 (impar) = 21 (impar). Regla: odd number x odd number = odd number (impar x impar = impar).',
    justificationEn: '3 (odd) x 7 (odd) = 21 (odd). Rule: odd x odd = odd.'
  },
  {
    id: 'rev-11c',
    section: '11. Multiplying odd and even numbers.',
    title: '11.c) 33 x 2 = 66  ➡️  Is the product odd or even?',
    titleEs: '33 x 2 = 66  ➡️  ¿El producto es par o impar?',
    correctAnswer: 'even',
    acceptableAnswers: ['even', 'par'],
    justification: '33 (impar) x 2 (par) = 66 (termina en 6, por lo que es PAR / even). Regla: odd x even = even.',
    justificationEn: '33 (odd) x 2 (even) = 66 (ends in 6, so it is EVEN). Rule: odd x even = even.'
  },
  {
    id: 'rev-12a',
    section: '12. Find the factors of a number.',
    title: '12.a) Find the factors of 20',
    titleEs: 'Encuentra todos los factores / divisores de 20',
    correctAnswer: '1, 2, 4, 5, 10, 20',
    acceptableAnswers: ['1, 2, 4, 5, 10, 20', '1,2,4,5,10,20'],
    justification: 'Pares de factores de 20: 1x20 = 20; 2x10 = 20; 4x5 = 20. Factores ordenados: 1, 2, 4, 5, 10, 20.',
    justificationEn: 'Factor pairs: 1x20=20, 2x10=20, 4x5=20. Factors in order: 1, 2, 4, 5, 10, 20.'
  },
  {
    id: 'rev-12b',
    section: '12. Find the factors of a number.',
    title: '12.b) Find the factors of 63',
    titleEs: 'Encuentra todos los factores / divisores de 63',
    correctAnswer: '1, 3, 7, 9, 21, 63',
    acceptableAnswers: ['1, 3, 7, 9, 21, 63', '1,3,7,9,21,63'],
    justification: 'Pares de factores de 63: 1x63 = 63; 3x21 = 63; 7x9 = 63. Factores ordenados: 1, 3, 7, 9, 21, 63.',
    justificationEn: 'Factor pairs: 1x63=63, 3x21=63, 7x9=63. Factors in order: 1, 3, 7, 9, 21, 63.'
  },
  {
    id: 'rev-12c',
    section: '12. Find the factors of a number.',
    title: '12.c) Find the factors of 45',
    titleEs: 'Encuentra todos los factores / divisores de 45',
    correctAnswer: '1, 3, 5, 9, 15, 45',
    acceptableAnswers: ['1, 3, 5, 9, 15, 45', '1,3,5,9,15,45'],
    justification: 'Pares de factores de 45: 1x45 = 45; 3x15 = 45; 5x9 = 45. Factores ordenados: 1, 3, 5, 9, 15, 45.',
    justificationEn: 'Factor pairs: 1x45=45, 3x15=45, 5x9=45. Factors in order: 1, 3, 5, 9, 15, 45.'
  }
];

export function MathReviewTools({ onOpenQuiz }) {
  const [activeToolTab, setActiveToolTab] = useState('review'); // 'review', 'placeValueBoard', 'videos'
  const [inputNumber, setInputNumber] = useState('634543');
  const [userAnswers, setUserAnswers] = useState({});
  const [revealedJustifications, setRevealedJustifications] = useState({});

  // Calcular desglose de valor posicional
  const cleanNumStr = inputNumber.replace(/\D/g, '').slice(0, 7);
  const paddedStr = cleanNumStr.padStart(7, ' ');
  const digits = paddedStr.split('');

  const COLUMNS = [
    { label: 'One Million', labelEs: 'Unidades de Millón', icon: '🏆', color: '#9333ea', bg: '#f3e8ff', value: 1000000 },
    { label: 'One Hundred Thousands', labelEs: 'Centenas de Mil', icon: '👟', color: '#0284c7', bg: '#e0f2fe', value: 100000 },
    { label: 'Ten Thousands', labelEs: 'Decenas de Mil', icon: '👫', color: '#ca8a04', bg: '#fef08a', value: 10000 },
    { label: 'Thousands', labelEs: 'Unidades de Mil', icon: '⛰️', color: '#16a34a', bg: '#dcfce7', value: 1000 },
    { label: 'Hundreds', labelEs: 'Centenas', icon: '🎯', color: '#10b981', bg: '#ecfdf5', value: 100 },
    { label: 'Tens', labelEs: 'Decenas', icon: '🎈', color: '#2563eb', bg: '#dbeafe', value: 10 },
    { label: 'Ones', labelEs: 'Unidades', icon: '🎈', color: '#db2777', bg: '#fce7f3', value: 1 }
  ];

  const toggleJustification = (id) => {
    sounds.playClick();
    setRevealedJustifications(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ marginTop: '24px' }}>
      
      {/* Selector de Herramientas de Matemáticas */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '2px solid var(--border-color)',
        paddingBottom: '4px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => { sounds.playClick(); setActiveToolTab('review'); }}
          style={{
            padding: '10px 20px',
            fontWeight: 800,
            fontSize: '0.95rem',
            borderRadius: 'var(--radius-md)',
            background: activeToolTab === 'review' ? '#4f46e5' : '#ffffff',
            color: activeToolTab === 'review' ? '#ffffff' : 'var(--text-secondary)',
            border: activeToolTab === 'review' ? 'none' : '1px solid var(--border-color)',
            boxShadow: activeToolTab === 'review' ? 'var(--shadow-md)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FileText size={18} />
          <DualText
            es="📝 Review Oficial del Examen (+5 pts)"
            en="Official Review (+5 pts)"
            secondaryStyle={{ color: activeToolTab === 'review' ? '#e0e7ff' : '#2563eb' }}
            inline
          />
        </button>

        <button
          onClick={() => { sounds.playClick(); setActiveToolTab('placeValueBoard'); }}
          style={{
            padding: '10px 20px',
            fontWeight: 800,
            fontSize: '0.95rem',
            borderRadius: 'var(--radius-md)',
            background: activeToolTab === 'placeValueBoard' ? '#0284c7' : '#ffffff',
            color: activeToolTab === 'placeValueBoard' ? '#ffffff' : 'var(--text-secondary)',
            border: activeToolTab === 'placeValueBoard' ? 'none' : '1px solid var(--border-color)',
            boxShadow: activeToolTab === 'placeValueBoard' ? 'var(--shadow-md)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Calculator size={18} />
          <DualText
            es="🎨 Tablero de Valor Posicional"
            en="Place Value Chart"
            secondaryStyle={{ color: activeToolTab === 'placeValueBoard' ? '#e0f2fe' : '#2563eb' }}
            inline
          />
        </button>

        <button
          onClick={() => { sounds.playClick(); setActiveToolTab('videos'); }}
          style={{
            padding: '10px 20px',
            fontWeight: 800,
            fontSize: '0.95rem',
            borderRadius: 'var(--radius-md)',
            background: activeToolTab === 'videos' ? '#dc2626' : '#ffffff',
            color: activeToolTab === 'videos' ? '#ffffff' : 'var(--text-secondary)',
            border: activeToolTab === 'videos' ? 'none' : '1px solid var(--border-color)',
            boxShadow: activeToolTab === 'videos' ? 'var(--shadow-md)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Video size={18} />
          <DualText
            es="📺 Videos Tutoriales de Apoyo"
            en="Teacher Video Tutorials"
            secondaryStyle={{ color: activeToolTab === 'videos' ? '#fee2e2' : '#2563eb' }}
            inline
          />
        </button>
      </div>

      {/* PESTAÑA 1: REVIEW OFICIAL DEL EXAMEN (12 PUNTOS CON JUSTIFICACIÓN) */}
      {activeToolTab === 'review' && (
        <div className="animate-fade-in">
          {/* Banner de Orientaciones del Profesor */}
          <div style={{
            background: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 100%)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px 28px',
            color: '#ffffff',
            marginBottom: '24px',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span className="badge" style={{ background: '#f59e0b', color: '#000', fontWeight: 800 }}>
                    ⭐ +5 PUNTOS ADICIONALES
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Docente: Lennin David López Castañeda</span>
                </div>
                <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '8px' }}>
                  Guía Oficial del Review de Matemáticas (Logro 01)
                </h3>
                <p style={{ color: '#e2e8f0', fontSize: '0.92rem', lineHeight: 1.55, maxWidth: '720px' }}>
                  El examen evaluará exactamente los contenidos desarrollados en esta guía. Recuerda que para la <strong>Carpeta de Trabajo</strong> es fundamental explicar la <strong>justificación o razonamiento</strong> de por qué cada respuesta es correcta.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a
                  href="/review_matematicas_401_402.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ background: '#ffffff', color: '#1e1b4b', fontWeight: 800, fontSize: '0.88rem' }}
                >
                  <Download size={16} />
                  Descargar PDF Oficial
                </a>
              </div>
            </div>
          </div>

          {/* Lista de Ejercicios del Review */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {OFFICIAL_REVIEW_EXERCISES.map((ex, idx) => {
              const isRevealed = revealedJustifications[ex.id];

              return (
                <div
                  key={ex.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--border-color)',
                    padding: '20px 24px',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                    <span className="badge" style={{ background: '#eff6ff', color: '#1e40af', fontSize: '0.75rem' }}>
                      {ex.section}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                      Ejercicio #{idx + 1} de {OFFICIAL_REVIEW_EXERCISES.length}
                    </span>
                  </div>

                  {/* Enunciado del Ejercicio */}
                  <h4 style={{ fontSize: '1.08rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {ex.title}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: '#2563eb', fontStyle: 'italic', marginBottom: '14px' }}>
                    🌐 {ex.titleEs}
                  </p>

                  {/* Cuadro de Respuesta Oficial */}
                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginBottom: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                        ✅ Respuesta Oficial:
                      </span>
                      <span style={{
                        background: '#ecfdf5',
                        color: '#065f46',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 800,
                        fontSize: '1rem',
                        border: '1px solid #a7f3d0'
                      }}>
                        {ex.correctAnswer}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleJustification(ex.id)}
                      className="btn btn-secondary"
                      style={{ fontSize: '0.82rem', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <HelpCircle size={14} color="#4f46e5" />
                      <span>{isRevealed ? 'Ocultar Justificación' : 'Ver Justificación para Carpeta'}</span>
                      {isRevealed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>

                  {/* Justificación para la Carpeta de Trabajo */}
                  {isRevealed && (
                    <div className="animate-fade-in" style={{
                      background: '#f5f3ff',
                      border: '1.5px dashed #c4b5fd',
                      borderRadius: 'var(--radius-sm)',
                      padding: '14px 18px',
                      color: '#4c1d95'
                    }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#6d28d9', marginBottom: '4px' }}>
                        📁 Justificación y Razonamiento (Para la Carpeta de Trabajo):
                      </div>
                      <p style={{ fontSize: '0.92rem', lineHeight: 1.55, marginBottom: '6px' }}>
                        {ex.justification}
                      </p>
                      <p style={{ fontSize: '0.85rem', color: '#2563eb', fontStyle: 'italic' }}>
                        🌐 {ex.justificationEn}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PESTAÑA 2: TABLERO DE VALOR POSICIONAL INTERACTIVO */}
      {activeToolTab === 'placeValueBoard' && (
        <div className="animate-fade-in">
          {/* Banner Explicativo */}
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            padding: '24px 28px',
            marginBottom: '24px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '6px' }}>
                Tablero de Valor Posicional (Place Value Chart)
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                Herramienta oficial recomendada para imprimir en hoja tamaño carta y usar con marcador borrable en forro de acetato.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href="/tablero_valor_posicional_401_402.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ background: '#0284c7', fontSize: '0.88rem' }}
              >
                <Download size={16} />
                Descargar Tablero PDF
              </a>
            </div>
          </div>

          {/* Probador Interactivo del Tablero */}
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid #cbd5e1',
            padding: '28px',
            marginBottom: '24px',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
                🔢 Ingresa cualquier número de hasta 7 cifras para ubicarlo en el tablero:
              </label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="text"
                  value={inputNumber}
                  onChange={e => setInputNumber(e.target.value)}
                  placeholder="Ej: 634543, 906428, 50901..."
                  style={{
                    padding: '12px 18px',
                    borderRadius: 'var(--radius-md)',
                    border: '2px solid #0284c7',
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    maxWidth: '300px',
                    letterSpacing: '2px'
                  }}
                />
                <button
                  onClick={() => setInputNumber(String(Math.floor(10000 + Math.random() * 990000)))}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.88rem' }}
                >
                  <Sparkles size={16} color="#0284c7" />
                  Número Aleatorio
                </button>
              </div>
            </div>

            {/* TABLA VISUAL DE LAS 7 COLUMNAS */}
            <div style={{ overflowX: 'auto', paddingBottom: '10px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', minWidth: '650px' }}>
                <thead>
                  <tr>
                    {COLUMNS.map((col, idx) => (
                      <th
                        key={idx}
                        style={{
                          background: col.bg,
                          color: col.color,
                          border: `2px solid ${col.color}40`,
                          padding: '14px 8px',
                          borderTopLeftRadius: idx === 0 ? '12px' : '0',
                          borderTopRightRadius: idx === 6 ? '12px' : '0'
                        }}
                      >
                        <div style={{ fontSize: '1.6rem', marginBottom: '2px' }}>{col.icon}</div>
                        <div style={{ fontSize: '0.78rem', fontWeight: 800, lineHeight: 1.2 }}>{col.label}</div>
                        <div style={{ fontSize: '0.68rem', opacity: 0.8, fontStyle: 'italic' }}>({col.labelEs})</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {digits.map((d, dIdx) => (
                      <td
                        key={dIdx}
                        style={{
                          border: '2px solid #e2e8f0',
                          padding: '24px 8px',
                          fontSize: '2rem',
                          fontWeight: 900,
                          color: d.trim() ? '#0f172a' : '#cbd5e1',
                          background: d.trim() ? '#ffffff' : '#f8fafc',
                          borderBottomLeftRadius: dIdx === 0 ? '12px' : '0',
                          borderBottomRightRadius: dIdx === 6 ? '12px' : '0'
                        }}
                      >
                        {d.trim() || '—'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Desglose en Forma Expandida */}
            {cleanNumStr && (
              <div style={{ marginTop: '20px', background: '#f8fafc', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', marginBottom: '6px' }}>
                  Forma Expandida (Expanded Form):
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0284c7' }}>
                  {digits
                    .map((d, i) => {
                      if (!d.trim() || d === '0') return null;
                      return `${Number(d) * COLUMNS[i].value}`;
                    })
                    .filter(Boolean)
                    .join(' + ') || cleanNumStr}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PESTAÑA 3: VIDEOS TUTORIALES DE APOYO RECOMENDADOS */}
      {activeToolTab === 'videos' && (
        <div className="animate-fade-in">
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
              Videos de Apoyo del Docente
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Recursos audiovisuales seleccionados por el profesor para reforzar cada tema antes del examen:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
            
            {/* Video 1 */}
            <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ background: '#dc2626', color: '#fff', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                <Video size={18} />
                <span>1. Reading & Writing / Place Value</span>
              </div>
              <div style={{ padding: '18px' }}>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
                  Aprende a leer y escribir números grandes de hasta 6 y 7 cifras, identificando el valor exacto de cada dígito.
                </p>
                <a
                  href="https://www.youtube.com/watch?v=QVjtu6WwiXQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ background: '#dc2626', width: '100%', fontSize: '0.88rem' }}
                >
                  <ExternalLink size={16} />
                  Ver Video en YouTube
                </a>
              </div>
            </div>

            {/* Video 2 */}
            <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ background: '#0284c7', color: '#fff', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                <Video size={18} />
                <span>2. Comparing & Ordering Numbers</span>
              </div>
              <div style={{ padding: '18px' }}>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
                  Técnicas para comparar números utilizando los símbolos mayor que (&gt;) y menor que (&lt;) y ordenar de mayor a menor.
                </p>
                <a
                  href="https://www.youtube.com/watch?v=11c2XM-48zw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ background: '#0284c7', width: '100%', fontSize: '0.88rem' }}
                >
                  <ExternalLink size={16} />
                  Ver Video en YouTube
                </a>
              </div>
            </div>

            {/* Video 3 */}
            <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ background: '#16a34a', color: '#fff', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                <Video size={18} />
                <span>3. Rounding Numbers (Redondeo)</span>
              </div>
              <div style={{ padding: '18px' }}>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
                  Reglas de redondeo a la decena, centena y unidad de mil más cercana paso a paso.
                </p>
                <a
                  href="https://www.youtube.com/watch?v=10LqX1e6Rpc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ background: '#16a34a', width: '100%', fontSize: '0.88rem' }}
                >
                  <ExternalLink size={16} />
                  Ver Video en YouTube
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
