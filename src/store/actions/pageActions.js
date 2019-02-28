import {
  GET_PAGES,
  SET_PAGE,
  CHANGE_EDIT_MODE,
  SET_PAGE_LOADED
} from "./types";

import { PagesService } from "../../common/api.service";

export const getPage = (path, editMode) => {
  return async dispatch => {
    await PagesService.getPage(path)
      .then(async ({ data }) => {
        if (editMode) {
          dispatch({
            type: CHANGE_EDIT_MODE,
            currentState: false
          });
        }
        await dispatch({
          type: SET_PAGE,
          page: {
            path: path,
            name: data.name,
            content: data.content
          }
        });

        const pages = await getPages();
        dispatch(pages);
      })
      .catch(error => {
        alert(error.response.data.error);
      });
  };
};

export const getPages = () => {
  return async dispatch => {
    await PagesService.getPages()
      .then(({ data }) => {
        dispatch({
          type: GET_PAGES,
          pages: data
        });
      })
      .catch(error => {
        alert(error.response.data.error);
      });
  };
};

export const deletePage = (pageLoaded, path) => {
  return async dispatch => {
    if (pageLoaded) {
      return await PagesService.deletePage(path)
        .then(async ({ data }) => {
          alert("Page successfully deleted!");
          dispatch({
            type: SET_PAGE,
            page: {
              name: "",
              path: null,
              content: null
            }
          });
          const pages = await getPages();
          dispatch(pages);
        })
        .catch(error => {
          alert(error.response.data.error);
        });
    } else {
      alert(
        "You are on page for creating other pages, so it cannot be deleted, sorry..."
      );
    }
  };
};

export const savePage = (page, pageLoaded) => {
  return async dispatch => {
    if (!pageLoaded) {
      return await PagesService.createPage(page)
        .then(async response => {
          const createdPath = response.headers.location.replace("/page/", "");
          alert(
            'New page with path "' + createdPath + '" succesfully created!'
          );

          const pages = await getPages();
          dispatch(pages);

          return createdPath;
        })
        .catch(error => {
          alert(error.response.data.error);
        });
    } else {
      return await PagesService.updatePage(page.path, page)
        .then(async ({ data }) => {
          alert("Page succesfully updated!");
          const pages = await getPages();
          dispatch(pages);
        })
        .catch(error => {
          alert(error.response.data.error);
        });
    }
  };
};

export const setPage = page => {
  return async dispatch => {
    dispatch({
      type: SET_PAGE,
      page: page
    });
  };
};

export const setPageName = (page, name) => {
  return dispatch => {
    dispatch({
      type: SET_PAGE,
      page: {
        path: page.path,
        name: name,
        content: page.content
      }
    });
  };
};

export const setPageContent = (page, content) => {
  return dispatch => {
    dispatch({
      type: SET_PAGE,
      page: {
        path: page.path,
        name: page.name,
        content: content
      }
    });
  };
};

export const setPagePath = (page, path) => {
  return dispatch => {
    dispatch({
      type: SET_PAGE,
      page: {
        path: path,
        name: page.name,
        content: page.content
      }
    });
  };
};

export const flushPage = () => {
  return dispatch => {
    dispatch({
      type: SET_PAGE,
      page: {
        name: "",
        path: null,
        content: null
      }
    });
  };
};

export const setPageLoaded = flag => {
  return dispatch => {
    dispatch({
      type: SET_PAGE_LOADED,
      flag: flag
    });
  };
};

export function changeEditMode(currentState) {
  return async function(dispatch) {
    dispatch({
      type: CHANGE_EDIT_MODE,
      currentState: currentState
    });
    const pages = await getPages();
    dispatch(pages);
  };
}
