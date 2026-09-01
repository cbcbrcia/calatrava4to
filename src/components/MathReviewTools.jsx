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

// Ejercicios oficiales del Review en inglés puro (sin traducción de enunciados ni soluciones en el placeholder)
export const OFFICIAL_REVIEW_EXERCISES = [
  {
    id: 'rev-1a',
    section: '1. Write the numerals.',
    title: '1.a) twenty-three thousand, seven hundred and four',
    placeholder: 'Type the numbers...',
    acceptableAnswers: ['23704', '23.704', '23 704'],
    hint: 'Remember: if there are no tens, place a 0 in that place value.'
  },
  {
    id: 'rev-1b',
    section: '1. Write the numerals.',
    title: '1.b) five hundred and forty-three thousand, three hundred and nineteen',
    placeholder: 'Type the numbers...',
    acceptableAnswers: ['543319', '543.319', '543 319'],
    hint: 'It has 6 digits: 543 in the thousands period and 319 in the units period.'
  },
  {
    id: 'rev-2a',
    section: '2. Write the numbers in words.',
    title: '2.a) 50 901',
    placeholder: 'Type the words in English...',
    acceptableAnswers: [
      'fifty thousand, nine hundred and one',
      'fifty thousand nine hundred and one',
      'fifty thousand nine hundred one',
      'fifty thousand, nine hundred one'
    ],
    hint: '50 in thousands period = "fifty thousand", 900 = "nine hundred" and 1 = "and one".'
  },
  {
    id: 'rev-2b',
    section: '2. Write the numbers in words.',
    title: '2.b) 659 547',
    placeholder: 'Type the words in English...',
    acceptableAnswers: [
      'six hundred and fifty-nine thousand, five hundred and forty-seven',
      'six hundred fifty-nine thousand five hundred forty-seven',
      'six hundred and fifty nine thousand, five hundred and forty seven',
      'six hundred and fifty-nine thousand five hundred and forty-seven',
      'six hundred fifty nine thousand five hundred forty seven'
    ],
    hint: 'Split into thousands (six hundred and fifty-nine thousand) and units (five hundred and forty-seven).'
  },
  {
    id: 'rev-3a',
    section: '3. Write the missing numbers or words.',
    title: '3.a) In 423 546, the digit 2 is in the ______ place.',
    placeholder: 'Type the place value...',
    acceptableAnswers: ['ten thousands', 'ten thousand', 'ten-thousands'],
    hint: 'Count from right to left: ones, tens, hundreds, thousands, ten thousands...'
  },
  {
    id: 'rev-3b',
    section: '3. Write the missing numbers or words.',
    title: '3.b) In 634 543, the digit 6 is in the ______ place and its value is ______.',
    placeholder: 'Type the place and value (e.g. place, value)...',
    acceptableAnswers: [
      'hundred thousands, 600 000',
      'hundred thousands, 600000',
      'hundred thousands, 600.000',
      'hundred thousand, 600000'
    ],
    hint: 'Digit 6 is in the 6th position from right (Hundred Thousands), value is 6 x 100,000.'
  },
  {
    id: 'rev-3c',
    section: '3. Write the missing numbers or words.',
    title: '3.c) In 547 893, the digit ______ is in the thousands place and its value is ______.',
    placeholder: 'Type the digit and value (e.g. digit, value)...',
    acceptableAnswers: ['7, 7 000', '7, 7000', '7, 7.000', '7 and 7000'],
    hint: 'Look at the 4th column from right (thousands) and compute its place value.'
  },
  {
    id: 'rev-4a',
    section: '4. Write > or <.',
    title: '4.a) 455 678  [ ? ]  94 675',
    placeholder: 'Type > or <',
    acceptableAnswers: ['>', 'greater than'],
    hint: 'A 6-digit number is always greater than a 5-digit number.'
  },
  {
    id: 'rev-6a',
    section: '6. Arrange the numbers in order. Begin with the greatest.',
    title: '6.a) 94 797,  944 700,  904 779',
    placeholder: 'Type the numbers in order from greatest to least...',
    acceptableAnswers: [
      '944 700, 904 779, 94 797',
      '944700, 904779, 94797',
      '944.700, 904.779, 94.797',
      '944 700 > 904 779 > 94 797'
    ],
    hint: 'Compare 6-digit numbers first, then the 5-digit number.'
  },
  {
    id: 'rev-7c',
    section: '7. Round each amount to the nearest hundred dollars.',
    title: '7.c) $56 506',
    placeholder: 'Type the rounded amount...',
    acceptableAnswers: ['$56 500', '$56500', '56500', '56 500', '$56.500', '56.500'],
    hint: 'Look at the tens digit (0). Since 0 < 5, keep the hundreds digit.'
  },
  {
    id: 'rev-7d',
    section: '7. Round each amount to the nearest hundred dollars.',
    title: '7.d) $37 091',
    placeholder: 'Type the rounded amount...',
    acceptableAnswers: ['$37 100', '$37100', '37100', '37 100', '$37.100', '37.100'],
    hint: 'Look at the tens digit (9). Since 9 >= 5, add 1 to the hundreds digit.'
  },
  {
    id: 'rev-8c',
    section: '8. Round each amount to the nearest thousand dollars.',
    title: '8.c) $73 231',
    placeholder: 'Type the rounded amount...',
    acceptableAnswers: ['$73 000', '$73000', '73000', '73 000', '$73.000', '73.000'],
    hint: 'Look at the hundreds digit (2). Since 2 < 5, keep the thousands digit.'
  },
  {
    id: 'rev-8d',
    section: '8. Round each amount to the nearest thousand dollars.',
    title: '8.d) $96 602',
    placeholder: 'Type the rounded amount...',
    acceptableAnswers: ['$97 000', '$97000', '97000', '97 000', '$97.000', '97.000'],
    hint: 'Look at the hundreds digit (6). Since 6 >= 5, round up the thousands digit.'
  },
  {
    id: 'rev-9c',
    section: '9. Add. Then, complete each rule.',
    title: '9.c) 142 + 324 = ______  ➡️  ______ number + even number = ______ number',
    placeholder: 'Type the sum and words (e.g. 466, even, even)...',
    acceptableAnswers: [
      '466, even, even',
      '466, even number, even number',
      '466 (even + even = even)'
    ],
    hint: '142 is even, 324 is even. even + even = even.'
  },
  {
    id: 'rev-9d',
    section: '9. Add. Then, complete each rule.',
    title: '9.d) 537 + 63 = ______  ➡️  ______ number + odd number = ______ number',
    placeholder: 'Type the sum and words (e.g. 600, odd, even)...',
    acceptableAnswers: [
      '600, odd, even',
      '600, odd number, even number',
      '600 (odd + odd = even)'
    ],
    hint: '537 is odd, 63 is odd. odd + odd = even.'
  },
  {
    id: 'rev-11b',
    section: '11. Multiplying odd and even numbers.',
    title: '11.b) 3 x 7 = 21  ➡️  odd number x ______ number = ______ number',
    placeholder: 'Type the missing words (e.g. odd, odd)...',
    acceptableAnswers: ['odd, odd', 'odd number, odd number', 'odd x odd = odd'],
    hint: '3 is odd, 7 is odd, and 21 is odd.'
  },
  {
    id: 'rev-11c',
    section: '11. Multiplying odd and even numbers.',
    title: '11.c) 33 x 2 = 66  ➡️  Is the product odd or even?',
    placeholder: 'Type odd or even...',
    acceptableAnswers: ['even', 'even number'],
    hint: '66 ends in 6, which is divisible by 2 (even).'
  },
  {
    id: 'rev-12a',
    section: '12. Find the factors of a number.',
    title: '12.a) Find the factors of 20.',
    placeholder: 'Type all the factors in order...',
    acceptableAnswers: [
      '1, 2, 4, 5, 10, 20',
      '1,2,4,5,10,20',
      '1, 2, 4, 5, 10 and 20'
    ],
    hint: 'Find factor pairs that multiply to 20: 1x20, 2x10, 4x5.'
  },
  {
    id: 'rev-12b',
    section: '12. Find the factors of a number.',
    title: '12.b) Find the factors of 63.',
    placeholder: 'Type all the factors in order...',
    acceptableAnswers: [
      '1, 3, 7, 9, 21, 63',
      '1,3,7,9,21,63',
      '1, 3, 7, 9, 21 and 63'
    ],
    hint: 'Factor pairs for 63: 1x63, 3x21, 7x9.'
  },
  {
    id: 'rev-12c',
    section: '12. Find the factors of a number.',
    title: '12.c) Find the factors of 45.',
    placeholder: 'Type all the factors in order...',
    acceptableAnswers: [
      '1, 3, 5, 9, 15, 45',
      '1,3,5,9,15,45',
      '1, 3, 5, 9, 15 and 45'
    ],
    hint: 'Factor pairs for 45: 1x45, 3x15, 5x9.'
  }
];

