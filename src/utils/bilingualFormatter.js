// Helper para formatear contenido bilingüe interlineal (Texto Principal + Traducción Suave debajo)
// Formato: cada bloque contiene { original: "...", translation: "...", originalLang: "es"|"en" }

export const formatBilingualBlock = (original, translation, originalLang = 'es') => ({
  original,
  translation,
  originalLang
});
