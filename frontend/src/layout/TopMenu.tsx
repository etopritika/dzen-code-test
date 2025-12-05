import { formatFullDate } from "@/utils/formatDate";
import { useLiveClock } from "@/hooks/useLiveClock";
import { useActiveSessions } from "@/hooks/useActiveSessions";

const TopMenu = () => {
  const currentTime = useLiveClock();
  const activeSessions = useActiveSessions();

  return (
    <header className="p-3 border-bottom">
      <div className="container d-flex justify-content-end align-items-center gap-3">
        <time dateTime={currentTime.toISOString()}>
          {formatFullDate(currentTime)} {currentTime.toLocaleTimeString()}
        </time>
        <span>Active sessions: {activeSessions}</span>
      </div>
    </header>
  );
};

export default TopMenu;
