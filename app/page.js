import TournamentCard from "@/components/TournamentCard";

export default function Home() {
  return (
    <main>
      <div className="flex items-center justify-center my-6 relative">
        <img className="opacity-60 lg:w-[800px] xl:w-[960px] w-[90vw]" src="https://images.unsplash.com/photo-1490810194309-344b3661ba39?q=80&w=1448&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        <div className="flex flex-col items-center justify-center absolute sm:bottom-1/4 bottom-[20px]">
          <h3 className="font-bold text-blue-300 sm:text-3xl text-xl text-center">STRATEGIZE. PLAY. CONQUER.</h3>
          <p className="sm:text-lg text-md text-center">UNLEASH YOUR INNER CHAMPION</p>
        </div>
      </div>
      <div className="md:w-[88vw] w-[92vw] mx-auto">
        <h2 className="text-2xl font-bold my-6">Featured Tournaments</h2>
        <div className="w-full flex justify-around flex-wrap">
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
        </div>

      </div>
    </main>
  );
}
