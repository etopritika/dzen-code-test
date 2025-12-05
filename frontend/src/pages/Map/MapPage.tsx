import { useTranslation } from "react-i18next";

const MapPage = () => {
  const { t } = useTranslation();

  return (
    <section className="mt-4 mb-4">
      <h2 className="mb-4">{t("map.title")}</h2>

      <iframe
        title="kharkiv-map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25659.71351874011!2d36.20723271323252!3d49.996004723926785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a6e9409b0641%3A0x5401397dbe8bb8e1!2z0J_QsNC80L7RgdGC0YDQvtC60YHQutCw0Y8g0L_RgNC-0YHQv9C10LrRgiwgS2hhcmtpdiwgVWtyYWluZQ!5e0!3m2!1sen!2sua!4v1708514342003!5m2!1sen!2sua"
        width="100%"
        height="500"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
};

export default MapPage;
