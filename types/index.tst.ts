import safeRegex, { safeRegex as safeRegexNamed } from '..'
import { expect } from 'tstyche'

expect(safeRegex('regex')).type.toBe<boolean>()
expect(safeRegex(/regex/)).type.toBe<boolean>()
expect(safeRegex('^[a-zA-Z0-9]+(?:\\s[a-zA-Z0-9]+)*$')).type.toBe<boolean>()
expect(safeRegex(/^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/g)).type.toBe<boolean>()

expect(safeRegexNamed('regex')).type.toBe<boolean>()
expect(safeRegexNamed(/regex/)).type.toBe<boolean>()
expect(safeRegexNamed('^[a-zA-Z0-9]+(?:\\s[a-zA-Z0-9]+)*$')).type.toBe<boolean>()
expect(safeRegexNamed(/^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/g)).type.toBe<boolean>()
