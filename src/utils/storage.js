// Sistema de Perfiles Multiusuario y Persistencia para Estudiantes de 4to Primaria

const PROFILES_KEY = 'estudio_4to_profiles_list';
const ACTIVE_PROFILE_ID_KEY = 'estudio_4to_active_profile_id';

// Lista de Avatares infantiles predeterminados
export const AVATAR_OPTIONS = [
  { id: 'lion', icon: '🦁', name: 'León Valiente' },
  { id: 'owl', icon: '🦉', name: 'Búho Sabio' },
  { id: 'astronaut', icon: '🚀', name: 'Astronauta' },
  { id: 'robot', icon: '🤖', name: 'Robot Creador' },
  { id: 'wizard', icon: '🧙‍♂️', name: 'Mago de Camelot' },
  { id: 'scientist', icon: '🔬', name: 'Científico' },
  { id: 'cheetah', icon: '🐆', name: 'Guepardo Veloz' },
  { id: 'eagle', icon: '🦅', name: 'Águila Real' }
];

// Obtener lista de todos los perfiles guardados en el navegador
export function getAllProfiles() {
  try {
    const data = localStorage.getItem(PROFILES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error al leer perfiles:', e);
    return [];
  }
}

// Obtener el ID del perfil activo actual
export function getActiveProfileId() {
  try {
    return localStorage.getItem(ACTIVE_PROFILE_ID_KEY) || null;
  } catch (e) {
    return null;
  }
}

// Obtener datos del perfil activo
export function getActiveProfile() {
  const activeId = getActiveProfileId();
  const profiles = getAllProfiles();
  if (!activeId || profiles.length === 0) return null;
  return profiles.find(p => p.id === activeId) || profiles[0];
}

// Crear un nuevo perfil de estudiante
export function createProfile(name, course = '401', avatarId = 'owl') {
  const newProfile = {
    id: 'student_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
    name: name.trim(),
    course,
    avatarId,
    createdAt: new Date().toISOString(),
    stats: {
      xp: 0,
      level: 1,
      streak: 1,
      totalQuizzes: 0,
      perfectQuizzes: 0,
      lastActiveDate: new Date().toISOString().split('T')[0]
    },
    completedTopics: [],
    quizResults: [], // Historial detallado de quices: { unitId, score, total, date, subjectName }
    badges: ['welcome_estudio_4to']
  };

  const profiles = getAllProfiles();
  profiles.push(newProfile);
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  localStorage.setItem(ACTIVE_PROFILE_ID_KEY, newProfile.id);

  return newProfile;
}

// Cambiar de perfil activo
export function setActiveProfile(profileId) {
  localStorage.setItem(ACTIVE_PROFILE_ID_KEY, profileId);
}

// Guardar cambios en el perfil activo
export function saveActiveProfileData(updatedData) {
  const activeProfile = getActiveProfile();
  if (!activeProfile) return;

  const profiles = getAllProfiles();
  const updatedProfiles = profiles.map(p => {
    if (p.id === activeProfile.id) {
      return { ...p, ...updatedData };
    }
    return p;
  });

  localStorage.setItem(PROFILES_KEY, JSON.stringify(updatedProfiles));
}

// Registrar tema completado para el perfil activo
export function markTopicCompleted(topicId) {
  const profile = getActiveProfile();
  if (!profile) return [];

  const completed = profile.completedTopics || [];
  let updated;
  if (completed.includes(topicId)) {
    updated = completed.filter(id => id !== topicId);
  } else {
    updated = [...completed, topicId];
    addXp(50);
  }

  saveActiveProfileData({ completedTopics: updated });
  return updated;
}

// Obtener temas completados del perfil activo
export function getCompletedTopics() {
  const profile = getActiveProfile();
  return profile?.completedTopics || [];
}

// Otorgar puntos XP y calcular nivel
export function addXp(amount) {
  const profile = getActiveProfile();
  if (!profile) return;

  const currentXp = (profile.stats?.xp || 0) + amount;
  const newLevel = Math.floor(currentXp / 200) + 1;

  const updatedStats = {
    ...profile.stats,
    xp: currentXp,
    level: newLevel
  };

  saveActiveProfileData({ stats: updatedStats });
}

// Guardar resultado de un quiz en el historial del estudiante
export function saveQuizResult(unitId, score, total, subjectName = '') {
  const profile = getActiveProfile();
  if (!profile) return;

  const newResult = {
    id: 'quiz_' + Date.now(),
    unitId,
    subjectName,
    score,
    total,
    percentage: Math.round((score / total) * 100),
    date: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    timestamp: Date.now()
  };

  const currentHistory = profile.quizResults || [];
  const updatedHistory = [newResult, ...currentHistory];

  const isPerfect = score === total;
  const updatedStats = {
    ...profile.stats,
    totalQuizzes: (profile.stats?.totalQuizzes || 0) + 1,
    perfectQuizzes: isPerfect ? (profile.stats?.perfectQuizzes || 0) + 1 : (profile.stats?.perfectQuizzes || 0)
  };

  saveActiveProfileData({
    quizResults: updatedHistory,
    stats: updatedStats
  });
}

// Obtener historial de quices
export function getQuizResults() {
  const profile = getActiveProfile();
  return profile?.quizResults || [];
}

// Obtener estadísticas
export function getStoredStats() {
  const profile = getActiveProfile();
  return profile?.stats || {
    xp: 0,
    level: 1,
    streak: 1,
    totalQuizzes: 0,
    perfectQuizzes: 0
  };
}
