import React from 'react';
import clsx from 'clsx';
import styles from '../Styles/buttonStyle.module.css';

/**
 * Button Component
 *
 * A fully accessible, polymorphic button with multiple variants, sizes,
 * icon support, and loading state. Supports both click and keyboard press
 * callbacks for composable interaction handling.
 *
 * @component
 *
 * @param {object}  props
 *
 * @param {'primary'|'secondary'|'ghost'|'danger'|'link'|'outline'} [props.variant='primary']
 *   Visual style of the button.
 *   - `primary`   – Filled, high-emphasis action (e.g. "Submit", "Save")
 *   - `secondary` – Subdued fill for supporting actions
 *   - `ghost`     – Transparent background, border on hover
 *   - `danger`    – Red-toned fill for destructive actions (e.g. "Delete")
 *   - `link`      – Looks like an anchor; no background or border
 *   - `outline`   – Border only, no fill
 *
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md']
 *   Controls padding, font-size, and minimum height.
 *   | size | min-height | font-size | padding (y / x) |
 *   |------|-----------|-----------|-----------------|
 *   | xs   | 24 px     | 11 px     | 2 px  / 8 px   |
 *   | sm   | 32 px     | 13 px     | 4 px  / 12 px  |
 *   | md   | 40 px     | 14 px     | 8 px  / 16 px  |
 *   | lg   | 48 px     | 16 px     | 10 px / 20 px  |
 *   | xl   | 56 px     | 18 px     | 12 px / 24 px  |
 *
 * @param {'button'|'submit'|'reset'} [props.type='button']
 *   Native HTML button type attribute.
 *
 * @param {boolean} [props.disabled=false]
 *   When true, the button is non-interactive, visually dimmed,
 *   and `aria-disabled` is set. Click/keydown handlers are suppressed.
 *
 * @param {boolean} [props.loading=false]
 *   Renders a spinner in place of (or alongside) children and sets
 *   `aria-busy="true"`. Automatically disables interaction while active.
 *   The button retains its current width to avoid layout shift.
 *
 * @param {boolean} [props.fullWidth=false]
 *   When true, the button stretches to fill its container (`width: 100%`).
 *
 * @param {boolean} [props.iconOnly=false]
 *   Applies equal padding on all sides and a square aspect ratio.
 *   Use together with an `aria-label` for accessibility.
 *
 * @param {React.ReactNode} [props.leftIcon]
 *   Icon element rendered to the left of `children`.
 *   Receives `aria-hidden="true"` automatically.
 *   Example: `leftIcon={<SearchIcon size={16} />}`
 *
 * @param {React.ReactNode} [props.rightIcon]
 *   Icon element rendered to the right of `children`.
 *   Receives `aria-hidden="true"` automatically.
 *
 * @param {string}          [props.className]
 *   Additional CSS class names merged via `clsx`.
 *
 * @param {React.CSSProperties} [props.style]
 *   Inline styles applied to the root `<button>` element.
 *
 * @param {function(React.MouseEvent<HTMLButtonElement>): void} [props.onClick]
 *   Called on pointer click. Suppressed when `disabled` or `loading`.
 *
 * @param {function(React.KeyboardEvent<HTMLButtonElement>): void} [props.onPress]
 *   Called when Enter or Space is pressed. Suppressed when `disabled` or `loading`.
 *   Useful for composing with keyboard-driven interaction patterns distinct
 *   from the native click event.
 *
 * @param {React.ReactNode} [props.children]
 *   Button label content. Can include text, icons, or any React node.
 *
 * @param {React.Ref<HTMLButtonElement>} ref
 *   Forwarded ref attached to the root `<button>` element.
 *
 * @example
 * // Primary, default size
 * <Button onClick={handleSave}>Save Changes</Button>
 *
 * @example
 * // Danger, large, full-width
 * <Button variant="danger" size="lg" fullWidth onClick={handleDelete}>
 *   Delete Account
 * </Button>
 *
 * @example
 * // Loading state (async submit)
 * <Button variant="primary" loading={isSubmitting} type="submit">
 *   Submit
 * </Button>
 *
 * @example
 * // Icon-only with accessible label
 * <Button variant="ghost" size="sm" iconOnly aria-label="Search">
 *   <SearchIcon size={16} />
 * </Button>
 *
 * @example
 * // Left icon + label
 * <Button variant="outline" leftIcon={<PlusIcon size={16} />}>
 *   Add Item
 * </Button>
 */
const Button = (
  {
    variant = 'primary',
    size = 'md',
    type = 'button',
    disabled = false,
    loading = false,
    fullWidth = false,
    iconOnly = false,
    leftIcon,
    rightIcon,
    className,
    style,
    onClick,
    onPress,
    children,
    ...rest
  },
  ref
) => {
  const isInert = disabled || loading;

  const handleKeyDown = (e) => {
    if (isInert) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPress?.(e);
    }
  };

  const handleClick = (e) => {
    if (isInert) return;
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-disabled={isInert || undefined}
      aria-busy={loading || undefined}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        {
          [styles.fullWidth]: fullWidth,
          [styles.iconOnly]: iconOnly,
          [styles.loading]: loading,
          [styles.disabled]: disabled,
        },
        className
      )}
      style={style}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}

      {!loading && leftIcon && (
        <span className={styles.iconLeft} aria-hidden="true">
          {leftIcon}
        </span>
      )}

      {children && <span className={styles.label}>{children}</span>}

      {!loading && rightIcon && (
        <span className={styles.iconRight} aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
