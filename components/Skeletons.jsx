export function CardSkeleton(){
  return (
    <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 animate-pulse">
      <div className="h-[260px] w-full bg-white/10"/>
      <div className="p-3 space-y-2">
        <div className="h-4 bg-white/10 rounded" />
        <div className="h-3 w-2/3 bg-white/10 rounded" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 12 }){
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
      {Array.from({length:count}).map((_,i)=><CardSkeleton key={i}/>)}
    </div>
  );
}
