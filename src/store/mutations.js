import { validate, iterate, normalize } from './../functions';


export const STORAGE_KEY = '__psst';

const readState = {
  pssts: [
    {
      text: '["new", -1, [5]]',
    },
  ],
  activePsst: {
    text: '',
  },
  user: {
    uid: '',
  },
};

readState.activePsst = readState.pssts[readState.pssts.length - 1];

export const state = readState;
console.log(state);

export const mutations = {
  addPsst(state, { messagesRef }) {
    messagesRef.push({
      text: normalize(state.activePsst.text),
    }).then(() => {
      state.activePsst = {
        text: '["new", -1, [5]]',
      };
    });
  },

  removePsst(state, { messagesRef, psst }) {
    if (state.pssts.indexOf(state.activePsst) >= 0) {
      messagesRef.child(psst['.key']).remove();
    }
    state.activePsst = state.pssts.length > 0 ? state.pssts[0] : {
      text: '["new", -1, [5]]',
    };
  },

  donePsst(state, { messagesRef, psst }) {
    if (validate(psst.text)) {
      messagesRef.push(iterate(psst));
    }
  },

  editPsst(state, { messagesRef, value }) {
    state.activePsst.text = value;
    if (state.activePsst['.key']) {
      messagesRef.child(`${state.activePsst['.key']}/text`).set(value);
    }
  },

  setActivePsst(state, { psst }) {
    state.activePsst = psst;
  },

  setUser(state, user) {
    state.user = user;
  },

  setPsstsRef(state, { main, key, ref }) {
    main.$bindAsArray(key, ref);
  },
};