export function MathReviewTools({ onOpenQuiz }) {
  const [activeToolTab, setActiveToolTab] = useState('review');
  const [inputNumber, setInputNumber] = useState('634543');
  
  const [studentAnswers, setStudentAnswers] = useState({});
  const [justificationDrafts, setJustificationDrafts] = useState({});
  const [checkStatus, setCheckStatus] = useState({});
  const [revealedHints, setRevealedHints] = useState({});

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

      {/* PESTAÑA 1: TALLER PRÁCTICO (EN INGLÉS PURO, SIN TRADUCCIONES EN LOS EJERCICIOS) */}
      {activeToolTab === 'review' && (
        <div className="animate-fade-in">
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
                  Review G1 • Grade 401 & 402
                </h3>
                <p style={{ color: '#e2e8f0', fontSize: '0.92rem', lineHeight: 1.55, maxWidth: '720px' }}>
                  Complete each exercise by typing your answer in English. Remember to write the clear step-by-step justification in your student folder.
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
                  Download Printable Worksheet (PDF)
                </a>
              </div>
            </div>
          </div>

          {/* Lista de Ejercicios */}
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
                    <span className="badge" style={{ background: '#eff6ff', color: '#1e40af', fontSize: '0.8rem', fontWeight: 700 }}>
                      {ex.section}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                      Question #{idx + 1} of {OFFICIAL_REVIEW_EXERCISES.length}
                    </span>
                  </div>

                  {/* Enunciado en Inglés Puro */}
                  <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '18px', fontWeight: 700 }}>
                    {ex.title}
                  </h4>

                  {/* Campo de Entrada de Respuesta */}
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px', color: 'var(--text-primary)' }}>
                      ✍️ Your Answer:
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
                          minWidth: '260px',
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
                          padding: '12px 22px',
                          fontWeight: 700,
                          fontSize: '0.9rem'
                        }}
                      >
                        {currentStatus === 'correct' ? '✅ Correct!' : 'Check'}
                      </button>

                      {currentStatus && (
                        <button
                          onClick={() => handleResetAnswer(ex.id)}
                          className="btn btn-secondary"
                          style={{ padding: '10px 14px', fontSize: '0.82rem' }}
                          title="Try again"
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
                        <span>{isHintOpen ? 'Hide Hint' : '💡 Hint'}</span>
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
                      <span>Great job! That is correct. Make sure to write the justification in your folder.</span>
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
                      <span>Check your answer or click the Hint 💡 button to review the procedure.</span>
                    </div>
                  )}

                  {/* Pista Conceptual */}
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
                      <strong>💡 Hint:</strong> {ex.hint}
                    </div>
                  )}

                  {/* Campo de Borrador de Justificación */}
                  <div style={{ marginTop: '10px' }}>
                    <details style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#4f46e5' }}>
                        📁 Justification Draft (For your student folder)
                      </summary>
                      <div style={{ marginTop: '8px' }}>
                        <textarea
                          rows={2}
                          value={justificationDrafts[ex.id] || ''}
                          onChange={e => setJustificationDrafts({ ...justificationDrafts, [ex.id]: e.target.value })}
                          placeholder="Explain why your answer is correct (operations, rules, or steps used)..."
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
                Place Value Chart
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                Official place value board for printing on letter-sized paper to use in acetate folder with dry-erase marker.
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
                Download Chart PDF
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
                🔢 Enter any number up to 7 digits to place it on the chart:
              </label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="text"
                  value={inputNumber}
                  onChange={e => setInputNumber(e.target.value)}
                  placeholder="Type a number..."
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
                  Random Number
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
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, lineHeight: 1.2 }}>{col.label}</div>
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

            {cleanNumStr && (
              <div style={{ marginTop: '20px', background: '#f8fafc', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', marginBottom: '6px' }}>
                  Expanded Form:
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

      {/* PESTAÑA 3: VIDEOS TUTORIALES */}
      {activeToolTab === 'videos' && (
        <div className="animate-fade-in">
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
              Videos de Apoyo del Docente
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Recursos audiovisuales seleccionados por el profesor para reforzar cada contenido evaluado:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
            
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
