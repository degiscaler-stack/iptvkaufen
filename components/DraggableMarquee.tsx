"use client";

import { type PointerEvent, type ReactNode, useEffect, useRef } from "react";

type DraggableMarqueeProps = {
  children: ReactNode;
  className: string;
  direction?: "left" | "right";
  speed?: number;
  trackClassName: string;
};

function normalizePosition(position: number, loopWidth: number) {
  if (loopWidth <= 0) {
    return position;
  }

  let normalized = position;

  while (normalized <= -loopWidth) {
    normalized += loopWidth;
  }

  while (normalized > 0) {
    normalized -= loopWidth;
  }

  return normalized;
}

export default function DraggableMarquee({
  children,
  className,
  direction = "left",
  speed = 40,
  trackClassName,
}: DraggableMarqueeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const initializedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const loopWidthRef = useRef(0);
  const positionRef = useRef(0);

  useEffect(() => {
    const applyPosition = () => {
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
      }
    };

    const updateLoopWidth = () => {
      const track = trackRef.current;

      if (!track) {
        return;
      }

      const loopWidth = track.scrollWidth / 2;

      if (loopWidth > 0 && loopWidth !== loopWidthRef.current) {
        loopWidthRef.current = loopWidth;

        if (!initializedRef.current) {
          positionRef.current = direction === "right" ? -loopWidth : 0;
          initializedRef.current = true;
        }

        positionRef.current = normalizePosition(positionRef.current, loopWidth);
        applyPosition();
      }
    };

    const tick = (time: number) => {
      if (lastTimeRef.current && !isDraggingRef.current) {
        const elapsedSeconds = Math.min((time - lastTimeRef.current) / 1000, 0.064);
        const directionMultiplier = direction === "left" ? -1 : 1;

        positionRef.current += directionMultiplier * speed * elapsedSeconds;
        positionRef.current = normalizePosition(positionRef.current, loopWidthRef.current);
        applyPosition();
      }

      lastTimeRef.current = time;
      frameRef.current = window.requestAnimationFrame(tick);
    };

    updateLoopWidth();

    const resizeObserver =
      "ResizeObserver" in window && trackRef.current ? new ResizeObserver(updateLoopWidth) : null;

    if (resizeObserver && trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    window.addEventListener("resize", updateLoopWidth);
    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", updateLoopWidth);
      resizeObserver?.disconnect();
    };
  }, [direction, speed]);

  const setDragging = (isDragging: boolean) => {
    isDraggingRef.current = isDragging;

    if (viewportRef.current) {
      viewportRef.current.style.cursor = isDragging ? "grabbing" : "grab";
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === "mouse") {
      return;
    }

    setDragging(true);
    lastPointerXRef.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) {
      return;
    }

    const deltaX = event.clientX - lastPointerXRef.current;
    lastPointerXRef.current = event.clientX;
    positionRef.current = normalizePosition(positionRef.current + deltaX, loopWidthRef.current);

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
    }
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) {
      return;
    }

    setDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      ref={viewportRef}
      className={className}
      onPointerCancel={handlePointerEnd}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onLostPointerCapture={handlePointerEnd}
      style={{ cursor: "grab", touchAction: "pan-y", userSelect: "none" }}
    >
      <div ref={trackRef} className={trackClassName}>
        {children}
      </div>
    </div>
  );
}
