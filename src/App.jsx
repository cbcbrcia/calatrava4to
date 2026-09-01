import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ScheduleView } from './components/ScheduleView';
import { SubjectCard } from './components/SubjectCard';
import { SubjectDetail } from './components/SubjectDetail';
import { LessonViewer } from './components/LessonViewer';
import { FlashcardsView } from './components/FlashcardsView';
import { QuizModal } from './components/QuizModal';
import { ExamSimulator } from './components/ExamSimulator';
import { AchievementsView } from './components/AchievementsView';
import { ContentManager } from './components/ContentManager';
import { ProfileModal } from './components/ProfileModal';
import { FeedbackModal, FloatingFeedbackButton } from './components/FeedbackModal';
import { DualText } from './components/BilingualText';
import { ShieldAlert, Heart } from 'lucide-react';

import { CURRICULUM_SUBJECTS as INITIAL_SUBJECTS } from './data/curriculumData';
import {
  getStoredStats,
  getCompletedTopics,
  markTopicCompleted,
  getQuizResults,
  getActiveProfile,
  getAllProfiles
} from './utils/storage';
import { sounds } from './utils/audioEffects';

export function App() {
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [activeTab, setActiveTab] = useState('schedule'); // Default to 'schedule' since Week 5 evaluation is now!
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedUnitForTopic, setSelectedUnitForTopic] = useState(null);
  
  // Modales y Vistas Especiales
  const [activeFlashcards, setActiveFlashcards] = useState(null);
  const [activeQuizUnit, setActiveQuizUnit] = useState(null);
  const [activeQuizSubject, setActiveQuizSubject] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackContext, setFeedbackContext] = useState({ subject: '', context: '' });

  // Perfil del Estudiante Activo
  const [currentProfile, setCurrentProfile] = useState(getActiveProfile());
  const [stats, setStats] = useState(getStoredStats());
  const [completedTopics, setCompletedTopics] = useState(getCompletedTopics());
  const [quizResults, setQuizResults] = useState(getQuizResults());
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Abrir modal de bienvenida en la primera visita si aún no hay perfil
  useEffect(() => {
    const existing = getAllProfiles();
    if (existing.length === 0) {
      setIsProfileModalOpen(true);
    }
  }, []);

  // Cargar materias asegurando que el currículo oficial bilingüe tenga prioridad
  useEffect(() => {
    try {
      setSubjects(INITIAL_SUBJECTS);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Recargar datos cuando cambia el perfil activo
  const handleProfileChanged = (newProfile) => {
    setCurrentProfile(newProfile);
    setStats(getStoredStats());
    setCompletedTopics(getCompletedTopics());
    setQuizResults(getQuizResults());
  };

  // Manejador para marcar tema completado
  const handleToggleTopicCompleted = (topicId) => {
    const updated = markTopicCompleted(topicId);
    setCompletedTopics(updated);
    setStats(getStoredStats());
  };

  // Manejador para guardar nuevo tema desde el editor de padres
  const handleSaveCustomTopic = (subjectId, newTopic, newQuizQuestion) => {
    const updatedSubjects = subjects.map(sub => {
      if (sub.id === subjectId) {
        const firstUnit = sub.units[0];
        const updatedTopics = [...firstUnit.topics, newTopic];
        const updatedQuiz = newQuizQuestion && firstUnit.quiz
          ? [...firstUnit.quiz, newQuizQuestion]
          : firstUnit.quiz;

        return {
          ...sub,
          units: sub.units.map((u, i) => i === 0 ? { ...u, topics: updatedTopics, quiz: updatedQuiz } : u)
        };
      }
      return sub;
    });

    setSubjects(updatedSubjects);
    localStorage.setItem('estudio_4to_custom_subjects', JSON.stringify(updatedSubjects));
  };

  // Navegar directo a un logro desde el Cronograma
  const handleSelectSubjectForLogro = (subjectId, unitId) => {
    setSelectedSubjectId(subjectId);
    setSelectedTopic(null);
    setActiveTab('subjects');
  };

  const handleStartExamFromSchedule = (unitId) => {
    const mathSub = subjects.find(s => s.id === 'matematicas');
    const unit = mathSub?.units.find(u => u.id === unitId) || mathSub?.units[0];
    setActiveQuizSubject(mathSub);
    setActiveQuizUnit(unit);
  };

  const selectedSubject = subjects.find(s => s.id === selectedSubjectId);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Barra de Navegación Principal con Perfil */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setSelectedTopic(null);
          setActiveFlashcards(null);
          setActiveTab(tab);
        }}
        stats={stats}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        currentProfile={currentProfile}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      {/* Contenido Principal */}
      <main style={{ flex: 1 }}>
        {/* PESTAÑA: CRONOGRAMA & EVALUACIONES */}
        {activeTab === 'schedule' && (
          <ScheduleView
            onSelectSubjectForLogro={handleSelectSubjectForLogro}
            onStartExamModal={handleStartExamFromSchedule}
          />
        )}

        {/* PESTAÑA: MATERIAS Y ESTUDIO */}
        {activeTab === 'subjects' && (
          <div className="animate-fade-in" style={{ padding: '30px 0 60px' }}>
            {/* Si está viendo las fichas 3D */}
            {activeFlashcards ? (
              <FlashcardsView
                flashcards={activeFlashcards.flashcards}
                unitTitle={activeFlashcards.title}
                onBack={() => setActiveFlashcards(null)}
              />
            ) : selectedTopic ? (
              /* Si está dentro de una lección específica */
              <LessonViewer
                topic={selectedTopic}
                unit={selectedUnitForTopic}
                subject={selectedSubject}
                onBack={() => setSelectedTopic(null)}
                isCompleted={completedTopics.includes(selectedTopic.id)}
                onToggleCompleted={handleToggleTopicCompleted}
                onOpenFlashcards={() => {
                  const allFlashcards = selectedTopic.flashcards || [];
                  setActiveFlashcards({ flashcards: allFlashcards, title: selectedTopic.title });
                }}
                onOpenQuiz={() => {
                  setActiveQuizSubject(selectedSubject);
                  setActiveQuizUnit(selectedUnitForTopic);
                }}
              />
            ) : selectedSubject ? (
              /* Si está en la vista detallada de una materia */
              <SubjectDetail
                subject={selectedSubject}
                onBack={() => setSelectedSubjectId(null)}
                onSelectTopic={(topic, unit) => {
                  setSelectedTopic(topic);
                  setSelectedUnitForTopic(unit);
                }}
                onOpenFlashcardsForUnit={(unit) => {
                  const unitFlashcards = unit.topics.flatMap(t => t.flashcards || []);
                  setActiveFlashcards({ flashcards: unitFlashcards, title: unit.title });
                }}
                onOpenQuizForUnit={(unit) => {
                  setActiveQuizSubject(selectedSubject);
                  setActiveQuizUnit(unit);
                }}
                completedTopics={completedTopics}
              />
            ) : (
              /* Vista General de Todas las Materias */
              <div className="container">
                <div style={{ marginBottom: '28px' }}>
                  <span className="badge" style={{ background: '#dbeafe', color: '#1e40af', marginBottom: '8px' }}>
                    4to de Primaria • Calendario B
                  </span>
                  <h1 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    Asignaturas y Textos Guía
                  </h1>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    Selecciona una materia para estudiar sus lecciones con el método pedagógico del colegio, repasar fichas y presentar evaluaciones.
                  </p>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '20px'
                }}>
                  {subjects.map(subject => {
                    const allTopics = subject.units.flatMap(u => u.topics);
                    const completedInSub = allTopics.filter(t => completedTopics.includes(t.id)).length;

                    return (
                      <SubjectCard
                        key={subject.id}
                        subject={subject}
                        completedCount={completedInSub}
                        totalTopics={allTopics.length}
                        onSelect={(id) => setSelectedSubjectId(id)}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PESTAÑA: SIMULACRO GENERAL LOGRO 01 */}
        {activeTab === 'exam' && (
          <ExamSimulator onOpenSubjectTopic={handleSelectSubjectForLogro} />
        )}

        {/* PESTAÑA: MIS LOGROS Y RECONOCIMIENTOS */}
        {activeTab === 'achievements' && (
          <AchievementsView
            stats={stats}
            completedTopics={completedTopics}
            quizResults={quizResults}
          />
        )}

        {/* PESTAÑA: GESTOR DE CONTENIDOS PARA PADRES */}
        {activeTab === 'contentManager' && (
          <ContentManager onSaveCustomTopic={handleSaveCustomTopic} />
        )}
      </main>

      {/* Modal de Quiz / Evaluación */}
      {activeQuizUnit && (
        <QuizModal
          unit={activeQuizUnit}
          subject={activeQuizSubject}
          onClose={() => {
            setActiveQuizUnit(null);
            setActiveQuizSubject(null);
            setStats(getStoredStats());
            setQuizResults(getQuizResults());
          }}
          onFinish={() => {
            setStats(getStoredStats());
            setQuizResults(getQuizResults());
          }}
          onReportQuestion={(qInfo) => {
            setFeedbackContext({
              subject: activeQuizSubject?.name || 'Evaluación',
              context: `Pregunta de Quiz: ${qInfo}`
            });
            setIsFeedbackModalOpen(true);
          }}
        />
      )}

      {/* Modal de Perfil de Estudiante e Historial */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onProfileChanged={handleProfileChanged}
        forceCreation={!currentProfile}
      />

      {/* Modal de Solicitud de Ajustes y Reportes de Familias */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        initialSubject={feedbackContext.subject}
        initialContext={feedbackContext.context}
      />

      {/* Botón Flotante Permanente */}
      <FloatingFeedbackButton onClick={() => {
        setFeedbackContext({ subject: '', context: '' });
        setIsFeedbackModalOpen(true);
      }} />

      {/* Footer Permanente con Mensaje Aclaratorio y Descargo de Responsabilidad */}
      <footer style={{
        background: '#ffffff',
        borderTop: '1px solid var(--border-color)',
        padding: '32px 0 24px',
        color: 'var(--text-secondary)'
      }}>
        <div className="container" style={{ maxWidth: '980px' }}>
          {/* Tarjeta de Descargo de Responsabilidad / Disclaimer */}
          <div style={{
            background: '#f8fafc',
            border: '1.5px solid #e2e8f0',
            borderRadius: 'var(--radius-lg)',
            padding: '20px 24px',
            marginBottom: '20px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#4338ca', fontWeight: 800, fontSize: '0.92rem' }}>
              <Heart size={18} color="#4f46e5" fill="#4f46e5" />
              <DualText
                es="Nota Informativa & Descargo de Responsabilidad"
                en="Educational Notice & Disclaimer"
                inline
              />
            </div>
            
            <p style={{ fontSize: '0.86rem', lineHeight: 1.6, color: '#334155', marginBottom: '10px' }}>
              Esta plataforma web fue creada con fines estrictamente pedagógicos por un <strong>padre de familia para el apoyo y repaso escolar de su hijo</strong>, basada en los temarios y textos guía de 4to de primaria en modalidad bilingüe.
            </p>

            <p style={{ fontSize: '0.82rem', lineHeight: 1.55, color: '#64748b' }}>
              ⚠️ <strong>Aclaración de responsabilidad:</strong> Esta es una iniciativa personal, privada e independiente sin ánimo de lucro. <strong>Ninguna institución educativa tiene vínculo, autoría, patrocinio ni responsabilidad institucional</strong> sobre este sitio web, sus contenidos, ejercicios o el uso que se le dé a esta plataforma de repaso.
            </p>
          </div>

          <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <p>© 2026-2027 Plataforma de Estudio Familiar • Grado 4to Calendario B • Diseñado con ❤️ para el aprendizaje</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
