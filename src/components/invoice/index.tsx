import { BookingByIdResponseBookings } from "@/api/hooks/types";
import { getStatusBadgeClass } from "../status-indicator";

export interface InvoiceProps {
  booking: BookingByIdResponseBookings;
  onClose?: () => void;
}

export const Invoice = ({ booking, onClose }: InvoiceProps) => {
  const invoiceDate = new Date().toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const checkInDate = new Date(booking.checkInDate);
  const checkOutDate = new Date(booking.checkOutDate);

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(v || 0);

  return (
    <div
      style={{
        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        color: "#111827",
      }}
    >
      <div style={{ background: "#fff", padding: 32, borderRadius: 8, maxWidth: 900 }}>
        {/* Header */}
        <div
          style={{
            marginBottom: 24,
            borderBottom: "2px solid #916001",
            paddingBottom: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 12,
          }}
        >
          <div>
            <h1 style={{ color: "#916001", fontSize: 28, margin: 0 }}>INVOICE</h1>
            <p style={{ color: "#6b7280", marginTop: 6 }}>Booking Confirmation</p>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 700, color: "#916001" }}>{booking?.hotelId?.name}</div>
              <div style={{ color: "#6b7280" }}>{booking?.hotelId.address || "Hotel Address"}</div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                style={{
                  background: "transparent",
                  border: "1px solid #e5e7eb",
                  padding: "6px 10px",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            )}
          </div>
        </div>

        {/* Invoice details */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <div>
            <h3 style={{ margin: "0 0 8px 0", color: "#916001" }}>INVOICE TO</h3>
            <div style={{ fontWeight: 600 }}>
              {booking?.guests?.[0]?.firstName} {booking?.guests?.[0]?.lastName}
            </div>
            <div style={{ color: "#6b7280" }}>{booking.userId?.email || ""}</div>
            <div style={{ color: "#6b7280", marginTop: 6 }}>Booking ID: {booking._id}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ marginBottom: 8 }}>
              <strong>Invoice Date:</strong> {invoiceDate}
            </div>
            <div>
              <strong>Invoice #:</strong> INV-{String(booking._id).slice(-8).toUpperCase()}
            </div>
            <div
              style={{
                marginTop: 8,
                display: "inline-block",
                padding: "6px 10px",
                borderRadius: 6,
                fontWeight: 600,
              }}
            >
              {getStatusBadgeClass(booking.status || "").toUpperCase()}
            </div>
          </div>
        </div>

        {/* Booking details */}
        <div
          style={{ marginBottom: 20, padding: 12, border: "1px solid #e5e7eb", borderRadius: 8 }}
        >
          <h3 style={{ margin: "0 0 12px 0", color: "#916001" }}>BOOKING DETAILS</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            <div>
              <div style={{ color: "#6b7280", fontSize: 12, textTransform: "uppercase" }}>
                Room Type
              </div>
              <div style={{ fontWeight: 600 }}>{booking.roomTypeId?.name}</div>
            </div>
            <div>
              <div style={{ color: "#6b7280", fontSize: 12, textTransform: "uppercase" }}>
                Check In
              </div>
              <div style={{ fontWeight: 600 }}>{checkInDate.toLocaleDateString("en-NG")}</div>
            </div>
            <div>
              <div style={{ color: "#6b7280", fontSize: 12, textTransform: "uppercase" }}>
                Check Out
              </div>
              <div style={{ fontWeight: 600 }}>{checkOutDate.toLocaleDateString("en-NG")}</div>
            </div>
            <div>
              <div style={{ color: "#6b7280", fontSize: 12, textTransform: "uppercase" }}>
                Nights
              </div>
              <div style={{ fontWeight: 600 }}>{booking.totalNights}</div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ margin: "0 0 12px 0", color: "#916001" }}>PRICING BREAKDOWN</h3>
          <table style={{ width: "100%" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                <th style={{ textAlign: "left", padding: "8px" }}>Description</th>
                <th style={{ textAlign: "center", padding: "8px" }}>Qty</th>
                <th style={{ textAlign: "right", padding: "8px" }}>Unit Price</th>
                <th style={{ textAlign: "right", padding: "8px" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "12px" }}>{booking.roomTypeId?.name}</td>
                <td style={{ padding: "12px", textAlign: "center" }}>{booking.totalNights}</td>
                <td style={{ padding: "12px", textAlign: "right" }}>
                  {formatCurrency(booking.pricePerNight)}
                </td>
                <td style={{ padding: "12px", textAlign: "right", fontWeight: 600 }}>
                  {formatCurrency(booking.pricePerNight * booking.totalNights)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ width: "100%", maxWidth: 360 }}>
            <div style={{ background: "#f9fafb", padding: 12, borderRadius: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span>Subtotal:</span>
                <span>{formatCurrency(booking.basePrice || 0)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span>Tax (10% VAT):</span>
                <span>{formatCurrency(booking.amount * 0.1)}</span>
              </div>
              <div
                style={{
                  borderTop: "2px solid #916001",
                  paddingTop: 12,
                  marginTop: 12,
                  fontWeight: 700,
                  color: "#916001",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>TOTAL AMOUNT:</span>
                  <span>{formatCurrency(booking.amount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 24,
            borderTop: "2px solid #e5e7eb",
            paddingTop: 16,
            textAlign: "center",
            color: "#6b7280",
            fontSize: 13,
          }}
        >
          <div style={{ fontWeight: 600, color: "#916001", marginBottom: 6 }}>
            Thank you for your booking!
          </div>
          <div>This is an automated invoice. Please contact support if you have any questions.</div>
          <div style={{ marginTop: 12, fontSize: 12 }}>
            © {new Date().getFullYear()} {booking.hotelId?.name}. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};
