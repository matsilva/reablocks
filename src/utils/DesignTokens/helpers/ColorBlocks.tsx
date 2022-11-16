import React from 'react';
import { useDts } from '../DesignTokensContext';

export const ColorBlock = ({ name, color }) => (
  <div
    key={name}
    style={{
      border: 'solid 1px var(--slate-500)',
      borderRadius: 5,
      overflow: 'hidden'
    }}
  >
    <div
      style={{
        padding: 20,
        background: color,
        borderBottom: 'solid 1px var(--slate-500)'
      }}
    />
    <div style={{ padding: '5px 10px' }}>
      <div>
        <code>{name}</code>
      </div>
      <div>
        <code>{color}</code>
      </div>
    </div>
  </div>
);

export const ColorBlocks = () => {
  const { colors } = useDts();

  return (
    <div
      style={{
        padding: '5px 15px',
        fontFamily: 'var(--font-family)',
        color: 'var(--body-color)',
        width: '100%'
      }}
    >
      {colors ? (
        <>
          {Object.keys(colors).map(key => (
            <div
              key={key}
              style={{
                marginBottom: 20
              }}
            >
              <h3 style={{ fontWeight: 500, margin: 0 }}>
                {key}
                <br />
                <small>
                  <code>colors.{key}</code>
                </small>
              </h3>
              <div
                style={{
                  display: 'grid',
                  gap: 12,
                  gridTemplateColumns: 'repeat(auto-fit, minmax(auto, 300px))'
                }}
              >
                {Object.keys(colors[key]).map(color => (
                  <ColorBlock
                    key={`--${key}-${color}`}
                    name={`--${key}-${color}`}
                    color={colors[key][color]}
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>⚠️ No colors defined</p>
      )}
    </div>
  );
};
