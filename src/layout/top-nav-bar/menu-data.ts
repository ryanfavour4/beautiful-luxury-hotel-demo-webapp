
export type T_menu = {
  name: string;
  path?: string;
  subPath?: string; // ✅ ADD THIS
  subMenu?: {
    name: string;
    
    path: string;
   
  }[];
  icon?: string;
};





// export const menuData: T_menu[] = [
//   {
//     name: "About",
//     path: "/about",
//   },
//   {
//     name: "Rooms", // ✅ ADD THIS
//     subPath: "rooms",
//     subMenu: [
//       { name: "All Rooms", path: "/all-rooms" },

//     ],
//   },
//   {
//     name: "Services",
//     path: "/services",
//   },
//   {
//     name: "Contact",
//     path: "/contact",
//   },
// ];
