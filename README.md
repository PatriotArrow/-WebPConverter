# WebPConverter
Converts and downloads WebP images from Reddit

Simple Firefox extension that converts WebP images on any webpage (Mostly reddit since they use WebP and does not allow cross-origin access) to PNG or JPG formats with a right-click context menu. Uses a proxy server to bypass CORS.




## Installation

### 1. Clone the repository:

### 2. Install dependencies for the proxy server:


### 3. Run the proxy server:

node server.js
The server will be available at http://localhost:3000.

### 4. Install the Firefox Extension:

    Open Firefox and go to about:debugging.
    Click This Firefox.
    Click Load Temporary Add-on and select the manifest.json file from the root of the extension directory.

## Usage

    After loading the extension in Firefox, navigate to Reddit or any other website with WebP images.
    Right-click on any WebP image.
    Select "Convert WebP".
    The image will be automatically converted and downloaded
