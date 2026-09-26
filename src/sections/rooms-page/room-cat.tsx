// import roomCat1 from "/image/room-cat.png";
// import roomCat2 from "/image/room-cat2.png";
// import roomCat3 from "/image/room-cat3.png";
// import roomCat4 from "/image/room-cat4.png";
// import DeluxeSuite from "/image/room5.jpg";
// import { useState } from "react";

// const roomCat = [
//   {
//     id: 1,
//     name: "Deluxe Suite",
//     decs: "The perfect stay for two guests, combining understated elegance, superior comfort, and a curated selection of modern essentials for a seamless and refreshing experience.",

//     image: roomCat1,
//     price: "40,000",
//     guest: "2 + 1 Guests",
//     numberOfBeds: "1 Double Bed",
//     roomSize: "12m²",
//     view: "Sea View Room",
//     categories: [roomCat2, roomCat3, roomCat4],
//   },
//   {
//     id: 2,
//     name: "Deluxe King Suite",
//     decs: "The perfect stay for two guests, combining understated elegance, superior comfort, and a curated selection of modern essentials for a seamless and refreshing experience.",

//     image: DeluxeSuite,
//     price: "40,000",
//     guest: "2 + 1 Guests",
//     numberOfBeds: "1 Double Bed",
//     roomSize: "12m²",
//     view: "Sea View Room",
//     categories: [roomCat2, roomCat3, roomCat4],
//   },
//   {
//     id: 3,
//     name: "Large Double Suite",
//     decs: "The perfect stay for two guests, combining understated elegance, superior comfort, and a curated selection of modern essentials for a seamless and refreshing experience.",

//     image: roomCat1,
//     price: "40,000",
//     guest: "2 + 1 Guests",
//     numberOfBeds: "1 Double Bed",
//     roomSize: "12m²",
//     view: "Sea View Room",
//     categories: [roomCat2, roomCat3, roomCat4],
//   },
//   {
//     id: 4,
//     name: "Superior Suite",
//     decs: "The perfect stay for two guests, combining understated elegance, superior comfort, and a curated selection of modern essentials for a seamless and refreshing experience.",

//     image: DeluxeSuite,
//     price: "40,000",
//     guest: "2 + 1 Guests",
//     numberOfBeds: "1 Double Bed",
//     roomSize: "12m²",
//     view: "Sea View Room",
//     categories: [roomCat2, roomCat3, roomCat4],
//   },

//   {
//     id: 5,
//     name: "Suite City View",
//     decs: "The perfect stay for two guests, combining understated elegance, superior comfort, and a curated selection of modern essentials for a seamless and refreshing experience.",

//     image: roomCat1,
//     price: "40,000",
//     guest: "2 + 1 Guests",
//     numberOfBeds: "1 Double Bed",
//     roomSize: "12m²",
//     view: "Sea View Room",
//     categories: [roomCat2, roomCat3, roomCat4],
//   },
//   {
//     id: 6,
//     name: "Executive Suite",
//     decs: "The perfect stay for two guests, combining understated elegance, superior comfort, and a curated selection of modern essentials for a seamless and refreshing experience.",

//     image: DeluxeSuite,
//     price: "40,000",
//     guest: "2 + 1 Guests",
//     numberOfBeds: "1 Double Bed",
//     roomSize: "12m²",
//     view: "Sea View Room",
//     categories: [roomCat2, roomCat3, roomCat4],
//   },
// ];

