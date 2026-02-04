# Face Tracker Portfolio - 16-Slice Radial

A mouse-tracking face effect with 16 radial slices (like a pizza). Your face follows the cursor by showing the appropriate directional photo.

## How It Works

The face container sits at the center of the screen. As you move your mouse:
1. JavaScript calculates the angle from the face center to your cursor
2. It picks the closest of 16 directional photos
3. The face appears to look directly at your cursor!

```
          90° (up)
            ↑
   157°  112°  67°  45°
      ↖    ↖    ↗    ↗
180° ←        ●        → 0° (right)
      ↙    ↙    ↘    ↘
   202°  247°  292° 315°
            ↓
          270° (down)

Plus intermediate angles at 22.5°, 337.5°, etc.
```

## File Structure

```
face-tracker/
├── index.html
├── style.css
├── script.js
├── README.md
└── images/
    ├── face-000.jpg    (looking right)
    ├── face-022.jpg    (up-right 1)
    ├── face-045.jpg    (up-right 2)
    ├── face-067.jpg    (up-right 3)
    ├── face-090.jpg    (looking up)
    ├── face-112.jpg    (up-left 1)
    ├── face-135.jpg    (up-left 2)
    ├── face-157.jpg    (up-left 3)
    ├── face-180.jpg    (looking left)
    ├── face-202.jpg    (down-left 1)
    ├── face-225.jpg    (down-left 2)
    ├── face-247.jpg    (down-left 3)
    ├── face-270.jpg    (looking down)
    ├── face-292.jpg    (down-right 1)
    ├── face-315.jpg    (down-right 2)
    ├── face-337.jpg    (down-right 3)
    └── face-center.jpg (neutral/center)
```

## Taking Your Photos

### Setup
1. **Use a tripod** or stable surface — framing must be identical
2. **Mark your head position** — use tape on the wall behind you
3. **Simple background** — solid color or blurred works best
4. **Consistent lighting** — take all photos within minutes
5. **Shoulders/chest up** — the image should be mostly your face

### The Poses (17 photos total)

Keep your **head completely still**. Only move your **eyes** to look in each direction:

**Cardinal directions:**
- `face-000.jpg` → Look directly right
- `face-090.jpg` → Look directly up
- `face-180.jpg` → Look directly left
- `face-270.jpg` → Look directly down

**Diagonal directions:**
- `face-045.jpg` → Look up-right (45°)
- `face-135.jpg` → Look up-left (45°)
- `face-225.jpg` → Look down-left (45°)
- `face-315.jpg` → Look down-right (45°)

**Intermediate directions (22.5° increments):**
- `face-022.jpg` → Slightly up from right
- `face-067.jpg` → Between up-right and up
- `face-112.jpg` → Between up and up-left
- `face-157.jpg` → Slightly up from left
- `face-202.jpg` → Slightly down from left
- `face-247.jpg` → Between down-left and down
- `face-292.jpg` → Between down and down-right
- `face-337.jpg` → Slightly down from right

**Neutral:**
- `face-center.jpg` → Look straight at camera (used when mouse is close)

### Pro Tips

1. **Take photos in order** going around the circle — it's faster
2. **Use your phone's burst mode** or have someone trigger the shutter
3. **Export as square (1:1)** — 400×400px minimum, 800×800px ideal
4. **Name files immediately** after taking each photo

## Customization

### Change Colors
Edit CSS variables in `style.css`:
```css
:root {
    --bg-color: #f0f2f5;
    --accent-color: #4361ee;
    --text-color: #1a1a2e;
}
```

### Adjust Center Deadzone
In `script.js`, change this value (in pixels):
```javascript
const CENTER_DEADZONE = 60;
```
- Smaller = face follows more aggressively, even near center
- Larger = more "neutral zone" in the middle

### Change Transition Speed
In `style.css`, adjust:
```css
.face-img {
    transition: opacity 0.08s ease-out;
}
```

## Browser Support

Works in all modern browsers with touch support for mobile.

## View Live

**URL:** https://ubuntu-4gb-openclaw.tail15e27e.ts.net:444

## Troubleshooting

**Face not showing?** → Check image filenames match exactly
**Jumpy transitions?** → Make sure your head position is consistent across photos
**Not tracking?** → Check browser console for JavaScript errors
