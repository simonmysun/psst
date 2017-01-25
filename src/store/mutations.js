import { validate, iterate, normalize, notify } from './../functions';

export const STORAGE_KEY = '__psst';

export const state = {
  pssts: [
    {
      text: '["new", -1, [5]]',
    },
  ],
  activePsst: {
    text: '["new", -1, [5]]',
  },
  user: {
    uid: '',
  },
};

export const mutations = {
  setActivePsst(state, { psst }) {
    state.activePsst = psst;
  },

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

  editPsst(state, { messagesRef, value }) {
    state.activePsst.text = value;
    if (state.activePsst['.key']) {
      messagesRef.child(`${state.activePsst['.key']}/text`).set(value);
    }
  },

  donePsst(state, { messagesRef, psst }) {
    const newPsst = {
      text: iterate(psst.text),
    };
    notify({
      title: 'Psst! ',
      body: `${psst.text} => ${newPsst.text ? newPsst.text : 'Done. '}`,
      icon: './static/psst.png',
    });
    messagesRef.child(`${psst['.key']}/text`).set(`~${psst.text}`);
    if (newPsst.text) {
      messagesRef.push(newPsst);
    }
  },

  updatePsst(state, { store, messagesRef }) {
    const now = new Date().getTime();
    for (const psst of Object.values(state.pssts)) {
      const data = validate(psst.text);
      if (data !== null) {
        if (now > data[1] + (data[2][0] * 60 * 1000)) {
          store.commit('donePsst', { messagesRef, psst });
        }
      }
    }
  },

  setUser(state, user) {
    state.user = user;
  },

  setPsstsRef(state, { main, key, ref }) {
    main.$bindAsArray(key, ref);
  },
};
