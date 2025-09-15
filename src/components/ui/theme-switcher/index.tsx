"use client";

import {
  HeaderGlobalAction,
  Select,
  SelectItem,
  Toggle,
  Button,
  Tile,
  RadioButtonGroup,
  RadioButton,
  Stack,
  Tag,
  IconButton,
  OverflowMenu,
  OverflowMenuItem,
} from "@carbon/react";
import { Moon, Sun, Contrast, ColorPalette } from "@carbon/icons-react";

import { useState } from "react";
import { CarbonTheme, useThemeContext } from "@/providers/ThemeProvider";

// Compact theme switcher for header
export function HeaderThemeSwitcher() {
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <HeaderGlobalAction
      onClick={toggleTheme}
      aria-label="Toggle theme"
      tooltipAlignment="end"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </HeaderGlobalAction>
  );
}

// Icon button theme switcher
export function IconThemeSwitcher({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <IconButton
      label={`Switch to ${isDark ? "light" : "dark"} theme`}
      onClick={toggleTheme}
      size={size}
      kind="ghost"
    >
      {isDark ? <Sun /> : <Moon />}
    </IconButton>
  );
}

// Dropdown theme selector
export function ThemeSelector() {
  const { theme, setTheme } = useThemeContext();

  const themes: { value: CarbonTheme; label: string; tag?: string }[] = [
    { value: "white", label: "White", tag: "Light" },
    { value: "g10", label: "Gray 10", tag: "Light" },
    { value: "g90", label: "Gray 90", tag: "Dark" },
    { value: "g100", label: "Gray 100", tag: "Dark" },
  ];

  return (
    <Select
      id="theme-selector"
      labelText="Theme"
      value={theme}
      onChange={(e) => setTheme(e.target.value as CarbonTheme)}
    >
      {themes.map((t) => (
        <SelectItem
          key={t.value}
          value={t.value}
          text={`${t.label} ${t.tag ? `(${t.tag})` : ""}`}
        />
      ))}
    </Select>
  );
}

// Radio button theme selector
export function ThemeRadioGroup() {
  const { theme, setTheme } = useThemeContext();

  return (
    <RadioButtonGroup
      name="theme-selection"
      legendText="Select theme"
      valueSelected={theme}
      onChange={(value) => setTheme(value as CarbonTheme)}
      orientation="vertical"
    >
      <RadioButton labelText="White (Light)" value="white" />
      <RadioButton labelText="Gray 10 (Light)" value="g10" />
      <RadioButton labelText="Gray 90 (Dark)" value="g90" />
      <RadioButton labelText="Gray 100 (Dark)" value="g100" />
    </RadioButtonGroup>
  );
}

// Toggle for light/dark mode
export function ThemeToggle() {
  const { isDark, setTheme } = useThemeContext();

  const handleToggle = () => {
    if (isDark) {
      setTheme("white");
    } else {
      setTheme("g90");
    }
  };

  return (
    <Toggle
      id="theme-toggle"
      labelText="Dark mode"
      labelA="Off"
      labelB="On"
      toggled={isDark}
      onToggle={handleToggle}
    />
  );
}

// Visual theme preview tiles
export function ThemePreview() {
  const { theme, setTheme } = useThemeContext();

  const themes: {
    value: CarbonTheme;
    label: string;
    colors: string[];
    isDark: boolean;
  }[] = [
    {
      value: "white",
      label: "White",
      colors: ["#ffffff", "#f4f4f4", "#e0e0e0"],
      isDark: false,
    },
    {
      value: "g10",
      label: "Gray 10",
      colors: ["#f4f4f4", "#e8e8e8", "#c6c6c6"],
      isDark: false,
    },
    {
      value: "g90",
      label: "Gray 90",
      colors: ["#262626", "#393939", "#525252"],
      isDark: true,
    },
    {
      value: "g100",
      label: "Gray 100",
      colors: ["#161616", "#262626", "#393939"],
      isDark: true,
    },
  ];

  return (
    <div className="theme-preview-grid">
      <style jsx>{`
        .theme-preview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
        }
        .theme-tile {
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .theme-tile:hover {
          transform: translateY(-2px);
        }
        .color-swatches {
          display: flex;
          height: 40px;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        .swatch {
          flex: 1;
        }
      `}</style>

      {themes.map((t) => (
        <div
          key={t.value}
          className="theme-tile"
          onClick={() => setTheme(t.value)}
        >
          <Tile>
            <Stack gap={2}>
              <div className="color-swatches">
                {t.colors.map((color, i) => (
                  <div
                    key={i}
                    className="swatch"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div>
                <strong>{t.label}</strong>
                {theme === t.value && (
                  <Tag type="blue" size="sm" style={{ marginLeft: "0.5rem" }}>
                    Active
                  </Tag>
                )}
              </div>
              <Tag type={t.isDark ? "gray" : "outline"} size="sm">
                {t.isDark ? "Dark" : "Light"}
              </Tag>
            </Stack>
          </Tile>
        </div>
      ))}
    </div>
  );
}

// Overflow menu theme switcher
export function ThemeOverflowMenu() {
  const { theme, setTheme } = useThemeContext();

  const themes: CarbonTheme[] = ["white", "g10", "g90", "g100"];
  const themeLabels = {
    white: "White",
    g10: "Gray 10",
    g90: "Gray 90",
    g100: "Gray 100",
  };

  return (
    <OverflowMenu aria-label="Theme options" renderIcon={ColorPalette} flipped>
      {themes.map((t) => (
        <OverflowMenuItem
          key={t}
          itemText={`${themeLabels[t]} ${theme === t ? "✓" : ""}`}
          onClick={() => setTheme(t)}
        />
      ))}
    </OverflowMenu>
  );
}

// Floating theme switcher
export function FloatingThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, isDark } = useThemeContext();

  return (
    <>
      <style jsx>{`
        .floating-theme-switcher {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 9999;
        }
        .theme-panel {
          position: absolute;
          bottom: 60px;
          right: 0;
          background: var(--cds-layer);
          border: 1px solid var(--cds-border-subtle);
          border-radius: 8px;
          padding: 1rem;
          min-width: 200px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
      `}</style>

      <div className="floating-theme-switcher">
        {isOpen && (
          <div className="theme-panel">
            <Stack gap={3}>
              <strong>Choose Theme</strong>
              <ThemeRadioGroup />
            </Stack>
          </div>
        )}
        <IconButton
          label="Theme settings"
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          kind={isOpen ? "primary" : "tertiary"}
        >
          <Contrast />
        </IconButton>
      </div>
    </>
  );
}

// Inline theme demo component
export function ThemeDemo() {
  const { theme } = useThemeContext();

  return (
    <Tile>
      <Stack gap={3}>
        <h3>Current Theme: {theme}</h3>
        <div
          style={{
            padding: "1rem",
            background: "var(--cds-background)",
            border: "1px solid var(--cds-border-subtle)",
            borderRadius: "4px",
          }}
        >
          <p style={{ color: "var(--cds-text-primary)" }}>Primary text color</p>
          <p style={{ color: "var(--cds-text-secondary)" }}>
            Secondary text color
          </p>
          <p style={{ color: "var(--cds-text-placeholder)" }}>
            Placeholder text color
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button size="sm">Primary</Button>
          <Button size="sm" kind="secondary">
            Secondary
          </Button>
          <Button size="sm" kind="tertiary">
            Tertiary
          </Button>
          <Button size="sm" kind="ghost">
            Ghost
          </Button>
        </div>
      </Stack>
    </Tile>
  );
}
