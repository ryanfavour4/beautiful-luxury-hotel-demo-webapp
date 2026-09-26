export function generateInvoiceHTML(booking: any) {
  const invoiceDate = new Date().toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const checkInDate = new Date(booking.checkInDate);
  const checkOutDate = new Date(booking.checkOutDate);

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(v || 0);

  const guestName = booking?.guests?.[0]
    ? `${booking.guests[0].firstName} ${booking.guests[0].lastName}`
    : booking.userId?.fullName || 'Guest';

  const hotelName = booking?.hotelId?.name || 'Hotel';
  const hotelAddress = booking?.hotelId?.address || 'Hotel Address';

  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Invoice - ${booking._id}</title>
      <style>
        body{font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; background:#f8fafc; margin:0; padding:24px}
        .container{max-width:900px;margin:0 auto;background:#fff;padding:32px;border-radius:8px}
        .header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #916001;padding-bottom:18px;margin-bottom:22px}
        .title{color:#916001;font-size:28px;font-weight:700}
        .muted{color:#6b7280}
        .grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:22px}
        h3{color:#916001;margin:0 0 8px 0}
        table{width:100%;border-collapse:collapse}
        th,td{padding:10px 8px}
        thead tr{border-bottom:2px solid #e5e7eb}
        tbody tr{border-bottom:1px solid #e5e7eb}
        .summary{margin-top:12px;text-align:right}
        .footer{border-top:2px solid #e5e7eb;padding-top:16px;margin-top:24px;color:#6b7280;font-size:13px;text-align:center}
      </style>
      <script>
        window.onload = function(){
          setTimeout(function(){ window.print(); setTimeout(()=>window.close(),500); }, 250);
        }
      </script>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div>
            <div class="title">INVOICE</div>
            <div class="muted">Booking Confirmation</div>
          </div>
          <div style="text-align:right">
            <div style="font-weight:700;color:#916001">${hotelName}</div>
            <div class="muted">${hotelAddress}</div>
          </div>
        </div>

        <div class="grid">
          <div>
            <h3>INVOICE TO</h3>
            <div style="font-weight:600">${guestName}</div>
            <div class="muted">${booking.userId?.email || ''}</div>
            <div class="muted">Booking ID: ${booking._id}</div>
          </div>
          <div style="text-align:right">
            <div style="margin-bottom:8px"><strong>Invoice Date:</strong> ${invoiceDate}</div>
            <div><strong>Invoice #:</strong> INV-${String(booking._id).slice(-8).toUpperCase()}</div>
            <div style="margin-top:8px;padding:6px 10px;border-radius:6px;display:inline-block;background:${booking.status==='confirmed'?'#dcfce7':booking.status==='pending'?'#fef08a':'#fee2e2'};color:${booking.status==='confirmed'?'#166534':booking.status==='pending'?'#854d0e':'#991b1b'};font-weight:600">${(booking.status||'').toUpperCase()}</div>
          </div>
        </div>

        <div style="margin-bottom:18px;padding:16px;border:1px solid #e5e7eb;border-radius:8px">
          <h3 style="margin-bottom:12px">BOOKING DETAILS</h3>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
            <div>
              <div class="muted">Room Type</div>
              <div style="font-weight:600">${booking.roomTypeId?.name||''}</div>
            </div>
            <div>
              <div class="muted">Check In</div>
              <div style="font-weight:600">${checkInDate.toLocaleDateString('en-NG')}</div>
            </div>
            <div>
              <div class="muted">Check Out</div>
              <div style="font-weight:600">${checkOutDate.toLocaleDateString('en-NG')}</div>
            </div>
            <div>
              <div class="muted">Nights</div>
              <div style="font-weight:600">${booking.totalNights||1}</div>
            </div>
          </div>
        </div>

        <div style="margin-bottom:22px">
          <h3 style="margin-bottom:12px">PRICING BREAKDOWN</h3>
          <table>
            <thead>
              <tr>
                <th style="text-align:left">Description</th>
                <th style="text-align:center">Quantity</th>
                <th style="text-align:right">Unit Price</th>
                <th style="text-align:right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${booking.roomTypeId?.name||''}</td>
                <td style="text-align:center">${booking.totalNights||1}</td>
                <td style="text-align:right">${formatCurrency(booking.pricePerNight)}</td>
                <td style="text-align:right;font-weight:600">${formatCurrency(booking.pricePerNight * (booking.totalNights||1))}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="summary">
          <div style="margin-bottom:6px"><strong>Subtotal:</strong> ${formatCurrency(booking.basePrice||0)}</div>
          <div style="margin-bottom:6px"><strong>Tax (10% VAT):</strong> ${formatCurrency(booking.amount * 0.1)}</div>
          <div style="font-size:18px;margin-top:8px"><strong>TOTAL AMOUNT:</strong> ${formatCurrency(booking.amount)}</div>
        </div>

        <div class="footer">
          <div style="font-weight:600;color:#916001;margin-bottom:6px">Thank you for your booking!</div>
          <div>This is an automated invoice. Please contact support if you have any questions.</div>
          <div style="margin-top:12px;font-size:12px">© ${new Date().getFullYear()} ${hotelName}. All rights reserved.</div>
        </div>
      </div>
    </body>
  </html>`;
}
