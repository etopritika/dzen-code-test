import { useTranslation } from "react-i18next";
import { formatFullDate } from "@/utils/formatDate";
import { useLiveClock } from "@/hooks/useLiveClock";
import { useActiveSessions } from "@/hooks/useActiveSessions";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const TopMenu = () => {
  const { t, i18n } = useTranslation();
  const currentTime = useLiveClock();
  const activeSessions = useActiveSessions();
  const [lang, setLang] = useLocalStorage<"en" | "ua">("lang", "en");

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "ua" : "en";
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="p-3 border-bottom">
      <div className="container d-flex justify-content-end align-items-center gap-3">
        <time dateTime={currentTime.toISOString()}>
          {formatFullDate(currentTime)} {currentTime.toLocaleTimeString()}
        </time>
        <span>
          {t("topmenu.sessions")}: {activeSessions}
        </span>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={toggleLanguage}
          title={t("topmenu.language")}
        >
          {lang.toUpperCase()}
        </button>
      </div>
    </header>
  );
};

export default TopMenu;
