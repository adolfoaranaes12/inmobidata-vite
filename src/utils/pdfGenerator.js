import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Function to generate PDF with property information
export const generatePropertyPDF = async (property) => {
  // Create a new PDF document
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  
  // Add title
  pdf.setFontSize(20);
  pdf.setTextColor(33, 150, 243); // Blue color
  pdf.text('INMOBIDATA', pageWidth / 2, 20, { align: 'center' });
  
  // Add property title
  pdf.setFontSize(16);
  pdf.setTextColor(0, 0, 0);
  const title = property.title;
  pdf.text(title, pageWidth / 2, 30, { align: 'center' });
  
  // Add property image if available
  if (property.images && property.images.length > 0) {
    try {
      // Create a temporary image element
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // Handle CORS issues
      img.src = property.images[0];
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      
      // Add image to PDF
      const imgWidth = pageWidth - (2 * margin);
      const imgHeight = (img.height * imgWidth) / img.width;
      pdf.addImage(img, 'JPEG', margin, 40, imgWidth, imgHeight);
      
      // Update Y position for next content
      var yPos = 40 + imgHeight + 10;
    } catch (error) {
      console.error('Error adding image to PDF:', error);
      var yPos = 40;
    }
  } else {
    var yPos = 40;
  }
  
  // Add price
  pdf.setFontSize(14);
  pdf.setTextColor(33, 150, 243); // Blue color
  const formattedPrice = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  }).format(property.price);
  pdf.text(`Precio: ${formattedPrice}`, margin, yPos);
  yPos += 10;
  
  // Add location
  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  pdf.text(`Ubicación: ${property.location}`, margin, yPos);
  yPos += 10;
  
  // Add details
  pdf.setFontSize(12);
  pdf.text(`Recámaras: ${property.bedrooms}`, margin, yPos);
  yPos += 7;
  pdf.text(`Baños: ${property.bathrooms}`, margin, yPos);
  yPos += 7;
  pdf.text(`Terreno: ${property.landArea} m²`, margin, yPos);
  yPos += 7;
  pdf.text(`Construcción: ${property.constructionArea} m²`, margin, yPos);
  yPos += 15;
  
  // Add features section
  pdf.setFontSize(14);
  pdf.setTextColor(33, 150, 243);
  pdf.text('Características:', margin, yPos);
  yPos += 7;
  
  // Add features list
  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  if (property.features && property.features.length > 0) {
    property.features.forEach(feature => {
      pdf.text(`• ${feature}`, margin + 5, yPos);
      yPos += 7;
    });
  }
  yPos += 10;
  
  // Add description section
  pdf.setFontSize(14);
  pdf.setTextColor(33, 150, 243);
  pdf.text('Descripción:', margin, yPos);
  yPos += 7;
  
  // Add property description with word wrapping
  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  const splitDescription = pdf.splitTextToSize(property.description, pageWidth - (2 * margin));
  pdf.text(splitDescription, margin, yPos);
  yPos += splitDescription.length * 7 + 15;
  
  // Add publisher information
  pdf.setFontSize(12);
  pdf.setTextColor(100, 100, 100);
  pdf.text(`Publicado por: ${property.publisher}`, margin, yPos);
  yPos += 7;
  pdf.text(`Contacto: ${property.contact}`, margin, yPos);
  yPos += 15;
  
  // Add footer with Inmobidata info and date
  pdf.setFontSize(10);
  pdf.setTextColor(150, 150, 150);
  const today = new Date().toLocaleDateString('es-MX');
  pdf.text(`Generado por Inmobidata el ${today}`, margin, pageHeight - 10);
  pdf.text('www.inmobidata.com', pageWidth - margin, pageHeight - 10, { align: 'right' });
  
  // Save and return the PDF
  return pdf;
};

// Function to download PDF
export const downloadPropertyPDF = async (property) => {
  const pdf = await generatePropertyPDF(property);
  pdf.save(`Inmobidata-Propiedad-${property.id}.pdf`);
};

