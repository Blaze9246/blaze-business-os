"use client";

import { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronDown, Store, Plus } from "lucide-react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Store {
  id: string;
  name: string;
  slug: string;
  shopifyDomain: string;
  status: "active" | "inactive" | "error";
}

// Mock data - replace with API call
const mockStores: Store[] = [
  {
    id: "1",
    name: "Fashion Hub",
    slug: "fashion-hub",
    shopifyDomain: "fashion-hub.myshopify.com",
    status: "active",
  },
  {
    id: "2",
    name: "Tech Store",
    slug: "tech-store",
    shopifyDomain: "tech-store.myshopify.com",
    status: "active",
  },
  {
    id: "3",
    name: "Home & Garden",
    slug: "home-garden",
    shopifyDomain: "home-garden.myshopify.com",
    status: "error",
  },
];

export function StoreSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(mockStores[0]);

  const handleSelect = (store: Store) => {
    setSelectedStore(store);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-void border border-border rounded-lg hover:border-border-subtle transition-colors"
      >
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={cn(
              "w-2 h-2 rounded-full flex-shrink-0",
              selectedStore?.status === "active"
                ? "bg-success"
                : selectedStore?.status === "error"
                ? "bg-error"
                : "bg-zinc-500"
            )}
          />
          <div className="min-w-0 text-left">
            <p className="text-sm font-medium text-zinc-100 truncate">
              {selectedStore?.name || "Select Store"}
            </p>
            <p className="text-xs text-zinc-500 truncate">
              {selectedStore?.shopifyDomain || "No store selected"}
            </p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-zinc-500 flex-shrink-0 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-1 bg-surface-elevated border border-border rounded-lg shadow-2xl z-50 overflow-hidden">
            <div className="max-h-60 overflow-y-auto py-1">
              {mockStores.map((store) => (
                <button
                  key={store.id}
                  onClick={() => handleSelect(store)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-void transition-colors",
                    selectedStore?.id === store.id && "bg-primary-500/10"
                  )}
                >
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full flex-shrink-0",
                      store.status === "active"
                        ? "bg-success"
                        : store.status === "error"
                        ? "bg-error"
                        : "bg-zinc-500"
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "text-sm font-medium truncate",
                        selectedStore?.id === store.id
                          ? "text-primary-400"
                          : "text-zinc-100"
                      )}
                    >
                      {store.name}
                    </p>
                    <p className="text-xs text-zinc-500 truncate">
                      {store.shopifyDomain}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            <div className="border-t border-border p-2">
              <button
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-void rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add New Store
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
