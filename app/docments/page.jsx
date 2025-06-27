'use client'

import { useEffect, useRef } from 'react';

export default function PdfViewer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Load pdf.js library
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Set the worker source for pdf.js
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js';

      // Load and render the PDF
      const loadPdf = async () => {
        try {
          const pdf = await window.pdfjsLib.getDocument('/sample.pdf').promise;
          const page = await pdf.getPage(1);
          const scale = 1.5;
          const viewport = page.getViewport({ scale });

          // Prepare canvas
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // Render PDF page into canvas context
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          await page.render(renderContext).promise;
        } catch (error) {
          console.error('Error rendering PDF:', error);
        }
      };

      loadPdf();
    };

    // Disable right-click context menu
    const disableContextMenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', disableContextMenu);

    // Disable print functionality
    const disablePrint = () => {
      if (window.matchMedia) {
        const mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener((mql) => {
          if (mql.matches) {
            window.location.reload(); // Reload to prevent printing
          }
        });
      }
    };
    disablePrint();

    // Cleanup event listeners
    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <h6>Document Viewer</h6>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f0f0' }}>
        <canvas ref={canvasRef} />
      </div>
    </>
  );
}