export function exportCSV(names: string[]) {
  const csvContent = "data:text/csv;charset=utf-8," + names.join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "startup_names.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}