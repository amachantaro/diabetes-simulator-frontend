
import React from 'react';

const Menu = ({ onSelectTheme }) => {
  const themes = [
    '1. 病態生理編',
    '2. 食事療法編',
    '3. 運動療法編',
    '4. 薬物療法編',
    '5. 日常生活編',
  ];

  return (
    <div className="Menu">
      <h1>メニュー</h1>
      <div className="menu-buttons">
        {themes.map((theme) => (
          <button key={theme} onClick={() => onSelectTheme(theme)}>
            {theme}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
