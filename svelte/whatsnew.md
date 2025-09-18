## 2.3.0

### New features

-   TypeScript definitions

### Updates

-   Item `activeSection` parameter is added to define initial section state
-   Item `comp` can point directly to Svelte Component without registering

## 2.2.0

### New features

-   Overlay for readonly mode in case of empty fields
-   Hotkeys for common actions

### Updates

-   Events in `autoSave` modes are enhanced:
    -   true: `onsave` event is triggered for each field change
    -   false: `onsave` event is triggered on "Save" button click if data was changed
-   Validation is enhanced:
    -   it is triggered for each changed field if `autoSave` is switched on
    -   it is triggered for the whole form if `autoSave` is switched off
    -   `onsave` event is triggered only if all data is valid
-   Ability to mutate Editor values within the `onchange` event handler

### Breaking changes

-   `autoApply` event was removed

## 2.1.3

### Fixes

-   Impossible to set focus for topmost Editor field

## 2.1.2

### Fixes

-   Editor en-US locale is not applied by default

## 2.1.1

### Fixes

-   Section bars have light styling in WillowDark skin
-   Section bars are not clickable for inline Editor
-   Content overflow for inline Editor

## 2.1.0

### New features

-   TextArea and Checkbox as built-in types

### Fixes

-   values are not changed until recreated

## 2.0.1

-   Public release

### New features

-   Svelte 5 support
-   Comments and TaskList sections

## 0.6.0

### New features

-   Validation

## 0.5.0

### New features

-   Ability to define collapsible sections
-   Ability to bind values to toolbar controls

### Updates

-   `section:left|right` changed to `column:left|right`

## 0.2.0

-   Initial version
