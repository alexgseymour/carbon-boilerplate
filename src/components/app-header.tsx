"use client";

import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
} from "@carbon/react";

import Link from "next/link";
import { HeaderThemeSwitcher } from "./ui/theme-switcher";

export function AppHeader() {
  return (
    <>
      <Header>
        <HeaderName as={Link} href="/" prefix="Carbon">
          Boilerplate
        </HeaderName>
        <HeaderNavigation>
          <HeaderMenuItem as={Link} href="/">
            Home
          </HeaderMenuItem>
        </HeaderNavigation>
        <HeaderGlobalBar>
          <HeaderThemeSwitcher />
        </HeaderGlobalBar>
      </Header>
    </>
  );
}
