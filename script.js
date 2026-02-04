// Mouse tracking face grid effect with 16 radial slices
// Calculates angle from face center to cursor and shows appropriate image

document.addEventListener('DOMContentLoaded', () => {
    const faceContainer = document.getElementById('faceContainer');
    const faceImages = document.querySelectorAll('.face-img');
    
    // Define the 16 angles in degrees
    const angles = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 
                    180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5];
    
    // Center deadzone radius (pixels) - when mouse is within this, show center face
    const CENTER_DEADZONE = 50;
    
    // Cache the face container rect and update on resize/scroll
    let faceRect = faceContainer.getBoundingClientRect();
    
    function updateFaceRect() {
        faceRect = faceContainer.getBoundingClientRect();
    }
    
    window.addEventListener('resize', updateFaceRect);
    window.addEventListener('scroll', updateFaceRect);
    
    function getClosestAngle(mouseAngle) {
        // Normalize angle to 0-360
        mouseAngle = ((mouseAngle % 360) + 360) % 360;
        
        let closest = angles[0];
        let minDiff = Math.abs(mouseAngle - angles[0]);
        
        for (let angle of angles) {
            let diff = Math.abs(mouseAngle - angle);
            // Handle wrap-around at 360/0
            if (diff > 180) diff = 360 - diff;
            
            if (diff < minDiff) {
                minDiff = diff;
                closest = angle;
            }
        }
        
        return closest;
    }
    
    function updateFace(mouseX, mouseY) {
        // Get face container center position (use cached rect)
        const centerX = faceRect.left + faceRect.width / 2;
        const centerY = faceRect.top + faceRect.height / 2;
        
        // Calculate distance from center (works at any distance)
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Hide all faces
        faceImages.forEach(img => {
            img.classList.remove('active');
        });
        
        // If mouse is close to center, show neutral face
        if (distance < CENTER_DEADZONE) {
            const centerFace = document.querySelector('.face-img[data-angle="center"]');
            if (centerFace) centerFace.classList.add('active');
            return;
        }
        
        // Calculate angle from center to mouse - works at ANY distance
        // atan2(dy, dx) returns angle in radians from X axis
        // In screen coords (Y down): 0 = right, PI/2 = down, PI = left, -PI/2 = up
        const angleRad = Math.atan2(dy, dx);
        
        // Convert to degrees: 0 = right, 90 = down, 180 = left, 270 = up (clockwise)
        let angleDeg = angleRad * (180 / Math.PI);
        angleDeg = ((angleDeg % 360) + 360) % 360;
        
        // Face should look TOWARD the cursor angle
        const closestAngle = getClosestAngle(angleDeg);
        
        // Format angle for data attribute lookup
        let angleStr;
        if (closestAngle === 0) angleStr = '000';
        else if (closestAngle === 22.5) angleStr = '022';
        else if (closestAngle === 45) angleStr = '045';
        else if (closestAngle === 67.5) angleStr = '067';
        else if (closestAngle === 90) angleStr = '090';
        else if (closestAngle === 112.5) angleStr = '112';
        else if (closestAngle === 135) angleStr = '135';
        else if (closestAngle === 157.5) angleStr = '157';
        else if (closestAngle === 180) angleStr = '180';
        else if (closestAngle === 202.5) angleStr = '202';
        else if (closestAngle === 225) angleStr = '225';
        else if (closestAngle === 247.5) angleStr = '247';
        else if (closestAngle === 270) angleStr = '270';
        else if (closestAngle === 292.5) angleStr = '292';
        else if (closestAngle === 315) angleStr = '315';
        else if (closestAngle === 337.5) angleStr = '337';
        
        // Activate the corresponding face
        const activeFace = document.querySelector(`.face-img[data-angle="${angleStr}"]`);
        if (activeFace) {
            activeFace.classList.add('active');
        }
    }
    
    // Mouse tracking - use window instead of document for better coverage
    window.addEventListener('mousemove', (e) => {
        updateFace(e.clientX, e.clientY);
    });
    
    // Touch tracking for mobile
    window.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        updateFace(touch.clientX, touch.clientY);
    });
    
    // Touch start for immediate response
    window.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        updateFace(touch.clientX, touch.clientY);
    });
    
    // Update face rect periodically in case of layout shifts
    setInterval(updateFaceRect, 500);
    
    // Initialize with center face and update rect
    updateFaceRect();
    const centerFace = document.querySelector('.face-img[data-angle="center"]');
    if (centerFace) centerFace.classList.add('active');
});

// Photo setup instructions:
// 
// You need 17 photos total:
// - 16 directional photos (named face-000.jpg through face-337.jpg)
// - 1 center/neutral photo (face-center.jpg)
//
// The angles correspond to looking directions:
// 000 = looking right
// 022 = looking slightly up-right
// 045 = looking up-right
// 067 = looking more up-right
// 090 = looking up
// 112 = looking up-left
// 135 = looking up-left diagonal
// 157 = looking slightly up-left
// 180 = looking left
// 202 = looking slightly down-left
// 225 = looking down-left diagonal
// 247 = looking more down-left
// 270 = looking down
// 292 = looking down-right-ish
// 315 = looking down-right diagonal
// 337 = looking slightly down-right
//
// Tips:
// - Keep your head stationary, only move your eyes
// - Use a tripod for consistent framing
// - Take photos in rapid succession for consistent lighting
// - Use a simple/plain background
// - Export as square images (1:1 ratio)
