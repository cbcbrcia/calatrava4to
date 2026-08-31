import React from 'react';
import { Award, Flame, Sparkles, Star, CheckCircle2, Trophy, BookOpen, ShieldCheck, Printer } from 'lucide-react';
import { sounds } from '../utils/audioEffects';

export function AchievementsView({ stats, completedTopics = [], quizResults = {} }) {
  const BADGES_LIST = [
    {
      id: 'iniciador_estudio',
      name: 'Primer Gran Paso',
      desc: 'Inició su plataforma de estudio de 4to Primaria.',
      icon: '🚀',
      color: '#3b82f6',
      unlocked: true
    },
    {
      id: 'semana_1_lista',
      name: 'Explorador Curricular',
      desc: 'Revisó el cronograma de los 4 Bloques (A, B, C, D).',
      icon: '📅',
      color: '#8b5cf6',
      unlocked: true
    },
    {
      id: 'master_singapur',
      name: 'Maestro Singapur',
      desc: 'Completó los temas de Valor Posicional y Redondeo.',
      icon: '🧱',
      color: '#10b981',
      unlocked: completedTopics.includes('m-l1-t1')
    },
    {
      id: 'criterios_divisibilidad',
      name: 'Detective de Divisibilidad',
      desc: 'Completó los criterios y números primos de la Semana 3.',
      icon: '🔍',
      color: '#f59e0b',
      unlocked: completedTopics.includes('m-l1-t2')
    },
    {
      id: 'geometria_master',
      name: 'Arquitecto de Ángulos',
      desc: 'Estudió la clasificación y ángulos opuestos por el vértice.',
      icon: '📐',
      color: '#ec4899',
      unlocked: completedTopics.includes('m-l1-t3')
    },
    {
      id: 'evaluacion_l1_hero',
      name: 'Héroe del Logro 01',
      desc: 'Superó la evaluación oficial de Logro 01 con más del 80%.',
      icon: '🏆',
      color: '#eab308',
      unlocked: (quizResults['math-logro-01']?.percentage || 0) >= 80
    }
  ];

  const handlePrintCertificate = () => {
    sounds.playFanfare();
    window.print();
  };

  return (
    <div className="animate-fade-in" style={{ padding: '30px 0 60px' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Tarjeta de Perfil del Estudiante */}
        <div style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '32px',
          color: '#ffffff',
          marginBottom: '30px',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.4rem',
              boxShadow: '0 8px 20px rgba(245, 158, 11, 0.4)'
            }}>
              🎓
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h1 style={{ color: '#fff', fontSize: '1.6rem' }}>{stats.studentName}</h1>
                <span className="badge" style={{ background: '#4ade80', color: '#052e16' }}>Activo</span>
              </div>
              <p style={{ color: '#c7d2fe', fontSize: '0.9rem' }}>
                Grado 4to de Primaria • Calendario B
              </p>
            </div>
          </div>

          <button
            onClick={handlePrintCertificate}
            className="btn"
            style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', gap: '8px' }}
          >
            <Printer size={16} />
            <span>Imprimir Diploma de Estudio</span>
          </button>
        </div>

        {/* Métricas y Estadísticas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div style={{ background: '#ffffff', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c2410c', marginBottom: '6px' }}>
              <Flame size={20} fill="#f97316" color="#f97316" />
              <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Racha de Estudio</span>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>{stats.streak} días seguidos</div>
          </div>

          <div style={{ background: '#ffffff', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7c3aed', marginBottom: '6px' }}>
              <Sparkles size={20} color="#8b5cf6" />
              <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Puntos de Experiencia</span>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#6d28d9' }}>{stats.xp} XP</div>
          </div>

          <div style={{ background: '#ffffff', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#047857', marginBottom: '6px' }}>
              <BookOpen size={20} color="#10b981" />
              <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Temas Dominados</span>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669' }}>{completedTopics.length} temas</div>
          </div>
        </div>

        {/* Galería de Medallas e Insignias */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          padding: '28px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
            🏅 Medallero y Reconocimientos
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
            Completa temas de estudio y supera evaluaciones para desbloquear todas las medallas escolares.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px'
          }}>
            {BADGES_LIST.map((badge) => (
              <div
                key={badge.id}
                style={{
                  background: badge.unlocked ? '#f8fafc' : '#f1f5f9',
                  border: badge.unlocked ? `1.5px solid ${badge.color}60` : '1px dashed #cbd5e1',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  opacity: badge.unlocked ? 1 : 0.6,
                  filter: badge.unlocked ? 'none' : 'grayscale(1)'
                }}
              >
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  background: badge.unlocked ? badge.color + '20' : '#e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  flexShrink: 0
                }}>
                  {badge.icon}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <h3 style={{ fontSize: '0.98rem', color: 'var(--text-primary)' }}>{badge.name}</h3>
                    {badge.unlocked && <CheckCircle2 size={14} color="#16a34a" />}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
