// routes
import { PATH_DASHBOARD }from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  chatbot: icon('chatbot'),
  home: icon('home'),
};
const hasToken = !!localStorage.getItem('token'); // Check for token
const navConfig = [
  {
    items: [
      {
        title: 'Home',
        path: PATH_DASHBOARD.home.root,
        icon: ICONS.home,
      },
      // {
      //   title: 'My Profile',
      //   path: PATH_DASHBOARD.profile.root,
      //   icon: ICONS.home,
      // },
      ...(hasToken ? [{
        title: 'My Profile',
        path: PATH_DASHBOARD.profile.root,
        icon: ICONS.home,
      },{
        title: 'My Videos',
        path: PATH_DASHBOARD.video.root,
        icon: ICONS.home,
      }] : []),
    ],
  },
];

export default navConfig;
