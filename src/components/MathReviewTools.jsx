import React, { useState } from 'react';
import {
  Calculator,
  Download,
  Printer,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Video,
  FileText,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Edit3,
  RotateCcw
} from 'lucide-react';
import { sounds } from '../utils/audioEffects';
import { DualText } from './BilingualText';

// Ejercicios oficiales para que el estudiante resuelva y practique (sin respuestas dadas de antemano)
export const OFFICIAL_REVIEW_EXERCISES = [
  {
    id: 'rev-1a',
    section: '1. Write the numerals.',
    title: '1.a) twenty-three thousand, seven hundred and four',
    titleEs: 'Escribe en cifras el número: veintitrés mil setecientos cuatro',
    placeholder: 'Ej: 23 704 o 23704...',
    acceptableAnswers: ['23704', '23.704', '23 704'],
    hint: 'Recuerda que si no hay decenas, se coloca un 0 en esa posición.',
    hintEn: 'Remember that if there are no tens, put a 0 in that place.'
  },
  {
    id: 'rev-1b',
    section: '1. Write the numerals.',
    title: '1.b) five hundred and forty-three thousand, three hundred and nineteen',
    titleEs: 'Escribe en cifras: quinientos cuarenta y tres mil trescientos diecinueve',
    placeholder: 'Ej: 543 319...',
    acceptableAnswers: ['543319', '543.319', '543 319'],
    hint: 'Son 6 dígitos: 543 en el período de los miles y 319 en las unidades.',
    hintEn: 'It has 6 digits: 543 in the thousands period and 319 in units.'
  },
  {
    id: 'rev-2a',
    section: '2. Write the numbers in words.',
    title: '2.a) Write in English words: 50 901',
    titleEs: 'Escribe en palabras en inglés el número: 50 901',
    placeholder: 'Type the number in words in English...',
    acceptableAnswers: [
      'fifty thousand, nine hundred and one',
      'fifty thousand nine hundred and one',
      'fifty thousand nine hundred one',
      'fifty thousand, nine hundred one'
    ],
    hint: '50 se escribe "fifty thousand", 900 se escribe "nine hundred" y 1 "and one".',
    hintEn: '50 is "fifty thousand", 900 is "nine hundred" and 1 is "and one".'
  },
  {
    id: 'rev-2b',
    section: '2. Write the numbers in words.',
    title: '2.b) Write in English words: 659 547',
    titleEs: 'Escribe en palabras en inglés el número: 659 547',
    placeholder: 'Type the number in words in English...',
    acceptableAnswers: [
      'six hundred and fifty-nine thousand, five hundred and forty-seven',
      'six hundred fifty-nine thousand five hundred forty-seven',
      'six hundred and fifty nine thousand, five hundred and forty seven',
      'six hundred and fifty-nine thousand five hundred and forty-seven',
      'six hundred fifty nine thousand five hundred forty seven'
    ],
    hint: 'Divide en dos partes: 659 en los miles (six hundred and fifty-nine thousand) y 547 (five hundred and forty-seven).',
    hintEn: 'Split into thousands (659) and units (547).'
  },
  {
    id: 'rev-3a',
    section: '3. Write the missing numbers or words.',
    title: '3.a) In 423 546, the digit 2 is in the ______ place.',
    titleEs: 'En 423 546, el dígito 2 está en la posición de las ______ (en inglés).',
    placeholder: 'Ej: ten thousands...',
    acceptableAnswers: ['ten thousands', 'ten thousand', 'ten-thousands', 'decenas de mil'],
    hint: 'Cuenta las posiciones de derecha a izquierda: ones, tens, hundreds, thousands, ten thousands...',
    hintEn: 'Count from right to left: ones, tens, hundreds, thousands, ten thousands...'
  },
  {
    id: 'rev-3b',
    section: '3. Write the missing numbers or words.',
    title: '3.b) In 634 543, the digit 6 is in the ______ place and its value is ______.',
    titleEs: 'En 634 543, ¿en qué posición está el 6 y cuál es su valor numérico?',
    placeholder: 'Ej: hundred thousands, 600000',
    acceptableAnswers: [
      'hundred thousands, 600 000',
      'hundred thousands, 600000',
      'hundred thousands, 600.000',
      'hundred thousand, 600000',
      'centenas de mil, 600000'
    ],
    hint: 'El 6 ocupa la sexta posición (Centenas de Mil / Hundred Thousands) y vale 6 x 100.000.',
    hintEn: 'Digit 6 is in the 6th position (Hundred Thousands), value is 6 x 100,000.'
  },
  {
    id: 'rev-3c',
    section: '3. Write the missing numbers or words.',
    title: '3.c) In 547 893, the digit ______ is in the thousands place and its value is ______.',
    titleEs: 'En 547 893, ¿qué dígito está en las unidades de mil y cuál es su valor?',
    placeholder: 'Ej: 7, 7000',
    acceptableAnswers: ['7, 7 000', '7, 7000', '7, 7.000', '7 y 7000'],
    hint: 'Busca el dígito en la cuarta columna de derecha a izquierda y calcula su valor.',
    hintEn: 'Look at the 4th column from right and compute its value.'
  },
  {
    id: 'rev-4a',
    section: '4. Write > or <.',
    title: '4.a) 455 678  [ ? ]  94 675',
    titleEs: '¿Qué símbolo corresponde: > (mayor que) o < (menor que)?',
    placeholder: 'Escribe > o <',
    acceptableAnswers: ['>', 'mayor', '> (mayor)'],
    hint: 'Cuenta la cantidad de cifras de cada número: un número de 6 cifras siempre es mayor que uno de 5 cifras.',
    hintEn: 'A 6-digit number is always greater than a 5-digit number.'
  },
  {
    id: 'rev-6a',
    section: '6. Arrange the numbers in order. Begin with the greatest.',
    title: '6.a) Order from greatest to least: 94 797,  944 700,  904 779',
    titleEs: 'Ordena de mayor a menor: 94 797, 944 700, 904 779',
    placeholder: 'Ej: 944 700, 904 779, 94 797',
    acceptableAnswers: [
      '944 700, 904 779, 94 797',
      '944700, 904779, 94797',
      '944.700, 904.779, 94.797',
      '944 700 > 904 779 > 94 797'
    ],
    hint: 'Compara primero los de 6 cifras (944.700 vs 904.779) y al final el de 5 cifras.',
    hintEn: 'Compare 6-digit numbers first, then the 5-digit number.'
  },
  {
    id: 'rev-7c',
    section: '7. Round each amount to the nearest hundred dollars.',
    title: '7.c) Round $56 506 to the nearest hundred dollars:',
    titleEs: 'Redondea $56 506 a la centena de dólares más cercana:',
    placeholder: 'Ej: $56 500 o 56500',
    acceptableAnswers: ['$56 500', '$56500', '56500', '56 500', '$56.500', '56.500'],
    hint: 'Mira el dígito de las decenas (0). Como es menor que 5, la centena queda igual.',
    hintEn: 'Look at the tens digit (0). Since 0 < 5, keep the hundreds digit.'
  },
  {
    id: 'rev-7d',
    section: '7. Round each amount to the nearest hundred dollars.',
    title: '7.d) Round $37 091 to the nearest hundred dollars:',
    titleEs: 'Redondea $37 091 a la centena de dólares más cercana:',
    placeholder: 'Ej: $37 100 o 37100',
    acceptableAnswers: ['$37 100', '$37100', '37100', '37 100', '$37.100', '37.100'],
    hint: 'Mira el dígito de las decenas (9). Como 9 ≥ 5, suma 1 a las centenas.',
    hintEn: 'Look at tens digit (9). Since 9 >= 5, add 1 to hundreds.'
  },
  {
    id: 'rev-8c',
    section: '8. Round each amount to the nearest thousand dollars.',
    title: '8.c) Round $73 231 to the nearest thousand dollars:',
    titleEs: 'Redondea $73 231 al millar más cercano:',
    placeholder: 'Ej: $73 000 o 73000',
    acceptableAnswers: ['$73 000', '$73000', '73000', '73 000', '$73.000', '73.000'],
    hint: 'Mira el dígito de las centenas (2). Como 2 < 5, los miles quedan igual.',
    hintEn: 'Look at hundreds digit (2). Since 2 < 5, keep the thousands digit.'
  },
  {
    id: 'rev-8d',
    section: '8. Round each amount to the nearest thousand dollars.',
    title: '8.d) Round $96 602 to the nearest thousand dollars:',
    titleEs: 'Redondea $96 602 al millar más cercano:',
    placeholder: 'Ej: $97 000 o 97000',
    acceptableAnswers: ['$97 000', '$97000', '97000', '97 000', '$97.000', '97.000'],
    hint: 'Mira el dígito de las centenas (6). Como 6 ≥ 5, suma 1 a los miles.',
    hintEn: 'Look at hundreds digit (6). Since 6 >= 5, round up.'
  },
  {
    id: 'rev-9c',
    section: '9. Add. Then, complete each rule.',
    title: '9.c) 142 + 324 = ______  ➡️  ______ number + even number = ______ number',
    titleEs: 'Calcula 142 + 324 y completa la regla (even o odd)',
    placeholder: 'Ej: 466, even, even',
    acceptableAnswers: [
      '466, even, even',
      '466, even number, even number',
      '466 (even + even = even)',
      '466, par, par'
    ],
    hint: 'Suma 142 + 324. Como 142 termina en 2 (par) y 324 en 4 (par), su suma también es par (even).',
    hintEn: 'Add 142 + 324. even + even = even.'
  },
  {
    id: 'rev-9d',
    section: '9. Add. Then, complete each rule.',
    title: '9.d) 537 + 63 = ______  ➡️  ______ number + odd number = ______ number',
    titleEs: 'Calcula 537 + 63 y completa la regla (even o odd)',
    placeholder: 'Ej: 600, odd, even',
    acceptableAnswers: [
      '600, odd, even',
      '600, odd number, even number',
      '600 (odd + odd = even)',
      '600, impar, par'
    ],
    hint: '537 es impar (odd) y 63 es impar (odd). ¿La suma de dos impares da par o impar?',
    hintEn: '537 is odd, 63 is odd. odd + odd = ?'
  },
  {
    id: 'rev-11b',
    section: '11. Multiplying odd and even numbers.',
    title: '11.b) 3 x 7 = 21  ➡️  odd number x ______ number = ______ number',
    titleEs: 'Completa la regla: 3 x 7 = 21  ➡️  odd x ______ = ______',
    placeholder: 'Ej: odd, odd',
    acceptableAnswers: ['odd, odd', 'odd number, odd number', 'odd x odd = odd', 'impar, impar'],
    hint: '3 es impar (odd), 7 es impar (odd) y 21 es impar (odd).',
    hintEn: '3 is odd, 7 is odd, and 21 is odd.'
  },
  {
    id: 'rev-11c',
    section: '11. Multiplying odd and even numbers.',
    title: '11.c) 33 x 2 = 66  ➡️  Is the product odd or even?',
    titleEs: '33 x 2 = 66  ➡️  ¿El producto es odd (impar) o even (par)?',
    placeholder: 'Escribe odd o even',
    acceptableAnswers: ['even', 'par', 'even number'],
    hint: '66 termina en 6, por lo que es divisible por 2 (par / even).',
    hintEn: '66 ends in 6, so it is even.'
  },
  {
    id: 'rev-12a',
    section: '12. Find the factors of a number.',
    title: '12.a) Find all the factors of 20:',
    titleEs: 'Encuentra todos los factores / divisores de 20 (ordenados de menor a mayor):',
    placeholder: 'Ej: 1, 2, 4, 5, 10, 20',
    acceptableAnswers: [
      '1, 2, 4, 5, 10, 20',
      '1,2,4,5,10,20',
      '1, 2, 4, 5, 10 y 20'
    ],
    hint: 'Busca parejas de números que multiplicados den 20: 1x20, 2x10, 4x5.',
    hintEn: 'Find factor pairs that multiply to 20: 1x20, 2x10, 4x5.'
  },
  {
    id: 'rev-12b',
    section: '12. Find the factors of a number.',
    title: '12.b) Find all the factors of 63:',
    titleEs: 'Encuentra todos los factores / divisores de 63 (ordenados de menor a mayor):',
    placeholder: 'Ej: 1, 3, 7, 9, 21, 63',
    acceptableAnswers: [
      '1, 3, 7, 9, 21, 63',
      '1,3,7,9,21,63',
      '1, 3, 7, 9, 21 y 63'
    ],
    hint: 'Parejas que multiplicadas dan 63: 1x63, 3x21, 7x9.',
    hintEn: 'Factor pairs for 63: 1x63, 3x21, 7x9.'
  },
  {
    id: 'rev-12c',
    section: '12. Find the factors of a number.',
    title: '12.c) Find all the factors of 45:',
    titleEs: 'Encuentra todos los factores / divisores de 45 (ordenados de menor a mayor):',
    placeholder: 'Ej: 1, 3, 5, 9, 15, 45',
    acceptableAnswers: [
      '1, 3, 5, 9, 15, 45',
      '1,3,5,9,15,45',
      '1, 3, 5, 9, 15 y 45'
    ],
    hint: 'Parejas que multiplicadas dan 45: 1x45, 3x15, 5x9.',
    hintEn: 'Factor pairs for 45: 1x45, 3x15, 5x9.'
  }
];

