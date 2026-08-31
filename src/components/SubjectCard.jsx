import React from 'react';
import { Calculator, Microscope, Globe, BookOpen, Languages, Crown, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/audioEffects';
import { DualText } from './BilingualText';

const ICON_MAP = {
  Calculator,
  Microscope,
  Globe,
  BookOpen,
  Languages,
  Crown
};

export function SubjectCard({ subject, onSelect, completedCount = 0, totalTopics = 0 }) {
  const IconComponent = ICON_MAP[subject.icon] || BookOpen;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
  const isEnglishNative = subject.id === 'science' || subject.id === 'ingles' || subject.id === 'pli-camelot';

  return (
    <div
      onClick={() => { sounds.playClick(); onSelect(subject.id); }}
      style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        padding: '24px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'all var(--transition-smooth)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        e.currentTarget.style.borderColor = subject.color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.borderColor = 'var(--border-color)';
      }}
    >
      {/* Barra de Acento Superior */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '6px',
        background: subject.color
      }} />

      <div>
        {/* Encabezado con Ícono y Logro Activo */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            background: subject.bgColor,
            color: subject.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 4px 12px ${subject.color}20`
          }}>
            <IconComponent size={28} />
          </div>

          <span className="badge" style={{ background: '#fef3c7', color: '#92400e', fontSize: '0.7rem' }}>
            <DualText es="Logro 01 (Sem 5)" en="Logro 01 (Week 5)" inline />
          </span>
        </div>

        {/* Título de la Asignatura */}
        <h3 style={{ fontSize: '1.25rem', marginBottom: '6px', color: 'var(--text-primary)' }}>
          {subject.name}
        </h3>

        {/* Libro y Docente */}
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '12px', minHeight: '38px' }}>
          📖 <strong>Libro / Book:</strong> {subject.bookName}
        </p>

        {/* Barra de Progreso */}
        <div style={{ marginTop: '14px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            <DualText es="Progreso del Logro" en="Progress" inline />
            <strong>{completedCount}/{totalTopics} ({progressPercent}%)</strong>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: subject.color,
              borderRadius: 'var(--radius-full)',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>
      </div>

      {/* Pie de Tarjeta / Botón Entrar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '14px',
        borderTop: '1px solid var(--border-color)'
      }}>
        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <DualText
            es={`${subject.units.length} ${subject.units.length === 1 ? 'Unidad' : 'Unidades'}`}
            en={`${subject.units.length} ${subject.units.length === 1 ? 'Unit' : 'Units'}`}
            inline
          />
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: subject.color, fontWeight: 700, fontSize: '0.9rem' }}>
          <DualText es="Estudiar" en="Study" inline />
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
}
