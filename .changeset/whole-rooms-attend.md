---
"@tesseract-nexus/tesserix-ui": minor
---

# New Components: Drawer, Resizable, and Modal

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

---

**Milestone:** All 12 P0 core components in the roadmap are now complete! The tesserix-ui design system now includes all fundamental building blocks for modern React applications.
