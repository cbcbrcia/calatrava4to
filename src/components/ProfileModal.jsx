import React, { useState } from 'react';
import { User, Sparkles, Check, Plus, Trash2, X, Award, Clock, History, BookOpen } from 'lucide-react';
import { AVATAR_OPTIONS, getAllProfiles, createProfile, setActiveProfile, getActiveProfile } from '../utils/storage';
import { sounds } from '../utils/audioEffects';
import { DualText } from './BilingualText';

export function ProfileModal({ isOpen, onClose, onProfileChanged, forceCreation = false }) {
  const [profiles, setProfiles] = useState(getAllProfiles());
  const [activeProfile, setActive] = useState(getActiveProfile());
  const [isCreatingNew, setIsCreatingNew] = useState(forceCreation || profiles.length === 0);
  const [nameInput, setNameInput] = useState('');
  const [courseInput, setCourseInput] = useState('401');
  const [selectedAvatar, setSelectedAvatar] = useState('owl');
  const [activeViewTab, setActiveViewTab] = useState('profile'); // 'profile', 'history'

  if (!isOpen && !forceCreation && profiles.length > 0) return null;

  const handleCreateProfile = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    sounds.playFanfare();
    const newProf = createProfile(nameInput, courseInput, selectedAvatar);
    setProfiles(getAllProfiles());
    setActive(newProf);
    setIsCreatingNew(false);
    setNameInput('');
    if (onProfileChanged) onProfileChanged(newProf);
    if (onClose && !forceCreation) onClose();
  };

  const handleSelectProfile = (p) => {
    sounds.playClick();
    setActiveProfile(p.id);
    setActive(p);
    if (onProfileChanged) onProfileChanged(p);
    if (onClose) onClose();
  };

  const avatarObj = AVATAR_OPTIONS.find(a => a.id === activeProfile?.avatarId) || AVATAR_OPTIONS[1];

  return (
    <div className="modal-overlay" style={{ zIndex: 2000 }}>
      <div
        className="modal-content animate-bounce-in"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '620px', width: '92%', maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Encabezado del Modal */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '16px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '1.2rem'
            }}>
              🎓
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                <DualText
                  es={isCreatingNew ? 'Crear Perfil de Estudiante' : 'Perfil del Estudiante e Historial'}
                  en={isCreatingNew ? 'Create Student Profile' : 'Student Profile & Study History'}
                  secondaryStyle={{ color: '#2563eb' }}
                />
              </h3>
            </div>
          </div>

          {!forceCreation && profiles.length > 0 && (
            <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
              <X size={20} />
            </button>
          )}
        </div>

        {/* SI ESTÁ CREANDO UN NUEVO PERFIL */}
        {isCreatingNew ? (
          <form onSubmit={handleCreateProfile} className="animate-fade-in">
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '18px' }}>
              <DualText
                es="Ingresa el nombre del estudiante para guardar su historial de estudio, puntos XP, notas de simulacros y medallas de forma personalizada:"
                en="Enter the student's name to track study history, XP points, quiz scores, and achievements:"
                secondaryStyle={{ color: '#2563eb' }}
              />
            </p>

            {/* Nombre del Estudiante */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px', color: 'var(--text-primary)' }}>
                <DualText es="👤 Nombre del Estudiante:" en="Student Name:" inline />
              </label>
              <input
                type="text"
                required
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                placeholder="Ejemplo: Lucas, Mateo, Sofía..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '1.05rem',
                  fontWeight: 600
                }}
              />
            </div>

            {/* Selección de Curso */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
                <DualText es="🏫 Curso / Grado:" en="Class / Grade Section:" inline />
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['401', '402'].map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => { sounds.playClick(); setCourseInput(c); }}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      border: courseInput === c ? '2px solid #4f46e5' : '1px solid var(--border-color)',
                      background: courseInput === c ? 'var(--primary-light)' : '#ffffff',
                      color: courseInput === c ? 'var(--primary)' : 'var(--text-secondary)',
                      fontWeight: 800,
                      fontSize: '1.1rem'
                    }}
                  >
                    Curso {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Selección de Avatar */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
                <DualText es="🎨 Elige tu Avatar:" en="Choose your Avatar:" inline />
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {AVATAR_OPTIONS.map(av => {
                  const isSelected = selectedAvatar === av.id;
                  return (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => { sounds.playClick(); setSelectedAvatar(av.id); }}
                      style={{
                        padding: '10px 6px',
                        borderRadius: 'var(--radius-md)',
                        border: isSelected ? '2px solid #4f46e5' : '1px solid var(--border-color)',
                        background: isSelected ? '#ede9fe' : '#ffffff',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ fontSize: '1.8rem', marginBottom: '2px' }}>{av.icon}</div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: isSelected ? '#4f46e5' : 'var(--text-secondary)' }}>
                        {av.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nota Aclaratoria Familiar */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
              marginBottom: '20px',
              fontSize: '0.78rem',
              color: '#64748b',
              lineHeight: 1.5
            }}>
              👨‍👦 <strong>Iniciativa Familiar Independiente:</strong> Plataforma creada por un padre de familia para su hijo como herramienta de apoyo y repaso basada en temarios escolares. Esta web no tiene vínculo institucional, patrocinio ni responsabilidad oficial del Colegio Gimnasio Calatrava.
            </div>

            {/* Botones de Acción */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              {profiles.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsCreatingNew(false)}
                  className="btn btn-secondary"
                >
                  <DualText es="Cancelar" en="Cancel" inline />
                </button>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                style={{ background: '#4f46e5', padding: '12px 28px', fontWeight: 800 }}
              >
                <DualText es="🚀 ¡Comenzar a Estudiar!" en="Start Studying!" inline />
              </button>
            </div>
          </form>
        ) : (
          /* VISTA DEL PERFIL ACTIVO E HISTORIAL */
          <div className="animate-fade-in">
            {/* Pestañas de Vista */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '2px', marginBottom: '18px' }}>
              <button
                onClick={() => setActiveViewTab('profile')}
                style={{
                  padding: '8px 16px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  borderBottom: activeViewTab === 'profile' ? '3px solid #4f46e5' : '3px solid transparent',
                  color: activeViewTab === 'profile' ? '#4f46e5' : 'var(--text-secondary)'
                }}
              >
                👤 <DualText es="Estudiante Actual" en="Current Student" inline />
              </button>

              <button
                onClick={() => setActiveViewTab('history')}
                style={{
                  padding: '8px 16px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  borderBottom: activeViewTab === 'history' ? '3px solid #059669' : '3px solid transparent',
                  color: activeViewTab === 'history' ? '#059669' : 'var(--text-secondary)'
                }}
              >
                📜 <DualText es="Historial de Evaluaciones" en="Evaluation History" inline />
              </button>
            </div>

            {activeViewTab === 'profile' ? (
              <div>
                {/* Tarjeta del Estudiante Activo */}
                <div style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px 24px',
                  border: '1.5px solid #cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ fontSize: '2.8rem', background: '#fff', padding: '8px', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
                      {avatarObj.icon}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <h4 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', margin: 0 }}>
                          {activeProfile?.name}
                        </h4>
                        <span className="badge" style={{ background: '#dbeafe', color: '#1e40af', fontSize: '0.75rem' }}>
                          Curso {activeProfile?.course}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 600 }}>
                        ⭐ Nivel {activeProfile?.stats?.level || 1} • {activeProfile?.stats?.xp || 0} XP • Racha: {activeProfile?.stats?.streak || 1} días
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCreatingNew(true)}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Plus size={14} />
                    <DualText es="Nuevo Estudiante" en="New Student" inline />
                  </button>
                </div>

                {/* Lista de Otros Perfiles Guardados */}
                {profiles.length > 1 && (
                  <div style={{ marginBottom: '20px' }}>
                    <h5 style={{ fontSize: '0.88rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
                      <DualText es="Cambiar a otro estudiante:" en="Switch student profile:" inline />
                    </h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {profiles.map(p => {
                        const av = AVATAR_OPTIONS.find(a => a.id === p.avatarId) || AVATAR_OPTIONS[0];
                        const isCurrent = p.id === activeProfile?.id;
                        return (
                          <div
                            key={p.id}
                            onClick={() => handleSelectProfile(p)}
                            style={{
                              padding: '12px 18px',
                              borderRadius: 'var(--radius-md)',
                              border: isCurrent ? '2px solid #4f46e5' : '1px solid var(--border-color)',
                              background: isCurrent ? 'var(--primary-light)' : '#ffffff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: 'pointer'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span>{av.icon}</span>
                              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{p.name} (Curso {p.course})</span>
                            </div>
                            {isCurrent && <Check size={18} color="#4f46e5" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* HISTORIAL DE QUICES Y EVALUACIONES */
              <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                {activeProfile?.quizResults && activeProfile.quizResults.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {activeProfile.quizResults.map((qr, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: '#ffffff',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-color)',
                          padding: '14px 18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                            {qr.unitId} {qr.subjectName ? `(${qr.subjectName})` : ''}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                            <Clock size={12} />
                            <span>{qr.date}</span>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <div style={{
                            fontWeight: 900,
                            fontSize: '1.1rem',
                            color: qr.percentage >= 70 ? '#16a34a' : '#dc2626'
                          }}>
                            {qr.score} / {qr.total} ({qr.percentage}%)
                          </div>
                          <span style={{ fontSize: '0.75rem', color: qr.percentage >= 70 ? '#16a34a' : '#dc2626', fontWeight: 700 }}>
                            {qr.percentage >= 70 ? '¡Aprobado! 🌟' : 'Por Mejorar 💪'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                    <History size={36} style={{ margin: '0 auto 10px', opacity: 0.5 }} />
                    <p>Aún no hay evaluaciones realizadas. ¡Presenta tu primer quiz para ver tu historial aquí!</p>
                  </div>
                )}
              </div>
            )}

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={onClose} className="btn btn-primary" style={{ background: '#4f46e5' }}>
                <DualText es="Listo / Cerrar" en="Done / Close" inline />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
