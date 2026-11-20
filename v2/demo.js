(() => {
  'use strict';

  // Embedded fallback dictionary so demo.html remains playable even under file:// URLs
  // when fetch('dict/words_X.txt') is unavailable.
  const FALLBACK_WORDS = {
    4: [
      'MILK', 'MILE', 'MILD', 'MOLD', 'MOLE', 'SILK', 'SICK', 'SOCK', 'SOUK', 'SOUP',
      'SOLD', 'SOLE', 'SOME', 'SORE', 'SORT', 'SOFT', 'COLD', 'CORD', 'WORD', 'WORM',
      'WARM', 'WARD', 'CARD', 'HARD', 'HARE', 'HERE', 'HIRE', 'FIRE', 'FINE', 'FIVE',
      'LIVE', 'LOVE', 'LONE', 'LATE', 'HATE', 'HAVE', 'HIVE', 'HEAD', 'HEAL', 'TEAL',
      'TELL', 'TALL', 'TAIL', 'FAIL', 'FALL', 'WALL', 'WALK', 'TALK', 'LEAD', 'LOAD',
      'GOAD', 'GOLD', 'GOOD', 'FOOD', 'FOOL', 'POOL', 'POOR', 'BOOR', 'BOOK', 'LOOK',
      'LOCK', 'ROCK', 'RICE', 'RICH', 'RAIN', 'MAIN', 'PAIN', 'GAIN', 'FAIR', 'PAIR',
      'DARK', 'DARE', 'DART', 'PART', 'PAST', 'FAST', 'LAST', 'DAWN', 'LAWN', 'PAWN',
      'WIND', 'WINE', 'WING', 'RING', 'KING', 'SING', 'SONG', 'SNOW', 'SLOW', 'SHOW',
      'SEED', 'SEEN', 'TEEN', 'THEE', 'TREE', 'FREE', 'FLEE', 'BLED', 'BRED', 'BEND',
      'SEND', 'LEND', 'LAND', 'HAND', 'BAND', 'SAND', 'SANK', 'BANK', 'BARK', 'MARK',
      'PARK', 'MASK', 'TASK', 'BASK', 'BACK', 'RACK', 'PACK', 'PICK', 'LICK', 'KICK'
    ],
    5: [
      'STONE', 'ATONE', 'ALONE', 'CLONE', 'CLOSE', 'CHOSE', 'WHOSE', 'WHITE', 'WHILE',
      'WHALE', 'SHALE', 'SHARE', 'SHORE', 'STORE', 'STARE', 'START', 'SMART', 'SMILE',
      'SLIME', 'CLIME', 'CHIME', 'CRIME', 'PRIME', 'PRIDE', 'BRIDE', 'BRINE', 'SHINE',
      'SPINE', 'SPITE', 'SPLIT', 'BLACK', 'SLACK', 'STACK', 'STALK', 'SHALK', 'CHALK',
      'MONEY', 'HONEY', 'BONEY', 'BONES', 'TONES', 'CONES', 'STONES', 'HEART', 'HEARD',
      'BEARD', 'BEARS', 'TEARS', 'FEARS', 'YEARS', 'GEARS', 'BRAIN', 'TRAIN', 'GRAIN',
      'CHAIN', 'CHAIR', 'CHOIR', 'WATER', 'LATER', 'HATER', 'MAKER', 'TAKER', 'BAKER',
      'SAVER', 'LOVER', 'COVER', 'ROVER', 'RIVER', 'RIDER', 'WIDER', 'STEAM', 'STEAL',
      'STEEL', 'STEER', 'SHEER', 'SHEEP', 'SLEEP', 'SWEEP', 'SWEET', 'LAUGH', 'NIGHT',
      'LIGHT', 'SIGHT', 'RIGHT', 'MIGHT', 'FIGHT', 'TIGHT', 'BREAD', 'TREAD', 'TREAT',
      'GREAT', 'GROAT', 'BOAST', 'ROAST', 'COAST', 'TOAST', 'SPARK', 'SPARE', 'FLARE',
      'FLAME', 'BLAME', 'FRAME', 'SHAME', 'SHAKE', 'STAKE', 'STAGE', 'STATE'
    ],
    6: [
      'CANDLE', 'HANDLE', 'HASSLE', 'CASTLE', 'CATTLE', 'BATTLE', 'RATTLE', 'TANGLE',
      'SINGLE', 'MINGLE', 'JINGLE', 'DANGLE', 'MANGLE', 'RIDDLE', 'MIDDLE', 'FIDDLE',
      'CUDDLE', 'PUDDLE', 'SADDLE', 'SILVER', 'FILTER', 'FALTER', 'FASTER', 'MASTER',
      'MISTER', 'SISTER', 'HUNTER', 'WINTER', 'CENTER', 'GARDEN', 'WARDEN', 'HARDEN',
      'DARKEN', 'DARKER', 'MARKER', 'PARKER', 'PLANET', 'PLATES', 'SLATES', 'STATED',
      'SEATED', 'HEATED', 'BEATED', 'FLOWER', 'SLOWER', 'GLOWER', 'BLOWER', 'BLADED',
      'MARKET', 'BARKER', 'BARREL', 'BURIED', 'BURLAP', 'CARPET', 'TARGET'
    ],
    7: [
      'WALKING', 'TALKING', 'TAKING', 'WAKING', 'BAKING', 'MAKING', 'RAKING', 'SINKING',
      'WINKING', 'LINKING', 'PINKING', 'THINKER', 'LETTERS', 'BETTERS', 'SETTERS', 'MATTERS',
      'MASTERS', 'CASTERS', 'FASTERS', 'HUNTERS', 'WINTERS', 'CENTERS', 'RENTERS', 'TENTERS',
      'BUTTERS', 'CUTTERS', 'GUTTERS', 'GARDENS', 'HARDENS', 'WARDENS', 'BARRELS', 'CARRELS',
      'PLANETS', 'BLANKET', 'BRACKET', 'TRAFFIC'
    ]
  };

  const CURATED_PAIRS = {
    4: [
      ['MILK', 'SOUP'],
      ['COLD', 'WARM'],
      ['HEAD', 'TAIL'],
      ['LOVE', 'HATE'],
      ['LEAD', 'GOLD'],
      ['POOR', 'RICH'],
      ['FIRE', 'RAIN'],
      ['DARK', 'DAWN'],
      ['WIND', 'SNOW'],
      ['SEED', 'TREE']
    ],
    5: [
      ['STONE', 'MONEY'],
      ['BLACK', 'WHITE'],
      ['HEART', 'BRAIN'],
      ['WATER', 'STEAM'],
      ['SMILE', 'LAUGH'],
      ['NIGHT', 'LIGHT'],
      ['BREAD', 'TOAST'],
      ['SPARK', 'FLAME']
    ],
    6: [
      ['CANDLE', 'RIDDLE'],
      ['CASTLE', 'TANGLE'],
      ['SILVER', 'FASTER'],
      ['MASTER', 'HUNTER'],
      ['GARDEN', 'DARKER'],
      ['PLANET', 'SEATED'],
      ['FLOWER', 'BLADED'],
      ['MARKET', 'BURIED']
    ],
    7: [
      ['WALKING', 'SINKING'],
      ['LETTERS', 'MASTERS'],
      ['HUNTERS', 'CENTERS'],
      ['WINTERS', 'BUTTERS'],
      ['GARDENS', 'BARRELS']
    ]
  };

  const CURATED_FALLBACK_PATHS = {
    'MILK->SOUP': ['MILK', 'SILK', 'SICK', 'SOCK', 'SOUK', 'SOUP'],
    'COLD->WARM': ['COLD', 'CORD', 'WORD', 'WORM', 'WARM'],
    'HEAD->TAIL': ['HEAD', 'HEAL', 'TEAL', 'TELL', 'TALL', 'TAIL'],
    'LOVE->HATE': ['LOVE', 'LONE', 'LATE', 'HATE'],
    'LEAD->GOLD': ['LEAD', 'LOAD', 'GOAD', 'GOLD']
  };

  class WebWordDictionary {
    constructor() {
      this.sets = {
        4: new Set(FALLBACK_WORDS[4]),
        5: new Set(FALLBACK_WORDS[5]),
        6: new Set(FALLBACK_WORDS[6]),
        7: new Set(FALLBACK_WORDS[7])
      };
      this.loadedFull = { 4: false, 5: false, 6: false, 7: false };
      this.loadingPromises = {};
    }

    async ensureLengthLoaded(length) {
      if (this.loadedFull[length]) return this.sets[length];
      if (this.loadingPromises[length]) return this.loadingPromises[length];

      this.loadingPromises[length] = (async () => {
        try {
          const resp = await fetch(`dict/words_${length}.txt`);
          if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
          const text = await resp.text();
          const parsed = text
            .split(/\r?\n/)
            .map((w) => w.trim().toUpperCase())
            .filter((w) => w.length === length && /^[A-Z]+$/.test(w));
          if (parsed.length > 0) {
            this.sets[length] = new Set(parsed);
            this.loadedFull[length] = true;
          }
        } catch (_err) {
          // Keep fallback dictionary if opened directly via file:// or offline.
        }
        return this.sets[length];
      })();

      return this.loadingPromises[length];
    }

    wordsForLength(length) {
      return this.sets[length] || new Set();
    }

    totalLoadedCount() {
      return (
        this.sets[4].size +
        this.sets[5].size +
        this.sets[6].size +
        this.sets[7].size
      );
    }

    isValidWord(word) {
      const upper = String(word || '').trim().toUpperCase();
      return this.wordsForLength(upper.length).has(upper);
    }

    neighbors(word, excluded = new Set()) {
      const upper = String(word || '').toUpperCase();
      const dict = this.wordsForLength(upper.length);
      if (dict.size === 0) return [];
      const res = [];
      const chars = upper.split('');
      for (let i = 0; i < chars.length; i++) {
        const orig = chars[i];
        for (let code = 65; code <= 90; code++) {
          const ch = String.fromCharCode(code);
          if (ch === orig) continue;
          chars[i] = ch;
          const next = chars.join('');
          if (dict.has(next) && !excluded.has(next)) {
            res.push(next);
          }
        }
        chars[i] = orig;
      }
      return res;
    }

    findShortestPath(start, target, excluded = new Set()) {
      const s = String(start || '').toUpperCase();
      const t = String(target || '').toUpperCase();
      if (s.length !== t.length || s.length === 0) return null;
      const dict = this.wordsForLength(s.length);
      if (!dict.has(s) || !dict.has(t)) return null;
      if (s === t) return [s];

      const startParents = new Map([[s, null]]);
      const targetParents = new Map([[t, null]]);
      let startFrontier = [s];
      let targetFrontier = [t];

      const reconstruct = (leftNode, rightNode) => {
        const leftPath = [];
        let cur = leftNode;
        while (cur !== null) {
          leftPath.push(cur);
          cur = startParents.get(cur) ?? null;
        }
        leftPath.reverse();
        cur = rightNode;
        while (cur !== null) {
          leftPath.push(cur);
          cur = targetParents.get(cur) ?? null;
        }
        return leftPath;
      };

      while (startFrontier.length > 0 && targetFrontier.length > 0) {
        if (startFrontier.length <= targetFrontier.length) {
          const nextFrontier = [];
          for (const current of startFrontier) {
            const chars = current.split('');
            for (let i = 0; i < chars.length; i++) {
              const orig = chars[i];
              for (let code = 65; code <= 90; code++) {
                const ch = String.fromCharCode(code);
                if (ch === orig) continue;
                chars[i] = ch;
                const next = chars.join('');
                if (targetParents.has(next)) {
                  return reconstruct(current, next);
                }
                if (dict.has(next) && !excluded.has(next) && !startParents.has(next)) {
                  startParents.set(next, current);
                  nextFrontier.push(next);
                }
              }
              chars[i] = orig;
            }
          }
          startFrontier = nextFrontier;
        } else {
          const nextFrontier = [];
          for (const current of targetFrontier) {
            const chars = current.split('');
            for (let i = 0; i < chars.length; i++) {
              const orig = chars[i];
              for (let code = 65; code <= 90; code++) {
                const ch = String.fromCharCode(code);
                if (ch === orig) continue;
                chars[i] = ch;
                const prev = chars.join('');
                if (startParents.has(prev)) {
                  return reconstruct(prev, current);
                }
                if (dict.has(prev) && !excluded.has(prev) && !targetParents.has(prev)) {
                  targetParents.set(prev, current);
                  nextFrontier.push(prev);
                }
              }
              chars[i] = orig;
            }
          }
          targetFrontier = nextFrontier;
        }
      }

      return null;
    }

    shortestDistance(from, target, excluded = new Set()) {
      const p = this.findShortestPath(from, target, excluded);
      if (!p) return -1;
      return Math.max(0, p.length - 1);
    }

    validateCustomPair(start, target) {
      const s = String(start || '').trim().toUpperCase();
      const t = String(target || '').trim().toUpperCase();
      if (s.length < 4 || s.length > 7 || t.length < 4 || t.length > 7) {
        return { valid: false, reason: 'Use 4, 5, 6, or 7-letter English words.' };
      }
      if (s.length !== t.length) {
        return { valid: false, reason: 'Start and target words must have equal length.' };
      }
      if (s === t) {
        return { valid: false, reason: 'Start and target words must be different.' };
      }
      if (!this.isValidWord(s)) {
        return { valid: false, reason: `${s} is not in the English dictionary.` };
      }
      if (!this.isValidWord(t)) {
        return { valid: false, reason: `${t} is not in the English dictionary.` };
      }
      const path = this.findShortestPath(s, t);
      if (!path) {
        return { valid: false, reason: `No single-letter ladder connects ${s} to ${t}.` };
      }
      return { valid: true, optimalSteps: path.length - 1, startWord: s, targetWord: t };
    }

    curatedPuzzles(length) {
      const pairs = CURATED_PAIRS[length] || [];
      return pairs
        .map(([startWord, targetWord]) => {
          const dist = this.shortestDistance(startWord, targetWord);
          if (dist > 0) {
            return { startWord, targetWord, optimalSteps: dist, wordLength: length };
          }
          const fb = CURATED_FALLBACK_PATHS[`${startWord}->${targetWord}`];
          if (fb) {
            return { startWord, targetWord, optimalSteps: fb.length - 1, wordLength: length };
          }
          return null;
        })
        .filter(Boolean);
    }

    generateRandomPuzzle(length, minSteps = 3, maxSteps = 7) {
      const dict = this.wordsForLength(length);
      const list = Array.from(dict);
      if (list.length === 0) {
        return this.curatedPuzzles(length)[0] || {
          startWord: 'MILK',
          targetWord: 'SOUP',
          optimalSteps: 5,
          wordLength: 4
        };
      }

      const desiredSteps = minSteps + Math.floor(Math.random() * Math.max(1, maxSteps - minSteps + 1));
      for (let attempt = 0; attempt < 28; attempt++) {
        const start = list[Math.floor(Math.random() * list.length)];
        const visited = new Map([[start, 0]]);
        let frontier = [start];
        let deepest = [];

        for (let depth = 1; depth <= desiredSteps; depth++) {
          const next = [];
          for (const node of frontier) {
            for (const nb of this.neighbors(node)) {
              if (!visited.has(nb)) {
                visited.set(nb, depth);
                next.push(nb);
              }
            }
          }
          if (next.length === 0) break;
          frontier = next;
          if (depth >= minSteps) {
            deepest = frontier;
          }
        }

        if (deepest.length > 0) {
          const target = deepest[Math.floor(Math.random() * deepest.length)];
          const steps = visited.get(target) || desiredSteps;
          return {
            startWord: start,
            targetWord: target,
            optimalSteps: steps,
            wordLength: length
          };
        }
      }

      const fallback = this.curatedPuzzles(length);
      return fallback[Math.floor(Math.random() * fallback.length)] || {
        startWord: 'MILK',
        targetWord: 'SOUP',
        optimalSteps: 5,
        wordLength: 4
      };
    }
  }

  function speedMultiplier(elapsedSec) {
    if (elapsedSec <= 4) return 2.5;
    if (elapsedSec <= 8) return 2.0;
    if (elapsedSec <= 14) return 1.5;
    if (elapsedSec <= 22) return 1.25;
    return 1.0;
  }

  function diffIndex(a, b) {
    if (!a || !b || a.length !== b.length) return -1;
    let diffs = 0;
    let pos = -1;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        diffs += 1;
        pos = i;
      }
    }
    return diffs === 1 ? pos : -1;
  }

  function pickBotMove(dict, currentWord, targetWord, usedWords, difficulty, allowBacktrack) {
    const excluded = allowBacktrack ? new Set() : usedWords;
    const candidates = dict.neighbors(currentWord, excluded).filter((w) => {
      return allowBacktrack || !usedWords.has(w);
    });
    if (candidates.length === 0) return null;

    if (candidates.includes(targetWord)) return targetWord;

    const scored = candidates.map((cand) => {
      const dist = dict.shortestDistance(cand, targetWord, new Set());
      return { word: cand, dist: dist < 0 ? 999 : dist };
    });
    scored.sort((a, b) => a.dist - b.dist);

    if (difficulty === 'MASTER') {
      return scored[0].word;
    }
    if (difficulty === 'TACTICIAN') {
      const pool = scored.slice(0, Math.min(3, scored.length));
      return pool[Math.floor(Math.random() * pool.length)].word;
    }
    const pool = scored.slice(0, Math.min(6, scored.length));
    return pool[Math.floor(Math.random() * pool.length)].word;
  }

  // Export logic for Node verification if required without DOM
  if (typeof module !== 'undefined' && module.exports && typeof document === 'undefined') {
    module.exports = { WebWordDictionary, speedMultiplier, diffIndex, pickBotMove };
    return;
  }

  // ============================================================================
  // UI & Interactive Game Controller
  // ============================================================================
  const dict = new WebWordDictionary();

  const state = {
    view: 'setup', // 'setup' | 'board'
    theme: localStorage.getItem('wl_theme') === 'light' ? 'light' : 'dark',
    tileStyle: localStorage.getItem('wl_tile_style') || 'ivory', // 'ivory' | 'gold' | 'stone'
    wordLength: 4,
    playerCount: 2,
    selectedPuzzle: { startWord: 'MILK', targetWord: 'SOUP', optimalSteps: 5, wordLength: 4 },
    customStatus: { text: 'Pick a preset, hit Randomize, or enter your own Start & Target words.', kind: '' },
    timerEnabled: false,
    allowBacktrack: true,
    seats: [
      { id: 'p1', name: 'Player 1', type: 'HUMAN', difficulty: 'TACTICIAN' },
      { id: 'p2', name: 'Bot Sage', type: 'BOT', difficulty: 'TACTICIAN' },
      { id: 'p3', name: 'Player 3', type: 'HUMAN', difficulty: 'CASUAL' },
      { id: 'p4', name: 'Bot Master', type: 'BOT', difficulty: 'MASTER' }
    ],

    // Active game runtime
    game: null,
    activeSlot: 0,
    draftWord: '',
    feedback: { text: '', kind: '' },
    turnStartedAt: 0,
    turnElapsedSec: 0,
    timerInterval: null,
    botTimeout: null
  };

  const els = {};

  function cacheElements() {
    const ids = [
      'themeBtn', 'tileStyleBtn', 'dictStatusChip', 'setupScreen', 'boardScreen',
      'lengthSeg', 'curatedChips', 'randomPuzzleBtn', 'customStartInput', 'customTargetInput',
      'validateCustomBtn', 'customPairBanner', 'playerCountSeg', 'seatsList',
      'setupTimerSwitch', 'setupBacktrackSwitch', 'startMatchBtn', 'backToSetupBtn',
      'boardTimerSwitch', 'timerPill', 'targetStartPill', 'targetEndPill',
      'parMetaPill', 'distMetaPill', 'scoreboardStrip', 'ladderTray', 'turnOwnerLabel',
      'draftSlotsRow', 'slotLeftBtn', 'slotRightBtn', 'slotPosLabel', 'draftFeedback',
      'hintBtn', 'revertBtn', 'passBtn', 'submitWordBtn', 'endMatchBtn', 'qwertyDeck',
      'victoryPanel', 'victorySummary', 'optimalPathRow', 'playAgainBtn', 'newPuzzleBtn'
    ];
    for (const id of ids) {
      els[id] = document.getElementById(id);
    }
  }

  function applyVisualPrefs() {
    document.body.classList.toggle('dark', state.theme === 'dark');
    if (els.themeBtn) {
      els.themeBtn.textContent = state.theme === 'dark' ? 'WARM OAK' : 'SLATE NIGHT';
    }
    document.body.classList.remove('tiles-gold', 'tiles-stone');
    if (state.tileStyle === 'gold') document.body.classList.add('tiles-gold');
    if (state.tileStyle === 'stone') document.body.classList.add('tiles-stone');
    if (els.tileStyleBtn) {
      const label = state.tileStyle.toUpperCase();
      els.tileStyleBtn.textContent = `TILES: ${label}`;
    }
  }

  function updateDictChip() {
    if (!els.dictStatusChip) return;
    const count = dict.totalLoadedCount();
    const lenLoaded = dict.loadedFull[state.wordLength];
    els.dictStatusChip.textContent = lenLoaded
      ? `${count.toLocaleString()} WORDS READY`
      : `${state.wordLength}L LOADING (${count.toLocaleString()})`;
  }

  async function selectWordLength(len) {
    state.wordLength = len;
    updateDictChip();
    await dict.ensureLengthLoaded(len);
    updateDictChip();
    const curated = dict.curatedPuzzles(len);
    if (curated.length > 0) {
      state.selectedPuzzle = curated[0];
    } else {
      state.selectedPuzzle = dict.generateRandomPuzzle(len);
    }
    if (els.customStartInput && els.customTargetInput) {
      els.customStartInput.maxLength = len;
      els.customTargetInput.maxLength = len;
      els.customStartInput.value = state.selectedPuzzle.startWord;
      els.customTargetInput.value = state.selectedPuzzle.targetWord;
    }
    state.customStatus = {
      text: `${state.selectedPuzzle.startWord} → ${state.selectedPuzzle.targetWord} (${state.selectedPuzzle.optimalSteps} optimal steps)`,
      kind: 'ok'
    };
    renderSetup();
  }

  function renderSetup() {
    // Length segments
    Array.from(els.lengthSeg.querySelectorAll('.seg-btn')).forEach((btn) => {
      btn.classList.toggle('active', Number(btn.dataset.len) === state.wordLength);
    });

    // Curated chips
    const curated = dict.curatedPuzzles(state.wordLength);
    els.curatedChips.innerHTML = curated
      .map((p, idx) => {
        const isActive =
          p.startWord === state.selectedPuzzle.startWord &&
          p.targetWord === state.selectedPuzzle.targetWord;
        return `<button type="button" class="pair-chip ${isActive ? 'active' : ''}" data-idx="${idx}">${p.startWord} → ${p.targetWord}</button>`;
      })
      .join('');

    els.curatedChips.querySelectorAll('.pair-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const p = curated[Number(chip.dataset.idx)];
        if (!p) return;
        state.selectedPuzzle = p;
        els.customStartInput.value = p.startWord;
        els.customTargetInput.value = p.targetWord;
        state.customStatus = {
          text: `${p.startWord} → ${p.targetWord} (${p.optimalSteps} optimal steps)`,
          kind: 'ok'
        };
        renderSetup();
      });
    });

    // Status banner
    els.customPairBanner.textContent = state.customStatus.text;
    els.customPairBanner.className = `status-banner ${state.customStatus.kind || ''}`;

    // Player count
    Array.from(els.playerCountSeg.querySelectorAll('.seg-btn')).forEach((btn) => {
      btn.classList.toggle('active', Number(btn.dataset.count) === state.playerCount);
    });

    // Seats
    const visibleSeats = state.seats.slice(0, state.playerCount);
    els.seatsList.innerHTML = visibleSeats
      .map((seat, i) => {
        const isSolo = state.playerCount === 1;
        const canBot = !isSolo && i > 0;
        const typeLabel = seat.type === 'BOT' ? 'BOT' : 'HUMAN';
        const diffCycle = seat.difficulty;
        return `
          <div class="seat-row" data-seat="${i}">
            <input class="seat-name-input" type="text" maxlength="16" value="${seat.name}" data-seat-name="${i}" aria-label="Player ${i + 1} name" />
            <div class="seat-controls">
              ${
                canBot
                  ? `<button type="button" class="mini-pill-btn ${seat.type === 'BOT' ? 'bot' : ''}" data-toggle-type="${i}">${typeLabel}</button>`
                  : `<span class="mini-pill-btn">${isSolo ? 'SOLO' : 'HOST'}</span>`
              }
              ${
                canBot && seat.type === 'BOT'
                  ? `<button type="button" class="mini-pill-btn" data-cycle-diff="${i}">${diffCycle}</button>`
                  : ''
              }
            </div>
          </div>
        `;
      })
      .join('');

    els.seatsList.querySelectorAll('[data-seat-name]').forEach((inp) => {
      inp.addEventListener('input', (e) => {
        const idx = Number(e.target.dataset.seatName);
        state.seats[idx].name = e.target.value;
      });
    });

    els.seatsList.querySelectorAll('[data-toggle-type]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.toggleType);
        const s = state.seats[idx];
        s.type = s.type === 'BOT' ? 'HUMAN' : 'BOT';
        if (s.type === 'BOT' && s.name.startsWith('Player')) {
          s.name = `Bot ${idx + 1}`;
        } else if (s.type === 'HUMAN' && s.name.startsWith('Bot')) {
          s.name = `Player ${idx + 1}`;
        }
        renderSetup();
      });
    });

    els.seatsList.querySelectorAll('[data-cycle-diff]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.cycleDiff);
        const order = ['CASUAL', 'TACTICIAN', 'MASTER'];
        const cur = order.indexOf(state.seats[idx].difficulty);
        state.seats[idx].difficulty = order[(cur + 1) % order.length];
        renderSetup();
      });
    });

    // Switches
    els.setupTimerSwitch.classList.toggle('on', state.timerEnabled);
    els.setupBacktrackSwitch.classList.toggle('on', state.allowBacktrack);
  }

  // ============================================================================
  // Match Lifecycle
  // ============================================================================
  function clearMatchTimers() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
    if (state.botTimeout) {
      clearTimeout(state.botTimeout);
      state.botTimeout = null;
    }
  }

  function startMatch(customPuzzle = null) {
    clearMatchTimers();
    const puzzle = customPuzzle || state.selectedPuzzle;
    const players = state.seats.slice(0, state.playerCount).map((s, idx) => ({
      id: s.id,
      name: (s.name || '').trim() || `Player ${idx + 1}`,
      type: idx === 0 ? 'HUMAN' : s.type,
      difficulty: s.difficulty,
      score: 0,
      moves: 0,
      passes: 0
    }));

    const startWord = puzzle.startWord.toUpperCase();
    const targetWord = puzzle.targetWord.toUpperCase();
    const optimalPath = dict.findShortestPath(startWord, targetWord) ||
      CURATED_FALLBACK_PATHS[`${startWord}->${targetWord}`] ||
      [startWord, targetWord];

    state.game = {
      startWord,
      targetWord,
      wordLength: startWord.length,
      optimalSteps: Math.max(1, optimalPath.length - 1),
      optimalPath,
      players,
      currentPlayerIndex: 0,
      rungs: [
        {
          word: startWord,
          playerId: null,
          playerName: 'START',
          changedIndex: -1,
          pointsAwarded: 0,
          multiplier: 1.0
        }
      ],
      usedWords: new Set([startWord]),
      consecutivePasses: 0,
      status: 'ACTIVE', // 'ACTIVE' | 'WON' | 'ENDED'
      winnerName: null,
      allowBacktrack: state.allowBacktrack
    };

    state.draftWord = startWord;
    state.activeSlot = 0;
    state.feedback = { text: 'Tap a tile or use ◄ / ► arrow keys, type A-Z, then Enter.', kind: '' };
    state.view = 'board';

    els.setupScreen.classList.add('hidden');
    els.boardScreen.classList.remove('hidden');

    resetTurnClock();
    renderBoard(true);
    scheduleBotIfNeeded();
  }

  function resetTurnClock() {
    state.turnStartedAt = Date.now();
    state.turnElapsedSec = 0;
    if (state.timerInterval) clearInterval(state.timerInterval);
    state.timerInterval = setInterval(() => {
      if (!state.game || state.game.status !== 'ACTIVE') return;
      state.turnElapsedSec = Math.floor((Date.now() - state.turnStartedAt) / 1000);
      updateTimerDisplay();
    }, 500);
    updateTimerDisplay();
  }

  function updateTimerDisplay() {
    if (!els.timerPill || !els.boardTimerSwitch) return;
    els.boardTimerSwitch.classList.toggle('on', state.timerEnabled);
    if (!state.timerEnabled) {
      els.timerPill.textContent = 'TIMER OFF • 1.0x';
      return;
    }
    const mult = speedMultiplier(state.turnElapsedSec);
    els.timerPill.textContent = `${state.turnElapsedSec}s • ${mult.toFixed(2).replace(/\.00$/, '.0')}x`;
  }

  function latestWord() {
    const rungs = state.game.rungs;
    return rungs[rungs.length - 1].word;
  }

  function currentPlayer() {
    return state.game.players[state.game.currentPlayerIndex];
  }

  function moveActiveSlot(delta) {
    if (!state.game || state.game.status !== 'ACTIVE') return;
    const len = state.game.wordLength;
    state.activeSlot = ((state.activeSlot + delta) % len + len) % len;
    renderDraftDock();
  }

  function setActiveSlot(index) {
    if (!state.game || state.game.status !== 'ACTIVE') return;
    const len = state.game.wordLength;
    if (index < 0 || index >= len) return;
    state.activeSlot = index;
    renderDraftDock();
  }

  function applyLetterToSlot(letter) {
    if (!state.game || state.game.status !== 'ACTIVE') return;
    if (currentPlayer().type === 'BOT') return;
    const upper = String(letter || '').toUpperCase();
    if (!/^[A-Z]$/.test(upper)) return;

    const base = latestWord();
    const chars = base.split('');
    chars[state.activeSlot] = upper;
    state.draftWord = chars.join('');

    if (state.draftWord === base) {
      state.feedback = { text: 'Change 1 letter at the highlighted slot to form a valid word.', kind: '' };
    } else if (!dict.isValidWord(state.draftWord)) {
      state.feedback = { text: `${state.draftWord} — checking dictionary on submit`, kind: '' };
    } else {
      state.feedback = { text: `${state.draftWord} is ready! Press Enter or Submit.`, kind: 'ok' };
    }
    renderDraftDock();
  }

  function handleBackspaceKey() {
    if (!state.game || state.game.status !== 'ACTIVE') return;
    if (currentPlayer().type === 'BOT') return;
    const base = latestWord();
    if (state.draftWord !== base) {
      // Revert back to the base word first
      state.draftWord = base;
      state.feedback = { text: 'Draft reset to current rung.', kind: '' };
      renderDraftDock();
    } else if (state.activeSlot > 0) {
      state.activeSlot -= 1;
      renderDraftDock();
    }
  }

  function resetDraft() {
    if (!state.game) return;
    state.draftWord = latestWord();
    state.feedback = { text: 'Draft cleared.', kind: '' };
    renderDraftDock();
  }

  function submitCandidateWord(candidateWord) {
    if (!state.game || state.game.status !== 'ACTIVE') return false;
    const g = state.game;
    const base = latestWord();
    const upper = String(candidateWord || '').trim().toUpperCase();

    if (upper === base) {
      state.feedback = { text: 'Change exactly 1 letter before submitting.', kind: 'error' };
      renderDraftDock();
      return false;
    }

    const pos = diffIndex(base, upper);
    if (pos < 0) {
      state.feedback = { text: 'Word must differ by exactly 1 letter.', kind: 'error' };
      renderDraftDock();
      return false;
    }

    if (!dict.isValidWord(upper)) {
      state.feedback = { text: `"${upper}" is not in the ${g.wordLength}-letter dictionary.`, kind: 'error' };
      renderDraftDock();
      return false;
    }

    const isRepeated = g.usedWords.has(upper);
    if (isRepeated && !g.allowBacktrack) {
      state.feedback = { text: `"${upper}" was already played on this ladder.`, kind: 'error' };
      renderDraftDock();
      return false;
    }

    const prevDist = dict.shortestDistance(base, g.targetWord);
    const nextDist = dict.shortestDistance(upper, g.targetWord);
    const isWin = upper === g.targetWord;
    const madeProgress = isWin || (prevDist >= 0 && nextDist >= 0 && nextDist < prevDist);

    let rawPoints = 10;
    if (madeProgress) rawPoints += 10;
    if (isWin) rawPoints += 50;
    if (isRepeated && g.allowBacktrack) rawPoints += 2;

    const mult = state.timerEnabled ? speedMultiplier(state.turnElapsedSec) : 1.0;
    const awarded = Math.round(rawPoints * mult);

    const player = currentPlayer();
    player.score += awarded;
    player.moves += 1;

    g.rungs.push({
      word: upper,
      playerId: player.id,
      playerName: player.name,
      changedIndex: pos,
      pointsAwarded: awarded,
      multiplier: mult
    });
    g.usedWords.add(upper);
    g.consecutivePasses = 0;

    if (isWin) {
      g.status = 'WON';
      g.winnerName = player.name;
      clearMatchTimers();
      state.draftWord = upper;
      state.feedback = { text: `${player.name} completed the ladder for +${awarded} pts!`, kind: 'ok' };
      renderBoard(true);
      return true;
    }

    g.currentPlayerIndex = (g.currentPlayerIndex + 1) % g.players.length;
    state.draftWord = upper;
    state.feedback = {
      text: `${player.name} played ${upper} (+${awarded} pts).`,
      kind: 'ok'
    };
    resetTurnClock();
    renderBoard(true);
    scheduleBotIfNeeded();
    return true;
  }

  function passTurn() {
    if (!state.game || state.game.status !== 'ACTIVE') return;
    const g = state.game;
    const player = currentPlayer();
    player.passes += 1;
    g.consecutivePasses += 1;

    if (g.players.length > 1 && g.consecutivePasses >= g.players.length) {
      g.status = 'ENDED';
      clearMatchTimers();
      state.feedback = { text: 'All players passed consecutively. Match ended.', kind: '' };
      renderBoard(true);
      return;
    }

    g.currentPlayerIndex = (g.currentPlayerIndex + 1) % g.players.length;
    state.draftWord = latestWord();
    state.feedback = { text: `${player.name} passed the turn.`, kind: '' };
    resetTurnClock();
    renderBoard(true);
    scheduleBotIfNeeded();
  }

  function applyHint() {
    if (!state.game || state.game.status !== 'ACTIVE') return;
    if (currentPlayer().type === 'BOT') return;
    const base = latestWord();
    const excluded = new Set(state.game.usedWords);
    excluded.delete(base);

    let path = dict.findShortestPath(base, state.game.targetWord, excluded);
    if (!path) {
      path = dict.findShortestPath(base, state.game.targetWord, new Set());
    }
    if (!path || path.length < 2) {
      state.feedback = { text: 'No direct hint path found from this word.', kind: 'error' };
      renderDraftDock();
      return;
    }
    const nextWord = path[1];
    const changed = diffIndex(base, nextWord);
    if (changed >= 0) state.activeSlot = changed;
    state.draftWord = nextWord;
    state.feedback = { text: `Hint loaded: ${nextWord} (press Enter or Submit to play it!)`, kind: 'ok' };
    renderDraftDock();
  }

  function endMatchEarly() {
    if (!state.game) return;
    state.game.status = 'ENDED';
    clearMatchTimers();
    renderBoard(true);
  }

  function scheduleBotIfNeeded() {
    if (!state.game || state.game.status !== 'ACTIVE') return;
    const player = currentPlayer();
    if (player.type !== 'BOT') return;

    state.botTimeout = setTimeout(() => {
      if (!state.game || state.game.status !== 'ACTIVE') return;
      const move = pickBotMove(
        dict,
        latestWord(),
        state.game.targetWord,
        state.game.usedWords,
        player.difficulty,
        state.game.allowBacktrack
      );
      if (move) {
        submitCandidateWord(move);
      } else {
        passTurn();
      }
    }, 680);
  }

  // ============================================================================
  // Board Rendering
  // ============================================================================
  function renderBoard(scrollToBottom = false) {
    const g = state.game;
    if (!g) return;

    els.targetStartPill.textContent = g.startWord;
    els.targetEndPill.textContent = g.targetWord;
    els.parMetaPill.textContent = `PAR ${g.optimalSteps} STEPS`;
    const curDist = dict.shortestDistance(latestWord(), g.targetWord);
    els.distMetaPill.textContent =
      curDist >= 0 ? `${curDist} STEP${curDist === 1 ? '' : 'S'} LEFT` : `${g.rungs.length - 1} MOVES`;

    updateTimerDisplay();

    // Scoreboard strip
    els.scoreboardStrip.innerHTML = g.players
      .map((p, idx) => {
        const isActive = g.status === 'ACTIVE' && idx === g.currentPlayerIndex;
        const badge = p.type === 'BOT' ? `BOT (${p.difficulty})` : isActive ? 'ACTIVE TURN' : 'READY';
        return `
          <div class="player-score-card ${isActive ? 'active-turn' : ''}">
            <div class="psc-top">
              <span>${p.name}</span>
              <span class="psc-score">${p.score}</span>
            </div>
            <div class="psc-sub">${badge} &bull; ${p.moves} moves</div>
          </div>
        `;
      })
      .join('');

    // Ladder Stack
    els.ladderTray.innerHTML = g.rungs
      .map((rung, idx) => {
        const isStart = idx === 0;
        const isLatest = idx === g.rungs.length - 1;
        const isGoal = rung.word === g.targetWord;
        const tilesHtml = rung.word
          .split('')
          .map((ch, letterIdx) => {
            let cls = 'letter-tile';
            if (isGoal && idx > 0) cls += ' target';
            else if (isStart) cls += ' start';
            else if (letterIdx === rung.changedIndex) cls += ' changed';
            return `<span class="${cls}">${ch}</span>`;
          })
          .join('');
        const meta = isStart
          ? 'START RUNG'
          : `${rung.playerName} • +${rung.pointsAwarded}`;
        return `
          <div class="rung-row ${isLatest ? 'latest' : ''}">
            <div class="rung-tiles">${tilesHtml}</div>
            <span class="rung-meta">${meta}</span>
          </div>
        `;
      })
      .join('');

    if (scrollToBottom) {
      requestAnimationFrame(() => {
        els.ladderTray.scrollTop = els.ladderTray.scrollHeight;
      });
    }

    renderDraftDock();

    // Victory / Completed Panel
    if (g.status !== 'ACTIVE') {
      els.victoryPanel.classList.remove('hidden');
      const ranked = [...g.players].sort((a, b) => b.score - a.score);
      const topScore = ranked[0]?.score ?? 0;
      const leaders = ranked.filter((p) => p.score === topScore).map((p) => p.name).join(' & ');
      els.victorySummary.textContent =
        g.status === 'WON'
          ? `${g.winnerName} reached ${g.targetWord} in ${g.rungs.length - 1} steps! Top score: ${leaders} (${topScore} pts).`
          : `Match ended after ${g.rungs.length - 1} moves. Leader: ${leaders} (${topScore} pts).`;
      els.optimalPathRow.innerHTML = g.optimalPath
        .map((w) => `<span class="path-chip">${w}</span>`)
        .join('');
    } else {
      els.victoryPanel.classList.add('hidden');
    }
  }

  function renderDraftDock() {
    const g = state.game;
    if (!g) return;
    const player = currentPlayer();
    const isBotTurn = g.status === 'ACTIVE' && player.type === 'BOT';
    const isFinished = g.status !== 'ACTIVE';
    const base = latestWord();
    const draft = state.draftWord || base;

    els.turnOwnerLabel.textContent = isFinished
      ? g.status === 'WON'
        ? `SOLVED: ${g.targetWord}`
        : 'MATCH FINISHED'
      : isBotTurn
        ? `${player.name.toUpperCase()} IS THINKING...`
        : `${player.name.toUpperCase()}'S TURN`;

    // Interactive Letter Slots
    els.draftSlotsRow.innerHTML = draft
      .split('')
      .map((ch, idx) => {
        const isSelected = !isFinished && idx === state.activeSlot;
        const isChanged = ch !== base[idx];
        return `
          <button
            type="button"
            class="slot-btn ${isSelected ? 'selected' : ''} ${isChanged ? 'changed' : ''}"
            data-slot-idx="${idx}"
            aria-label="Letter position ${idx + 1}: ${ch}${isSelected ? ' (selected)' : ''}"
            ${isFinished || isBotTurn ? 'disabled' : ''}
          >
            <span>${ch}</span>
            <span class="slot-index-badge">${idx + 1}</span>
          </button>
        `;
      })
      .join('');

    els.draftSlotsRow.querySelectorAll('.slot-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        setActiveSlot(Number(btn.dataset.slotIdx));
      });
    });

    if (els.slotPosLabel) {
      els.slotPosLabel.textContent = `INDEX ${state.activeSlot + 1} / ${g.wordLength}`;
    }

    // Feedback text
    els.draftFeedback.textContent = state.feedback.text || '';
    els.draftFeedback.className = `draft-feedback ${state.feedback.kind || ''}`;

    // Controls disabled state
    const controlsDisabled = isFinished || isBotTurn;
    els.slotLeftBtn.disabled = controlsDisabled;
    els.slotRightBtn.disabled = controlsDisabled;
    els.hintBtn.disabled = controlsDisabled;
    els.revertBtn.disabled = controlsDisabled || draft === base;
    els.passBtn.disabled = controlsDisabled || g.players.length === 1;
    els.submitWordBtn.disabled = controlsDisabled || draft === base;

    // On-screen QWERTY Deck
    renderQwertyDeck(base[state.activeSlot], controlsDisabled);
  }

  function renderQwertyDeck(baseLetterAtActiveSlot, disabled) {
    const rows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['BACK', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER']
    ];

    els.qwertyDeck.innerHTML = rows
      .map((row) => {
        const buttons = row
          .map((key) => {
            if (key === 'BACK') {
              return `<button type="button" class="key-cap wide" data-kbd="BACK" ${disabled ? 'disabled' : ''}>CLR</button>`;
            }
            if (key === 'ENTER') {
              return `<button type="button" class="key-cap submit-key" data-kbd="ENTER" ${disabled ? 'disabled' : ''}>PLAY</button>`;
            }
            const isSame = key === baseLetterAtActiveSlot;
            return `<button type="button" class="key-cap ${isSame ? 'same-letter' : ''}" data-kbd="${key}" ${disabled ? 'disabled' : ''}>${key}</button>`;
          })
          .join('');
        return `<div class="kbd-row">${buttons}</div>`;
      })
      .join('');

    els.qwertyDeck.querySelectorAll('.key-cap').forEach((btn) => {
      btn.addEventListener('click', () => {
        const k = btn.dataset.kbd;
        if (k === 'BACK') handleBackspaceKey();
        else if (k === 'ENTER') submitCandidateWord(state.draftWord);
        else applyLetterToSlot(k);
      });
    });
  }

  // ============================================================================
  // Physical Keyboard Handler (PC Arrow Keys + Typing + Enter)
  // ============================================================================
  function attachKeyboardListener() {
    window.addEventListener('keydown', (e) => {
      if (state.view !== 'board' || !state.game || state.game.status !== 'ACTIVE') return;

      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        moveActiveSlot(-1);
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        moveActiveSlot(1);
        return;
      }
      if (e.key === 'Home') {
        e.preventDefault();
        setActiveSlot(0);
        return;
      }
      if (e.key === 'End') {
        e.preventDefault();
        setActiveSlot(state.game.wordLength - 1);
        return;
      }
      if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        handleBackspaceKey();
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        resetDraft();
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        submitCandidateWord(state.draftWord);
        return;
      }
      if (e.key === ' ') {
        e.preventDefault();
        applyHint();
        return;
      }
      if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        applyLetterToSlot(e.key);
      }
    });
  }

  // ============================================================================
  // Boot & Event Wiring
  // ============================================================================
  function attachSetupListeners() {
    els.themeBtn.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('wl_theme', state.theme);
      applyVisualPrefs();
    });

    els.tileStyleBtn.addEventListener('click', () => {
      const order = ['ivory', 'gold', 'stone'];
      state.tileStyle = order[(order.indexOf(state.tileStyle) + 1) % order.length];
      localStorage.setItem('wl_tile_style', state.tileStyle);
      applyVisualPrefs();
    });

    els.lengthSeg.querySelectorAll('.seg-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        selectWordLength(Number(btn.dataset.len));
      });
    });

    els.playerCountSeg.querySelectorAll('.seg-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.playerCount = Number(btn.dataset.count);
        renderSetup();
      });
    });

    els.randomPuzzleBtn.addEventListener('click', async () => {
      await dict.ensureLengthLoaded(state.wordLength);
      updateDictChip();
      const puzzle = dict.generateRandomPuzzle(state.wordLength);
      state.selectedPuzzle = puzzle;
      els.customStartInput.value = puzzle.startWord;
      els.customTargetInput.value = puzzle.targetWord;
      state.customStatus = {
        text: `Random puzzle: ${puzzle.startWord} → ${puzzle.targetWord} (${puzzle.optimalSteps} steps)`,
        kind: 'ok'
      };
      renderSetup();
    });

    els.validateCustomBtn.addEventListener('click', async () => {
      await dict.ensureLengthLoaded(state.wordLength);
      updateDictChip();
      const res = dict.validateCustomPair(els.customStartInput.value, els.customTargetInput.value);
      if (!res.valid) {
        state.customStatus = { text: res.reason, kind: 'err' };
        renderSetup();
        return;
      }
      state.wordLength = res.startWord.length;
      state.selectedPuzzle = {
        startWord: res.startWord,
        targetWord: res.targetWord,
        optimalSteps: res.optimalSteps,
        wordLength: res.startWord.length
      };
      state.customStatus = {
        text: `Valid ladder! ${res.startWord} → ${res.targetWord} (${res.optimalSteps} optimal steps)`,
        kind: 'ok'
      };
      renderSetup();
    });

    els.setupTimerSwitch.addEventListener('click', () => {
      state.timerEnabled = !state.timerEnabled;
      renderSetup();
    });

    els.setupBacktrackSwitch.addEventListener('click', () => {
      state.allowBacktrack = !state.allowBacktrack;
      renderSetup();
    });

    els.startMatchBtn.addEventListener('click', async () => {
      await dict.ensureLengthLoaded(state.wordLength);
      updateDictChip();
      // If user typed custom words matching current length without hitting Validate, validate automatically
      const typedStart = els.customStartInput.value.trim().toUpperCase();
      const typedTarget = els.customTargetInput.value.trim().toUpperCase();
      if (
        typedStart &&
        typedTarget &&
        (typedStart !== state.selectedPuzzle.startWord || typedTarget !== state.selectedPuzzle.targetWord)
      ) {
        const res = dict.validateCustomPair(typedStart, typedTarget);
        if (!res.valid) {
          state.customStatus = { text: res.reason, kind: 'err' };
          renderSetup();
          return;
        }
        state.selectedPuzzle = {
          startWord: res.startWord,
          targetWord: res.targetWord,
          optimalSteps: res.optimalSteps,
          wordLength: res.startWord.length
        };
      }
      startMatch(state.selectedPuzzle);
    });

    els.backToSetupBtn.addEventListener('click', () => {
      clearMatchTimers();
      state.view = 'setup';
      els.boardScreen.classList.add('hidden');
      els.setupScreen.classList.remove('hidden');
      renderSetup();
    });

    els.boardTimerSwitch.addEventListener('click', () => {
      state.timerEnabled = !state.timerEnabled;
      updateTimerDisplay();
    });

    els.slotLeftBtn.addEventListener('click', () => moveActiveSlot(-1));
    els.slotRightBtn.addEventListener('click', () => moveActiveSlot(1));
    els.hintBtn.addEventListener('click', applyHint);
    els.revertBtn.addEventListener('click', resetDraft);
    els.passBtn.addEventListener('click', passTurn);
    els.submitWordBtn.addEventListener('click', () => submitCandidateWord(state.draftWord));
    els.endMatchBtn.addEventListener('click', endMatchEarly);
    els.playAgainBtn.addEventListener('click', () => startMatch(state.selectedPuzzle));
    els.newPuzzleBtn.addEventListener('click', async () => {
      await dict.ensureLengthLoaded(state.wordLength);
      const next = dict.generateRandomPuzzle(state.wordLength);
      state.selectedPuzzle = next;
      els.customStartInput.value = next.startWord;
      els.customTargetInput.value = next.targetWord;
      startMatch(next);
    });
  }

  document.addEventListener('DOMContentLoaded', async () => {
    cacheElements();
    applyVisualPrefs();
    attachSetupListeners();
    attachKeyboardListener();
    await selectWordLength(4);
    // Pre-warm remaining word lengths cleanly in background
    Promise.all([
      dict.ensureLengthLoaded(5),
      dict.ensureLengthLoaded(6),
      dict.ensureLengthLoaded(7)
    ]).then(updateDictChip);
  });
})();
