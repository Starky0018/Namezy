import jsPDF from "jspdf";

export function exportPDF(names: string[]) {
  const doc = new jsPDF();
  doc.text("Startup Names", 10, 10);
  names.forEach((name, i) => {
    doc.text(name, 10, 20 + i * 10);
  });
  doc.save("startup_names.pdf");
}