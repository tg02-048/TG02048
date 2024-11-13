const sections = {
  'comandos-basicos-buttons': [
      { label: 'Descansar', audio: '2-Descansar.mp3' },
      { label: 'Avontade', audio: 'Avontade.mp3' },
      { label: 'Sentido', audio: '3-Sentido.mp3' },
      { label: 'Cobrir', audio: '4-Cobrir.mp3' },
      { label: 'Firme', audio: '5-Firme.mp3' },
      { label: 'Direita Volver', audio: '6-Direita Volver.mp3' },
      { label: 'Esquerda Volver', audio: '7-Esquerda Volver.mp3' },
      { label: 'Meia Volta Volver', audio: '8-Meia Volta Volver.mp3' },
      { label: 'Voltas Volver', audio: 'Voltas Volver.mp3' },
      { label: 'Apresentar Arma', audio: '9-Apresentar Arma.mp3' },
      { label: 'Ombro Arma', audio: '10-Ombro Arma.mp3' },
      { label: 'Descansar Arma', audio: '11-Descansar Arma.mp3' },
      { label: 'Cruzar Arma', audio: '12-Cruzar Arma.mp3' },
      { label: 'Armar Baioneta 3 tempos', audio: 'Armar Baioneta 3 tempos.mp3' },
      { label: 'Armar Baioneta c/ 1 tempo', audio: '13-Armar Baioneta.mp3' },
      { label: 'Desarmar Baioneta 3 tempos', audio: 'Desarmar Baioneta 3 tempos.mp3' },
      { label: 'Desarmar Baioneta c/ 1 tempo ', audio: '14-Desarmar Baioneta.mp3' },
      { label: 'Tempo', audio: '1-Tempo.mp3' },
      { label: 'Parar' },
  ],
  'marcha-buttons': [
      { label: 'Ordinário Marche S/ Dobrado', audio: '15-Ordinário Marche.mp3' },
      { label: 'Ordinário Marche C/ Dobrado', audio: 'Ordinário Marche Seguido do Dobrado.mp3' },
      { label: 'Somente Dobrado', audio: 'Dobrado.mp3' },
      { label: 'Alto', audio: 'Alto.MP3' },
      { label: 'Olhar a Direita', audio: '16-Olhar A Direita.mp3' },
      { label: 'Olhar a Esquerda', audio: '17-Olhar A Esquerda.mp3' },
      { label: 'Sem Cadência Marche', audio: '18-Sem Cadência.mp3' },
      { label: 'Acelerado Marche', audio: '19-Acelerado Marche.mp3' },
      { label: 'Parar' },
  ],
  'toques-especificos-buttons': [
      { label: 'Exórdio', audio: 'Exordio.mp3' },
      { label: 'Oficial General', audio: 'Oficial General.mp3' },
      { label: 'Continência à Bandeira', audio: 'Continência à Bandeira.mp3' },
      { label: 'Parar' },
  ],
  'cancoes-buttons': [
      { label: 'Canção do Exército', audio: 'Canção do Exército.mp3' },
      { label: 'Canção de Comunicações', audio: 'Canção Comunicações.mp3' },
      { label: 'Canção da Infantaria', audio: 'Canção Infantaria.mp3' },
      { label: 'Canção da Engenharia', audio: 'Canção da Engenharia.mp3' },
      { label: 'Canção da Cavalaria', audio: 'Canção da Cavalaria.mp3' },
      { label: 'Canção da Artilharia', audio: 'Canção da Artilharia.mp3' },
      { label: 'Hino Nacional', audio: 'Hino Nacional.mp3' },
      { label: 'Hino Nacional - Inst', audio: 'Hino Nacional Brasileiro (Instrumental).mp3' },
      { label: 'Hino à Bandeira', audio: 'Hino à Bandeira Nacional.mp3' },
      { label: 'Hino à Bandeira - Inst', audio: 'Hino a Bandeira Nacional (Instrumental).mp3' },
      { label: 'Fibra de Herói - Inst', audio: 'Fibra de Herói (Instrumental).mp3' },
      { label: 'Alvorada do lo schiavo', audio: 'Alvorada do lo schiavo.mp3' },
      { label: 'Parar' },
  ]
};

let currentAudio = null;
let currentDirectionAudio = null;

function playAudio(audioId, label) {
  const selectedAudio = document.getElementById(audioId);

  if (label === 'Olhar a Direita' || label === 'Olhar a Esquerda') {
    if (currentDirectionAudio && currentDirectionAudio.id !== audioId) {
      currentDirectionAudio.pause();
      currentDirectionAudio.currentTime = 0;
    }
    currentDirectionAudio = selectedAudio;
  } else {
    if (currentAudio && currentAudio.id !== audioId) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    currentAudio = selectedAudio;
  }

  selectedAudio.play();

  document.getElementById('audio-name').innerText = label;

  selectedAudio.onloadedmetadata = function () {
    const duration = formatTime(selectedAudio.duration);
    document.getElementById('audio-time').innerText = `00:00 / ${duration}`;
  };

  selectedAudio.ontimeupdate = function () {
    const currentTime = formatTime(selectedAudio.currentTime);
    const duration = formatTime(selectedAudio.duration);
    document.getElementById('audio-time').innerText = `${currentTime} / ${duration}`;
  };
}

function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  if (currentDirectionAudio) {
    currentDirectionAudio.pause();
    currentDirectionAudio.currentTime = 0;
    currentDirectionAudio = null;
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return minutes + ":" + (secs < 10 ? "0" + secs : secs);
}

function createButtonsAndAudios(sectionId, items) {
  const section = document.getElementById(sectionId);
  items.forEach((item, index) => {
      const button = document.createElement('button');
      button.innerHTML = item.label;
      const audioId = sectionId + '_audio_' + index;
      button.onclick = () => {
        if (item.label === 'Parar') {
          stopAudio();
        } else {
          playAudio(audioId, item.label);
        }
      };
      
      section.appendChild(button);

      if (item.audio) {
          const audio = document.createElement('audio');
          audio.id = audioId;
          audio.src = 'audios/' + item.audio;
          audio.preload = 'auto';
          section.appendChild(audio);
      }
  });
}

for (const sectionId in sections) {
  createButtonsAndAudios(sectionId, sections[sectionId]);
}
