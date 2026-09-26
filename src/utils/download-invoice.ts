
export const downloadInvoicePDF = async (
  // bookingId: string,
  bookingName: string
) => {
  try {
    // Dynamically import html2canvas and jsPDF to avoid bundle size issues
    const html2canvas = (await import("html2canvas")).default;
    const jsPDF = (await import("jspdf")).jsPDF;

    const element = document.getElementById("invoice-document");
    if (!element) {
      throw new Error("Invoice document not found");
    }

    // Create canvas from HTML
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    // Calculate PDF dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create PDF
    const pdf = new jsPDF("p", "mm", "a4");
    let heightLeft = imgHeight;
    let position = 0;

    // Add image to PDF
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add pages if content exceeds one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Generate filename
    const fileName = `invoice-${bookingName}-${new Date().toISOString().split("T")[0]}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error("Error downloading invoice:", error);
    throw new Error(
      "Failed to download invoice. Please ensure all dependencies are installed."
    );
  }
};