export default function RoomCategories() {
  // const [selectedRoom, setSelectedRoom] = useState(roomCat[0]);

  return (
    <div></div>
    // <section className="container px-4 pt-12 md:px-2 md:pt-12 lg:px-2">
    //   {/* Title */}
    //   <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">Room Categories</h1>

    //   {/* Category Buttons */}
    //   <div className="scroll-bar-hide flex flex-row items-center gap-5 overflow-x-auto whitespace-nowrap !px-0 pb-3 pt-4">
    //     {roomCat.map((room) => (
    //       <button
    //         key={room.id}
    //         onClick={() => setSelectedRoom(room)}
    //         className={`whitespace-nowrap rounded-lg border-2 border-primary px-5 py-3 text-xl font-semibold text-primary transition-all ${
    //           selectedRoom.name === room.name
    //             ? "bg-primary text-white"
    //             : "hover:bg-primary hover:text-white"
    //         }`}
    //       >
    //         {room.name}
    //       </button>
    //     ))}
    //   </div>

    //   {/* Image Section */}
    //   <div className="mb-8 flex items-center justify-center pt-4">
    //     <div className="grid w-full max-w-[1100px] grid-cols-1 gap-6 md:grid-cols-2">
    //       {/* Main Image */}
    //       <div className="relative h-[350px] w-full md:h-[500px]">
    //         <img src={selectedRoom.image} className="h-full w-full rounded-xl object-cover" />
    //         <span className="absolute right-4 top-4 rounded-lg bg-black/60 px-4 py-2 text-lg font-semibold text-white">
    //           $1500
    //         </span>
    //       </div>

    //       {/* Side Images */}
    //       <div className="grid h-[350px] grid-rows-3 gap-4 md:h-[500px]">
    //         {selectedRoom.categories.map((img, index) => (
    //           <div key={index} className="flex h-full w-full">
    //             <img src={img} className="h-full w-full rounded-xl object-cover" />
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>

    //   {/* Features Sections */}
    //   <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
    //     {/* Left Section */}
    //     <div className="flex max-w-xl flex-col gap-4">
    //       <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">{selectedRoom.name}</h1>

    //       <p className="text-gray-600">{selectedRoom.decs}</p>

    //       <ul className="list-inside list-disc space-y-1 text-gray-700">
    //         <li>{selectedRoom.view}</li>
    //         <li>{selectedRoom.numberOfBeds}</li>
    //         <li>{selectedRoom.roomSize}</li>
    //         <li>{selectedRoom.guest}</li>
    //       </ul>
    //     </div>

    //     {/* Right Section – Feature Box */}
    //     <div className="flex w-full max-w-xs flex-col rounded-lg border-2 border-primary p-6 text-base shadow-sm">
    //       <ul className="list-inside list-disc space-y-1 text-gray-700">
    //         <li>{selectedRoom.view}</li>
    //         <li>{selectedRoom.numberOfBeds}</li>
    //         <li>{selectedRoom.roomSize}</li>
    //         <li>5 Adults 2 children</li>
    //         <li>Sea View Room</li>
    //         <li>2 Large Bed</li>
    //         <li>12m²</li>
    //         <li>5 Adults 2 children</li>
    //       </ul>
    //     </div>
    //   </div>
    //   <CustomCalendar />
    // </section>
  );
}

// Get ALL 42 days for calendar view
// function getFullCalendarDays(year: number, month: number) {
//   const days = [];
//   const date = new Date(year, month, 1);

//   const firstDayOfWeek = date.getDay(); // 0-6 (Sun-Sat)
//   const prevMonthLastDate = new Date(year, month, 0).getDate(); // Last day of previous month

//   // Add previous month days
//   for (let i = firstDayOfWeek - 1; i >= 0; i--) {
//     days.push({
//       day: prevMonthLastDate - i,
//       currentMonth: false,
//     });
//   }

//   // Add current month days
//   while (date.getMonth() === month) {
//     days.push({
//       day: date.getDate(),
//       currentMonth: true,
//     });
//     date.setDate(date.getDate() + 1);
//   }

//   // Add next month days until we reach 42 cells
//   let nextMonthDay = 1;
//   while (days.length < 42) {
//     days.push({
//       day: nextMonthDay,
//       currentMonth: false,
//     });
//     nextMonthDay++;
//   }

//   return days;
// }

// export function CustomCalendar() {
//   const [selectedDays, setSelectedDays] = useState<{ [key: string]: number | null }>({});
//   const today = new Date();
//   const [month, setMonth] = useState(today.getMonth());
//   const [year, setYear] = useState(today.getFullYear());

//   const monthKey = `${year}-${month}`; // Example: "2025-02"  🔑

//   const handleDayClick = (day: number) => {
//     setSelectedDays((prev) => ({
//       ...prev,
//       [monthKey]: day, // save date only for this month
//     }));
//   };

//   const nextMonth = () => {
//     if (month === 11) {
//       setMonth(0);
//       setYear(year + 1);
//     } else {
//       setMonth(month + 1);
//     }
//   };

//   const prevMonth = () => {
//     if (month === 0) {
//       setMonth(11);
//       setYear(year - 1);
//     } else {
//       setMonth(month - 1);
//     }
//   };

//   const days = getFullCalendarDays(year, month);
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   return (
//     <div className="w-80 rounded-lg bg-white p-4 shadow-xl">
//       {/* Header */}
//       <div className="mb-3 flex items-center justify-between">
//         <button onClick={prevMonth}>&lt;</button>
//         <h2 className="text-lg font-semibold">
//           {months[month]} {year}
//         </h2>
//         <button onClick={nextMonth}>&gt;</button>
//       </div>

//       {/* Days of Week */}
//       <div className="mb-2 grid grid-cols-7 text-center font-bold text-gray-600">
//         <div>Sun</div>
//         <div>Mon</div>
//         <div>Tue</div>
//         <div>Wed</div>
//         <div>Thu</div>
//         <div>Fri</div>
//         <div>Sat</div>
//       </div>

//       {/* Calendar Days */}
//       <div className="grid grid-cols-7">
//         {days.map((item, index) => (
//           <div
//             key={index}
//             onClick={() => item.day && handleDayClick(item.day)} // SELECT DAY
//             className={`flex h-10 cursor-pointer items-center justify-center ${item.currentMonth ? "text-black" : "text-gray-300"} ${selectedDays[monthKey] === item.day ? "rounded-full bg-blue-500 text-white" : ""} hover:bg-blue-100`}
//           >
//             {item.day}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
