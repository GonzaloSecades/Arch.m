export const PUTER_WORKER_URL = import.meta.env.VITE_PUTER_WORKER_URL || '';

// Storage Paths
export const STORAGE_PATHS = {
  ROOT: 'archy',
  SOURCES: 'archy/sources',
  RENDERS: 'archyy/renders',
} as const;

// Timing Constants (in milliseconds)
export const SHARE_STATUS_RESET_DELAY_MS = 1500;
export const PROGRESS_INCREMENT = 15;
export const REDIRECT_DELAY_MS = 600;
export const PROGRESS_INTERVAL_MS = 100;
export const PROGRESS_STEP = 5;

// UI Constants
export const GRID_OVERLAY_SIZE = '60px 60px';
export const GRID_COLOR = '#3B82F6';

// HTTP Status Codes
export const UNAUTHORIZED_STATUSES = [401, 403];

// Image Dimensions
export const IMAGE_RENDER_DIMENSION = 1024;

// export const ARCHY_RENDER_PROMPT = `
// TASK: Convert the input 2D floor plan into a **photorealistic, top‑down 3D architectural render**.

// STRICT REQUIREMENTS (do not violate):
// 1) **REMOVE ALL TEXT**: Do not render any letters, numbers, labels, dimensions, or annotations. Floors must be continuous where text used to be.
// 2) **GEOMETRY MUST MATCH**: Walls, rooms, doors, and windows must follow the exact lines and positions in the plan. Do not shift or resize.
// 3) **TOP‑DOWN ONLY**: Orthographic top‑down view. No perspective tilt.
// 4) **CLEAN, REALISTIC OUTPUT**: Crisp edges, balanced lighting, and realistic materials. No sketch/hand‑drawn look.
// 5) **NO EXTRA CONTENT**: Do not add rooms, furniture, or objects that are not clearly indicated by the plan.

// STRUCTURE & DETAILS:
// - **Walls**: Extrude precisely from the plan lines. Consistent wall height and thickness.
// - **Doors**: Convert door swing arcs into open doors, aligned to the plan.
// - **Windows**: Convert thin perimeter lines into realistic glass windows.

// FURNITURE & ROOM MAPPING (only where icons/fixtures are clearly shown):
// - Bed icon → realistic bed with duvet and pillows.
// - Sofa icon → modern sectional or sofa.
// - Dining table icon → table with chairs.
// - Kitchen icon → counters with sink and stove.
// - Bathroom icon → toilet, sink, and tub/shower.
// - Office/study icon → desk, chair, and minimal shelving.
// - Porch/patio/balcony icon → outdoor seating or simple furniture (keep minimal).
// - Utility/laundry icon → washer/dryer and minimal cabinetry.

// STYLE & LIGHTING:
// - Lighting: bright, neutral daylight. High clarity and balanced contrast.
// - Materials: realistic wood/tile floors, clean walls, subtle shadows.
// - Finish: professional architectural visualization; no text, no watermarks, no logos.
// `.trim();

export const ARCHY_RENDER_PROMPT = `
Convert the provided 2D architectural floor plan image into a high-resolution, photorealistic 3D architectural render while preserving the exact layout and geometry of the plan.

CAMERA & VIEW (NON-NEGOTIABLE)
• Use a true orthographic top-down camera (perfect plan view).
• Absolutely no perspective, no tilt, no angle, no isometric, no 3/4 view.

CRITICAL CONSTRAINTS (NON-NEGOTIABLE)
• Remove ALL text: letters, numbers, dimensions, labels, notes, annotations, symbols containing characters.
• Where text previously existed, reconstruct the surface so flooring/wall finishes look continuous and natural (no blank patches).
• Preserve exact geometry: walls, room boundaries, openings, doors, and windows must match the original plan precisely.
• Do not shift, resize, straighten, reinterpret, simplify, redesign, or “improve” any structural element.
• Do not add rooms, partitions, columns, niches, built-ins, or architectural elements not explicitly present in the plan.
• If uncertain about a detail, omit it rather than guessing.

ARCHITECTURAL MODELING
• Walls: extrude directly from plan lines with consistent thickness and realistic height 2.7–3.0 m.
• Edges must be clean, sharp, and architecturally accurate.
• Doors: convert door swing arcs into open hinged doors, aligned exactly to the opening and swing direction shown.
• Windows: convert window markings into realistic glazed openings integrated into wall thickness (minimal frames; do not invent extra mullions).

FURNITURE & FIXTURE INTERPRETATION (STRICT)
• Only add furniture/fixtures when clear icons or fixtures appear in the plan.
• If an icon is ambiguous, do not place an object.

Icon → Object mapping:
• Bed icon → realistic bed with duvet and pillows
• Sofa icon → modern sofa or sectional
• Dining table icon → table with chairs
• Kitchen icon → counters with sink and cooktop (only where shown)
• Bathroom icon → toilet, vanity sink, bathtub or shower (only where shown)
• Office/study icon → desk, chair (minimal shelving only if shown)
• Porch/patio/balcony icon → simple outdoor seating (only where shown)
• Utility/laundry icon → washer, dryer, minimal cabinetry (only where shown)

VISUAL STYLE
• Lighting: bright neutral daylight, evenly balanced illumination.
• Materials: realistic wood or tile floors, matte painted walls, subtle realistic shadows.
• Rendering quality: professional architectural visualization, physically based rendering, ultra-clean geometry.

OUTPUT REQUIREMENTS
• Crisp edges, high resolution, realistic materials, clean surfaces.
• No text, labels, watermarks, logos, UI, or graphic overlays of any kind.
• Final image must look like a photorealistic 3D plan render while strictly preserving the original 2D floor plan geometry.

FAILURE CONDITIONS (MUST NOT OCCUR)
• Any perspective/tilt/isometric view
• Any remaining readable characters
• Any layout/geometry changes
• Any invented architectural elements
• Any furniture added without a clear plan icon
`.trim();
