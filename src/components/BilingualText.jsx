import React from 'react';

/**
 * Componente universal para renderizar texto bilingüe (Texto Principal + Traducción Suave en Azul / Color Destacado)
 * @param {string} es - Texto en español
 * @param {string} en - Texto en inglés
 * @param {string} primary - 'es' (default) o 'en' (para materias/secciones nativas en inglés)
 * @param {object} primaryStyle - Estilos opcionales para el texto principal
 * @param {object} secondaryStyle - Estilos opcionales para la traducción suave
 * @param {boolean} inline - Si debe mostrarse en línea o en bloque vertical
 */
export function DualText({
  es,
  en,
  primary = 'es',
  primaryStyle = {},
  secondaryStyle = {},
  inline = false,
  className = ''
}) {
  const mainText = primary === 'en' ? en : es;
  const subText = primary === 'en' ? es : en;

  if (!subText || subText === mainText) {
    return <span style={primaryStyle} className={className}>{mainText}</span>;
  }

  // Color de traducción por defecto en fondos blancos/claros: Azul pedagógico (#2563eb / #0284c7)
  const defaultSecondaryColor = primary === 'en' ? '#059669' : '#2563eb';

  if (inline) {
    return (
      <span className={className} style={{ display: 'inline-flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap', ...primaryStyle }}>
        <span>{mainText}</span>
        <span style={{
          fontSize: '0.85em',
          color: defaultSecondaryColor,
          fontStyle: 'italic',
          fontWeight: 500,
          ...secondaryStyle
        }}>
          ({subText})
        </span>
      </span>
    );
  }

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: '2px', ...primaryStyle }}>
      <span>{mainText}</span>
      <span style={{
        fontSize: '0.85em',
        color: defaultSecondaryColor,
        fontStyle: 'italic',
        fontWeight: 500,
        lineHeight: 1.35,
        ...secondaryStyle
      }}>
        {subText}
      </span>
    </div>
  );
}
