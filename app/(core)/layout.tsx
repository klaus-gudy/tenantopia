"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { AppSidebar } from "@/components/shared/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const queryClient = new QueryClient();

const DynamicBreadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");
  if (pathSegments.length === 0) {
    return null;
  }

  const formatSegment = (segment: string, isFirstSegment: boolean) => {
    const formatted = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return isFirstSegment ? `${formatted} page` : formatted;
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          const isFirst = index === 0;

          return (
            <React.Fragment key={segment}>
              {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>
                    {formatSegment(segment, isFirst)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>
                    {formatSegment(segment, isFirst)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default function CoreLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  if (!session) {
    return null;
  }

  // const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <DynamicBreadcrumbs />
            </div>
          </header>
          <main className="flex flex-1 overflow-y-auto">
            <div className="container px-6 py-2">{children}</div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
