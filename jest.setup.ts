import '@testing-library/jest-dom'

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  }),
}))

// Mock next/dynamic to avoid SSR issues in tests
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: (...args: unknown[]) => {
    const dynamicModule = jest.requireActual('next/dynamic')
    const dynamicActualComp = dynamicModule.default
    const RequiredComponent = dynamicActualComp(args[0])
    if (RequiredComponent.preload) {
      RequiredComponent.preload()
    } else if (RequiredComponent.render?.preload) {
      RequiredComponent.render.preload()
    }
    return RequiredComponent
  },
}))
