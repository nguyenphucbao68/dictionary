// import { Home, Anchor, Headphones } from "react-feather";
// export const MENUITEMS = [
//   {
//     title: "Home",
//     icon: Home,
//     type: "sub",
//     active: false,
//     // path: "/",
//     children: [
//       { path: `/dashboard/default`, title: "Default", type: "link" },
//       { path: `/dashboard/ecommerce`, title: "Ecommerce", type: "link" },
//     ],
//   },
//   {
//     title: "Look Up Dictionary",
//     icon: Anchor,
//     type: "sub",
//     active: false,
//     path: "/dictionary",
//     // children: [
//     // 	{
//     // 		path: `/starter-kits/sample-page`,
//     // 		title: 'Sample Page',
//     // 		type: 'link',
//     // 	},
//     // ],
//   },
// ];
import { Home, Airplay, Monitor } from "react-feather";
export const MENUITEMS = [
  {
    menutitle: "Dictionary",
    menucontent: "Multi Language",
    Items: [
      {
        title: "home",
        icon: Home,
        type: "sub",
        badge: "badge badge-success",
        badgetxt: "2",
        active: false,
        children: [
          {
            path: `/dictionary`,
            title: "English - English",
            type: "link",
          },
          {
            path: `/dictionary`,
            title: "English - Vietnamese",
            type: "link",
          },
        ],
      },
      {
        title: "Pronounce",
        icon: Airplay,
        type: "sub",
        active: false,
        badge: "badge badge-primary",
        badgetxt: "3",
        children: [
          {
            path: `/pronounce/father`,
            title: "Father",
            type: "link",
          },
          {
            path: `/pronounce/think`,
            title: "Think",
            type: "link",
          },
          {
            path: `/pronounce/test`,
            title: "Test",
            type: "link",
          },
        ],
      },
    ],
  },
  {
    menutitle: "Chemistry",
    menucontent: "Chemical Equation Balancer",
    Items: [
      {
        title: "home",
        icon: Home,
        type: "sub",
        badge: "badge badge-success",
        badgetxt: "2",
        active: false,
        children: [
          {
            path: `/chemicalequations`,
            title: "Look Up",
            type: "link",
          },
          {
            path: `/chemicalequations/CaCl2/Ca+Cl2`,
            title: "CaCl2 = Ca+Cl2",
            type: "link",
          },
          {
            path: `/chemicalequations/AgNO3/Ag+NO2+O2`,
            title: "AgNO3 = Ag+NO2+O2",
            type: "link",
          },
        ],
      },
      {
        title: "Substance",
        icon: Monitor,
        type: "sub",
        badge: "badge badge-success",
        badgetxt: "2",
        active: false,
        children: [
          {
            path: `/substance/CaCl2`,
            title: "CaCl2",
            type: "link",
          },
          {
            path: `/substance/AgNO3`,
            title: "AgNO3",
            type: "link",
          },
        ],
      },
    ],
  },
];
