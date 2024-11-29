
browser.contextMenus.create({
    id: "convertWebP",
    title: "Convert WebP to PNG/JPG", // For the context menu
    contexts: ["image"],
  });
  

  browser.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
      case "convertWebP":
        console.log("Converting WebP image:", info.srcUrl);
        convertWebPToImage(info.srcUrl, 'image/png'); // PNG by default
        break;
    }
  });
  
 
  function convertWebPToImage(url, format = 'image/png') {
    // Proxy URL
    const proxyUrl = "http://localhost:3000/proxy?url=" + encodeURIComponent(url);
  
    // Fetch the image via the proxy
    fetch(proxyUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.blob(); // Get image as blob
      })
      .then(blob => {
        const img = new Image();
        const objectUrl = URL.createObjectURL(blob);
  
        img.onload = function () {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
  
          canvas.toBlob((convertedBlob) => {
            const downloadUrl = URL.createObjectURL(convertedBlob);
            downloadImage(downloadUrl, format); 
          }, format);
  
          URL.revokeObjectURL(objectUrl); // Clean up
        };
  
        img.onerror = function () {
          console.error("Failed to load image via proxy.");
          alert("Unable to convert the image. The proxy server may be down.");
        };
  
        img.src = objectUrl; // Load the image into the canvas
      })
      .catch(error => {
        console.error("Failed to fetch image via proxy:", error);
        alert("Failed to convert the image. Please ensure the proxy server is running.");
      });
  }
  
  // Helper function
  function downloadImage(url, format) {
    console.log("Downloading converted image:", url);
    const link = document.createElement('a');
    link.href = url;
    link.download = `image.${format === 'image/png' ? 'png' : 'jpg'}`;
    link.click();
  }
  