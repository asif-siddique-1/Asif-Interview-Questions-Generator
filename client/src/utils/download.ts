import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import type { Question } from "../types";

export const downloadQuestions = async (
  questions: Question[],
  questionsRef: React.RefObject<HTMLDivElement | null>,
  format: "json" | "pdf"
) => {
  if (format === "json") {
    const blob = new Blob([JSON.stringify(questions, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `interview-questions-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } else if (format === "pdf" && questionsRef.current) {
    try {
      // Create a clone of the element to modify styles
      const element = questionsRef.current;
      const clone = element.cloneNode(true) as HTMLElement;

      // Make the clone invisible and position it off-screen
      clone.style.position = "absolute";
      clone.style.left = "-9999px";
      clone.style.top = "0";
      clone.style.width = "210mm";
      clone.style.padding = "20mm";
      clone.style.boxSizing = "border-box";

      // Add the clone to the document
      document.body.appendChild(clone);

      // Generate PDF from the clone
      const options = {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: true,
        windowWidth: clone.scrollWidth,
        windowHeight: clone.scrollHeight,
        backgroundColor: "#ffffff",
        removeContainer: true,
      };

      const canvas = await html2canvas(clone, options);
      const imgData = canvas.toDataURL("image/png");

      // Remove the clone
      document.body.removeChild(clone);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(
        imgData,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        "FAST"
      );
      heightLeft -= pageHeight;

      // Add new pages if content is longer than one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(
          imgData,
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight,
          undefined,
          "FAST"
        );
        heightLeft -= pageHeight;
      }

      pdf.save(
        `interview-questions-${new Date().toISOString().split("T")[0]}.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(
        "Failed to generate PDF. Please try again or use the JSON export option."
      );
    }
  }
};
