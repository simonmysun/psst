import { validate, iterate, normalize } from './../functions';

export const STORAGE_KEY = '__psst';

const readState = {
  pssts: (() => {
    let data;
    try {
      data = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
      if (!Array.isArray(data)) {
        throw new Error('locaStorage brocken');
      }
    } catch (e) {
      console.error(e);
      return [
        {
          text: '[\'new\', -1, [5]]',
        },
      ];
    }
    return data;
  })(),
  activePsst: {
    text: '',
  },
};

readState.activePsst = readState.pssts[0];

export const state = readState;

export const mutations = {
  addPsst(state) {
    state.pssts.push({
      text: normalize(state.activePsst.text),
    });
    state.pssts[0] = {
      text: '["new", -1, [5]]',
    };
    state.activePsst = state.pssts[0];
  },

  removePsst(state, { psst }) {
    if (state.pssts.length > 1) {
      state.pssts.splice(state.pssts.indexOf(psst), 1);
    }
    state.pssts[0] = {
      text: '["new", -1, [5]]',
    };
    state.activePsst = state.pssts[0];
  },

  donePsst(state, { psst }) {
    if (validate(psst.text)) {
      psst = iterate(psst);
    }
  },

  editPsst(state, { value }) {
    state.activePsst.text = value;
  },

  setActivePsst(state, { psst }) {
    state.activePsst = psst;
  },

};
