"use client";

import { useOrganization, useOrganizationList, CreateOrganization } from "@clerk/nextjs";
import { useState } from "react";
import { Building2, Plus, Users, Settings } from "lucide-react";
import { useClerk } from "@clerk/nextjs";

export function OrganizationSwitcher() {
  const { organization, isLoaded: orgLoaded } = useOrganization();
  const { userMemberships, isLoaded: listLoaded } = useOrganizationList({
    userMemberships: true,
  });
  const { openCreateOrganization } = useClerk();
  const [isOpen, setIsOpen] = useState(false);

  if (!orgLoaded || !listLoaded) {
    return (
      <div className="bg-surface border border-border rounded-lg p-3 animate-pulse">
        <div className="w-full h-10 bg-surface-elevated rounded" />
      </div>
    );
  }

  const activeOrganization = organization;
  const organizations = userMemberships?.data || [];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-3 py-2 bg-surface border border-border rounded-lg hover:bg-surface-elevated transition-colors"
      >
        {activeOrganization?.imageUrl ? (
          <img
            src={activeOrganization.imageUrl}
            alt={activeOrganization.name}
            className="w-8 h-8 rounded-lg object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-primary-400" />
          </div>
        )}
        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-medium text-zinc-100 truncate">
            {activeOrganization?.name || "Personal Account"}
          </p>
          <p className="text-xs text-zinc-500">
            {activeOrganization ? "Organization" : "Personal"}
          </p>
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-xl z-50 overflow-hidden">
            <div className="py-2">
              <p className="px-3 py-1 text-xs text-zinc-500 uppercase tracking-wider">
                Your Organizations
              </p>
              {organizations.map((membership) => (
                <button
                  key={membership.organization.id}
                  onClick={() => {
                    membership.organization.setAsActive();
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-surface-elevated transition-colors ${
                    activeOrganization?.id === membership.organization.id
                      ? "bg-primary-500/10"
                      : ""
                  }`}
                >
                  {membership.organization.imageUrl ? (
                    <img
                      src={membership.organization.imageUrl}
                      alt={membership.organization.name}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-surface-elevated flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-zinc-400" />
                    </div>
                  )}
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-medium text-zinc-100 truncate">
                      {membership.organization.name}
                    </p>
                    <p className="text-xs text-zinc-500 capitalize">
                      {membership.role}
                    </p>
                  </div>
                </button>
              ))}

              {organizations.length === 0 && (
                <p className="px-3 py-4 text-sm text-zinc-500 text-center">
                  No organizations yet
                </p>
              )}
            </div>

            <div className="border-t border-border p-2">
              <button
                onClick={() => {
                  openCreateOrganization();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:bg-surface-elevated rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Organization
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
