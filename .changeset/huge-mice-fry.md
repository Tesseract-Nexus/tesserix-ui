---
"tesserix-ui": minor
---

# New Hooks and Utilities Library

Added comprehensive hooks and utilities library to complete Phase 4 of the roadmap:

## Hooks (P0)

**useClickOutside** - Detect clicks outside an element
- Returns a ref to attach to target element
- Handles both mouse and touch events
- Automatic cleanup on unmount

**useIntersectionObserver** - Track element visibility
- IntersectionObserver API integration
- Freeze-once-visible option for performance
- Returns ref, entry, and isIntersecting boolean

**useKeyPress** - Keyboard event detection
- Support for single key, multiple keys, or predicate function
- Customizable event type (keydown/keyup)
- Target element support

**useCopyToClipboard** - Clipboard operations
- Promise-based copy function
- Copied state with auto-reset after 2 seconds
- Error handling for unsupported browsers

**useAsync** - Async operation state management
- Loading, error, and data states
- Status tracking (idle, pending, success, error)
- Execute and reset functions
- Immediate execution option

## Utilities (P0)

**Portal** - Render outside DOM hierarchy
- Mount children to any container (defaults to document.body)
- Proper cleanup on unmount
- SSR-safe implementation

**VisuallyHidden** - Accessibility component
- Hides content visually while keeping it accessible to screen readers
- Uses modern CSS clip techniques

**FocusTrap** - Focus management
- Traps focus within a container
- Tab and Shift+Tab navigation
- Optional focus restoration
- Enable/disable support

**ErrorBoundary** - Error handling
- Catches JavaScript errors in React tree
- Customizable fallback UI (static or function)
- onError callback support
- Reset keys for automatic recovery

**ThemeProvider & useTheme** - Runtime theme switching
- Light, dark, and system theme support
- LocalStorage persistence
- System preference detection
- Customizable attributes (class or data-theme)
- Automatic theme application

**Responsive Utilities** - Breakpoint management
- `useBreakpoint()` hook returns current breakpoint
- `useMediaQuery()` hook for custom media queries
- `<Show>` component for conditional rendering above/below breakpoints
- `<Hide>` component for hiding content at breakpoints

**Animation Utilities** - Declarative animations
- `<FadeIn>` with directional support (up, down, left, right)
- `<SlideIn>` from any direction
- `<ScaleIn>` with origin-center
- `useAnimatedValue()` for animated number transitions
- Customizable duration and delay

**Loading States** - Global loading management
- `<LoadingProvider>` with global overlay
- `useLoading()` hook for state management
- `<LoadingSpinner>` with size variants
- `<LoadingDots>` animated indicator
- `<LoadingOverlay>` for local loading states
- `<LoadingSkeleton>` for placeholder content

---

**Build:** ESM 262.08 KB, CJS 288.52 KB, DTS 67.94 KB
**Tests:** 368 tests passing across 70 test files
**Milestone:** All P0 hooks and utilities complete!
