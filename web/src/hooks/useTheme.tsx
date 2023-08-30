import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { ColorScheme } from "@mantine/core";

/**
 * This Hook is helpful in toggling theme
 */

export const useTheme = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return { colorScheme, setColorScheme, toggleColorScheme };
};
