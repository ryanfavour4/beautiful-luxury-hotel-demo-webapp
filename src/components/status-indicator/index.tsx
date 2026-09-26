// export function StatusIndicator({
//   statusIndicator,
//   ...rest
// }: {
//   statusIndicator: string | boolean;
// }) {
//   const status = String(statusIndicator).toLowerCase();

//   // Define status colors for different shipment-related statuses
//   const statusColors: Record<string, string> = {
//     default: "border-gray-500/50 bg-gray-500/10 text-gray-500",
//     claimed: "border-primary-500/50 bg-primary-500/10 text-primary-500",
//     false: "border-red-500/50 bg-red-500/10 text-red-500",
//     true: "border-green-500/50 bg-green-500/10 text-green-500",
//     unclaimed: "border-red-500/50 bg-red-500/10 text-red-500",
//     approved: "border-green-500/50 bg-green-500/10 text-green-500",
//     active: "border-green-500/50 bg-green-500/10 text-green-500",
//     pending: "border-yellow-500/50 bg-yellow-500/10 text-yellow-500",
//     declined: "border-red-500/50 bg-red-500/10 text-red-500",
//     inactive: "border-red-500/50 bg-red-500/10 text-red-500",

//     // 🚀 Added shipment-specific statuses
//     "in transit": "border-blue-500/50 bg-blue-500/10 text-blue-500",
//     arrived: "border-indigo-500/50 bg-indigo-500/10 text-indigo-500",
//     delivered: "border-green-600/50 bg-green-600/10 text-green-600",
//     returned: "border-purple-500/50 bg-purple-500/10 text-purple-500",
//     canceled: "border-red-700/50 bg-red-700/10 text-red-700",
//     cancelled: "border-red-700/50 bg-red-700/10 text-red-700",
//     "awaiting pickup": "border-orange-500/50 bg-orange-500/10 text-orange-500",
//     "customs hold": "border-red-600/50 bg-red-600/10 text-red-600",
//     "out for delivery": "border-teal-500/50 bg-teal-500/10 text-teal-500",
//   };

//   return (
//     <button
//       className={`rounded-md border px-2 py-1 text-xs capitalize ${statusColors[status] || "border-gray-500/50 bg-gray-500/10 text-gray-500"}`}
//       {...rest}
//     >
//       {status}
//     </button>
//   );
// }
export const getStatusBadgeClass = (status?: string) => {
  switch (status) {
    case "confirmed":
      return "border-success text-success";
    case "pending":
      return "border-warning text-warning";
    case "cancelled":
      return "border-error text-error";
    case "checked-in":
      return "border-info text-info";
    case "checkedin":
      return "border-info text-info";
    case "checked-out":
      return "border-grey text-grey";
    case "checkedout":
      return "border-grey text-grey";
    case "no-show":
      return "border-orange-400 text-orange-400";
    case "noshow":
      return "border-orange-400 text-orange-400";
    case "expired":
      return "border-neutral-300 text-neutral-300";
    case "hold":
      return "border-primary text-primary";
    default:
      return "border-neutral-300 text-neutral-300";
  }
};
