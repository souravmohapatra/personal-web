# Swiveling profile image

Status: interaction specified for future implementation. User supplied and selected the assets; no image generation remains necessary. Website implementation has not begun.

## Assets and visual treatment

- `avatar.png` at workspace root: 1254 × 1254. Inspected: a geometric green frog holding a camera. This selected artwork supersedes the earlier generation brief, including its no-props and flat-editorial directions.
- `myself.jpeg` at workspace root: 800 × 800. Inspected: square portrait suitable for circular cropping. User called it myself.jpg; actual filename is myself.jpeg.
- Preserve originals. During implementation produce optimized, metadata-stripped derivatives without replacing source files. Inspect avatar alpha before export; preserve transparency if present.
- Use one circular profile button in the introduction, with a restrained pastel-green rim and stable dimensions. Front is the frog, back is Sourav's portrait. Contain the frog with a little internal space so its eyes/camera remain visible; crop the portrait to cover the circle while preserving the face.
- This is the occasional character already requested, not an additional mascot competing with the avatar. Avoid Instagram logos, story/status indicators, or unrelated social UI.

## Requested behavior and proposed timing

User requests two or three initial swivels, settling on the avatar, then a swivel to the portrait on click. Choose **two full rotations** as the concrete default; timing can be tuned during visual review.

1. Initial HTML renders the frog, with the portrait preloaded/decoded before any automatic rotation.
2. On the first visible presentation per browser tab session, rotate around the vertical axis through 720 degrees over approximately 2.4 seconds, gently decelerating to the frog. Both faces appear naturally during rotation. The intro must not loop or restart on resizing, focus, or scrolling back.
3. Click/tap while idle rotates 180 degrees to the portrait in approximately 500ms. Another click/tap returns to the frog. The selected side stays visible until the next activation; no automatic return timer.
4. Clicking during the intro cancels that intro and takes the visitor to the portrait. Rapid subsequent activations must resolve to the latest requested face without queued spins, snapping, or mismatched accessible state.
5. Session storage may remember only that the intro has played; failure to access storage must not break the control. No cross-visit tracking is needed.

## Implementation guidance

Use a native button containing a perspective wrapper and two faces, with preserve-3d and backface-visibility hidden. Rotate the inner element, not the layout container or focus outline. Keep the circle's dimensions reserved to prevent layout shift. Scope this animation to the profile control; it is an intentional exception to the earlier static-avatar proposal.

- Keyboard: Enter/Space activates the button; focus stays visible on a nonrotating outer element.
- Accessible action label: “Show my photograph” when frog is displayed; “Show my frog avatar” when portrait is displayed. Keep hidden-face content out of the accessibility tree. Do not announce every automatic rotation; expose a stable control name, updating for deliberate face changes.
- Respect prefers-reduced-motion from the start: skip the intro, show the frog, and make deliberate image changes immediate without 3D motion. If preference changes while spinning, settle promptly on the intended face.
- Without JavaScript, present the frog as a static image with appropriate alternative text and no inert button affordance.
- If the portrait cannot load, keep the frog visible and suppress unavailable flipping; a failed asset must not produce a blank face.
- Do not begin the intro in a hidden tab or while the control is offscreen. If the page becomes hidden during the intro, settle on the frog rather than replaying a surprise spin on return.

## Acceptance checks when implemented

- First presentation shows two complete rotations and finishes on the frog; later visits in the same tab session do not replay the intro.
- Both faces crop cleanly at mobile and desktop sizes; no mirrored reverse face or edge flicker.
- Click, tap, Enter, and Space toggle correctly; mid-intro and rapid activations behave predictably.
- Reduced motion suppresses all spins while preserving image switching; focus remains visible.
- Portrait failure, disabled JavaScript, and unavailable session storage retain a usable static avatar.
- No other animations or photo-gallery assets are needed to implement this control.
