# 📱 Mobile Peek View - How It Works

## Visual Guide

### Desktop View
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │              │  │              │  │              │      │
│  │ Service 1    │  │ Service 2    │  │ Service 3    │      │
│  │              │  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │              │  │              │                        │
│  │ Service 4    │  │ Service 5    │                        │
│  │              │  │              │                        │
│  └──────────────┘  └──────────────┘                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
(All 5 services visible at once)
```

### Mobile View - Peek
```
┌─────────────────────────────┬────┐
│                             │    │
│                             │    │
│      Service 1              │ P  │  ← P = Peek (40px of next card)
│                             │ E  │
│                             │ E  │
│                             │ K  │
│  [Animated Icon - 70x70]    │    │
│  Service Name               │    │
│  Description                │    │
│  ✓ Feature 1                │    │
│  ✓ Feature 2                │    │
│  [Learn More] [Book Now]    │    │
│                             │    │
└─────────────────────────────┴────┘
```

### Mobile After 4 Seconds (Auto-Slide)
```
        ┌─────────────────────────────┬────┐
        │                             │    │
        │                             │    │
        │      Service 2              │ P  │  ← Now showing Service 2
        │                             │ E  │  ← Peek is Service 3
        │                             │ E  │
        │                             │ K  │
        │  [Animated Icon - 70x70]    │    │
        │  Service Name               │    │
        │  Description                │    │
        │  ✓ Feature 1                │    │
        │  ✓ Feature 2                │    │
        │  [Learn More] [Book Now]    │    │
        │                             │    │
        └─────────────────────────────┴────┘
```

### Mobile with Dot Indicators
```
┌─────────────────────────────┬────┐
│                             │ P  │
│      Service 1              │ E  │
│                             │ E  │
│  [Animated Icon]            │ K  │
│  Service Name               │    │
│  Description                │    │
│  ✓ Feature 1                │    │
│  ✓ Feature 2                │    │
│  [Learn More] [Book Now]    │    │
│                             │    │
└─────────────────────────────┴────┘
     ●○○○○  (Click any dot to navigate)
```

---

## Animation Sequence

### Initial Load
```
Time: 0s
┌─────────────────────────┬──┐
│    Service 1            │  │  Peek: Service 2 (40px visible)
└─────────────────────────┴──┘
●○○○○
```

### Auto-Advance 1
```
Time: 4s
       ┌─────────────────────────┬──┐
       │    Service 2            │  │  Peek: Service 3 (40px visible)
       └─────────────────────────┴──┘
       ○●○○○  (Auto-advances dot)
```

### Auto-Advance 2
```
Time: 8s
              ┌─────────────────────────┬──┐
              │    Service 3            │  │  Peek: Service 4 (40px visible)
              └─────────────────────────┴──┘
              ○○●○○
```

### Auto-Advance 3
```
Time: 12s
                     ┌─────────────────────────┬──┐
                     │    Service 4            │  │  Peek: Service 5 (40px visible)
                     └─────────────────────────┴──┘
                     ○○○●○
```

### Auto-Advance 4
```
Time: 16s
                            ┌─────────────────────────┬──┐
                            │    Service 5            │  │  Peek: Service 1 (loops back)
                            └─────────────────────────┴──┘
                            ○○○○●
```

### Loop Back to Start
```
Time: 20s
┌─────────────────────────┬──┐
│    Service 1            │  │  Peek: Service 2 (loops back to start)
└─────────────────────────┴──┘
●○○○○
```

---

## User Interactions

### Manual Navigation with Dots
```
User clicks dot 3:

┌─────────────────────────┬──┐
│    Service 3            │  │  (Jumps to Service 3)
└─────────────────────────┴──┘
○○●○○  (Dot 3 becomes active)
```

### Swipe/Scroll
```
User swipes left:

Transition:
┌─────────────────────────┬──┐
│    Service 2            │  │  (Smooth animation)
└─────────────────────────┴──┘
○●○○○
```

---

## Peek View Benefits

1. **Shows context** - User knows more services exist
2. **Encourages exploration** - "What's that card peeking?"
3. **Modern mobile pattern** - Familiar to users
4. **Better UX** - Hints at next content
5. **Visual interest** - Movement and change

---

## Responsive Dimensions

### Mobile (≤ 768px)
```
┌─────────────────────────┬─────┐
│                         │     │
│      90% of width       │ 10% │
│    (visible card)       │peek │
│                         │     │
└─────────────────────────┴─────┘
= 100% total width
```

Actual numbers (assume 375px width):
```
Main card: 90% × 375px = 337px
Peek: 10% × 375px = 38px
Total: 375px (full width)
```

### Icon Sizes
```
Mobile:     70px × 70px (animated GIF)
Tablet:     70px × 70px (animated GIF)
Desktop:    80px × 80px (animated GIF)
```

---

## Animation Details

### Auto-Slide Timing
```
Slide duration: 0.5 seconds (smooth)
Auto-advance interval: 4 seconds
(1 slide visible for 4 seconds, then 0.5s animation, repeat)
```

### Dot Indicator Animation
```
Inactive: Gray (#ccc)
Active: Yellow (#FFC93C)
Scale: 1.3x when active
Transition: 0.3s ease
```

---

## Smooth Transitions

### CSS Transform
```css
.svc-mobile-slider {
  transform: translateX(-${currentSlide * 100}%);
  transition: transform 0.5s ease-in-out;
}
```

Example:
```
Slide 0: translateX(0%)       → Service 1 visible
Slide 1: translateX(-100%)    → Service 2 visible
Slide 2: translateX(-200%)    → Service 3 visible
etc.
```

---

## Animated GIF Icons

Each card shows a unique animated icon:

```
┌─────────────────────────┐
│  ┌──────────────────┐   │
│  │                  │   │
│  │ [Animated GIF]   │   │  Service 1: Web development
│  │  70px × 70px    │   │
│  │ (Loops forever)  │   │
│  │                  │   │
│  └──────────────────┘   │
│   Website Design &      │
│   Development           │
│                         │
│   [Animated GIF]        │  Service 2: Education
│   etc.                  │
└─────────────────────────┘
```

---

## Complete Mobile Card Structure

```
┌─────────────────────────────────────────┐
│  Padding: 16px                          │
│  ┌──────────────────────────────────┐   │
│  │      [GIF Icon - 70x70]          │   │
│  │         (animated)               │   │
│  ├──────────────────────────────────┤   │
│  │   Website Design & Development   │   │ Heading
│  ├──────────────────────────────────┤   │
│  │   Fast, secure & responsive      │   │ Description
│  │   websites that convert          │   │
│  │   visitors into customers.       │   │
│  ├──────────────────────────────────┤   │
│  │   ✓ Business Websites            │   │ Features
│  │   ✓ E-commerce Stores            │   │ (4 shown)
│  │   ✓ Landing Pages                │   │
│  │   ✓ Custom Web Apps              │   │
│  ├──────────────────────────────────┤   │
│  │ [Learn More]  [Book Now →]       │   │ Actions
│  └──────────────────────────────────┘   │
│  Padding: 16px                          │
└─────────────────────────────────────────┘
```

---

## Perfect Mobile Experience! ✅

- ✅ Small peek of next card (encourages scrolling)
- ✅ Auto-advance every 4 seconds
- ✅ Manual navigation with dots
- ✅ Animated GIF icons
- ✅ Smooth transitions
- ✅ Responsive sizing
- ✅ Touch-friendly buttons

**Result: Modern, engaging mobile experience!** 🎉
