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
    localStorage.setItem('calatrava_4to_custom_subjects', JSON.stringify(updatedSubjects));
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
        />
      )}

      {/* Modal de Perfil de Estudiante e Historial */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onProfileChanged={handleProfileChanged}
        forceCreation={!currentProfile}
      />

      {/* Footer */}
      <footer style={{
        background: '#ffffff',
        borderTop: '1px solid var(--border-color)',
        padding: '20px 0',
        textAlign: 'center',
        fontSize: '0.85rem',
        color: 'var(--text-muted)'
      }}>
        <div className="container">
          <p>© 2026-2027 Plataforma de Estudio Gimnasio Calatrava • 4to de Primaria Calendario B</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
