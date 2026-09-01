import React from 'react';
import { BookOpen, Calendar, Award, Sparkles, Flame, Volume2, VolumeX, Shield, Edit3, User } from 'lucide-react';
import { sounds } from '../utils/audioEffects';
import { DualText } from './BilingualText';
import { AVATAR_OPTIONS } from '../utils/storage';

export function Navbar({
  activeTab,
  setActiveTab,
  stats,
  soundEnabled,
  setSoundEnabled,
  currentProfile,
  onOpenProfileModal
}) {
  const handleToggleSound = () => {
    const newState = sounds.toggleSound();
    setSoundEnabled(newState);
  };

  const avatarObj = AVATAR_OPTIONS.find(a => a.id === currentProfile?.avatarId) || AVATAR_OPTIONS[1];

  return (
    <header style={{
      background: '#ffffff',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('subjects')}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 800,
            fontSize: '1.15rem',
            boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)'
          }}>
            4°
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h1 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>Repaso 4to</h1>
              <span className="badge" style={{ background: '#dbeafe', color: '#1e40af', fontSize: '0.65rem' }}>
                <DualText es="Calendario B" en="Schedule B" inline />
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              <DualText
                es="Plataforma de Estudio y Evaluaciones 2026-2027"
                en="Study & Assessment Platform"
                secondaryStyle={{ color: '#2563eb' }}
              />
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            onClick={() => { sounds.playClick(); setActiveTab('subjects'); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '0.88rem',
              background: activeTab === 'subjects' ? 'var(--primary-light)' : 'transparent',
              color: activeTab === 'subjects' ? 'var(--primary)' : 'var(--text-secondary)'
            }}
          >
            <BookOpen size={16} />
            <DualText es="Materias" en="Subjects" secondaryStyle={{ color: '#2563eb' }} />
          </button>

          <button
            onClick={() => { sounds.playClick(); setActiveTab('schedule'); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '0.88rem',
              background: activeTab === 'schedule' ? '#fef3c7' : 'transparent',
              color: activeTab === 'schedule' ? '#b45309' : 'var(--text-secondary)',
              position: 'relative'
            }}
          >
            <Calendar size={16} />
            <DualText es="Cronograma" en="Schedule" secondaryStyle={{ color: '#92400e' }} />
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#ef4444',
              color: '#fff',
              fontSize: '0.62rem',
              fontWeight: 800,
              padding: '2px 5px',
              borderRadius: '999px'
            }}>Sem 5</span>
          </button>

          <button
            onClick={() => { sounds.playClick(); setActiveTab('exam'); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '0.88rem',
              background: activeTab === 'exam' ? '#fee2e2' : 'transparent',
              color: activeTab === 'exam' ? '#b91c1c' : 'var(--text-secondary)'
            }}
          >
            <Shield size={16} />
            <DualText es="Simulacro L01" en="L01 Exam" secondaryStyle={{ color: '#991b1b' }} />
          </button>

          <button
            onClick={() => { sounds.playClick(); setActiveTab('achievements'); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '0.88rem',
              background: activeTab === 'achievements' ? '#ecfdf5' : 'transparent',
              color: activeTab === 'achievements' ? '#047857' : 'var(--text-secondary)'
            }}
          >
            <Award size={16} />
            <DualText es="Mis Logros" en="Achievements" secondaryStyle={{ color: '#065f46' }} />
          </button>

          <button
            onClick={() => { sounds.playClick(); setActiveTab('contentManager'); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '0.88rem',
              background: activeTab === 'contentManager' ? '#f3e8ff' : 'transparent',
              color: activeTab === 'contentManager' ? '#7e22ce' : 'var(--text-secondary)'
            }}
          >
            <Edit3 size={16} />
            <DualText es="Gestor" en="Editor" secondaryStyle={{ color: '#6b21a8' }} />
          </button>
        </nav>

        {/* Perfil del Estudiante + Gamification Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Botón de Perfil del Estudiante */}
          <button
            onClick={() => { sounds.playClick(); onOpenProfileModal(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#f8fafc',
              border: '1.5px solid #cbd5e1',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title="Cambiar perfil de estudiante o ver historial"
          >
            <span style={{ fontSize: '1.25rem' }}>{avatarObj.icon}</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                {currentProfile?.name || 'Estudiante'}
              </div>
              <div style={{ fontSize: '0.65rem', color: '#2563eb', fontWeight: 700 }}>
                Mi Perfil • Historial
              </div>
            </div>
          </button>

          {/* Racha */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: '#fff7ed',
            color: '#c2410c',
            padding: '5px 10px',
            borderRadius: 'var(--radius-full)',
            fontWeight: 700,
            fontSize: '0.82rem',
            border: '1px solid #ffedd5'
          }}>
            <Flame size={15} color="#f97316" fill="#f97316" />
            <span>{stats.streak || 1}d</span>
          </div>

          {/* XP & Level */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: '#f5f3ff',
            color: '#6d28d9',
            padding: '5px 10px',
            borderRadius: 'var(--radius-full)',
            fontWeight: 700,
            fontSize: '0.82rem',
            border: '1px solid #ede9fe'
          }}>
            <Sparkles size={15} color="#8b5cf6" />
            <span>{stats.xp || 0} XP</span>
          </div>

          {/* Sound Mute Toggle */}
          <button
            onClick={handleToggleSound}
            title={soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
            style={{
              padding: '7px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-subtle)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} color="#ef4444" />}
          </button>
        </div>
      </div>
    </header>
  );
}
