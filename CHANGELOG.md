# @tesseract-nexus/tesserix-ui

## 1.1.0

### Minor Changes

- 186730c: Add NavigationMenu, ScrollArea, and Rating components

  **NavigationMenu**: Complex navigation with mega menus

  - Built on @radix-ui/react-navigation-menu
  - Support for multi-level navigation
  - Animated viewport with smooth transitions
  - Full keyboard navigation
  - Complete accessibility support
  - Storybook stories with interaction tests

  **ScrollArea**: Custom styled scrollbars

  - Built on @radix-ui/react-scroll-area
  - Vertical and horizontal scrolling support
  - Customizable scrollbar styling
  - Cross-browser consistent appearance
  - Smooth scrolling behavior

  **Rating**: Star rating component

  - Interactive star rating (0-5 stars)
  - Configurable max value
  - Three sizes: sm, md, lg
  - Readonly mode for display
  - Hover preview before selection
  - Full keyboard and screen reader support
  - Fully accessible with ARIA labels

  All components include comprehensive Storybook documentation, unit tests, and TypeScript types. Roadmap updated to reflect completed components.

- 44f42fc: # New Hooks and Utilities Library

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

  ***

  **Build:** ESM 262.08 KB, CJS 288.52 KB, DTS 67.94 KB
  **Tests:** 368 tests passing across 70 test files
  **Milestone:** All P0 hooks and utilities complete!

- f237e2f: Add Menubar component - Application-style menu bar built on Radix UI

  New component: Menubar provides desktop-like menu navigation with:

  - Multiple menu triggers in a horizontal bar
  - Nested submenus support
  - Checkbox and radio group items
  - Keyboard shortcuts display
  - Full keyboard navigation
  - Comprehensive accessibility (ARIA, focus management)
  - Complete Storybook documentation with 7 interactive stories
  - Full test coverage with 10 unit tests

  Includes all sub-components: MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarLabel, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarShortcut

- 8f34c0b: Add Calendar, TimePicker, ColorPicker, RangeSlider, and Form components

  **Calendar**: Date selection with single and range modes

  - Built on react-day-picker
  - Single date selection mode
  - Date range selection mode
  - Custom navigation icons
  - Extensive styling with Tailwind
  - Full keyboard navigation
  - Complete accessibility support
  - Storybook stories with interaction tests

  **TimePicker**: Time selection with 12h/24h formats

  - Interactive time input (hours, minutes, optional seconds)
  - 12-hour format with AM/PM toggle
  - 24-hour format support
  - Configurable step values
  - Keyboard-friendly inputs
  - Disabled state support
  - Full accessibility with ARIA labels
  - Multiple Storybook stories demonstrating different formats

  **ColorPicker**: HSL-based color selection

  - Visual color picker with HSL sliders
  - Hue, Saturation, and Lightness controls
  - Hex color input field
  - Color preview swatch
  - Real-time color updates
  - Disabled state support
  - Optional hex input display
  - Storybook stories with preset colors example

  **RangeSlider**: Dual-handle range selector

  - Two-handle slider for selecting value ranges
  - Draggable handles with visual feedback
  - Click-to-set functionality
  - Configurable min, max, and step values
  - Optional value labels
  - Disabled state support
  - Full keyboard and mouse support
  - Storybook stories including price range example

  **Form**: Comprehensive form system with validation

  - Form wrapper component
  - FormField for field management
  - FormItem, FormLabel, FormControl sub-components
  - FormDescription for help text
  - FormMessage for error display
  - Required field indicators
  - Context-based field state management
  - Full accessibility with proper ARIA attributes
  - Validation error display
  - Integration examples with Input, Textarea, Select, Checkbox
  - Multiple Storybook stories demonstrating validation patterns

  All components include comprehensive Storybook documentation, unit tests, and TypeScript types. Roadmap updated to reflect completed components.

- 6fb645b: # New Components: Drawer, Resizable, and Modal

  Added three high-priority components to complete the P0 roadmap:

  ## Drawer Component

  Mobile-first side panel component that provides an alternative to Sheet for navigation and action menus.

  **Key Features:**

  - Portal-based rendering for proper z-index management
  - Four directional slides: top, bottom, left, right (defaults to bottom for mobile)
  - Full keyboard navigation and focus management
  - Controlled and uncontrolled modes
  - Accessible with proper ARIA attributes
  - Built-in overlay with backdrop blur
  - Smooth animations via Tailwind CSS

  **7 Storybook Stories:**

  - Default (bottom drawer)
  - FromLeft, FromRight, FromTop, FromBottom variants
  - Controlled mode example
  - WithForm integration

  ## Resizable Component

  Custom resizable panels system with interactive drag handles for creating split-pane layouts.

  **Key Features:**

  - Horizontal and vertical layout support
  - Min/max size constraints per panel
  - Nested resizable containers support
  - Visual feedback during drag operations
  - Disabled handle support
  - Data attributes for size tracking
  - No external dependencies

  **6 Storybook Stories:**

  - Default (horizontal two-panel)
  - Vertical orientation
  - ThreePanels layout
  - Nested resizable containers
  - CodeEditor example (complex nested layout)
  - DisabledHandle demonstration

  ## Modal Component

  Semantic alias for the Dialog component, providing familiar Modal terminology for developers who prefer that naming convention.

  **Key Features:**

  - All Dialog functionality with Modal naming
  - Exports: Modal, ModalTrigger, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription, ModalClose
  - Maintains full type safety

  **6 Storybook Stories:**

  - Default modal
  - ConfirmAction pattern
  - WithForm integration
  - Controlled mode
  - LongContent with scrolling
  - CustomWidth sizing

  ***

  **Milestone:** All 12 P0 core components in the roadmap are now complete! The tesserix-ui design system now includes all fundamental building blocks for modern React applications.

## 1.0.1

### Patch Changes

- Fix Sheet Storybook play test lint/type issue by removing an unused variable.

## 1.0.0

### Major Changes

- Release v1.0.0.

  Highlights:

  - Matured component library with extensive Storybook interaction coverage
  - CI-enforced Storybook coverage gates and quality checks
  - Chromatic visual testing workflow integrated
  - Support and release governance policies documented
