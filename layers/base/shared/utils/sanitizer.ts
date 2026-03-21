type EmptyValue
  = | null
    | undefined
    | string
    | readonly unknown[]
    | Map<unknown, unknown>
    | Set<unknown>
    | Record<PropertyKey, unknown>;

function isEmpty(value: EmptyValue | unknown): boolean {
  if (value == null)
    return true;

  if (
    typeof (value as { length?: unknown }).length === 'number'
  ) {
    return (value as ArrayLike<unknown>).length === 0;
  }

  const tag = Object.prototype.toString.call(value);
  if (tag === '[object Map]' || tag === '[object Set]') {
    return (value as Map<unknown, unknown> | Set<unknown>).size === 0;
  }

  const type = typeof value;
  if (type !== 'object' && type !== 'function') {
    return true;
  }

  const proto = Object.getPrototypeOf(value as object);
  const isPlainish: boolean
    = proto === null
      || proto === Object.prototype
      || Object.getPrototypeOf(proto) === null;

  if (!isPlainish && tag !== '[object Object]') {
    return true;
  }

  return Object.keys(value as object).length === 0;
}

export function normalizeValue(value: unknown, newValue?: unknown) {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'number') {
    return value.toLocaleString();
  }

  if (newValue) {
    return newValue;
  }

  if (!isEmpty(value)) {
    return value;
  }

  return '-';
}

export function toPositiveNumber(value: unknown, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
