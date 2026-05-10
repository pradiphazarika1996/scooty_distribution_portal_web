"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface BreadcrumbItem {
  label: string | number;
  href?: string;
}

interface Ctx {
  items: BreadcrumbItem[];
  setItems: (items: BreadcrumbItem[]) => void;
}

const BreadcrumbContext = createContext<Ctx | null>(null);

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BreadcrumbItem[]>([]);
  return (
    <BreadcrumbContext.Provider value={{ items, setItems }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb(items?: BreadcrumbItem[]) {
  const ctx = useContext(BreadcrumbContext);
  if (!ctx)
    throw new Error("useBreadcrumb must be used within BreadcrumbProvider");

  useEffect(() => {
    if (items) ctx.setItems(items);
    return () => {
      if (items) ctx.setItems([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(items)]);

  return ctx;
}
