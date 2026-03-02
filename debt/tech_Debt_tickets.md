## 01 - Add mounted guard to auth refresh effect (2026-03-02)

**Reason**

- `refreshAuth` performs async work in `app/root.tsx`; if the component unmounts before resolution, it may attempt `setState` after unmount, causing warnings and unnecessary work.

**Files for implementation**

- `app/root.tsx`
- `app/root.test.tsx` _(placeholder if tests do not exist yet)_

**Proposed code approach**

- Add a cancellation/mounted flag in `useEffect` and guard state updates in `refreshAuth` call path.
- Keep cleanup function to flip the flag on unmount.
- Ensure auth state remains unchanged when request resolves post-unmount.

**Expected impact**

- **Fixes:** Prevents post-unmount state updates from async auth checks.
- **Improves:** Runtime stability and minor performance efficiency during navigation/unmount races.

**AI Agent Fix Prompt**

- Goal: Prevent state updates after unmount during auth refresh in the root app shell.
- Context: `refreshAuth` in `app/root.tsx` is async and invoked from `useEffect`; component may unmount before promise resolution.
- Constraints: Minimal diff; preserve current auth behavior and public API; keep React hooks lint clean.
- Step-by-step plan:
  1. Open files from **Files for implementation**.
  2. In `app/root.tsx`, implement a mounted/cancelled guard in `useEffect` and gate `setAuthState` in the async flow.
  3. Keep cleanup in effect to mark unmounted state.
  4. Add/update test to verify no state update occurs after unmount (use placeholder test file if missing).
  5. Run lint/tests and fix any hook dependency issues.
- Acceptance criteria:
  - No React warning about updating unmounted component in auth flow.
  - Auth behavior on normal mount remains unchanged.
  - Lint passes with exhaustive-deps satisfied.
- Test plan:
  - Unit test: unmount component before mocked `getCurrentUser` resolves; assert no state update side effects.
  - Happy path test: mounted resolution updates auth state as before.
- Rollback plan:
  - Revert guarded effect changes in `app/root.tsx` and related tests if regression appears.

## 02 - Skip redundant auth state updates when values are unchanged (2026-03-02)

**Reason**

- `setAuthState` currently creates a new object on every refresh, even when values are identical, triggering avoidable rerenders.

**Files for implementation**

- `app/root.tsx`
- `components/Navbar.tsx` _(consumer impact check)_
- `app/root.test.tsx` _(placeholder if tests do not exist yet)_

**Proposed code approach**

- Use functional `setAuthState(prev => ...)` and shallow-compare `isSignedIn`, `userName`, `userId`.
- Return `prev` when computed state is equal to avoid rerender.
- Keep logic readable and side-effect free.

**Expected impact**

- **Fixes:** Eliminates unnecessary renders caused by no-op auth refresh updates.
- **Improves:** UI performance, especially when auth refresh is triggered repeatedly.

**AI Agent Fix Prompt**

- Goal: Prevent rerenders when auth refresh computes the same state.
- Context: In `app/root.tsx`, `refreshAuth` calls `setAuthState` with a newly created object each time.
- Constraints: Preserve existing auth semantics and fields (`isSignedIn`, `userName`, `userId`); avoid introducing external state libs.
- Step-by-step plan:
  1. Open files from **Files for implementation**.
  2. In `app/root.tsx`, compute next auth state from fetched user.
  3. Replace direct set with functional updater that returns `prev` if all fields are equal.
  4. Verify downstream consumer (`components/Navbar.tsx`) still renders correctly.
  5. Add/update tests for unchanged-state refresh (no rerender/no-op) and changed-state refresh.
  6. Run lint/tests and resolve any issues.
- Acceptance criteria:
  - Repeated refresh with identical user data does not trigger state change.
  - Refresh with changed user data updates state correctly.
  - Existing auth UI behavior remains intact.
- Test plan:
  - Unit test: same mock user on two refreshes; second update is no-op.
  - Unit test: changed mock user values produce state update.
- Rollback plan:
  - Revert functional updater optimization and test changes if any UI regression or stale-state bug occurs.
