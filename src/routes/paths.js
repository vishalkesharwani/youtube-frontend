// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  home:{
    root: path(ROOTS_DASHBOARD,'/home')
  },
  profile:{
    root: path(ROOTS_DASHBOARD,'/myProfile'),
    user:(id)=> path(ROOTS_DASHBOARD,`/profile/${id}`)
  },
  desc:{
    root:(id)=> path(ROOTS_DASHBOARD,`/description/${id}`)
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    edit: (id) => path(ROOTS_DASHBOARD, `/user/${id}/edit`),
    view: (id) => path(ROOTS_DASHBOARD, `/user/${id}/view`),
  },
  video:{
    root: path(ROOTS_DASHBOARD,'/video'),
    list: path(ROOTS_DASHBOARD, '/video/list'),
    new: path(ROOTS_DASHBOARD, '/video/new'),
    edit: (id) => path(ROOTS_DASHBOARD, `/video/${id}/edit`),
  }

};
