
import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/70", className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 mt-0 flex h-auto max-h-[85vh] flex-col rounded-b-[10px] border-0 bg-transparent overflow-hidden relative",
        className
      )}
      {...props}
    >
      {/* Effet de fond avec animation - couleurs adoucies */}
      <div className="absolute inset-0 bg-gradient-to-b from-noir-profond via-green-dark/80 to-noir-profond overflow-hidden">
        {/* Particules animées avec couleurs moins vives */}
        <div className="absolute top-[10%] left-[10%] w-20 h-20 bg-electric-blue/10 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-[30%] right-[15%] w-16 h-16 bg-green-light/20 rounded-full blur-lg animate-pulse-glow"></div>
        <div className="absolute bottom-[20%] left-[20%] w-24 h-24 bg-green-medium/15 rounded-full blur-xl animate-float-slow" style={{ animationDelay: "2s" }}></div>
        
        {/* Lignes néon adoucies */}
        <div className="absolute left-0 right-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-electric-blue/50 to-transparent opacity-50 animate-pulse-glow"></div>
        <div className="absolute left-0 right-0 bottom-0 h-[1px] w-full bg-gradient-to-r from-transparent via-green-light/50 to-transparent opacity-50 animate-pulse-glow" style={{ animationDelay: "1.5s" }}></div>
      </div>
      
      <div className="mx-auto mt-4 h-1 w-[100px] rounded-full bg-gradient-to-r from-green-medium/70 via-green-light/70 to-green-medium/70 animate-pulse-glow z-10" />
      <div className="relative z-10">
        {children}
      </div>
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left bg-transparent relative z-10", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4 bg-transparent relative z-10", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight text-white",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
