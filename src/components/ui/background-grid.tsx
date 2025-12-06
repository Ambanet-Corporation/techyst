export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 z-[-1] h-full w-full bg-background">
          <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
