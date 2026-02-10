"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  trend?: "up" | "down";
  loading?: boolean;
  onClick?: () => void;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-primary-400",
  iconBgColor = "bg-primary-500/10",
  trend,
  loading = false,
  onClick,
}: StatsCardProps) {
  if (loading) {
    return (
      <div className="bg-surface border border-border rounded-xl p-6 animate-pulse">
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-lg bg-surface-elevated" />
          <div className="w-16 h-4 rounded bg-surface-elevated" />
        </div>
        <div className="mt-4 space-y-2">
          <div className="w-24 h-8 rounded bg-surface-elevated" />
          <div className="w-32 h-4 rounded bg-surface-elevated" />
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-surface border border-border rounded-xl p-6 transition-all duration-200",
        onClick && "cursor-pointer hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/5",
        "hover:border-border-subtle"
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn("p-2.5 rounded-xl", iconBgColor)}>
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
        {change && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
              changeType === "positive" && "bg-success/10 text-success",
              changeType === "negative" && "bg-error/10 text-error",
              changeType === "neutral" && "bg-surface-elevated text-zinc-500"
            )}
          >
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
            {change}
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-zinc-100">{value}</p>
        <p className="text-sm text-zinc-500 mt-1">{title}</p>
      </div>
    </div>
  );
}

import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary-500/10 text-primary-400 border border-primary-500/20",
        success: "bg-success/10 text-success border border-success/20",
        error: "bg-error/10 text-error border border-error/20",
        warning: "bg-accent-500/10 text-accent-400 border border-accent-500/20",
        neutral: "bg-surface-elevated text-zinc-400 border border-border-subtle",
        outline: "border border-border-subtle text-zinc-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
