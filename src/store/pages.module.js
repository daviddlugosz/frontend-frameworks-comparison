import Router from '../router'
import { PagesService } from '../common/api.service'
import {
  GET_PAGES,
  GET_PAGE,
  SET_PAGE_NAME,
  SET_PAGE_CONTENT,
  SET_PAGE_PATH,
  DELETE_PAGE,
  SAVE_PAGE,
  CHANGE_EDIT_MODE,
  FLUSH_PAGE,
  SET_PAGE_LOADED
} from './actions.type'
import {
  SET_STATE_PAGES,
  SET_STATE_PAGE_NAME,
  SET_STATE_PAGE_CONTENT,
  SET_STATE_PAGE_PATH,
  CHANGE_STATE_EDIT_MODE,
  FLUSH_STATE_PAGE,
  SET_STATE_PAGE_LOADED
} from './mutations.type'

const initialState = {
  pages: [],
  pageLoaded: false,
  editMode: false,
  page: {
    name: null,
    path: null,
    content: null
  }
}

export const state = Object.assign({}, initialState)

export const actions = {
  async [GET_PAGES](context) {
    return await PagesService.getPages()
      .then(({ data }) => {
        context.commit(SET_STATE_PAGES, data)
      })
      .catch((error) => {
        alert(error.response.data.error);
      })
  },
  async [GET_PAGE](context) {
    return await PagesService.getPage(state.page.path)
      .then(({ data }) => {
        if (state.editMode) {
          context.commit(CHANGE_STATE_EDIT_MODE);
        }
        context.commit(SET_STATE_PAGE_NAME, data.name);
        context.commit(SET_STATE_PAGE_CONTENT, data.content);

        context.dispatch(GET_PAGES);
      })
      .catch((error) => {
        alert(error.response.data.error);
      })
  },
  [SET_PAGE_NAME](context, name) {
    context.commit(SET_STATE_PAGE_NAME, name);
  },
  [SET_PAGE_CONTENT](context, content) {
    context.commit(SET_STATE_PAGE_CONTENT, content);
  },
  [SET_PAGE_PATH](context, path) {
    context.commit(SET_STATE_PAGE_PATH, path);
  },
  async [SAVE_PAGE](context) {
    if (!state.pageLoaded) {
      return await PagesService.createPage(state.page)
        .then((response) => {
          const createdPath = response.headers.location.replace('/page/', '');
          alert('New page with path "' + createdPath + '" succesfully created!');
          context.dispatch(GET_PAGES);
          // allow location header via csor config on server
          Router.push(response.headers.location);
        })
        .catch((error) => {
          alert(error.response.data.error);
        })
    }
    else {
      return await PagesService.updatePage(state.page.path, state.page)
        .then(({ data }) => {
          alert('Page succesfully updated!');
          context.dispatch(GET_PAGES);
          Router.go(0);
        })
        .catch((error) => {
          alert(error.response.data.error);
        })
    }
  },
  async [DELETE_PAGE](context) {
    if (state.pageLoaded) {
      return await PagesService.deletePage(state.page.path)
        .then(({ data }) => {
          alert('Page successfully deleted!');
          context.dispatch(GET_PAGES);
          Router.push("/");
        })
        .catch((error) => {
          alert(error.response.data.error);
        })
    }
    else {
      alert("You are on page for creating other pages, so it cannot be deleted, sorry...");
    }
  },
  [CHANGE_EDIT_MODE](context) {
    context.commit(CHANGE_STATE_EDIT_MODE);
    context.dispatch(GET_PAGES);
  },
  [FLUSH_PAGE](context) {
    context.commit(FLUSH_STATE_PAGE);
  },
  [SET_PAGE_LOADED](context, loaded) {
    context.commit(SET_STATE_PAGE_LOADED, loaded);
  }
}

export const mutations = {
  [SET_STATE_PAGES](state, pages) {
    state.pages = pages;
  },
  [SET_STATE_PAGE_NAME](state, name) {
    state.page.name = name;
  },
  [SET_STATE_PAGE_CONTENT](state, content) {
    state.page.content = content;
  },
  [SET_STATE_PAGE_PATH](state, path) {
    state.page.path = path;
  },
  [FLUSH_STATE_PAGE](state) {
    state.page = {
      name: null,
      path: null,
      content: null
    },
      state.pageLoaded = false;
  },
  [CHANGE_STATE_EDIT_MODE](state) {
    if (!state.pageLoaded) {
      state.editMode = true;
    }
    else {
      state.editMode = !state.editMode;
    }
  },
  [SET_STATE_PAGE_LOADED](state, loaded) {
    state.pageLoaded = loaded;
  }
};

const getters = {
  pages(state) {
    return state.pages
  },
  page(state) {
    return state.page
  },
  editMode(state) {
    return state.editMode
  },
  pageLoaded(state) {
    return state.pageLoaded
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
