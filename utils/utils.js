export function shorter(s) {
    if (s.length > 8) {
        return s.slice(0, 6) + '...' + s.slice(-4)
    } else {
        return s
    }
}