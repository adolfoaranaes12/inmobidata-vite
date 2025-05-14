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
  
  // Initial Y position for content after title
  let yPos = 40;
  
  // Add property images (all available)
  if (property.images && property.images.length > 0) {
    // Add a section title for the gallery
    pdf.setFontSize(14);
    pdf.setTextColor(33, 150, 243);
    pdf.text('Galería de Imágenes:', margin, yPos);
    yPos += 10;
    
    // Calculate image dimensions based on number of images
    const imgWidth = Math.min((pageWidth - (2 * margin) - (property.images.length > 1 ? 10 : 0)) / Math.min(property.images.length, 2), 85);
    const maxImgHeight = 70; // Maximum height for each image
    
    // Keep track of the row and position within row
    let rowPos = 0;
    let currentYPos = yPos;
    let maxHeightInRow = 0;
    
    // Process each image
    for (let i = 0; i < property.images.length; i++) {
      try {
        // Create a temporary image element
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // Handle CORS issues
        img.src = property.images[i];
        
        // Wait for image to load
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        
        // Calculate height based on aspect ratio, constrained by maxImgHeight
        const imgHeight = Math.min((img.height * imgWidth) / img.width, maxImgHeight);
        
        // Determine x position (margin + position in row * (width + spacing))
        const xPos = margin + (rowPos * (imgWidth + 5));
        
        // Add image to PDF
        pdf.addImage(img, 'JPEG', xPos, currentYPos, imgWidth, imgHeight);
        
        // Update the maximum height in the current row
        maxHeightInRow = Math.max(maxHeightInRow, imgHeight);
        
        // Increase rowPos or move to next row
        rowPos++;
        if (rowPos >= 2 || i === property.images.length - 1) {
          // Move Y position down for next row
          currentYPos += maxHeightInRow + 5;
          // Reset row position and max height
          rowPos = 0;
          maxHeightInRow = 0;
        }
        
        // Check if we need a new page (if next image would go beyond page limit)
        if (currentYPos > pageHeight - 50 && i < property.images.length - 1) {
          pdf.addPage();
          currentYPos = 20;
          maxHeightInRow = 0;
        }
      } catch (error) {
        console.error(`Error adding image ${i} to PDF:`, error);
      }
    }
    
    // Update Y position for next content, accounting for the gallery
    yPos = currentYPos + 15;
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
  
  // Check if we need a new page for features and description
  if (yPos > pageHeight - 100) {
    pdf.addPage();
    yPos = 20;
  }
  
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
  
  // Check if we need a new page for description
  if (yPos > pageHeight - 80) {
    pdf.addPage();
    yPos = 20;
  }
  
  // Add description section
  pdf.setFontSize(14);
  pdf.setTextColor(33, 150, 243);
  pdf.text('Descripción:', margin, yPos);
  yPos += 7;
  
  // Add property description with word wrapping
  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  const splitDescription = pdf.splitTextToSize(property.description, pageWidth - (2 * margin));
  
  // Check if description will fit on current page
  if (yPos + splitDescription.length * 7 > pageHeight - 30) {
    pdf.addPage();
    yPos = 20;
  }
  
  pdf.text(splitDescription, margin, yPos);
  yPos += splitDescription.length * 7 + 15;
  
  // Check if we need a new page for publisher info
  if (yPos > pageHeight - 40) {
    pdf.addPage();
    yPos = 20;
  }
  
  // Add publisher information
  pdf.setFontSize(12);
  pdf.setTextColor(100, 100, 100);
  pdf.text(`Publicado por: ${property.publisher}`, margin, yPos);
  yPos += 7;
  pdf.text(`Contacto: ${property.contact}`, margin, yPos);
  
  // Add footer with Inmobidata info and date on every page
  const pageCount = pdf.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(10);
    pdf.setTextColor(150, 150, 150);
    const today = new Date().toLocaleDateString('es-MX');
    pdf.text(`Generado por Inmobidata el ${today}`, margin, pageHeight - 10);
    pdf.text(`Página ${i} de ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    pdf.text('www.inmobidata.com', pageWidth - margin, pageHeight - 10, { align: 'right' });
  }
  
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
  
  // Add properties (one per page for basic info, plus image gallery)
  for (let i = 0; i < properties.length; i++) {
    // Add new page for each property
    pdf.addPage();
    
    const property = properties[i];
    
    // Add property details
    let yPos = 20;
    
    // Add property title
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Propiedad ${i + 1}: ${property.title}`, pageWidth / 2, yPos, { align: 'center' });
    yPos += 15;
    
    // Images section - gallery approach
    if (property.images && property.images.length > 0) {
      // Add title for images
      pdf.setFontSize(14);
      pdf.setTextColor(33, 150, 243);
      pdf.text('Fotos de la propiedad:', margin, yPos);
      yPos += 8;
      
      // Calculate image size and layout
      const maxImagesPerRow = 2;
      const imgPadding = 5;
      const imgWidth = (pageWidth - (2 * margin) - (imgPadding * (maxImagesPerRow - 1))) / maxImagesPerRow;
      const maxImgHeight = 60; // Maximum height per image
      
      // Track row position
      let rowPos = 0;
      let currentYPos = yPos;
      let maxHeightInRow = 0;
      
      // Process each image
      for (let j = 0; j < property.images.length; j++) {
        try {
          const img = new Image();
          img.crossOrigin = 'Anonymous';
          img.src = property.images[j];
          
          await new Promise((resolve) => {
            img.onload = resolve;
          });
          
          // Calculate proportional height, limited by max height
          const imgHeight = Math.min((img.height * imgWidth) / img.width, maxImgHeight);
          
          // X position in the current row
          const xPos = margin + (rowPos * (imgWidth + imgPadding));
          
          // Add image
          pdf.addImage(img, 'JPEG', xPos, currentYPos, imgWidth, imgHeight);
          
          // Update max height in row
          maxHeightInRow = Math.max(maxHeightInRow, imgHeight);
          
          // Move to next position or row
          rowPos++;
          if (rowPos >= maxImagesPerRow || j === property.images.length - 1) {
            // Move down for next row
            currentYPos += maxHeightInRow + imgPadding;
            rowPos = 0;
            maxHeightInRow = 0;
          }
          
          // Check if we need a new page for more images
          if (currentYPos > pageHeight - 70 && j < property.images.length - 1) {
            pdf.addPage();
            currentYPos = 20;
            
            // Add continued title on new page
            pdf.setFontSize(14);
            pdf.setTextColor(33, 150, 243);
            pdf.text('Fotos de la propiedad (continuación):', margin, currentYPos);
            currentYPos += 8;
          }
        } catch (error) {
          console.error(`Error adding image ${j} for property ${i+1}:`, error);
        }
      }
      
      // Update Y position after all images
      yPos = currentYPos + 10;
    }
    
    // Check if we need a new page for property details
    if (yPos > pageHeight - 100) {
      pdf.addPage();
      yPos = 20;
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
    yPos += 12;
    
    // Add features if available
    if (property.features && property.features.length > 0) {
      pdf.setFontSize(14);
      pdf.setTextColor(33, 150, 243);
      pdf.text('Características:', margin, yPos);
      yPos += 7;
      
      // Features in a compact format
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      
      let featuresPerRow = 2;
      let featureColWidth = (pageWidth - (2 * margin)) / featuresPerRow;
      
      for (let j = 0; j < property.features.length; j += featuresPerRow) {
        let rowText = '';
        for (let k = 0; k < featuresPerRow && j + k < property.features.length; k++) {
          rowText = `• ${property.features[j + k]}`;
          pdf.text(rowText, margin + (k * featureColWidth), yPos);
        }
        yPos += 7;
      }
      yPos += 5;
    }
    
    // Add property description (shortened if needed)
    pdf.setFontSize(14);
    pdf.setTextColor(33, 150, 243);
    pdf.text('Descripción:', margin, yPos);
    yPos += 7;
    
    // Add shortened description
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    
    // Get available height for description
    const availableHeight = pageHeight - yPos - 20;
    const lineHeight = 7; // approximate line height in mm
    const maxLines = Math.floor(availableHeight / lineHeight);
    
    // Split description for text wrapping
    const maxDescLength = 1000; // Longer limit since we're showing all images
    const shortDesc = property.description.length > maxDescLength 
      ? property.description.substring(0, maxDescLength) + '...' 
      : property.description;
    const splitDescription = pdf.splitTextToSize(shortDesc, pageWidth - (2 * margin));
    
    // If it won't fit on current page, add a new page
    if (splitDescription.length > maxLines) {
      pdf.addPage();
      yPos = 20;
      
      pdf.setFontSize(14);
      pdf.setTextColor(33, 150, 243);
      pdf.text('Descripción (continuación):', margin, yPos);
      yPos += 7;
    }
    
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(splitDescription, margin, yPos);
  }
  
  // Add page numbers to all pages
  const pageCount = pdf.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(10);
    pdf.setTextColor(150, 150, 150);
    const today = new Date().toLocaleDateString('es-MX');
    pdf.text(`Generado por Inmobidata el ${today}`, margin, pageHeight - 10);
    pdf.text(`Página ${i} de ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    pdf.text('www.inmobidata.com', pageWidth - margin, pageHeight - 10, { align: 'right' });
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