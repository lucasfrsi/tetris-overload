import { useState } from 'react';

export const useSFX = () => {
  const [SFX, setSFX] = useState({
    mute: true,
  });

  const toggleMuteSFX = () => setSFX((prev) => ({
    ...prev,
    mute: !prev.mute,
  }));

  return {
    state: {
      SFX,
    },
    actions: {
      toggleMuteSFX,
    },
  };
};
