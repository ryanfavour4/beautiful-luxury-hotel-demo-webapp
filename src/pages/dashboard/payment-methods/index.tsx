// import { Icon } from "@iconify/react";
// import { Link } from "react-router";
import PaymentHistory from "./payment-history";

// const PaymentMethods = () => {
//   return (
//     <div className="lg:ml-4 flex min-h-screen w-full flex-col rounded-2xl  bg-light px-6">
//       <div className="flex flex-col gap-2 border-b-2 border-b-neutral-100 py-6">
//         <h1 className="text-2xl font-bold text-dark/60">Payment Methods</h1>
//         <p className=" text-grey">
//           Securely add or remove payment methods to make it easier when you book
//         </p>
//       </div>
//       <div className="flex md:flex-row flex-col w-full md:items-center items-start gap-3 justify-between py-4">
//         <div className="flex flex-col gap-2">
//           <h2 className="text-lg font-semibold text-neutral-700">Payment methods</h2>
//           <p className="text-sm text-grey">
//             Add a payment method using our secure payment system, then start planning your next
//             trip.
//           </p>
//         </div>
//         <Link to="/" className="text-primary hover:underline">
//           Add payments method
//         </Link>
//       </div>
//       <div className="flex w-full items-start justify-between border-b-2 border-b-neutral-100 py-6">
//         <div className="flex items-center justify-normal gap-2">
//           <Icon
//             icon={"logos:visa"}
//             className="h-9 w-12 rounded-md border-[1.5px] border-neutral-100 px-1 py-0"
//           />
//           <div className="flex items-start justify-normal gap-1">
//             <div className="flex flex-col gap-1">
//               <h2 className="font-semibold">Visa .... <span>{String(1234567892345689).slice(12,16)}</span></h2>
//               <p className="text-xs font-semibold">Expiration: 06/2022</p>
//             </div>
//             <p className="w-fit rounded-2xl border-[1px] bg-gray-100 px-2 py-[1px] text-[10px] text-grey font-medium uppercase">
//               Default
//             </p>
//           </div>
//         </div>
//         <Icon icon={"material-symbols-light:more-horiz"} fontSize={32} />
//         {/* <MoreOverlayMenu/> */}
//       </div>
//       <div className="flex w-full items-start justify-between border-b-2 border-b-neutral-100 py-6">
//         <div className="flex items-center justify-normal gap-2">
//           <Icon
//             icon={"logos:mastercard"}
//             className="h-9 w-12 rounded-md border-[1.5px] border-neutral-100 px-1 py-0"
//           />

//           <div className="flex flex-col gap-1">
//             <h2 className="font-semibold">Master Card ....<span>{String(1234567892345689).slice(12,16)}</span></h2>
//             <p className="text-xs font-semibold">Expiration: 06/2022</p>
//           </div>
//         </div>
//         <Icon icon={"material-symbols-light:more-horiz"} fontSize={32} />
//       </div>
//       {/* COUPONS SECTION  */}
//       <div className="md:mt-24 mt-auto flex flex-col justify-end">
//         <h6 className="border-b-2 border-b-neutral-100 py-3 font-semibold">Coupons</h6>
//         <div className="flex w-full items-center justify-between pt-6">
//           <p>Your coupons</p>
//           <p>0</p>
//         </div>
//         <Link to="/" className="font-semi-bold py-6 text-sm text-primary hover:underline">
//           Add Coupons
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PaymentMethods;

export default function index() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col rounded-2xl bg-light p-4 lg:ml-4">
        <PaymentHistory />
      </div>
    </>
  );
}