export function MathReviewTools({ onOpenQuiz }) {
  const [activeToolTab, setActiveToolTab] = useState('review'); // 'review', 'placeValueBoard', 'videos'
  const [inputNumber, setInputNumber] = useState('634543');
  
  // Estado interactivo para que el estudiante resuelva
  const [studentAnswers, setStudentAnswers] = useState({});
  const [justificationDrafts, setJustificationDrafts] = useState({});
  const [checkStatus, setCheckStatus] = useState({}); // { [id]: 'correct' | 'incorrect' }
  const [revealedHints, setRevealedHints] = useState({});

  // Desglose para el tablero de valor posicional
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

  // Comprobar la respuesta que escribió el estudiante
  const handleCheckAnswer = (exercise) => {
    const rawAnswer = (studentAnswers[exercise.id] || '').trim().toLowerCase().replace(/\s+/g, ' ');
    if (!rawAnswer) return;

    const isMatch = exercise.acceptableAnswers.some(acc => {
      const cleanAcc = acc.toLowerCase().trim().replace(/\s+/g, ' ');
      return rawAnswer === cleanAcc || rawAnswer.includes(cleanAcc);
    });

    if (isMatch) {
      sounds.playCorrect();
      setCheckStatus(prev => ({ ...prev, [exercise.id]: 'correct' }));
    } else {
      sounds.playIncorrect();
      setCheckStatus(prev => ({ ...prev, [exercise.id]: 'incorrect' }));
    }
  };

  const toggleHint = (id) => {
    sounds.playClick();
    setRevealedHints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleResetAnswer = (id) => {
    sounds.playClick();
    setStudentAnswers(prev => ({ ...prev, [id]: '' }));
    setCheckStatus(prev => ({ ...prev, [id]: null }));
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
            es="📝 Taller Práctico del Review (+5 pts)"
            en="Official Review Practice (+5 pts)"
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

      {/* PESTAÑA 1: TALLER PRÁCTICO INTERACTIVO (PARA QUE EL ESTUDIANTE RESUELVA) */}
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
                  Taller de Preparación y Práctica del Review (Logro 01)
                </h3>
                <p style={{ color: '#e2e8f0', fontSize: '0.92rem', lineHeight: 1.55, maxWidth: '720px' }}>
                  Resuelve cada ejercicio escribiendo tu respuesta y justificando tu procedimiento. Recuerda que la justificación clara en tu cuaderno u hojas cuadriculadas es indispensable para la entrega de la <strong>Carpeta de Trabajo</strong>.
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
                  Descargar Taller en Blanco (PDF)
                </a>
              </div>
            </div>
          </div>

          {/* Lista de Ejercicios para Resolver */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {OFFICIAL_REVIEW_EXERCISES.map((ex, idx) => {
              const currentStatus = checkStatus[ex.id];
              const isHintOpen = revealedHints[ex.id];
              const currentAns = studentAnswers[ex.id] || '';

              return (
                <div
                  key={ex.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: 'var(--radius-md)',
                    border: currentStatus === 'correct' ? '2px solid #10b981' : currentStatus === 'incorrect' ? '2px solid #ef4444' : '1.5px solid var(--border-color)',
                    padding: '22px 26px',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                    <span className="badge" style={{ background: '#eff6ff', color: '#1e40af', fontSize: '0.75rem' }}>
                      {ex.section}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                      Ejercicio #{idx + 1} de {OFFICIAL_REVIEW_EXERCISES.length}
                    </span>
                  </div>

                  {/* Enunciado del Ejercicio */}
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {ex.title}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: '#2563eb', fontStyle: 'italic', marginBottom: '18px' }}>
                    🌐 {ex.titleEs}
                  </p>

                  {/* Campo de Entrada de Respuesta del Estudiante */}
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px', color: 'var(--text-primary)' }}>
                      ✍️ Tu Respuesta:
                    </label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <input
                        type="text"
                        value={currentAns}
                        onChange={e => {
                          setStudentAnswers({ ...studentAnswers, [ex.id]: e.target.value });
                          if (checkStatus[ex.id]) setCheckStatus({ ...checkStatus, [ex.id]: null });
                        }}
                        placeholder={ex.placeholder}
                        disabled={currentStatus === 'correct'}
                        style={{
                          flex: 1,
                          minWidth: '240px',
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-md)',
                          border: currentStatus === 'correct' ? '2px solid #10b981' : '1.5px solid #cbd5e1',
                          fontSize: '1.05rem',
                          fontWeight: 700,
                          background: currentStatus === 'correct' ? '#ecfdf5' : '#ffffff'
                        }}
                      />

                      <button
                        onClick={() => handleCheckAnswer(ex)}
                        disabled={!currentAns.trim() || currentStatus === 'correct'}
                        className="btn btn-primary"
                        style={{
                          background: currentStatus === 'correct' ? '#10b981' : '#4f46e5',
                          opacity: !currentAns.trim() ? 0.5 : 1,
                          padding: '12px 20px',
                          fontWeight: 700,
                          fontSize: '0.9rem'
                        }}
                      >
                        {currentStatus === 'correct' ? '✅ ¡Correcto!' : 'Comprobar'}
                      </button>

                      {currentStatus && (
                        <button
                          onClick={() => handleResetAnswer(ex.id)}
                          className="btn btn-secondary"
                          style={{ padding: '10px 14px', fontSize: '0.82rem' }}
                          title="Volver a intentar"
                        >
                          <RotateCcw size={15} />
                        </button>
                      )}

                      <button
                        onClick={() => toggleHint(ex.id)}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.82rem', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <HelpCircle size={14} color="#f59e0b" />
                        <span>{isHintOpen ? 'Ocultar Pista' : '💡 Pista'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Feedback de Comprobación */}
                  {currentStatus === 'correct' && (
                    <div className="animate-fade-in" style={{
                      background: '#ecfdf5',
                      border: '1.5px solid #a7f3d0',
                      borderRadius: 'var(--radius-sm)',
                      padding: '12px 16px',
                      color: '#065f46',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '12px'
                    }}>
                      <CheckCircle2 size={18} color="#10b981" />
                      <span>¡Excelente! Tu respuesta es correcta. Recuerda anotar la justificación en tu carpeta.</span>
                    </div>
                  )}

                  {currentStatus === 'incorrect' && (
                    <div className="animate-fade-in" style={{
                      background: '#fef2f2',
                      border: '1.5px solid #fecaca',
                      borderRadius: 'var(--radius-sm)',
                      padding: '12px 16px',
                      color: '#991b1b',
                      fontSize: '0.88rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '12px'
                    }}>
                      <XCircle size={18} color="#ef4444" />
                      <span>Revisa tu respuesta o consulta la pista 💡 para verificar el procedimiento.</span>
                    </div>
                  )}

                  {/* Pista de Apoyo */}
                  {isHintOpen && (
                    <div className="animate-fade-in" style={{
                      background: '#fffbeb',
                      border: '1px solid #fde68a',
                      borderRadius: 'var(--radius-sm)',
                      padding: '12px 16px',
                      color: '#92400e',
                      fontSize: '0.88rem',
                      marginBottom: '12px'
                    }}>
                      <strong>💡 Pista de Razonamiento:</strong> {ex.hint}
                      <div style={{ fontSize: '0.82rem', color: '#2563eb', marginTop: '2px', fontStyle: 'italic' }}>
                        🌐 {ex.hintEn}
                      </div>
                    </div>
                  )}

                  {/* Campo Opcional de Borrador de Justificación para la Carpeta */}
                  <div style={{ marginTop: '10px' }}>
                    <details style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#4f46e5' }}>
                        📁 Borrador de Justificación (Para redactar tu entrega de carpeta)
                      </summary>
                      <div style={{ marginTop: '8px' }}>
                        <textarea
                          rows={2}
                          value={justificationDrafts[ex.id] || ''}
                          onChange={e => setJustificationDrafts({ ...justificationDrafts, [ex.id]: e.target.value })}
                          placeholder="Explica aquí por qué tu respuesta es correcta (procedimiento, operaciones o regla utilizada)..."
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.88rem',
                            resize: 'vertical'
                          }}
                        />
                      </div>
                    </details>
                  </div>
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
              Recursos audiovisuales seleccionados por el profesor para que los estudiantes refuercen cada tema:
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