// Function to generate PDF from DOM element (for more complex layouts)
export const generatePDFFromElement = async (element, filename) => {
  try {
    // Capture the DOM element as canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // To handle images from other domains
      logging: false
    });
    
    // Create PDF from canvas
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate dimensions to fit the image while maintaining aspect ratio
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // If the height is greater than the page height, scale down
    let finalImgWidth = imgWidth;
    let finalImgHeight = imgHeight;
    
    if (imgHeight > pageHeight) {
      finalImgHeight = pageHeight - 20; // Leave some margin
      finalImgWidth = (canvas.width * finalImgHeight) / canvas.height;
    }
    
    // Center the image on the page
    const x = (pageWidth - finalImgWidth) / 2;
    const y = 10; // Top margin
    
    // Add image to PDF
    pdf.addImage(imgData, 'JPEG', x, y, finalImgWidth, finalImgHeight);
    
    // Save PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};

// Function to generate and download PDFs for multiple selected properties
export const downloadMultiplePropertiesPDF = async (properties) => {
  if (!properties || properties.length === 0) {
    console.error('No properties provided for PDF generation');
    return;
  }
  
  // If only one property, use the single property function
  if (properties.length === 1) {
    return downloadPropertyPDF(properties[0]);
  }
  
  // Create a new PDF document for multiple properties
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  
  // Add title page
  pdf.setFontSize(22);
  pdf.setTextColor(33, 150, 243); // Blue color
  pdf.text('INMOBIDATA', pageWidth / 2, pageHeight / 3, { align: 'center' });
  
  pdf.setFontSize(16);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Reporte de Propiedades Seleccionadas', pageWidth / 2, pageHeight / 3 + 15, { align: 'center' });
  
  pdf.setFontSize(12);
  const today = new Date().toLocaleDateString('es-MX');
  pdf.text(`Generado el: ${today}`, pageWidth / 2, pageHeight / 3 + 30, { align: 'center' });
  pdf.text(`Total de propiedades: ${properties.length}`, pageWidth / 2, pageHeight / 3 + 40, { align: 'center' });
  
  // Add properties (one per page)
  for (let i = 0; i < properties.length; i++) {
    // Add new page for each property (except the first which goes after the title)
    if (i > 0) {
      pdf.addPage();
    } else {
      pdf.addPage();
    }
    
    const property = properties[i];
    
    // Add property details
    let yPos = 20;
    
    // Add property title
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Propiedad ${i + 1}: ${property.title}`, pageWidth / 2, yPos, { align: 'center' });
    yPos += 15;
    
    // Add property image if available
    if (property.images && property.images.length > 0) {
      try {
        // Create a temporary image element
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = property.images[0];
        
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        
        // Add image to PDF
        const imgWidth = pageWidth - (2 * margin);
        const imgHeight = (img.height * imgWidth) / img.width;
        pdf.addImage(img, 'JPEG', margin, yPos, imgWidth, Math.min(imgHeight, 70));
        
        // Update Y position for next content
        yPos += Math.min(imgHeight, 70) + 10;
      } catch (error) {
        console.error(`Error adding image for property ${i + 1}:`, error);
      }
    }
    
    // Add property details
    pdf.setFontSize(14);
    pdf.setTextColor(33, 150, 243);
    pdf.text(`Precio: ${new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(property.price)}`, margin, yPos);
    yPos += 10;
    
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Ubicación: ${property.location}`, margin, yPos);
    yPos += 7;
    pdf.text(`Recámaras: ${property.bedrooms} | Baños: ${property.bathrooms}`, margin, yPos);
    yPos += 7;
    pdf.text(`Terreno: ${property.landArea} m² | Construcción: ${property.constructionArea} m²`, margin, yPos);
    yPos += 10;
    
    // Add shortened description
    pdf.setFontSize(12);
    const maxDescLength = 200;
    const shortDesc = property.description.length > maxDescLength 
      ? property.description.substring(0, maxDescLength) + '...' 
      : property.description;
    const splitDescription = pdf.splitTextToSize(shortDesc, pageWidth - (2 * margin));
    pdf.text(splitDescription, margin, yPos);
  }
  
  // Save the combined PDF
  pdf.save('Inmobidata-Propiedades-Seleccionadas.pdf');
};

export default {
  generatePropertyPDF,
  downloadPropertyPDF,
  generatePDFFromElement,
  downloadMultiplePropertiesPDF
}; 