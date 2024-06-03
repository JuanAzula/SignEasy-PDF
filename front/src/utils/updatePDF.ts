import { PDFDocument } from 'pdf-lib';

export const addSignatureToPdf = async (pdfData: string | Uint8Array | ArrayBuffer, signatureDataUrl: string | Uint8Array | ArrayBuffer) => {
    const pdfDoc = await PDFDocument.load(pdfData);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Add the signature image to the PDF
    const pngImage = await pdfDoc.embedPng(signatureDataUrl);
    const { width, height } = firstPage.getSize();
    firstPage.drawImage(pngImage, {
        x: width - 200,
        y: height - 100,
        width: 150,
        height: 75,
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
};
