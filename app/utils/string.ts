export function ellipsisTextMiddle(
  str: string,
  options: { prefix?: number; suffix?: number } = {},
) {
  const { prefix = 6, suffix = 6 } = options
  if (str.length > prefix + suffix) {
    return (
      str.substring(0, prefix) +
      '...' +
      str.substring(str.length - suffix, str.length)
    )
  }
  return str
}
